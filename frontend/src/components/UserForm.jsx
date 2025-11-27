import { useState, useEffect } from "react";

const UserForm = ({ submitLabel, onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState({ name: "", email: "", age: "" });

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({ name: "", email: "", age: "" });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, age } = form;
    if (!name || !email || !age) {
      alert("All fields are required");
      return false;
    }
    if (!/^[A-Za-z ]+$/.test(name)) {
      alert("Name should contain only alphabets");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Enter a valid email");
      return false;
    }
    if (!/^\d+$/.test(age)) {
      alert("Age must be a number (only digits allowed)");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit(form);

    if (!initialData) {
      setForm({ name: "", email: "", age: "" });
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else setForm({ name: "", email: "", age: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          name="name"
          className="form-control"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          name="email"
          className="form-control"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Age</label>
        <input
          name="age"
          className="form-control"
          value={form.age}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary w-100" type="submit">{submitLabel}</button>
        {initialData && (
          <button type="button" className="btn btn-secondary w-100" onClick={handleCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
