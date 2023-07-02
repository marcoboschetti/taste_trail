package handler

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"

	dac "github.com/xinsnake/go-http-digest-auth-client"
)

const queryPageSize = 50

func IngredientsList(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")

	// API User
	baseAPIURL := os.Getenv("DATA_APP_BASE_URL")

	ended := false
	curIdx := 0
	var ingredientsArr []string
	var err error
	var retrieved int
	for !ended {
		ingredientsArr, retrieved, err = getPageList(baseAPIURL, curIdx, ingredientsArr)
		fmt.Println(len(ingredientsArr), retrieved, err)
		if err != nil {
			w.Write([]byte(err.Error()))
		}
		ended = retrieved != queryPageSize
		curIdx += retrieved
	}

	// Response to client
	jsonResp, err := json.Marshal(ingredientsArr)
	if err != nil {
		fmt.Println("Error happened in JSON marshal. Err:", err)
		w.Write([]byte(err.Error()))
	} else {
		w.Write(jsonResp)
	}
}

func getPageList(baseAPIURL string, startRecord int, ingredientsArr []string) ([]string, int, error) {
	randomRecipesURL := fmt.Sprintf("%s/v1/ingredients?start_record=%d&end_record=%d", baseAPIURL, startRecord, startRecord+queryPageSize)
	req, reqErr := http.NewRequest("GET", randomRecipesURL, nil)
	if reqErr != nil {
		return nil, 0, reqErr
	}

	apiPublicKey := os.Getenv("DATA_APP_PUBLIC_KEY")
	apiPrivateKey := os.Getenv("DATA_APP_PRIVATE_KEY")
	t := dac.NewTransport(apiPublicKey, apiPrivateKey)

	res, err := t.RoundTrip(req)
	if err != nil {
		return nil, 0, fmt.Errorf("Error happened in JSON marshal. Err: %s", err)
	}

	// Get the Location body
	ingredientesCount, _ := io.ReadAll(res.Body)
	var recipes TiDBIngredientsListAll
	json.Unmarshal([]byte(ingredientesCount), &recipes)

	if len(recipes.Data.Rows) == 0 {
		return nil, 0, errors.New("empty rows")
	}

	for _, row := range recipes.Data.Rows {
		ingredientsArr = append(ingredientsArr, row.Ingredient)
	}
	return ingredientsArr, len(recipes.Data.Rows), nil
}

type TiDBIngredientsListAll struct {
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
