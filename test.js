/*eslint arrow-parens: [2, "as-needed"]*/
'use strict'
import test from 'ava'
import fn from './'

test('test #1', async t => {
  const result = await fn('bobby')
  t.is(result.headers.statusCode, 200)
  t.true(result.items.length > 2400)
})

test('no q', async t => await t.throws(fn(), '`query` required (string or object)'))
