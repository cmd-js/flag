var asArray = require('as-array')
var reduce = require('ramda/src/reduce')
var map = require('ramda/src/map')
var pickAll = require('ramda/src/pickAll')
var head = require('ramda/src/head')
var values = require('ramda/src/values')
var filter = require('ramda/src/filter')
var identity = require('ramda/src/identity')

module.exports = function flag () {

  var definitions = asArray(arguments);

  return function (options) {

    var defineValue = reduce(function (accum, def) {

        var value = def.value

        if (def.type === 'alias') {
          value = map(function (val) {

            return val.replace(/^-+/, '')
          }, def.value)
        }

        accum[def.type] = (accum[def.type] || []).concat(value)
        return accum
      }, {})

    var value = defineValue(definitions)

    return {
      type: 'flag',
      value: value,
      options: options,
      args: function (data, flags) { // NOTE: this can be a function or a primitive value

        return filter(identity, values(pickAll(value.alias, flags)))
      }
    }
  }
}
