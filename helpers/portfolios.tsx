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
  startDate:  Date|string,
  endDate?: Date|string,
  disableEndDate?: boolean
}

export function createPortfolio(data:IPortfolio) {
  const res = axios.post('/api/v1/portfolios', data);
  console.log("Made createPortfolio Post call");
  return res
}

export function updatePortfolio(id:string|number,data:IPortfolio) {
  const res = axios.patch(`/api/v1/portfolios/${id}`, data);
  console.log("Made updatePortfolio Patch call");
  return res
}

export function useCreatePortfolio() {
  return useApiHandler(createPortfolio);
}

export function useUpdatePortfolio() {
  return useApiHandler(updatePortfolio);
}

export const useGetPortfolio = (id) => {
  const { data, error, ...rest}  = useSWR(id ? `/api/v1/portfolios/${id}`: null, myFetcher)
  return { data, error, loading: !data && !error, ...rest}
}
