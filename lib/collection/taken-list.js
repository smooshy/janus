(function() {
  var DerivedList, TakenList, Varying, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DerivedList = require('./list').DerivedList;

  Varying = require('../core/varying').Varying;

  util = require('../util/util');

  TakenList = (function(_super) {
    __extends(TakenList, _super);

    function TakenList(parent, number) {
      var elem, _i, _len, _ref,
        _this = this;

      this.parent = parent;
      this.number = number;
      TakenList.__super__.constructor.call(this);
      this.number = Varying.ly(this.number);
      this.number.react(function() {
        return _this._rebalance();
      });
      _ref = this.parent.list;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        this._add(elem);
      }
      this._rebalance();
      this.parent.on('added', function(elem, idx) {
        _this._add(elem, idx);
        return _this._rebalance();
      });
      this.parent.on('removed', function(_, idx) {
        _this._removeAt(idx);
        return _this._rebalance();
      });
    }

    TakenList.prototype._rebalance = function() {
      var take;

      take = Math.min(this.number.value, this.parent.list.length);
      if (this.list.length < take) {
        while (this.list.length !== take) {
          this._add(this.parent.at(this.list.length), this.list.length);
        }
      } else if (this.list.length > take) {
        while (this.list.length !== take) {
          this._removeAt(take);
        }
      }
      return null;
    };

    return TakenList;

  })(DerivedList);

  util.extend(module.exports, {
    TakenList: TakenList
  });

}).call(this);
