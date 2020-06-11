import produce from "immer"

const initialState = {
	companies: []
};

const reducer = produce((state, action) => {
	switch(action.type) {
		case "LOAD_COMPANIES":
			state.companies = action.payload;
			break;
		default:
			break;
	}
}, initialState);

export default reducer;