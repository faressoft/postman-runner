const inquirer = require('inquirer');

async function confirm(message, defaultValue = true) {
  return (
    await inquirer.prompt([
      {
        type: 'confirm',
        name: 'answer',
        default: defaultValue,
        message
      }
    ])
  ).answer;
}

module.exports = confirm;
