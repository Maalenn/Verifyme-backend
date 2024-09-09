const Users = require("../../models/Users");
const Genders = require("../../models/Genders");
const Roles = require("../../models/Roles");
const BaseController = require("../../utils/baseControllers");

class UserControllers extends BaseController {
    constructor() {
        // Pass User model and associations (Roles, Genders)
        super(Users, ["email", "username"], [Roles, Genders]);
    }

    // override the `getAll` method for more specific logic
    getAll = catchAsync(async (req, res, next) => {
        const users = await Users.findAll({
            include: [{ model: Roles }, { model: Genders }],
        });

        res.status(200).json({
            status: "success",
            results: users.length,
            data: users,
        });
    });
}

module.exports = new UserControllers();
