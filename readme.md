# rollodeqc-gh-search-users-all
> RoLLodeQc module to search all GitHub users while respecting rate limits.

## Install
```
$ npm install --save rollodeqc-gh-search-users-all
```

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
* rollodeqc-gh-bookworm
* rollodeqc-gh-search-users

## License

MIT © [Robin Millette](http://robin.millette.info)
