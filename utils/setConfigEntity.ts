import { ICliConfig, ECliConfigEntity } from '../types';

function setConfigEntity(argv: Array<string>, cliConfig: ICliConfig) {
  let zoneFlagCount = 0;
  let recordFlagCount = 0;

  argv.forEach((argument, idx) => {
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

  if (zoneFlagCount > 0 && recordFlagCount > 0) {
    console.error("Only one of '--zone', or '--record' arguments can be specified. Can't specify multiple.")
    process.exit(1);
  }

  if (zoneFlagCount === 0 && recordFlagCount === 0) {
    console.error("Please specify either '--zone', or '--record' argument.")
    process.exit(1);
  }

  if (zoneFlagCount === 1) {
    cliConfig.entity = ECliConfigEntity.Zone;
  } else if (recordFlagCount === 1) {
    cliConfig.entity = ECliConfigEntity.Record;
  }
}

export { setConfigEntity };
