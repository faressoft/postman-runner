const glob = require('glob');
const path = require('path');
const fs = require('promise-fs');
const os = require('os');
const _ = require('lodash');

function loadEnvs() {
  const envsFiles = glob.sync(path.join(resolveTilde(config.dir), '*.postman_environment.json'));

  return _.zipObject(
    envsFiles.map(fileName => _.startCase(path.basename(fileName, '.postman_environment.json'))),
    envsFiles.map(fileName => {
      return JSON.parse(fs.readFileSync(fileName, 'utf8'));
    })
  );
}

function loadCollections() {
  const collectionsFiles = glob.sync(path.join(resolveTilde(config.dir), '*.postman_collection.json'));

  return _.zipObject(
    collectionsFiles.map(fileName => _.startCase(path.basename(fileName, '.postman_collection.json'))),
    collectionsFiles.map(fileName => {
      return JSON.parse(fs.readFileSync(fileName, 'utf8'));
    })
  );
}

function resolveTilde(filePath) {
  return filePath.replace('~', os.homedir());
}

module.exports = {
  loadEnvs,
  loadCollections
};
