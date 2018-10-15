'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addViewsSupportToQueryInterface;
function addViewsSupportToQueryInterface(queryInterface) {
  queryInterface.dropView = function (viewName) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var sql = '\n      DROP VIEW IF EXISTS "' + viewName + '"' + (options.cascade ? ' CASCADE' : '') + '\n    ';

    return this.sequelize.query(sql);
  };

  queryInterface.createView = function (viewName, viewDefinition) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return this.sequelize.query(viewDefinition);
  };

  return queryInterface;
}
module.exports = exports['default'];