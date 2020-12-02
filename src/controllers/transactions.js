// @desc Fetch All Transactions
// @route GET api/v1/transactions
// @access Admin
exports.getTransactions = (req, res) => {
  res.json("hai");
};

// @desc Get Details Transaction
// @route GET api/v1/transaction/:transactionId
// @access Admin & User who have this transaction
exports.getDetailTransaction = (req, res) => {
  res.json("hai");
};

// @desc Add Transaction
// @route POST api/v1/transaction
// @access Public
exports.addTransactions = (req, res) => {
  res.json("hai");
};

// @desc Edit Transaction
// @route PUT api/v1/transaction/:transactionId
// @access Admin & User who have this transaction
exports.editTransaction = (req, res) => {
  res.json("hai");
};

// @desc Delete Transaction
// @route DELETE api/v1/transaction/:transactionId
// @access Admin
exports.deleteTransaction = (req, res) => {
  res.json("hai");
};

// @desc Get for user to get their Transaction
// @route DELETE api/v1/my-transactions
// @access User who have this transaction
exports.getMyTransaction = (req, res) => {
  res.json("hai");
};
