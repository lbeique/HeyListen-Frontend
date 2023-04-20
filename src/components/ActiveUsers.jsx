import "./ActiveUsers.css";

export default function ActiveUsers({ users }) {

  return (
    <div className="ActiveUsers">
      <h3>Active Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.sub}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}