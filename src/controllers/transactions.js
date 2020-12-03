// import model
const {
  Transaction,
  User,
  Product,
  TransactionProduct,
} = require("../../models");
// import some shortcut
const {
  responseSuccess,
  handleError,
  handleNotFound,
} = require("./handleShortcut");

// @desc Fetch All Transactions
// @route GET api/v1/transactions
// @access Admin
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: Product,
          as: "products",
          attributes: {
            exclude: ["createdAt", "updatedAt", "stock"],
          },
          through: {
            attributes: [["orderQuantity", "qty"]],
            as: "orderQuantity",
          },
        },
      ],
    });
    if (transactions.length === 0) {
      return handleNotFound(res, "Transaction is Empty");
    }
    res.send({
      status: responseSuccess,
      message: "successfully get transactions",
      data: {
        transactions,
      },
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// @desc Get Details Transaction
// @route GET api/v1/transaction/:transactionId
// @access Admin & User who have this transaction
exports.getDetailTransaction = async (req, res) => {
  try {
    const { transactionId: id } = req.params;
    const transaction = await Transaction.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: Product,
          as: "products",
          attributes: {
            exclude: ["createdAt", "updatedAt", "stock"],
          },
          through: {
            attributes: [["orderQuantity", "qty"]],
            as: "orderQuantity",
          },
        },
      ],
    });
    if (!transaction) {
      await handleNotFound(res, `transactions with id ${id} is not found`);
    }

    res.send({
      status: responseSuccess,
      message: "successfully get detail transaction",
      data: { transaction },
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// @desc Add Transaction
// @route POST api/v1/transaction
// @access Public
exports.addTransactions = async (req, res) => {
  try {
    const { name, email, phone, address, attachment, products } = req.body;
    console.log(name, email, phone, address, attachment, products);
    const transaction = await Transaction.create({
      name,
      email,
      phone,
      address,
      attachment,
      status: "Waiting Approve",
      userId: 4,
    });
    await Promise.all(
      products.map(async (product) => {
        const { id, orderQuantity } = product;
        await TransactionProduct.create({
          transactionId: transaction.id,
          productId: id,
          orderQuantity: orderQuantity,
        });
      })
    );
    const transactionAfterAdd = await Transaction.findOne({
      where: { id: transaction.id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: Product,
          as: "products",
          attributes: {
            exclude: ["createdAt", "updatedAt", "stock"],
          },
          through: {
            attributes: [["orderQuantity", "qty"]],
            as: "orderQuantity",
          },
        },
      ],
    });
    res.send({
      status: responseSuccess,
      message: "successfully add transaction",
      data: { transaction: transactionAfterAdd },
    });
  } catch (error) {
    handleError(res, error);
  }
};

// @desc Edit Transaction
// @route PATCH api/v1/transaction/:transactionId
// @access Admin & User who have this transaction
exports.editTransaction = async (req, res) => {
  try {
    const { transactionId: id } = req.params;
    const { body } = req;
    const transaction = await Transaction.findOne({ where: { id } });
    if (!transaction) {
      return handleNotFound(res, `transaction with id ${id} is not found`);
    }
    await Transaction.update(body, { where: { id } });
    const transactionAfter = await Transaction.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: Product,
          as: "products",
          attributes: {
            exclude: ["createdAt", "updatedAt", "stock"],
          },
          through: {
            attributes: [["orderQuantity", "qty"]],
            as: "orderQuantity",
          },
        },
      ],
    });

    res.send({
      status: responseSuccess,
      message: "successfully update transaction",
      data: { transaction: transactionAfter },
    });
  } catch (error) {
    handleError(res, error);
  }
};

// @desc Delete Transaction
// @route DELETE api/v1/transaction/:transactionId
// @access Admin
exports.deleteTransaction = async (req, res) => {
  try {
    const { transactionId: id } = req.params;
    const transaction = await Transaction.findOne({ where: { id } });
    if (!transaction) {
      return handleNotFound(res, `transaction with id ${id} is not found`);
    }
    await Transaction.destroy({ where: { id } });
    res.send({
      status: responseSuccess,
      message: `transaction with id ${id} successfully deleted`,
      data: {
        id,
      },
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// @desc Get for user to get their Transaction
// @route DELETE api/v1/my-transactions
// @access User who have this transaction
exports.getMyTransaction = (req, res) => {
  res.json("hai");
};
