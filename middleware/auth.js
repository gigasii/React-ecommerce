const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   const token = req.get('Authorization');
   if (token == 'null')
   {
      const error = new Error('No token found');
      error.statusCode = 400;
      throw error;
   }
   const decodedToken = jwt.verify(token, process.env.WEB_TOKEN_KEY);
   if (!decodedToken) 
   {
      const error = new Error('Unauthenticated token');
      error.statusCode = 400;
      throw error;
   }
   req.userId = decodedToken.id;
   next();
}