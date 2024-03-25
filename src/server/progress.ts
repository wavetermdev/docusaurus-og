import cliProgress from 'cli-progress';
import chalk from 'chalk';
import figures from 'figures';

export function defaultBar(): cliProgress.SingleBar {
    return new cliProgress.SingleBar({
        format: chalk.green(figures.bullet) + chalk.green(' og images ') + '{bar}' + chalk.whiteBright(' {prefix} ({percentage}%) ') + chalk.grey('{value}/{total} ') + chalk.grey('{suffix}'),
        barCompleteChar: chalk.green('█'),
        barIncompleteChar: chalk.whiteBright('█'),
        barsize: 250,
        clearOnComplete: true
    });
};