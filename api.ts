/**
 * ApolloClient を使って GraphQL サーバーにリクエストを送るためのテストコード
 * フロントエンドではなく AWS Lambda などの上で動かす想定。現時点でうまいこと動かないが原因はまだ不明
 */
import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client/core";
// import fetch from "node-fetch";

const getEndpoint = () => {
  // TODO: 環境変数か何かでテスト用、開発用、本番用のエンドポイントを切り替えるようにする
  return 'http://localhost:4000/graphql';
};  

// ApolloClient の必須パラメータらしいが、あんまり用途がわかってない
const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  // HttpLink を使うなら uri のパラメータは不要
  // サーバーサイドで ApolloClient を使う場合に HttpLink を使います的な記事を複数見つけているがどうしてそうなのかがわかってない
  uri: getEndpoint(),
  // link: new HttpLink({
  //   uri: getEndpoint(),
  //   // node-fetch の fetch は型のミスマッチでエラーになる。ts か ts-node と噛み合いが悪そう
  //   // https://zenn.dev/tatsuyasusukida/articles/poor-compatibility-between-ts-node-and-node-fetch
  //   // node-fetch v2 入れても改善しなくて謎
  //   fetch,
  // }),
});

const getUserQuery = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

// Use case function
export async function getUser(id: string) {
  return client.query({
    query: getUserQuery,
    variables: { id },
  });
}
