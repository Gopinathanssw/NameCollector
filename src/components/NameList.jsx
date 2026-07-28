function NameList({ names }) {
  const willingCount = names.filter(
    (user) => user.willing_to_come === "yes",
  ).length;
  const notWillingCount = names.filter(
    (user) => user.willing_to_come === "no",
  ).length;

  return (
    <div className="list-card">
      <div className="list-header">
        <h2 className="list-title">Participants</h2>
        <div className="count-badges">
          <span className="participant-count count-yes">
            {willingCount} attending
          </span>
          <span className="participant-count count-no">
            {notWillingCount} not attending
          </span>
        </div>
      </div>

      {names.length === 0 ? (
        <p className="empty-state">No participants yet</p>
      ) : (
        <div className="table-wrapper">
          <table className="name-table">
            <thead>
              <tr>
                <th className="col-num">#</th>
                <th>Name</th>
                <th>Club name</th>
                <th>Willing to come</th>
                <th>Staying</th>
              </tr>
            </thead>
            <tbody>
              {names.map((user, index) => (
                <tr key={user.id}>
                  <td className="col-num">{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.club_name}</td>
                  <td>
                    <span
                      className={
                        user.willing_to_come === "yes"
                          ? "badge badge-yes"
                          : "badge badge-no"
                      }
                    >
                      {user.willing_to_come === "yes" ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        user.staying === "yes"
                          ? "badge badge-yes"
                          : "badge badge-no"
                      }
                    >
                      {user.staying === "yes" ? "Yes" : "No"}
                    </span>
                  </td>
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
