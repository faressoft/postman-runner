#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const _ = require('lodash');
const HomeConf = require('homeconfjs');
const editItems = require('../lib/edit-items');
const getRequests = require('../lib/get-requests');
const loader = require('../lib/loader');
const select = require('../lib/select');
const run = require('../lib/run');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const homeConf = new HomeConf(path.resolve(__dirname, '../default.json'));

global.config = homeConf.config;
updateNotifier({ pkg }).notify();

if (!config.dir) {
  console.error(
    'You need to update',
    chalk.green(homeConf.path),
    '\nwith the path of the directory that you store your postman collections and environments in'
  );
  process.exit();
}

const collections = loader.loadCollections();
const environments = loader.loadEnvs();

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt'));

(async () => {
  const collection = await select('collection', collections);
  const environment = await select('environment', environments);
  const items = {};

  getRequests(collection, items);

  // Overwrite collection's items (requests) with only the selected onces
  collection.item = await select('request', items, true);

  await editItems(collection);

  run(collection, environment);
})();
