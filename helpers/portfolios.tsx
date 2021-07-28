import axios from 'axios';
import { useApiHandler } from 'helpers'
import useSWR from 'swr';
import { myFetcher } from "helpers"

export interface IPortfolio {
  title: string,
  company: string,
  companyWebsite: string,
  location: string,
  jobTitle: string,
  description: string,
  startDate:  Date,
  endDate?: Date
}

export function createPortfolio(data:IPortfolio) {
  const res = axios.post('/api/v1/portfolios', data);
  console.log("Made call");
  return res
}

export function useCreatePortfolio() {
  return useApiHandler(createPortfolio);
}

export const useGetPortfolio = (id) => {
  const { data, error, ...rest}  = useSWR(id ? `/api/v1/portfolios/${id}`: null, myFetcher)
  return { data, error, loading: !data && !error, ...rest}
}
