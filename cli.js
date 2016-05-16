#!/usr/bin/env node
0 > 1 // see https://github.com/babel/babel-eslint/issues/163

/*
RoLLodeQc utility to fetch a single GitHub user.

Copyright 2016 Robin Millette <robin@millette.info> (<http://robin.millette.info>)

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
const meow = require('meow')

// self
const searchUsers = require('./')

const cli = meow([
  'Usage',
  '  $ rollodeqc-gh-search-users-all [input]',
  '',
  'Options',
  '  -t',
  '  --type Use Specify "user" or "org", otherwise search for any.',
  '',
  '  -l',
  '  --location Search location; supply as many times as needed.',
  '',
  'Examples',
  '  $ rollodeqc-gh-search-users-all',
  '  unicorns & rainbows',
  '  $ rollodeqc-gh-search-users-all ponies',
  '  ponies & rainbows'
], {
  alias: { t: 'type', l: 'location' },
  string: ['type', 'location']
})

var query = {
  o: { string: cli.input.join(' ') },
  order: 'asc',
  sort: 'joined'
}

if (cli.flags.type) {
  query.o.type = cli.flags.type
}

if (cli.flags.location) {
  query.o.location = cli.flags.location
}

searchUsers(query)
  .then((x) => {
    console.log(JSON.stringify(x.items, null, ' '))
    console.error(JSON.stringify(x.headers, null, ' '))
  })
  .catch((e) => {
    console.error('err:', e)
    running = false
  })
