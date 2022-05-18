import { ICliConfig, ECliConfigMode } from '../types';

function setConfigMode(argv: Array<string>, cliConfig: ICliConfig) {
  let getAllFlagCount = 0;
  let getOneFlagCount = 0;
  let createFlagCount = 0;
  let updateFlagCount = 0;

  argv.forEach((argument) => {
    switch (argument) {
      case '--get-all':
        getAllFlagCount += 1;
        break;
      case '--get-one':
        getOneFlagCount += 1;
        break;
      case '--create':
        createFlagCount += 1;
        break;
      case '--update':
        updateFlagCount += 1;
        break;
      default:
        break;
    }
  });

  if (getAllFlagCount + getOneFlagCount + createFlagCount + updateFlagCount > 1) {
    throw new Error('Only one of \'--get-all\', \'--get-one\', or \'--update\' arguments can be specified. Can\'t specify multiple.');
  }

  if (getAllFlagCount + getOneFlagCount + createFlagCount + updateFlagCount === 0) {
    throw new Error('Please specify either \'--get-all\', \'--get-one\', or \'--update\' argument.');
  }

  if (getAllFlagCount === 1) {
    cliConfig.mode = ECliConfigMode.GetAll;
  } else if (getOneFlagCount === 1) {
    cliConfig.mode = ECliConfigMode.GetOne;
  } else if (createFlagCount === 1) {
    cliConfig.mode = ECliConfigMode.Create;
  } else if (updateFlagCount === 1) {
    cliConfig.mode = ECliConfigMode.Update;
  }
}

export { setConfigMode };
