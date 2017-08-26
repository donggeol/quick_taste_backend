const tempRoutes = require('./routes');

module.exports = function(app, db) {
    tempRoutes(app, db);
    // Other route groups could go here, in the future
};
