require("dotenv").config();

module.exports = {
    app: {
        env: process.env.NODE_ENV || "development",
        port: process.env.PORT || 8000,
    },
    db: {
        uri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/",
    },
    autoEmail: {
        MAIL_USERNAME: process.env.EMAIL || "",
        MAIL_PASSWORD: process.env.PASSWORD || "",
        CLIENT_ID: process.env.CLIENT_ID || "",
        CLIENT_SECRET: process.env.CLIENT_SECRET || "",
        REFRESH_TOKEN: process.env.REFRESH_TOKEN || "",
    }
}