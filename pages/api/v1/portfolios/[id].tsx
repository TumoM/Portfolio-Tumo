import PortfolioApi from "lib/api/portfolios";
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAccessToken } from '@auth0/nextjs-auth0';

export default async function handlePortfolio(req:NextApiRequest, res:NextApiResponse ){
    if (req.method == "GET"){
        const json = await new PortfolioApi().getById(req.query.id)
        return res.status(200).json(json.data);
    }
    else if (req.method === 'PATCH') {
        const { accessToken } = await getAccessToken(req, res);
        try{
            const json = await new PortfolioApi(accessToken).update(req.query.id,req.body)
            return res.status(200).json(json.data);
        }
        catch (e) {
            return res.status(e.status ||e.statusCode || 422).json(e.response.data||"Oooops, error updating resource");
        }
    }
    else if (req.method === 'DELETE') {
        const { accessToken } = await getAccessToken(req, res);
        try{
            const json = await new PortfolioApi(accessToken).delete(req.query.id)
            return res.status(200).json(json.data);
        }
        catch (e) {
            return res.status(e.status ||e.statusCode || 422).json(e.response.data||"Oooops, error updating resource");
        }
    }
}

