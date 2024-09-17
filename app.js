const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Error handling
const AppError = require("./utils/appError");
const globalErrorHandling = require("./utils/errorControllers");

// Import the dynamic route loader
const routers = require("./routers");

const app = express();

// Stripe webhook Middleware raw body
app.use('/api/v1/subscriptions/webhook', express.raw({ type: 'application/json' }));

// Global Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(helmet());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log("cookies req from app", req.cookies);
    next();
});

// Use the dynamically loaded routes
app.use('/api/v1', routers);

// Handling Unhandled Routes
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

// Global Error Handling Middleware
app.use(globalErrorHandling);

module.exports = app;
