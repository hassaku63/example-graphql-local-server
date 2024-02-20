import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import fs from 'fs';

// read string from ./schema.graphql
const typeDefs = fs.readFileSync('./schema.graphql', 'utf-8');

type User = {
  id: string;
  name: string;
  email: string;
};

const users: User[] = [
  {
    id: '1',
    name: 'alice',
    email: 'alice@example.com',
  },
  {
    id: '2',
    name: 'bob',
    email: 'bob@example.com',
  },
];

const resolvers = {
  Query: {
    getUser: (parent: any, vars: {id: string}) => {
      console.log('query getUser: args:', vars);
      const user = users.find((user) => user.id === vars.id);
      console.log('query getUser: user:', user);
      if (!user) {
        //　memo: null レスポンスでハンドリングしていいのかどうか、ちょっと自信はない
        return null;
      }
      return user;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
