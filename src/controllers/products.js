const { Product } = require("../../models");

// @desc Fetch All Products
// @route GET api/v1/products
// @access Public
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    if (products.length === 0) {
      return res.status(400).send({
        status: "products empty",
        data: [],
      });
    }
    res.send({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

// @desc Fetch Product by Id
// @route GET api/v1/product/:productId
// @access Public
exports.getDetailProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.productId },
    });
    if (!product) {
      return res.status(400).send({
        status: "product not found",
        data: {},
      });
    }
    res.send({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "server error",
      },
    });
  }
};

// @desc Add Product
// @route POST api/v1/product
// @access Admin
exports.addProduct = (req, res) => {
  res.json("hai");
};

// @desc Edit Product
// @route PUT api/v1/product/:productId
// @access Admin
exports.editProduct = (req, res) => {
  res.json("hai");
};

// @desc Delete Product
// @route DELETE api/v1/product/:productId
// @access Admin
exports.deleteProduct = (req, res) => {
  res.json("hai");
};
