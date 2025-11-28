import { useState, useEffect } from "react";
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

  const handleSubmit = async (formData) => {
    try {
      if (editing) {
        await updateUser(editing.id, formData);
        setEditing(null);
      } else {
        await createUser(formData);
      }
      loadUsers();
    } catch (error) {
      alert(error.response?.data?.message || "Error occurred");
    }
  };

  
  const fields = [
    { name: "name", label: "Name", type: "text", pattern: /^[A-Za-z ]+$/, errorMsg: "Name should contain only letters" },
    { name: "email", label: "Email", type: "email", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorMsg: "Enter a valid email" },
    { name: "age", label: "Age", type: "number", pattern: /^\d+$/, errorMsg: "Age must be a number" }
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Management</h2>

      <div className="d-flex justify-content-center">
        <div className="card p-4 shadow" style={{ width: "400px" }}>
          <UserForm
            fields={fields}
            submitLabel={editing ? "Update User" : "Add User"}
            initialData={editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
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

