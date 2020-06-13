import Axios from "axios"

const BASE_URL = "https://finnhub.io/api/v1";
const API_KEY = "";

export function loadCompanies() {
  const SYMBOLS_URL = `${BASE_URL}/stock/symbol`;
  return (dispatch) => {
    Axios.get(SYMBOLS_URL, {
      params: {
        exchange: "US", 
        token: API_KEY
      }
    }).then((response) => {
      console.log("get symbols data!!!");
      dispatch({type: "LOAD_COMPANIES", payload: response.data.slice(0, 20)});
    }) 
  }
}

export function setCompany(symbol) {
  return (dispatch) => {
    dispatch({type: "SET_COMPANY", payload: symbol});
  }
}