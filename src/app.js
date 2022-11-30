const express = require('express');
const routes = require('./routes');
const { tokenGenerator } = require('./auth/generateToken');
const { UserService } = require('./services');
const validateDisplayName = require('./auth/validateBody/validateDisplayName');
const validateEmail = require('./auth/validateBody/validateEmail');
const validatePassword = require('./auth/validateBody/validatePassword');
const validateJWT = require('./auth/validateJWT');

// ...

const app = express();

app.use(express.json());

const apiRoutes = express.Router();

apiRoutes.get('/user', validateJWT, routes.getUser);

apiRoutes.get('/user/:id', validateJWT, routes.getUserbyId);

apiRoutes.post('/login', routes.login);
app.post('/user', 
  validateDisplayName,
  validateEmail,
  validatePassword,
  async (req, res) => {
    const { displayName, email, password, image } = req.body;
    console.log(email);
    const user = await UserService.getByEmail(email);
    console.log(user);
    if (!user) {
      await UserService.createUser(displayName, email, password, image);
      const data = { displayName, email, image };
      const token = await tokenGenerator(data);
  
      return res.status(201).json({ token }); 
    }

    return res.status(409).json({ message: 'User already registered' });
});

app.use(apiRoutes);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
