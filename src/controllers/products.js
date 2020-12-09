// import module
const Joi = require("joi");
// import model
const { Product } = require("../../models");
// import some shortcut
const {
  responseSuccess,
  handleError,
  handleNotFound,
  handleValidation,
} = require("./handleShortcut");

// @desc Fetch All Products
// @route GET api/v1/products
// @access Public
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (products.length === 0) {
      return handleNotFound(res, "product empty");
    }
    res.send({
      status: responseSuccess,
      message: "successfully get products",
      data: {
        products,
      },
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// @desc Fetch Product by Id
// @route GET api/v1/product/:productId
// @access Public
exports.getDetailProduct = async (req, res) => {
  try {
    const { productId: id } = req.params;
    const product = await Product.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!product) {
      return handleNotFound(res, `product with ${id} not found`);
    }
    res.send({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// @desc Add Product and Upload an Image
// @route POST api/v1/product
// @access Admin
exports.addProduct = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    body.photo = req.file.path;
    const scema = Joi.object({
      name: Joi.string().min(2).required(),
      price: Joi.number().min(1000).required(),
      description: Joi.string().min(8).required(),
      stock: Joi.number().required(),
      photo: Joi.string().required(),
    });
    handleValidation(scema, body, res);
    const product = await Product.create(body);
    res.send({
      status: responseSuccess,
      message: "successfully add product",
      data: {
        id: product.id,
        ...body,
        photo: req.file.path,
      },
    });
  } catch (error) {
    handleError(res, error);
  }
};

// @desc Edit Product
// @route PATCH api/v1/product/:productId
// @access Admin
exports.editProduct = async (req, res) => {
  try {
    const { productId: id } = req.params;
    const { body } = req;
    const scema = Joi.object({
      name: Joi.string().min(2),
      price: Joi.number().min(1000),
      description: Joi.string().min(8),
      stock: Joi.number(),
    });
    handleValidation(scema, body, res);
    const getProductById = await Product.findOne({ where: { id } });
    if (!getProductById) {
      return handleNotFound(res, `product with id ${id} is not found`);
    }
    await Product.update(body, {
      where: { id },
    });
    const getProductAfterUpdate = await Product.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: responseSuccess,
      message: `successfully edit product with id ${id}`,
      data: {
        product: getProductAfterUpdate,
      },
    });
  } catch (error) {
    handleError(res, error);
  }
};

// @desc Delete Product
// @route DELETE api/v1/product/:productId
// @access Admin
exports.deleteProduct = async (req, res) => {
  try {
    const { productId: id } = req.params;
    const getProductById = await Product.findOne({ where: { id } });
    if (!getProductById) {
      return handleNotFound(res, `product with id ${id} is not found`);
    }
    await Product.destroy({ where: { id } });
    res.send({
      status: responseSuccess,
      message: `product with id ${id} successfully deleted`,
      data: {
        id,
      },
    });
  } catch (error) {
    handleError(res, error);
  }
};
