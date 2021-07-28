import PortfolioApi from "lib/api/portfolios";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handlePortfolio(req:NextApiRequest, res:NextApiResponse ){

    const json = await new PortfolioApi().getById(req.query.id)
    return res.status(200).json(json.data);
}
