import Axios from "axios"

const BASE_URL = "https://finnhub.io/api/v1";
const API_KEY = "";

export function loadUsEx() {
  const SYMBOLS_URL = `${BASE_URL}/stock/symbol`;
  return (dispatch) => {
    Axios.get(SYMBOLS_URL, {
      params: {
        exchange: "US", 
        token: API_KEY
      }
    }).then((response) => {
      console.log("get US symbols data!!!");
      dispatch({type: "LOAD_US_EX", payload: response.data.slice(0, 20)});
    }) 
  }
}

export function loadIndices() {
  const SYMBOLS_URL = `${BASE_URL}/stock/symbol`;
  return (dispatch) => {
    Axios.get(SYMBOLS_URL, {
      params: {
        exchange: "indices", 
        token: API_KEY
      }
    }).then((response) => {
      console.log("get US symbols data!!!");
      dispatch({type: "LOAD_INDICES", payload: response.data});
    }) 
  }
}

export function setCompany(symbol) {
  return (dispatch) => {
    dispatch({type: "SET_COMPANY", payload: symbol});
  }
}