import produce from "immer"

const initialState = {
	BASE_URL: "https://finnhub.io/api/v1", 
	API_KEY: "", 
	symbols: {},  
	watchlist: [], 
	selected: {}
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
		case "ADD_COMPANY":
			state.watchlist.push(action.payload);
			break;
		case "REMOVE_COMPANY":
			console.log(state.watchlist);
			const idx = state.watchlist.findIndex((item) => item.toString() === action.payload.toString());
			if(idx > -1) {
				state.watchlist.splice(idx, 1);
			}
			
			console.log(idx, action.payload);
			console.log(state.watchlist);
			break;
		default:
			break;
	}
}, initialState);

export default reducer;