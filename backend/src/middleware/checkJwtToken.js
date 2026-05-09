const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwtToken = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-euxwfhw80ges67ji.au.auth0.com/.well-known/jwks.json`,
    }),
    audience: "https://dev-euxwfhw80ges67ji.au.auth0.com/api/v2/",
    issuer: `https://dev-euxwfhw80ges67ji.au.auth0.com/`,
    algorithms: ["RS256"],
});

module.exports = checkJwtToken;
