function validateRegister(req, res, next) {
  const { username, email, password } = req.body;
  if (!username)
    return res.status(400).send({ message: "Username is required" });

  if (!email) return res.status(400).send({ message: "Email is required" });

  if (!password)
    return res.status(400).send({ message: "Password is required" });
  next();
}

module.exports = { validateRegister };
