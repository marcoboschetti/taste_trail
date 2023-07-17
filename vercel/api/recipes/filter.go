package handler

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"

	dac "github.com/xinsnake/go-http-digest-auth-client"
)

func Filter(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")

	// API User
	baseAPIURL := os.Getenv("DATA_APP_BASE_URL")

	bMinStr := r.URL.Query().Get("bMin")
	bMaxStr := r.URL.Query().Get("bMax")
	dMinStr := r.URL.Query().Get("dMin")
	dMaxStr := r.URL.Query().Get("dMax")
	cuisinesArr := r.URL.Query().Get("cuisines")

	bMin, err := strconv.Atoi(bMinStr)
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}
	bMax, err := strconv.Atoi(bMaxStr)
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}
	dMin, err := strconv.Atoi(dMinStr)
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}
	dMax, err := strconv.Atoi(dMaxStr)
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	cuisineQuery := "&"
	for idx, c := range strings.Split(cuisinesArr, ",") {
		cuisineQuery += fmt.Sprintf("q%d=%s", idx+1, c)
	}

	randomRecipesURL := fmt.Sprintf("%s/v1/recipes/filter?min_difficulty=%d&max_difficulty=%d&min_budget=%d&max_budget=%d&max_results=%d%s",
		baseAPIURL, dMin, dMax, bMin, bMax, 20, cuisineQuery)

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
	fmt.Println(string(recipesBody))

	var recipes TiDBRecipesFilteredDto
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

type TiDBRecipesFilteredDto struct {
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
