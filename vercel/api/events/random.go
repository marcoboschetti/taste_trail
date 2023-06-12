package handler

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

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

	res, err := t.RoundTrip(req)
	if err != nil {
		fmt.Println("Error happened in JSON marshal. Err:", err)
		return
	}

	// Get the Location body
	eventsBody, _ := io.ReadAll(res.Body)
	fmt.Println("eventsBody", string(eventsBody))

	var events TiDBEventsDto
	json.Unmarshal([]byte(eventsBody), &events)

	// Response to client
	jsonResp, err := json.Marshal(events.Data.Rows)
	if err != nil {
		fmt.Println("Error happened in JSON marshal. Err:", err)
	} else {
		w.Write(jsonResp)
	}
}

type TiDBEventsDto struct {
	Type string `json:"type"`
	Data struct {
		// Columns []struct {
		// 	Col      string `json:"col"`
		// 	DataType string `json:"data_type"`
		// 	Nullable bool   `json:"nullable"`
		// } `json:"columns"`
		Rows []struct {
			Budget      string `json:"budget"`
			Category    string `json:"category"`
			Difficulty  string `json:"difficulty"`
			GuestRange  string `json:"guest_range"`
			ID          string `json:"id"`
			Name        string `json:"name"`
			Subcategory string `json:"subcategory"`
			Tags        string `json:"tags"`
			TodoList    string `json:"todo_list"`
		} `json:"rows"`
		// Result struct {
		// 	Code      int      `json:"code"`
		// 	Message   string   `json:"message"`
		// 	StartMs   int64    `json:"start_ms"`
		// 	EndMs     int64    `json:"end_ms"`
		// 	Latency   string   `json:"latency"`
		// 	RowCount  int      `json:"row_count"`
		// 	RowAffect int      `json:"row_affect"`
		// 	Limit     int      `json:"limit"`
		// 	Databases []string `json:"databases"`
		// } `json:"result"`
	} `json:"data"`
}
