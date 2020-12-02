// import model
const { User } = require("../../models");
// import some shortcut
const {
  responseSuccess,
  handleError,
  handleNotFound,
} = require("./handleShortcut");

// @desc Login User
// @route POST api/v1/login
// @access Public
exports.login = (req, res) => {
  res.json("hai");
};

// @desc Register User
// @route POST api/v1/register
// @access Public
exports.register = (req, res) => {
  res.json("hai");
};

// @desc Fetch All Users
// @route GET api/v1/users
// @access Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    if (users.length === 0) {
      return handleNotFound(res, "Users empty");
    }
    res.send({
      status: responseSuccess,
      message: "successfully get users",
      data: {
        users,
      },
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// @desc Delete User
// @route DELETE api/v1/user/:id
// @access Admin
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getUserById = await User.findOne({
      where: { id },
    });
    if (!getUserById) {
      return handleNotFound(res, `User with id : ${id} not found`);
    }
    await User.destroy({
      where: { id },
    });
    res.send({
      status: responseSuccess,
      message: `User with id : ${id} deleted`,
      data: {
        id,
      },
    });
  } catch (error) {
    return handleError(res, error);
  }
};
