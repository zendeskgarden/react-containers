#!/usr/bin/env node

/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

const program = require('commander');
const execa = require('execa');
const garden = require('@zendeskgarden/scripts');
const ora = require('ora');
const resolve = require('path').resolve;

const info = (message, spinner) => spinner.info(message).start();

/**
 * Bootstrap the new package.
 *
 * @param {String} component Component name.
 * @param {Ora} spinner Terminal spinner.
 */
const bootstrap = async (component, spinner) => {
  info(`Bootstrapping package...`, spinner);

  const lernaArgs = [
    'lerna',
    'bootstrap',
    '--scope',
    `@zendeskgarden/container-${component.toLowerCase()}`
  ];

  await execa('yarn', lernaArgs, { stdin: process.stdin, stdout: process.stdout });
};

/**
 * Generate the new package based on the package template.
 *
 * @param {String} component Component name.
 * @param {Ora} spinner Terminal spinner.
 */
const generate = async (component, spinner) => {
  const src = resolve(__dirname, '..', '..', 'packages', '.template');
  const dest = resolve(__dirname, '..', '..', 'packages', component.toLowerCase());
  const tags = { component };

  info(`Generating package...`, spinner);
  await garden.lernaNew({ src, dest, tags, spinner });
};

program
  .description('Generate a new react-containers package')
  .argument('<name>', 'ComponentName')
  .action(async component => {
    const spinner = ora();

    try {
      spinner.start();
      await generate(component, spinner);
      await bootstrap(component, spinner);
      spinner.succeed(`Success.`);
    } catch (error) {
      spinner.fail(error.message || error);
      process.exitCode = 1;
    } finally {
      spinner.stop();
    }
  })
  .parse(process.argv);

/*

retrievePrompts()
  .then(copyDefaultPackage)
  .then(({ packageName }) => {
    return Promise.all([updatePackageJson({ packageName }), updateReadme({ packageName })]).then(
      () => {
        console.log(
          chalk.green(
            `Successfully created package "@zendeskgarden/container-${packageName}" at "packages/${packageName}"`
          )
        );

        return { packageName };
      }
    );
  })
  .then(performLernaBootstrap)
  .then(() => {
    console.log(pelorous(`Start local development with: "${chalk.white(`yarn start`)}"`));
  });
*/
