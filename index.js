/*
RoLLodeQc module to search all GitHub users while respecting rate limits.
Copyright 2016 Robin Millette <http://robin.millette.info/>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the
[GNU Affero General Public License](LICENSE.md)
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict'

// npm
const ghUser = require('gh-user')
const sortedUniqBy = require('lodash.sorteduniqby')

// own
const bookworm = require('rollodeqc-gh-bookworm')
const searchUsers = require('rollodeqc-gh-search-users')

const tenPages = (query) => bookworm.bookworm(query, searchUsers)

module.exports = (query) => {
  if (typeof query === 'string' && query) {
    query = { o: { string: query } }
  } else if (typeof query !== 'object') {
    return Promise.reject(new Error('`query` required (string or object)'))
  }
  if (!query.order) { query.order = 'asc' }
  if (!query.sort) { query.sort = 'joined' }

  const methods = {
    updateItems: (result, inner) => {
      inner.items = sortedUniqBy(result.items.concat(inner.items), 'id')
      return inner
    },
    nextLink: (result) => {
      if (!result.items.length) { return Promise.resolve(false) }
      return ghUser(result.items[result.items.length - 1].login)
        .then((user) => {
          if (!user.created_at) { return false }
          const c = '>=' + user.created_at
          if (query.o.created === c) { return false }
          query.o.created = c
          delete query.q
          return query
        })
    }
  }
  return bookworm.bookworm(query, tenPages, methods)
}
