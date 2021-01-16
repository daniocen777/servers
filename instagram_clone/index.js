/* Mongoose */
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
/* Apollo server */
const { ApolloServer } = require("apollo-server");
/* Schemas  y resolvers*/
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolvers");

/* Base de datos */
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    /* Configuraciones mongoose */
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  (err, _) => {
    if (err) {
      console.error("Erroo de conexión", err);
    } else {
      console.log("Conexión correcta");
      server();
    }
  }
);

/* Servidor */
function server() {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
  });

  serverApollo.listen().then((response) => {
    console.log("Servidor on", response.url);
  });
}
