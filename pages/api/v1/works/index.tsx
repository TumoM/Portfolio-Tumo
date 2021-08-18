import WorkApi from 'lib/api/works';
import { getAccessToken } from '@auth0/nextjs-auth0';
import axios from 'axios';

export default async function createWork(req, res) {
    console.log("In createWork");
    try {
        const { accessToken } = await getAccessToken(req, res);
        const jsonData = await new WorkApi(accessToken).create(req.body);
        return res.json(jsonData.data);
    } catch (e) {
        console.log("ERROR in createProfile api/v1\n",e)
        return res.status(e.status ||e.statusCode || 422).json(e.response.data);
    }
}
