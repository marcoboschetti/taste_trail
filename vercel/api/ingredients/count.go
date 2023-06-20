package handler

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	dac "github.com/xinsnake/go-http-digest-auth-client"
)

func IngredientsCount(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")

	// API User
	baseAPIURL := os.Getenv("DATA_APP_BASE_URL")
	randomRecipesURL := baseAPIURL + "/v1/ingredients/count"
	req, reqErr := http.NewRequest("GET", randomRecipesURL, nil)
	if reqErr != nil {
		w.Write([]byte(reqErr.Error()))
		return
	}

	apiPublicKey := os.Getenv("DATA_APP_PUBLIC_KEY")
	apiPrivateKey := os.Getenv("DATA_APP_PRIVATE_KEY")

	t := dac.NewTransport(apiPublicKey, apiPrivateKey)

	res, err := t.RoundTrip(req)
	if err != nil {
		fmt.Println("Error happened in JSON marshal. Err:", err)
		w.Write([]byte(err.Error()))
		return
	}

	// Get the Location body
	ingredientesCount, _ := io.ReadAll(res.Body)
	var recipes TiDBIngredientsCount
	json.Unmarshal([]byte(ingredientesCount), &recipes)

	if len(recipes.Data.Rows) == 0 {
		w.Write([]byte("empty rows"))
		return
	}

	// Response to client
	jsonResp, err := json.Marshal(recipes.Data.Rows[0].IngredientsCount)
	if err != nil {
		fmt.Println("Error happened in JSON marshal. Err:", err)
		w.Write([]byte(err.Error()))
	} else {
		w.Write(jsonResp)
	}
}

type TiDBIngredientsCount struct {
	Type string `json:"type"`
	Data struct {
		Rows []struct {
			IngredientsCount string `json:"ingredients_count"`
		} `json:"rows"`
		Result struct {
			Code    int    `json:"code"`
			Message string `json:"message"`
			// StartMs   int64    `json:"start_ms"`
			// EndMs     int64    `json:"end_ms"`
			// Latency   string   `json:"latency"`
			// RowCount  int      `json:"row_count"`
			// RowAffect int      `json:"row_affect"`
			// Limit     int      `json:"limit"`
			// Databases []string `json:"databases"`
		} `json:"result"`
	} `json:"data"`
}
