//express
import express from "express";
import { useQuery } from "./database/mysql2.js";

//graphql
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import { graphqlHTTP } from "express-graphql";

const app = express();
const port = 3000;

//restful
app.get("/rest/getProducts", async (req, res) => {
  const products = await useQuery("SELECT * FROM product");
  console.log(products);
  res.send(products);
});

//graphal
var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "world";
        },
      },
    },
  }),
});

graphql;
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
