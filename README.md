# express-hcaptcha-mod

Source:https://github.com/vastus/express-hcaptcha
Since that repo is old, and need some changes so i have added some improvement

### Validate your hCaptcha token using a expressjs middleware
First register/login on https://www.hcaptcha.com/ and create ```site-key``` and ```secret-key```

## Usage

```
npm i express-hcaptcha-mod
```
or
```
pnpm add express-hcaptcha-mod
```
Live Example >> https://github.com/TonyStark/express-hcaptcha-example

```js
const cors = require('cors'); //npm i cors
const express = require('express'); //npm i express
const hCaptcha = require('express-hcaptcha-mod');

// your hcaptcha secret key
const SECRET = process.env.HCAPTCHA_SECRET_KEY;
const PORT = process.env.PORT || 5500;

const app = express();
app.set('view engine', 'ejs'); //npm i ejs
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
// render index page
app.get('/', (req, res) => {
    res.render('index');
});
// validate the token and proceed to the route when token is valid
// the middleware also sets the req.hcaptcha to what ever the verify call returns
app.post('/verify', hCaptcha.middleware.validate(SECRET), (req, res) => {
    console.log(req.hcaptcha)
    res.json(req.hcaptcha);
});

app.listen(PORT, () => {
  console.log(`listening on http://0.0.0.0:${PORT}`);
});
```

