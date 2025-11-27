import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userApi";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (data) => {
    await createUser(data);
    loadUsers();
  };

  const handleUpdate = async (data) => {
    await updateUser(editing.id, data);
    setEditing(null);
    loadUsers();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Management</h2>

      <div className="d-flex justify-content-center">
  <div className="card p-4 shadow" style={{ width: "400px" }}>
   <UserForm
  submitLabel="Add User"
  onSubmit={async (formData) => {
    try {
      const res = await createUser(formData);  
      alert(res.data.message);                 
      loadUsers();
    } catch (error) {
      alert(error.response.data.message);      
    }
  }}
/>


  </div>
</div>


      <div className="mt-4">
        <UserTable
          users={users}
          onEdit={(user) => setEditing(user)}
          onDelete={async (id) => {
            await deleteUser(id);
            loadUsers();
          }}
        />
      </div>
    </div>
  );
};

export default UserPage;
