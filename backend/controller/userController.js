  const db = require("../db");


  exports.getUsers = (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  };


  exports.createUser = (req, res) => {
  const { name, email, age } = req.body;
  const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
  
  db.query(sql, [name, email, age], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Email already exists" });
      }
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "User added" });
  });
};


  exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    db.query(
      "UPDATE users SET name=?, email=?, age=? WHERE id=?",
      [name, email, age, id],
      (err) => {
        if (err) throw err;
        res.json({ message: "User updated" });
      }
    );
  };


  exports.deleteUser = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM users WHERE id=?", [id], (err) => {
      if (err) throw err;
      res.json({ message: "User deleted" });
    });
  };