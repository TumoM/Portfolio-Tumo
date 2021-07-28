import axios from "axios";
import useSWR from 'swr'
import {useState} from "react";
import {createPortfolio} from "./portfolios";

export const myFetcher = (url:string) => {
  return axios.get(url).then(res=>res.data)
}

export function useApiHandler(apiCallback) {
  const [requestState, setRequestState] = useState({
    error:null,
    data:null,
    loading:false
  });

  const handler = async (...data) => {
    setRequestState({error: null, data: null, loading: true})
    try {
      const json = await apiCallback(...data);
      setRequestState({error: null, data: json.data, loading: false})
    } catch (e) {

      const message = (e.response && e.response.data.message) || (e.response && e.response.data) || 'Oooops,something went wrong'
      setRequestState({error: message, data: null, loading: false})

    }
  }

  return [handler, {...requestState}]
}
