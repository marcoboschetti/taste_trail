package handler

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	dto "/api/dto"
	dac "github.com/xinsnake/go-http-digest-auth-client"
)

type User struct {
	ID    int32  `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func RandomE(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")

	// API User
	baseAPIURL := os.Getenv("DATA_APP_BASE_URL")
	randomEventsURL := baseAPIURL + "/v1/events/random" //?limit=${limit}'
	req, _ := http.NewRequest("GET", randomEventsURL, nil)

	apiPublicKey := os.Getenv("DATA_APP_PUBLIC_KEY")
	apiPrivateKey := os.Getenv("DATA_APP_PRIVATE_KEY")
	t := dac.NewTransport(apiPublicKey, apiPrivateKey)
	fmt.Println("apiPublicKey", apiPublicKey, "!", apiPrivateKey, "!!", baseAPIURL)
	res, err := t.RoundTrip(req)
	if err != nil {
		fmt.Println("Error happened in JSON marshal. Err:", err)
		return
	}

	// Get the Location body
	eventsBody, _ := io.ReadAll(res.Body)
	fmt.Println("eventsBody", string(eventsBody))

	var userLocation dto.TiDBEventDto
	json.Unmarshal([]byte(eventsBody), &userLocation)

	// Response to client
	resp := make(map[string]string)
	resp["weather"] = "TEST"
	resp["raw_response"] = string(eventsBody)

	jsonResp, err := json.Marshal(resp)
	if err != nil {
		fmt.Println("Error happened in JSON marshal. Err:", err)
	} else {
		w.Write(jsonResp)
	}
}
