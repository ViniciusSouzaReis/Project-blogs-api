function validateEmail(req, res, next) {
  const { email } = req.body;
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const validation = regex.test(email);

  if (validation === false) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  return next();
}

module.exports = validateEmail;