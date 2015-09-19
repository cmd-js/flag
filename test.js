var test = require('tape')
var flag = require('./')
var alias = require('cmd-alias')
var handler = require('cmd-handler')

test('flag()', function (t) {

  var fn1 = function () {}
  var f = flag(
    alias('-t'),
    handler(fn1)
  )

  t.equal(typeof f, 'function', 'returns a function')
  t.equal(f().type, 'flag', 'type')
  t.deepEqual(f().value, {
    alias: ['t'],
    handler: [fn1]
  }, 'value')
  t.equal(f().options, undefined, 'no options')
  t.deepEqual(f({key: 'value'}).options, {key: 'value'}, 'with options')

  t.end()
})

test('combines multiple values', function (t) {

  var fn1 = function () {}
  var fn2 = function () {}
  var f = flag(
    alias('--one'),
    alias('-t'),
    handler(fn1),
    handler(fn2)
  )

  t.deepEqual(f().value, {
    alias: ['one', 't'],
    handler: [fn1, fn2]
  }, 'value')

  t.end()
})

test('custom arguments', function (t) {

  var f1 = flag(alias('-t'))
  var f2 = flag(alias('--test', '-t'))

  t.deepEqual(
    f1().args([], {t: 't small', test: 't full'}),
    ['t small'],
    'args function first flag'
  )

  t.deepEqual(
    f2().args([], {t: 't small', test: 't full'}),
    ['t full', 't small'],
    'args function second flag'
  )

  t.end()
})
