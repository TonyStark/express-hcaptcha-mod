const hcaptcha = require('hcaptcha');

// validate takes an hCaptcha secret and returns
// an express middleware function
const validate = (secret) => (req, res, next) => {
  // get token from the body
  const token = req.body['h-captcha-response'];

  // call next with an error if no token present
  if (!token) {
    return res.status(400).json({ success: false, message: 'No token response' });
  }
  
  // console.log(token)
  // verify the hcaptcha and continue on success
  // call next with an error if verification errors or fails
  return hcaptcha.verify(secret, token)
    .then((data) => {
      req.hcaptcha = data;
      if(req.hcaptcha.success===true){
        req.hcaptcha.message="hCaptcha verified"
      }else{
        req.hcaptcha.message="hCaptcha not verified"
      }
      next()
    })
    .catch(next);
};

module.exports.middleware = {
  validate,
};
