const sequelize = require("../configs/database");

// Generalized function to insert data with optional configuration
/**
 *
 * @param {Object} model - The Sequelize model to insert data into. This should be a model imported from the Sequelize models directory.
 * @param {Array} data - An array of data objects to be inserted into the specified model. Each object should conform to the model's schema.
 * @param {Object} [options={}] - Optional configuration for the `bulkCreate` operation.
 * @param {boolean} [options.validate=true] - Whether to validate data before insertion. Default is `true`.
 * @param {boolean} [options.returning=true] - Whether to return the inserted data. Default is `true`.
 *
 */
const insertData = async (model, data, options = {}) => {
    try {
        // Ensure the database connection is established
        await sequelize.authenticate();
        console.log("Connection to database established successfully.");

        // Use default options or merge with provided options
        const {
            validate = true, // Default to validate data
            returning = true, // Default to return inserted data
        } = options;

        // Insert data into the specified model
        await model.bulkCreate(data, {
            validate, // Validate before insertion
            returning, // Return inserted data
        });
        console.log("Data inserted successfully.");
    } catch (error) {
        console.error("Error inserting data: ", error);
    } finally {
        // Close the connection
        await sequelize.close();
    }
};

module.exports = insertData;
