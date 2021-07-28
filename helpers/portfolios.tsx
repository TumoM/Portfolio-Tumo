import axios from 'axios';
import { useApiHandler } from 'helpers'

interface IPortfolio {
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
