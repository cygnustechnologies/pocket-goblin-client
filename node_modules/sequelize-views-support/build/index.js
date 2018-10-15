'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _modelViewsSupport = require('./model-views-support');

var _modelViewsSupport2 = _interopRequireDefault(_modelViewsSupport);

var _queryInterfaceViewsSupport = require('./query-interface-views-support');

var _queryInterfaceViewsSupport2 = _interopRequireDefault(_queryInterfaceViewsSupport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SequelizeViewsSupport extends _sequelize2.default {
  /** @inheritdoc */
  getQueryInterface() {
    super.getQueryInterface();

    if (typeof this.queryInterface.dropView !== 'function') {
      this.queryInterface = (0, _queryInterfaceViewsSupport2.default)(this.queryInterface);
    }

    return this.queryInterface;
  }

  /** @inheritdoc */
  define(modelName, attributes, options) {
    options = options || {};

    options.modelName = modelName;
    options.sequelize = this;

    var model = class extends _modelViewsSupport2.default {};

    model.init(attributes, options);

    return model;
  }

  /** @inheritdoc */
  sync(options) {
    var _this = this;

    return super.sync(options).then(function () {
      return _this.syncViews();
    });
  }

  syncViews() {
    var views = this.getViews();

    return Promise.all(views.map(function (view) {
      return view.syncView();
    }));
  }

  getViews() {
    var views = [];

    this.modelManager.forEachModel(function (model) {
      if (model && model.options && model.options.treatAsView) {
        views.push(model);
      }
    });

    return views;
  }
};

exports.default = SequelizeViewsSupport;
module.exports = exports['default'];