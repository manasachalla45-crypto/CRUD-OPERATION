const UserTable = ({ users, onEdit, onDelete }) => {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      onDelete(id);
    }
  };

  return (
    <table className="table table-bordered table-striped mt-3">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.age}</td>
            <td>
              <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(u)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
