const Addresses = require("../../models/Addresses");
const Users = require("../../models/Users");
const BaseController = require("../../utils/baseControllers");

class AddressControllers extends BaseController {
    constructor() {
        // Pass Addresses model and associations (Users)
        super(Addresses, [Users]);
    }

    // override the `getAll` method for more specific logic
    getAll = catchAsync(async (req, res, next) => {
        const addresses = await Addresses.findAll({
            include: [{ model: Addresses }],
        });

        res.status(200).json({
            status: "success",
            results: users.length,
            data: addresses,
        });
    });
}

module.exports = new AddressControllers();
