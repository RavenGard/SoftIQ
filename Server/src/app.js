const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const graphQlSchema = require("./schema/index");
const graphQlResolvers = require("./resolvers/index");

const app = express();

// helps read json files
app.use(bodyParser.json());

// middleware with endpoint
app.use(
  "/softiq",
  graphqlHTTP({
    // schema property points to graphql schema
    schema: graphQlSchema,
    rootValue: graphQlResolvers, // points to javascript object with all resolver functions in it
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.3k84oek.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
