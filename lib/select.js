const inquirer = require('inquirer');
const fuzzy = require('fuzzy');
const _ = require('lodash');

async function select(title, items, multiple = false) {
  const keys = _.isArray(items) ? itsems : Object.keys(items);

  const { answer } = await inquirer.prompt([
    {
      type: !multiple ? 'autocomplete' : 'checkbox-plus',
      name: 'answer',
      message: `Select ${title}`,
      pageSize: 10,
      highlight: true,
      searchable: true,
      source: async (answersSoFar, input) => search(keys, input)
    }
  ]);

  if (_.isArray(answer)) {
    return answer.map(key => items[key]);
  }

  return items[answer];
}

function search(keys, input = '') {
  var fuzzyResult = fuzzy.filter(input, keys);

  var data = fuzzyResult.map(function(element) {
    return element.original;
  });

  return data;
}

module.exports = select;
