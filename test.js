var test = require('tape')
var flag = require('./')
var name = require('cmd-name')
var use = require('cmd-use')

test('flag()', function (t) {

  var fn1 = function () {}
  var f = flag(
    name('-t'),
    use(fn1)
  )

  t.equal(typeof f, 'function', 'returns a function')

  t.deepEqual(f(), {
    type: 'flag',
    value: {
      alias: ['t'],
      'function': [fn1]
    },
    options: undefined
  }, 'removes dash prefix from flags')

  t.deepEqual(f({key: 'value'}), {
    type: 'flag',
    value: {
      alias: ['t'],
      'function': [fn1]
    },
    options: {key: 'value'}
  }, 'with options')

  t.end()
})

test('combines multiple values', function (t) {

  var fn1 = function () {}
  var fn2 = function () {}
  var f = flag(
    name('--one'),
    name('-t'),
    use(fn1),
    use(fn2)
  )

  t.deepEqual(f(), {
    type: 'flag',
    value: {
      alias: ['one', 't'],
      'function': [fn1, fn2]
    },
    options: undefined
  }, 'values')

  t.end()
})
