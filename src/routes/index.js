const express = require("express");
const router = express.Router();

// middlewares
// const { uploadImage } = require("../middlewares/upploadImage");
const { auth: authentication } = require("../middlewares/auth");
const checkAdmin = require("../middlewares/checkAdmin");
const { uploadImage } = require("../middlewares/uploadCloudinary");

// auth controllers
const { login, register } = require("../controllers/auth");

// users controllers
const {
  getUsers,
  deleteUser,
  getProfile,
  editProfile,
} = require("../controllers/users");

// products controllers
const {
  getProducts,
  getDetailProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/products");

// transactions controllers
const {
  getTransactions,
  getDetailTransaction,
  addTransactions,
  editTransaction,
  deleteTransaction,
  getMyTransaction,
} = require("../controllers/transactions");

// auth router
router.post("/login", login);
router.post("/register", register);

// users router
router.get("/users", authentication, checkAdmin, getUsers);
router.delete("/user/:id", authentication, checkAdmin, deleteUser);
router.patch("/user", authentication, editProfile);
router.get("/user/my-profile", authentication, getProfile);

// products router
router.get("/products", getProducts);
router.get("/product/:productId", getDetailProduct);
router.post("/product", authentication, checkAdmin, uploadImage, addProduct);
router.patch("/product/:productId", authentication, checkAdmin, editProduct);
router.delete("/product/:productId", authentication, checkAdmin, deleteProduct);

// transactions router
router.get("/transactions", authentication, checkAdmin, getTransactions);
router.get(
  "/transaction/:transactionId",
  authentication,
  checkAdmin,
  getDetailTransaction
);
router.post("/transaction/", authentication, uploadImage, addTransactions);
router.patch("/transaction/:transactionId", authentication, editTransaction);
router.delete(
  "/transaction/:transactionId",
  authentication,
  checkAdmin,
  deleteTransaction
);
router.get("/my-transactions", authentication, getMyTransaction);

module.exports = router;
