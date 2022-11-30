require('dotenv/config');
const { tokenGenerator } = require('../auth/generateToken');
const { UserService } = require('../services');

const isBodyValid = (email, password) => email && password;

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!isBodyValid(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    
    const user = await UserService.getByEmail(email);

    if (!user || user.dataValues.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' }); 
    }

    const data = { 
      data: { 
        userId: user.id, 
      } };

    const token = tokenGenerator(data);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};