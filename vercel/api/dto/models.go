package dto

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
