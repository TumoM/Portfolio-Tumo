import axios from "axios";
import { useEffect, useState } from "react";

interface ReturnGetPosts {
  posts?: object[];
  error?: any;
  loading: boolean
}
export const useGetPosts = ():ReturnGetPosts => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    // Fetches post on ComponentDidMount
    useEffect(() => {
  
      (async () => {
        try {
          const axiosRes = await axios.get('/api/v1/posts')
          console.log("Status:",axiosRes?.status);

          if (axiosRes?.status !== 200){
              debugger
              let result:any = axiosRes
              setError(result)
          } 
          else {
            let result = axiosRes.data
            setPosts(result)
          }  
          setLoading(false)  
        }
        catch(e) {
          setError(e.toJSON())
          setLoading(false)  
          console.log(e.toJSON());
          
        }
      })()
    },[])
    return {posts, error, loading}
  }