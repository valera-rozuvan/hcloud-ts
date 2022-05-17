import { ICliConfig, ECliConfigMode } from '../types';

function setConfigMode(argv: Array<string>, cliConfig: ICliConfig) {
  let getAllFlagCount = 0;
  let getOneFlagCount = 0;
  let updateFlagCount = 0;

  argv.forEach((argument, idx) => {
    switch (argument) {
      case '--get-all':
        getAllFlagCount += 1;
        break;
      case '--get-one':
        getOneFlagCount += 1;
        break;
      case '--update':
        updateFlagCount += 1;
        break;
      default:
        break;
    }
  });

  if (
    (getAllFlagCount > 0 && getOneFlagCount > 0) ||
    (getAllFlagCount > 0 && updateFlagCount > 0) ||
    (getOneFlagCount > 0 && updateFlagCount > 0)
  ) {
    console.error("Only one of '--get-all', '--get-one', or '--update' arguments can be specified. Can't specify multiple.")
    process.exit(1);
  }

  if (getAllFlagCount === 0 && getOneFlagCount === 0 && updateFlagCount === 0) {
    console.error("Please specify either '--get-all', '--get-one', or '--update' argument.")
    process.exit(1);
  }

  if (getAllFlagCount === 1) {
    cliConfig.mode = ECliConfigMode.GetAll;
  } else if (getOneFlagCount === 1) {
    cliConfig.mode = ECliConfigMode.GetOne;
  } else if (updateFlagCount === 1) {
    cliConfig.mode = ECliConfigMode.Update;
  }
}

export { setConfigMode };
