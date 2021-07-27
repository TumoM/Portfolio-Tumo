import axios from "axios";
import useSWR from 'swr'

const myFetcher = (url:string) => {
  return axios.get(url).then(res=>res.data)
}
