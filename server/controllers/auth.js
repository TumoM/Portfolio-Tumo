var jwt = require('express-jwt');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
    jwksUri: 'https://sandrino.auth0.com/.well-known/jwks.json',
    requestHeaders: {}, // Optional
    timeout: 30000 // Defaults to 30s
  });

// Authentication Middleware
// Will check access token in authorization headers
// of a request
exports.checkJWT = jwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-ie44sg37.eu.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'https://dev-ie44sg37.eu.auth0.com/api/v2/',
    issuer: 'https://dev-ie44sg37.eu.auth0.com/',
    algorithms: [ 'RS256' ]
})