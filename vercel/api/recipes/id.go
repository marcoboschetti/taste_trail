package handler

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"

	dac "github.com/xinsnake/go-http-digest-auth-client"
)

func RecipeByID(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")

	// API User
	idStr := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		fmt.Println("Error happened in param parsing. Err:", err)
		w.Write([]byte(err.Error()))
		return
	}

	baseAPIURL := os.Getenv("DATA_APP_BASE_URL")
	getRecipesURL := baseAPIURL + fmt.Sprintf("/v1/recipes/id?id=%d", id)
	req, reqErr := http.NewRequest("GET", getRecipesURL, nil)
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

	var recipes TiDBRecipeByIDDto
	json.Unmarshal([]byte(recipesBody), &recipes)

	// Response to client
	if len(recipes.Data.Rows) == 0 {
		w.Write([]byte("no results"))
	}

	jsonResp, err := json.Marshal(recipes.Data.Rows[0])
	if err != nil {
		fmt.Println("Error happened in JSON marshal. Err:", err)
		w.Write([]byte(err.Error()))
	} else {
		w.Write(jsonResp)
	}
}

type TiDBRecipeByIDDto struct {
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
