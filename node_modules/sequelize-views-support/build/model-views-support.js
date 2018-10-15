'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

class ModelViewsSupport extends _sequelize.Model {
  /** @inheritdoc */
  static drop(options) {
    var method = this.options.treatAsView ? 'dropView' : 'dropTable';

    return this.QueryInterface[method](this.getTableName(options), options);
  }

  /** @inheritdoc */
  static sync(options) {
    if (this.options.treatAsView) return Promise.resolve();

    return super.sync(options);
  }

  /**
   * Sync view.
   */
  static syncView(options) {
    return this.QueryInterface.createView(this.getTableName(options), this.getViewDefinition(), options);
  }

  static getViewDefinition() {
    return this.options.viewDefinition;
  }
}

exports.default = ModelViewsSupport;
module.exports = exports['default'];