const User = require("../models/user");
const bcryptjs = require("bcryptjs");
// Utils
const util = require("../utils/utils");

async function register(input) {
  const newUser = input;
  console.log(input);
  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();
  const { email, username, password } = newUser;
  // Si el correo está en uso
  const foundEmail = await User.findOne({ email });
  if (foundEmail) throw new Error("Correo está en uso");
  // Si el username está en uso
  const foundUsername = await User.findOne({ username });
  if (foundUsername) throw new Error("El usuario está en uso");
  // Encriptar password
  const salt = await bcryptjs.genSaltSync(10);
  newUser.password = await bcryptjs.hash(password, salt);
  try {
    const user = new User(newUser);
    user.save();
    return user;
  } catch (error) {
    console.error("ERROR =>", error);
  }
}

async function login(input) {
  const { email, password } = input;
  // Si usuario existe
  const userFound = await User.findOne({ email: email.toLowerCase() });
  if (!userFound) throw new Error("Error, correo o contraseña no incorreectos");
  const passwordSuccess = await bcryptjs.compare(password, userFound.password);
  if (!passwordSuccess)
    throw new Error("Error, correo o contraseña no incorreectos");
  return {
    token: util.createToken(userFound, process.env.SECRET_KEY, "6h"),
  };
}

module.exports = { register, login };
