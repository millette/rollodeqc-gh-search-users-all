/*eslint arrow-parens: [2, "as-needed"]*/
'use strict'
import test from 'ava'
import fn from './'

test('no results', async t => {
  const result = await fn('joliette')
  t.is(result.headers.statusCode, 200)
  t.is(result.items.length, 0)
})

test('test #1', async t => {
  const result = await fn('bobby')
  t.is(result.headers.statusCode, 200)
  t.true(result.items.length > 2400)
})

test('test #2', async t => {
  const nowISO = '>=' + new Date(Date.now() - 8640000000).toISOString()
  const result = await fn({
    o: { string: 'bobby', created: nowISO },
    order: 'asc',
    sort: 'joined'
  })
  t.is(result.headers.statusCode, 200)
  t.true(result.items.length > 200)
  t.true(result.items.length < 500)
})

test('no q', async t => await t.throws(fn(), '`query` required (string or object)'))
