import { HttpServer } from '@open-draft/test-server/http'
import { setupServer } from "msw/node";
import { HttpResponse, graphql } from 'msw';
import { getUser } from "./api";

// const handlers = [
//   graphql.query('getUser', ({operationName, query, variables}) => {
//     const { id } = variables;

//     console.log(operationName, query, variables);

//     type User = {
//       id: string;
//       name: string;
//       email: string;
//     };
    
//     const users: User[] = [
//       {
//         id: '1',
//         name: 'alice',
//         email: 'alice@example.com',
//       },
//       {
//         id: '2',
//         name: 'bob',
//         email: 'bob@example.com',
//       },
//     ];

//     const user = users.find((user) => user.id === id);

//     if (!user) {
//       throw new Error("User not found.");
//     }

//     return HttpResponse.json({
//       data: {
//         user: {
//           id,
//           name: 'alice',
//           email: 'alice@example.com',
//         },
//       },
//     });
//   }),
// ];

// const server = setupServer(...handlers)

// beforeAll(() => {
//   server.listen()
// });

// afterEach(() => {
//   server.resetHandlers()
// });

// afterAll(() => {
//   server.close()
// });

test('fetches data as expected', async () => {
  // const http = new HttpServer({ serverUrl: server.url() });
  const resp = await getUser('abc');
  expect(resp).toEqual({ someField: 'someValue' });
});

// type GraphQLRequestHandler = <
//   Query extends GraphQLQuery = GraphQLQuery,
//   Variables extends GraphQLVariables = GraphQLVariables
// >(
//   operationName: GraphQLHandlerNameSelector | DocumentNode | TypedDocumentNode<Query, Variables>,
//   resolver: GraphQLResponseResolver<Query, Variables>, 
//   options?: RequestHandlerOptions
// ) => GraphQLHandler;
