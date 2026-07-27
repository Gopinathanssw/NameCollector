function NameList({ names }) {
  return (
    <div className="list-card">
      <h2 className="list-title">Participants</h2>

      {names.length === 0 ? (
        <p className="empty-state">No participants yet</p>
      ) : (
        <div className="table-wrapper">
          <table className="name-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Club name</th>
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
      )}
    </div>
  );
}

export default NameList;
