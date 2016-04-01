/*eslint arrow-parens: [2, "as-needed"]*/
'use strict'
import test from 'ava'
import fn from './'

test('test #1', async t => {
  const result = await fn('bob')
  t.is(result.headers.statusCode, 200)
  t.is(result.items.length, 1000)
})
