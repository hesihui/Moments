import jwt from 'jsonwebtoken';

// authority control: click like button => auth middleware (next) => like control
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
       // google auth, token.length > 500
        const isCustomAuth = token.length < 500;
        let decodedData;
        // if we have token and the user is registered via our service
        if (token && isCustomAuth) {
            // verify the decoded jwt token
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        } else {
            // decoding google auth
            decodedData = jwt.decode(token);
            // sub is google version id
            req.serId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;