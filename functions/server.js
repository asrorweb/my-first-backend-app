// functions/server.js
// const { app } = require("../index"); // index.js ga yo'naltirilgan kod
import app from "../index";

exports.handler = (event, context) => {
    return app(event, context);
};
