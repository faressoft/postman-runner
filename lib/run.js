const highlight = require('cli-highlight').highlight;
const isJSON = require('is-json');
const newman = require('newman');
const clear = require('clear');
const chalk = require('chalk');
const confirm = require('../lib/confirm');
const _ = require('lodash');

module.exports = function run(collection, environment) {
  clear();

  newman.run(
    {
      collection: collection,
      environment: environment,
      reporters: 'progress',
      delayRequest: 1000
    },
    async function(err, summary) {
      if (err) {
        throw err;
      }

      clear();

      summary.run.executions.forEach(execution => {
        const statusCode = execution.response ? execution.response.code : null;

        process.stdout.write('→ ');

        if (200 <= statusCode && statusCode < 300) {
          process.stdout.write(chalk.green(execution.response.code) + ' ');
        } else if (300 <= statusCode && statusCode < 400) {
          process.stdout.write(chalk.blue(execution.response.code) + ' ');
        } else if (400 <= statusCode && statusCode < 500) {
          process.stdout.write(chalk.red(execution.response.code) + ' ');
        }

        console.log(execution.request.method, execution.request.url.toString());

        if (execution.requestError) {
          printResponse(execution.requestError);
        } else {
          printResponse(execution.response.stream.toString());
        }

        process.stdout.write('\n');
      });

      const reRun = await confirm('Rerun?');

      if (reRun) {
        run(collection, environment);
      }
    }
  );
};

function printResponse(code) {
  code = isJSON(code) ? JSON.stringify(JSON.parse(code), null, 2) : code;
  code = _.isObjectLike(code) ? JSON.stringify(code, null, 2) : code;

  console.log(highlight(code));
}
