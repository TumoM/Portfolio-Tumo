import axios from "axios";
import { useEffect, useState } from "react";

interface ReturnGetData {
  data?: any;
  error?: any;
  loading: boolean
}
export const useGetData = (url:string):ReturnGetData => {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    // Fetches post on ComponentDidMount
    useEffect(() => {
  
      url && (async () => {
        try {
          const axiosRes = await axios.get(url)
          console.log("Status:",axiosRes?.status);

          if (axiosRes?.status !== 200){
              debugger
              let result:any = axiosRes
              setError(result)
          } 
          else {
            let result = axiosRes.data
            setData(result)
          }  
          setLoading(false)  
        }
        catch(e) {
          // debugger
          try{
            setError(e.toJSON())
          }
          catch(e2) {
            debugger
            setError(e)
          }
          setLoading(false)  
          
        }
      })()
    },[url])
    return {data, error, loading}
  }