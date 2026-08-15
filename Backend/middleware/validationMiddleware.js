function validateRegister(req, res, next) {
  const { username } = req.body;
  if (!username)
    return res.status(400).send({ message: "Username is required" });
  return validateLogin(req, res, next);
}

function validateLogin(req, res, next) {
  const { email } = req.body;
  if (!email) return res.status(400).send({ message: "Email is required" });

  validatePassword(req, res, next);
}

function validatePassword(req, res, next) {
  const { password, newPassword } = req.body;
  const pwd = password || newPassword;
  if (!pwd) return res.status(400).send({ message: "Password is required" });

  const isValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/.test(pwd);
  if (!isValid) {
    return res
      .status(400)
      .send({ message: "Password does not meet requirements" });
  }
  next();
}

module.exports = { validateRegister, validateLogin, validatePassword };
