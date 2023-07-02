package handler

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	dac "github.com/xinsnake/go-http-digest-auth-client"
)

func Random(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")

	// API User
	baseAPIURL := os.Getenv("DATA_APP_BASE_URL")
	randomRecipesURL := baseAPIURL + "/v1/recipes/random?max_results=8" //?limit=${limit}'
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
	recipesBody, _ := io.ReadAll(res.Body)

	var recipes TiDBRecipesDto
	json.Unmarshal([]byte(recipesBody), &recipes)

	// Response to client
	jsonResp, err := json.Marshal(recipes.Data.Rows)
	if err != nil {
		fmt.Println("Error happened in JSON marshal. Err:", err)
		w.Write([]byte(err.Error()))
	} else {
		w.Write(jsonResp)
	}
}

type TiDBRecipesDto struct {
	Type string `json:"type"`
	// Result struct {
	// 	Code    int    `json:"code"`
	// 	Message string `json:"message"`
	// } `json:"result"`
	Data struct {
		Rows []struct {
			Budget              string `json:"budget"`
			CookingTime         string `json:"cooking_time"`
			CuisineType         string `json:"cuisine_type"`
			DietaryRestrictions string `json:"dietary_restrictions"`
			DifficultyLevel     string `json:"difficulty_level"`
			ID                  string `json:"id"`
			Ingredients         string `json:"ingredients"`
			Instructions        string `json:"instructions"`
			Name                string `json:"name"`
			PreparationTime     string `json:"preparation_time"`
			ServingSize         string `json:"serving_size"`
			Tags                string `json:"tags"`
		} `json:"rows"`
	} `json:"data"`
}
