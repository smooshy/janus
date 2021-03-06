# The **Templater** is the means by which markup is bound against Models in
# Janus. Each Templater takes a piece of markup it works against and allows
# configuration, then can take a set of data in exchange for a databound DOM
# fragment.

util = require('../util/util')

Binder = require('./binder').Binder

class Templater
  constructor: (@options = {}) ->
    this._dom$ = this.options.dom if this.options.dom?

    this._binder = new Binder(this._wrappedDom(), { app: this.options.app })
    this._binding()

  _binding: -> this._binder

  markup: -> this._wrappedDom().get(0).innerHTML

  data: (primary, aux, shouldRender) -> this._binder.data(primary, aux, shouldRender)

  dom: -> this._dom$ ?= this._dom()
  _dom: ->
  _wrappedDom: -> this._wrappedDom$ ?= this.dom().wrap('<div/>').parent()


util.extend(module.exports,
  Templater: Templater
)

