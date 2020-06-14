import produce from "immer"

const initialState = {
	BASE_URL: "https://finnhub.io/api/v1", 
	API_KEY: "", 
	symbols: {},  
	selected: undefined
};

const reducer = produce((state, action) => {
	switch(action.type) {
		case "LOAD_US_EX":
			state.symbols["us"] = action.payload;
			break;
		case "LOAD_INDICES":
			state.symbols["indices"] = action.payload;
		break;
		case "SET_COMPANY":
			state.selected = action.payload;
			break;
		default:
			break;
	}
}, initialState);

export default reducer;