function NameList({ names }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Submitted Names</h2>

      {names.length === 0 ? (
        <p>No names submitted.</p>
      ) : (
        <ul>
          {names.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NameList;
