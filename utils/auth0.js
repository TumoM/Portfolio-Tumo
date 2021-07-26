import { initAuth0 } from '@auth0/nextjs-auth0';

export const isAuthorized = (user, role) => {
    const namespace = process.env.AUTH0_NAMESPACE || 'https://porfolio-tumo.com'
    return (user && user[namespace + '/roles'].includes(role));
}

// export default initAuth0({
//     AUTH0_SECRET:process.env.AUTH0_SECRET,
//     AUTH0_BASE_URL:process.env.AUTH0_BASE_URL,
//     AUTH0_ISSUER_BASE_URL:process.env.AUTH0_ISSUER_BASE_URL,
//     AUTH0_CLIENT_ID:process.env.AUTH0_CLIENT_ID,
//     AUTH0_CLIENT_SECRET:process.env.AUTH0_CLIENT_SECRET
// })