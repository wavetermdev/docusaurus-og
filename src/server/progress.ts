import cliProgress from 'cli-progress';
import chalk from 'chalk';
import figures from 'figures';

export function defaultBar(): cliProgress.SingleBar {
    return new cliProgress.SingleBar({
        format: chalk.green(figures.bullet) + chalk.green(' og images ') + '{bar}' + chalk.white(' {prefix} ({percentage}%) ') + chalk.grey('{value}/{total}\n') + chalk.grey('{suffix}'),
        barCompleteChar: chalk.green('█'),
        barIncompleteChar: chalk.white('█'),
        hideCursor: true
    });
};