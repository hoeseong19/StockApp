import Axios from "axios"

const BASE_URL = "https://finnhub.io/api/v1";
const API_KEY = "bq6uatnrh5r8h5n0k7n0";

export function loadCompanies() {
  const SYMBOLS_URL = `${BASE_URL}/stock/symbol`;
  return (dispatch) => {
    Axios.get(SYMBOLS_URL, {
      params: {
        exchange: "US", 
        token: API_KEY
      }
    }).then((response) => {
      console.log(response);
      dispatch({type: "LOAD_COMPANIES", payload: response.data});
    }) 
  }
}