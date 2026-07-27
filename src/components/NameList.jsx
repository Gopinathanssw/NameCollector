function NameList({ names }) {
  return (
    <div>
      <h2>Participants</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Club Name</th>
          </tr>
        </thead>

        <tbody>
          {names.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.club_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NameList;
