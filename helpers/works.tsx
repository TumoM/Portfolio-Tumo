import axios from 'axios';
import { useApiHandler } from 'helpers'
import useSWR from 'swr';
import { myFetcher } from "helpers"

export interface IWork {
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

export function createWork(data:IWork) {
  try {
    const res = axios.post('/api/v1/works', data);
    console.log("Made createWork Post call");
    console.log("RES:", res);
    return res
  } catch (err) {
    console.log("Error creating profile", err);
    
    return err;
  }
}

export function updateWork(id:string|number,data:IWork) {
  const res = axios.patch(`/api/v1/works/${id}`, data);
  console.log("Made updateWork Patch call");
  return res
}

export function deleteWork(id:string|number) {
  const res = axios.delete(`/api/v1/works/${id}`);
  console.log("Made deleteWork Delete call");
  return res
}

export function useCreateWork() {
  return useApiHandler(createWork);
}

export function useUpdateWork() {
  return useApiHandler(updateWork);
}
export function useDeleteWork() {
  return useApiHandler(deleteWork);
}

export const useGetWork = (id) => {
  const { data, error, ...rest}  = useSWR(id ? `/api/v1/works/${id}`: null, myFetcher)
  return { data, error, loading: !data && !error, ...rest}
}
