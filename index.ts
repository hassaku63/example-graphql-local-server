const getUserQuery = `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
    }
  }
`;

// Use case function
export async function getUser(id: string) {
  return fetch('http://localhost:4000/graphql', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getUserQuery,
        variables: { id },
      }),
    }
  );
}

// test run
getUser('1')
  .then((res) => {
    return res.json();
  }).then((data) => {
    console.log(data);
  }).catch((err) => {
    console.error(err);
  });
