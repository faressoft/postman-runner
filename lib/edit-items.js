const inquirer = require('inquirer');
const isJSON = require('is-json');
const editor = require('editor');
const chalk = require('chalk');
const fs = require('promise-fs');
const _ = require('lodash');
const { file } = require('tmp-promise');
const confirm = require('./confirm');

async function editItems(collection) {
  for (const key in collection.item) {
    const item = collection.item[key];

    if (_.includes(['POST', 'PUT'], item.request.method) && !item.request.body) {
      addBody(item);
    }

    if (!item.request.url.query) {
      addQuery(item);
    }

    if (item.request.body) {
      if (await confirm(`Would you like to edit the body of ${chalk.green(item.name)}`, false)) {
        await editBody(item);
      }
    }

    if (item.request.url.query) {
      if (await confirm(`Would you like to edit the querystring of ${chalk.green(item.name)}`, false)) {
        await editQuery(item);
      }
    }
  }
}

async function editBody(item) {
  const mode = item.request.body.mode;
  let body = item.request.body[mode];

  if (isJSON(body)) {
    body = formatJSON(body);
  }

  if (_.isString(body)) {
    body = await edit(body, 'body');
  } else {
    body = JSON.parse(await edit(JSON.stringify(body, null, 2), 'body'));
  }

  item.request.body[mode] = body;
}

async function editQuery(item) {
  let query = item.request.url.query;

  // Convert to object {key: value, ...}
  query = _.zipObject(_.map(query, 'key'), _.map(query, 'value'));

  // Edit
  query = JSON.parse(await edit(JSON.stringify(query, null, 2), 'query'));

  // Convert back to array [{key, value}, ...f]
  query = Object.entries(query).map(([key, value]) => ({ key, value }));

  item.request.url.query = query;
}

async function edit(content) {
  const { path, cleanup } = await file();

  await fs.writeFile(path, content, 'utf8');
  await new Promise(resolve => editor(path, code => resolve(code)));
  content = await fs.readFile(path, 'utf8');
  cleanup();

  return content;
}

function addBody(item) {
  item.request.body = {
    mode: 'raw',
    raw: ''
  };
}

function addQuery(item) {
  item.request.url.query = [];
}

function formatJSON(jsonString) {
  return JSON.stringify(JSON.parse(jsonString), null, 2);
}

module.exports = editItems;
