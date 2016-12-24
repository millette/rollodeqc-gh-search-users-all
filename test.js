'use strict'
import test from 'ava'
import fn from './'

test.serial('no results', async t => {
  const result = await fn('joliette')
  t.is(result.headers.statusCode, 200)
  t.is(result.items.length, 0)
})

test.serial('test #1', async t => {
  const result = await fn('jérôme')
  t.is(result.headers.statusCode, 200)
  t.true(result.items.length > 300)
})

test.serial('test #2', async t => {
  const nowISO = '>=' + (new Date(Date.now() - 8640000000).toISOString().slice(0, 10))
  const it = {
    o: { string: 'bobby', created: nowISO },
    order: 'asc',
    sort: 'joined'
  }
  const result = await fn(it)
  t.is(result.headers.statusCode, 200)
  t.true(result.items.length > 200)
  t.true(result.items.length < 500)
})

test.serial('orgs', async t => {
  const result = await fn({
    o: { location: 'montreal', type: 'org' },
    order: 'asc',
    sort: 'joined'
  })
  t.is(result.headers.statusCode, 200)
  t.true(result.items.length > 550)
  t.true(result.items.length < 650)
})

test('no q', async t => await t.throws(fn(), '`query` required (string or object)'))
