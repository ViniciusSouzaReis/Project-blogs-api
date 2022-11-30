const { UserService } = require('../../models');

async function validateUser(req, res, next) {
  const { email } = req.body;

  const user = await UserService.getByEmail(email);

  if (user) {
    return res.status(400).json({ message: 'User already registered' }); 
  }

  return next();
}

module.exports = validateUser;
