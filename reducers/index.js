import produce from "immer"

const initialState = {
	companies: [
    {
        "description": "AGILENT TECHNOLOGIES INC",
        "displaySymbol": "A",
        "symbol": "A"
    },
    {
        "description": "ALCOA CORP",
        "displaySymbol": "AA",
        "symbol": "AA"
    },
    {
        "description": "PERTH MINT PHYSICAL GOLD ETF",
        "displaySymbol": "AAAU",
        "symbol": "AAAU"
    },
    {
        "description": "ATA CREATIVITY GLOBAL - ADR",
        "displaySymbol": "AACG",
        "symbol": "AACG"
    },
    {
        "description": "ADVISORSHARES DORSEY WRIGHT",
        "displaySymbol": "AADR",
        "symbol": "AADR"
    },
    {
        "description": "AMERICAN AIRLINES GROUP INC",
        "displaySymbol": "AAL",
        "symbol": "AAL"
    },
    {
        "description": "ALTISOURCE ASSET MANAGEMENT",
        "displaySymbol": "AAMC",
        "symbol": "AAMC"
    },
    {
        "description": "ATLANTIC AMERICAN CORP",
        "displaySymbol": "AAME",
        "symbol": "AAME"
    },
    {
        "description": "AARON'S INC",
        "displaySymbol": "AAN",
        "symbol": "AAN"
    },
  ]
};

const reducer = produce((state, action) => {
	switch(action.type) {
		case "LOAD_COMPANIES":
			action.payload.forEach(company => {
				if(company.description) {
					state.companies[company.symbol] = company
				}
			});
			break;
		default:
			break;
	}
}, initialState);

export default reducer;