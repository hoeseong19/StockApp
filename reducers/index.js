import produce from "immer"

const initialState = {
	baseUrl: "https://finnhub.io/api/v1", 
	companies: [], 
	selected: undefined
};

const reducer = produce((state, action) => {
	switch(action.type) {
		case "LOAD_COMPANIES":
			state.companies = action.payload;
			break;
		case "SET_COMPANY":
			state.selected = action.payload;
			break;
		default:
			break;
	}
}, initialState);

export default reducer;