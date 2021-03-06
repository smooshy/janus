(function() {
  var App, Model, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('../model/model').Model;

  util = require('../util/util');

  App = (function(_super) {
    __extends(App, _super);

    function App() {
      _ref = App.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    App.prototype._get = function(library) {
      var _this = this;

      return function(obj, options) {
        if (options == null) {
          options = {};
        }
        return library.get(obj, util.extendNew(options, {
          constructorOpts: util.extendNew(options.constructorOpts, {
            app: _this
          })
        }));
      };
    };

    App.prototype.getView = function(obj, options) {
      return this._get(this.get('views'))(obj, options);
    };

    App.prototype.getStore = function(obj, options) {
      return this._get(this.get('stores'))(obj, options);
    };

    App.prototype.withViewLibrary = function(viewLibrary) {
      var result;

      result = this.shadow();
      result.set('views', viewLibrary);
      this.emit('derived', result);
      return result;
    };

    App.prototype.withStoreLibrary = function(storeLibrary) {
      var result;

      result = this.shadow();
      result.set('stores', storeLibrary);
      this.emit('derived', result);
      return result;
    };

    return App;

  })(Model);

  util.extend(module.exports, {
    App: App
  });

}).call(this);
