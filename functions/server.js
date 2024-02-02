// functions/server.js
const { app } = require("../index"); // index.js ga yo'naltirilgan kod

exports.handler = (event, context) => {
    return app(event, context);
};
