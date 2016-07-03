# rollodeqc-gh-search-users-all
[![Build Status](https://travis-ci.org/millette/rollodeqc-gh-search-users-all.svg?branch=master)](https://travis-ci.org/millette/rollodeqc-gh-search-users-all)
[![Coverage Status](https://coveralls.io/repos/github/millette/rollodeqc-gh-search-users-all/badge.svg?branch=master)](https://coveralls.io/github/millette/rollodeqc-gh-search-users-all?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/millette/rollodeqc-gh-search-users-all.svg)](https://gemnasium.com/github.com/millette/rollodeqc-gh-search-users-all)
> RoLLodeQc module to search all GitHub users while respecting rate limits.

## Install
```
$ npm install --save rollodeqc-gh-search-users-all
```

## New since version 0.5.0
The cli now uses [update-notifier][] to let the user know about updates to this program.

Users have the ability to opt-out of the update notifier by changing
the optOut property to true in ~/.config/configstore/update-notifier-rollodeqc-gh-user-streak.json.
The path is available in notifier.config.path.

Users can also opt-out by setting the environment variable NO_UPDATE_NOTIFIER
with any value or by using the --no-update-notifier flag on a per run basis.

## Usage
```js
const rollodeqcGhSearchUsersAll = require('rollodeqc-gh-search-users-all');

rollodeqcGhSearchUsersAll('unicorns');
//=> 'unicorns & rainbows'
```

## API
### rollodeqcGhSearchUsersAll(query)
Search all GitHub users while respecting rate limits. Returns a promise.

#### query
Type: `string`|`object`

`string` values can represent a search query or a complete GitHub API URL
(beginning with http:// or https://).
Otherwise see the tests and source code if query is an `object`.

## Dependencies
* gh-user
* lodash.sorteduniqby
* rollodeqc-gh-bookworm
* rollodeqc-gh-search-users

## License

AGPL-v3 © [Robin Millette](http://robin.millette.info)
