import PortfolioApi from 'lib/api/portfolios';
import { getAccessToken } from '@auth0/nextjs-auth0';
import axios from 'axios';

export default async function createPortfolio(req, res) {
    console.log("In createPortfolio");
    try {
        const { accessToken } = await getAccessToken(req, res);
        const jsonData = await new PortfolioApi(accessToken).create(req.body);
        return res.json(jsonData.data);
    } catch (e) {
        console.log("ERROR in createPortfolio api/v1\n",e)
        return res.status(e.status ||e.statusCode || 422).json(e.response.data);
    }
}
