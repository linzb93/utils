import semver from 'semver';
import chalk from 'chalk';

if (semver.lt(process.version, "18.0.0")) {
  console.log(chalk.red("NodeJS版本太低，请切换至v18+"));
  process.exit(1);
}
