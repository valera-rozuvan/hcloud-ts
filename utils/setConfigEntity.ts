import { ICliConfig, ECliConfigEntity } from '../types';

function setConfigEntity(argv: Array<string>, cliConfig: ICliConfig) {
  let zoneFlagCount = 0;
  let recordFlagCount = 0;

  argv.forEach((argument) => {
    switch (argument) {
      case '--zone':
        zoneFlagCount += 1;
        break;
      case '--record':
        recordFlagCount += 1;
        break;
      default:
        break;
    }
  });

  if (zoneFlagCount + recordFlagCount > 1) {
    throw new Error('Only one of \'--zone\', or \'--record\' arguments can be specified. Can\'t specify multiple.');
  }

  if (zoneFlagCount + recordFlagCount === 0) {
    throw new Error('Please specify either \'--zone\', or \'--record\' argument.');
  }

  if (zoneFlagCount === 1) {
    cliConfig.entity = ECliConfigEntity.Zone;
  } else if (recordFlagCount === 1) {
    cliConfig.entity = ECliConfigEntity.Record;
  }
}

export { setConfigEntity };
