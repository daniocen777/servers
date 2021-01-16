/* Importando funciones del controlador de usuarios */
const userController = require("../controllers/user_controller");

const resolvers = {
  Query: {
    // Usuarios
    getUser: () => {
      console.log("Obteniendo usuario");
      return null;
    },
  },
  /* Mutations */
  Mutation: {
    // function(params, body)
    // User
    register: (_, { input }) => userController.register(input),
    login: (_, { input }) => userController.login(input),
  },
};

module.exports = resolvers;
