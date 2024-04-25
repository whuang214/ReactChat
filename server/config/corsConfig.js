const cors = require("cors");

const allowedOrigins = [process.env.PROD_FRONTEND_ORIGIN];

const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.NODE_ENV === "development") {
      // In development, accept all origins for easier testing
      allowedOrigins.push(process.env.DEV_FRONTEND_ORIGIN);
    }

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // If your app needs to handle credentials
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ["GET", "POST", "PUT", "DELETE"],
};

module.exports = cors(corsOptions);
