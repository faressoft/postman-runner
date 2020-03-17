const _ = require('lodash');

module.exports = function getRequests(collection, requests = {}, path = []) {
  if ('request' in collection) {
    const requestId = _.concat(path, collection.name).join(' / ');
    requests[requestId] = collection;
  }

  // Folder
  if ('item' in collection) {
    collection.item.map(item =>
      getRequests(item, requests, collection.name ? _.concat(path, [collection.name]) : path)
    );
  }
};
