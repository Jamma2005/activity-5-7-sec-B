// ==============================
// CRUD API Server (MySQL + Express)
// ==============================

const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const port = 1234;

// Middleware
app.use(express.json());

// ==============================
// Database connection
// ==============================
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database!");
  }
});

// ==============================
// GET ROUTES
// ==============================

// Get all users
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(result);
  });
});

// Get all products
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(result);
  });
});

// ==============================
// POST ROUTES
// ==============================

// Create user
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: result.insertId,
        name,
        email
      }
    });
  });
});

// Create product
app.post("/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || price == null) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const sql = "INSERT INTO products (name, price) VALUES (?, ?)";
  db.query(sql, [name, price], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    res.status(201).json({
      message: "Product created successfully",
      product: {
        id: result.insertId,
        name,
        price
      }
    });
  });
});

// ==============================
// PUT ROUTES
// ==============================

// Update user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.query(sql, [name, email, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: { id, name, email }
    });
  });
});

// Update product
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (!name || price == null) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const sql = "UPDATE products SET name = ?, price = ? WHERE id = ?";
  db.query(sql, [name, price, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: { id, name, price }
    });
  });
});

// ==============================
// DELETE ROUTES
// ==============================

// Delete user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User deleted successfully",
      userId: id
    });
  });
});

// Delete product
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product deleted successfully",
      productId: id
    });
  });
});

// Delete all products (for school use)
app.delete("/products", (req, res) => {
  const sql = "DELETE FROM products";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    res.json({
      message: "All products deleted successfully",
      affectedRows: result.affectedRows
    });
  });
});

// ==============================
// Start Server
// ==============================
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
