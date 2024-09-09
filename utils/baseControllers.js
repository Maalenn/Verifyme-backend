// Utils module
const { Op } = require("sequelize");
const AppError = require("./appError");
const catchAsync = require("./catchAsync");

/**
 * @class BaseController : CRUD default controller
 * @param {Object} Model - Sequelize model
 * @param {Array} [uniqueFields=[]] - Array of unique fields to check for uniqueness
 * @param {Array} [associations=[]] - Array of associated models to include in queries
 */
class BaseController {
    constructor(Model, uniqueFields = [], associations = []) {
        this.Model = Model;
        this.uniqueFields = Array.isArray(uniqueFields) ? uniqueFields : [];
        this.associations = associations;
    }

    // Check for existing unique fields
    async checkUniqueFields(data, excludeId = null) {
        for (const field of this.uniqueFields) {
            if (data[field]) {
                const query = { [field]: data[field] };
                if (excludeId) {
                    query.id = { [Op.ne]: excludeId };
                }
                const existingRecord = await this.Model.findOne({ where: query });
                if (existingRecord) {
                    throw new AppError(`A record with this ${field} already exists`, 409);
                }
            }
        }
    }

    // Check if a record exists by ID
    async checkRecordExists(id) {
        const record = await this.Model.findByPk(id, { include: this.associations });
        if (!record) {
            throw new AppError("No record found with this ID", 404);
        }
        return record;
    }

    // Fetch all records
    getAll = catchAsync(async (req, res, next) => {
        const records = await this.Model.findAll({ include: this.associations });
        res.status(200).json({
            status: "success",
            data: records,
        });
    });

    // Create a new record
    createOne = catchAsync(async (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return next(new AppError("You can't create with empty field", 400));
        }

        // Check for existing fields
        await this.checkUniqueFields(req.body);

        const newRecord = await this.Model.create(req.body);
        res.status(201).json({
            status: "success",
            message: `${this.Model.name} successfully created`,
            data: newRecord,
        });
    });

    // Fetch a single record by ID
    getOne = catchAsync(async (req, res, next) => {
        const record = await this.checkRecordExists(req.params.id);

        res.status(200).json({
            status: "success",
            data: record,
        });
    });

    // Update a record by ID
    updateOne = catchAsync(async (req, res, next) => {
        const { id } = req.params;

        // Check if record exists
        const record = await this.checkRecordExists(id);

        if (!req.body || Object.keys(req.body).length === 0) {
            return next(new AppError("Nothing to update. Provide valid data.", 400));
        }

        // Check if the new data is different from the current data
        const isDataIdentical = Object.keys(req.body).every((field) => req.body[field] === record[field]);

        if (isDataIdentical) {
            return next(new AppError("No new changes detected!", 400));
        }

        // Check for existing fields during update
        await this.checkUniqueFields(req.body, id);

        await this.Model.update(req.body, {
            where: { id },
            validate: true,
            individualHooks: true,
        });

        // Retrieve the updated record
        const updatedRecord = await this.Model.findByPk(id, { include: this.associations });

        res.status(200).json({
            status: "success",
            message: `${this.Model.name} successfully updated`,
            data: updatedRecord,
        });
    });

    // Delete a record by ID
    deleteOne = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        await this.checkRecordExists(id);

        await this.Model.destroy({
            where: { id },
        });
        res.status(200).json({
            status: "success",
            message: `${this.Model.name} successfully deleted`,
        });
    });

    // Delete all records
    deleteAll = catchAsync(async (req, res, next) => {
        await this.Model.destroy({
            where: {}, // No conditions, so this will delete all records
            truncate: false, // Optional: Also reset auto-increment counter if needed
        });
        res.status(200).json({
            status: "success",
            message: "All Records successfully deleted.",
        });
    });
}

module.exports = BaseController;
