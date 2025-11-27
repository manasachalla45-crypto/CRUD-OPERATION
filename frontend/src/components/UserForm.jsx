import { useState, useEffect } from "react";

const UserForm = ({ fields, submitLabel, onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState({});

  
  useEffect(() => {
    if (initialData) setForm(initialData);
    else {
      const initialState = {};
      fields.forEach(f => (initialState[f.name] = ""));
      setForm(initialState);
    }
  }, [initialData, fields]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const validateForm = () => {
    for (let field of fields) {
      const value = form[field.name]?.trim();

    
      if (field.required && !value) {
        alert(`${field.label} is required`);
        return false;
      }

    
      if (field.type === "number" && value && isNaN(Number(value))) {
        alert(`${field.label} must be a number`);
        return false;
      }

      
      if (field.pattern && value && !field.pattern.test(value)) {
        alert(field.errorMsg || `${field.label} is invalid`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(form);

    
    if (!initialData) {
      const resetState = {};
      fields.forEach(f => (resetState[f.name] = ""));
      setForm(resetState);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else {
      const resetState = {};
      fields.forEach(f => (resetState[f.name] = ""));
      setForm(resetState);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <div className="mb-3" key={field.name}>
          <label className="form-label">{field.label}</label>
          <input
            name={field.name}
            type="text" 
            className="form-control"
            value={form[field.name]}
            onChange={handleChange}
          />
        </div>
      ))}

      <div className="d-flex gap-2">
        <button className="btn btn-primary w-100" type="submit">{submitLabel}</button>
        {initialData && (
          <button type="button" className="btn btn-secondary w-100" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;

