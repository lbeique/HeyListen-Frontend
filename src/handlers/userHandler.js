export async function registerUserInDb(user) {

  const { Id, CognitoUsername } = user;
  const newUser = { sub: Id, username: CognitoUsername };

  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error('Failed to register user in the database');
  }

  return response.json();
}