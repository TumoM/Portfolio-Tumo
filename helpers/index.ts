import axios from "axios";
import useSWR from 'swr'

const myFetcher = (url:string) => {
  return axios.get(url).then(res=>res.data)
}

export const useGetPosts = (url = "/api/v1/posts") => {
 const { data, error, ...rest } = useSWR(url,myFetcher);
  return {data, error, loading: !data && !error, ...rest}
}

export const useGetPostById = (id) => {
 const { data, error, ...rest } = useSWR(id ? `/api/v1/posts/${id}` : null,myFetcher);
  // Loading if there is no data and no error
  return {data, error, loading: !data && !error, ...rest}
}