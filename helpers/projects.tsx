import axios from 'axios';
import { useApiHandler } from 'helpers'
import useSWR from 'swr';
import { myFetcher } from "helpers"

export interface IProject {
  title: string,
  thumbnail: string,
  description: string,
  projectLink: string,
  tags: string,
  images: any,
  startDate:  Date|string,
  endDate?: Date|string,
  disableEndDate?: boolean
}

export function createProject(data:IProject) {
  try {
    const res = axios.post('/api/v1/projects', data);
    console.log("Made createProject Post call");
    console.log("RES:", res);
    return res
  } catch (err) {
    console.log("Error creating project", err);
    
    return err;
  }
}

export function updateProject(id:string|number,data:IProject) {
  const res = axios.patch(`/api/v1/projects/${id}`, data);
  console.log("Made updateProject Patch call");
  return res
}

export function deleteProject(id:string|number) {
  const res = axios.delete(`/api/v1/projects/${id}`);
  console.log("Made deleteProject Delete call");
  return res
}

export function useCreateProject() {
  return useApiHandler(createProject);
}

export function useUpdateProject() {
  return useApiHandler(updateProject);
}
export function useDeleteProject() {
  return useApiHandler(deleteProject);
}

export const useGetProject = (id) => {
  const { data, error, ...rest}  = useSWR(id ? `/api/v1/projects/${id}`: null, myFetcher)
  return { data, error, loading: !data && !error, ...rest}
}
