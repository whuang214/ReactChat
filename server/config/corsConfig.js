const cors = require("cors");

const allowedOrigins = [process.env.PROD_FRONTEND_ORIGIN];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests from development frontend
    if (process.env.NODE_ENV === "development") {
      allowedOrigins.push(process.env.DEV_FRONTEND_ORIGIN);
    }

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allows cookies to be send back
  optionsSuccessStatus: 200, // success status for preflight requests
  methods: ["GET", "POST", "PUT", "DELETE"],
};

module.exports = cors(corsOptions);
