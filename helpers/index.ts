import axios from "axios";
import useSWR from 'swr'
import {useState} from "react";
import {createWork} from "./works";

export const myFetcher = (url:string) => {
  return axios.get(url).then(res=>res.data).catch(e=>Promise.reject(e))
  // fetch(url).then(async res => {
  //   const result = await res.json();
  //
  //   if (res.status !== 200) {
  //     return Promise.reject(result);
  //   } else {
  //     return result.json;
  //   }
  // });
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
      return json.data
    } catch (e) {

      const message = (e.response && e.response.data.message) || (e.response && e.response.data) || 'Oooops,something went wrong'
      setRequestState({error: message, data: null, loading: false})
      return Promise.reject(message)
    }
  }

  return [handler, {...requestState}]
}
