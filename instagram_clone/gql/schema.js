const { gql } = require("apollo-server");
/* Definiciones */
const typeDefs = gql`
  type User {
    id: ID
    name: String
    username: String
    email: String
    website: String
    description: String
    password: String
    avatar: String
    createAt: String
  }

  type Token {
    token: String
  }

  # Objetos
  input UserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    # Obteniendo usuario
    getUser: User
  }

  # Mutation => Para crear, editar o eliminar
  type Mutation {
    # User | input => Objeto
    register(input: UserInput): User
    login(input: LoginInput): Token
  }
`;

/* Crear el resolver */

module.exports = typeDefs;
