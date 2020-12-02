const express = require("express");
const router = express.Router();

// users controllers
const {
  login,
  register,
  getUsers,
  deleteUser,
} = require("../controllers/users");

// products controllers
const {
  getProducts,
  getDetailProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/products");

// transactions router
const {
  getTransactions,
  getDetailTransaction,
  addTransactions,
  editTransaction,
  deleteTransaction,
  getMyTransaction,
} = require("../controllers/transactions");

// users router
router.post("/login", login);
router.post("/register", register);
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

// products router
router.get("/products", getProducts);
router.get("/product/:productId", getDetailProduct);
router.post("/product", addProduct);
router.patch("/product/:productId", editProduct);
router.delete("/product/:productId", deleteProduct);

// transactions router
router.get("/transactions", getTransactions);
router.get("transaction/:transactionId", getDetailTransaction);
router.post("/transaction/", addTransactions);
router.patch("/transaction/:transactionId", editTransaction);
router.delete("/transaction/:transactionId", deleteTransaction);
router.get("/my-transactions", getMyTransaction);

module.exports = router;
