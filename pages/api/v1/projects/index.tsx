import ProjectApi from 'lib/api/projects';
import { getAccessToken } from '@auth0/nextjs-auth0';
import axios from 'axios';

export default async function createProject(req, res) {
    console.log("In createProject");
    try {
        const { accessToken } = await getAccessToken(req, res);
        const jsonData = await new ProjectApi(accessToken).create(req.body);
        return res.json(jsonData.data);
    } catch (e) {
        console.log("ERROR in createProject api/v1\n",e)
        return res.status(e.status ||e.statusCode || 422).json(e.response.data);
    }
}
