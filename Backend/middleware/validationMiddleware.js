function validateRegister(req, res, next) {
  const { username } = req.body;
  if (!username)
    return res.status(400).send({ message: "Username is required" });
  return validateLogin(req, res, next);
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  if (!email) return res.status(400).send({ message: "Email is required" });

  if (!password)
    return res.status(400).send({ message: "Password is required" });
  next();
}

module.exports = { validateRegister, validateLogin };
