package handler

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	dac "github.com/xinsnake/go-http-digest-auth-client"
)

func IngredientsQuery(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// API User
	query := r.URL.Query().Get("q")
	if len(query) == 0 {
		w.Write([]byte("[]"))
		return
	}

	baseAPIURL := os.Getenv("DATA_APP_BASE_URL")
	randomRecipesURL := fmt.Sprintf("%s/v1/ingredients/query?q=%s", baseAPIURL, query)
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

	fmt.Println(string(ingredientesCount))
	var recipes TiDBIngredientsListQuery
	json.Unmarshal([]byte(ingredientesCount), &recipes)

	if len(recipes.Data.Rows) == 0 {
		w.Write([]byte("empty rows"))
		return
	}

	// Response to client
	ingredientsArr := make([]string, len(recipes.Data.Rows))
	for idx, row := range recipes.Data.Rows {
		ingredientsArr[idx] = row.Ingredient
	}

	jsonResp, err := json.Marshal(ingredientsArr)
	if err != nil {
		fmt.Println("Error happened in JSON marshal. Err:", err)
		w.Write([]byte(err.Error()))
	} else {
		w.Write(jsonResp)
	}
}

type TiDBIngredientsListQuery struct {
	Type string `json:"type"`
	Data struct {
		Columns []struct {
			Col      string `json:"col"`
			DataType string `json:"data_type"`
			Nullable bool   `json:"nullable"`
		} `json:"columns"`
		Rows []struct {
			Ingredient string `json:"ingredient"`
		} `json:"rows"`
		Result struct {
			Code      int      `json:"code"`
			Message   string   `json:"message"`
			StartMs   int64    `json:"start_ms"`
			EndMs     int64    `json:"end_ms"`
			Latency   string   `json:"latency"`
			RowCount  int      `json:"row_count"`
			RowAffect int      `json:"row_affect"`
			Limit     int      `json:"limit"`
			Databases []string `json:"databases"`
		} `json:"result"`
	} `json:"data"`
}
