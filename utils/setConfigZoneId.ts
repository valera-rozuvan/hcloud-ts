import { ICliConfig } from '../types';

function setConfigZoneId(argv: Array<string>, cliConfig: ICliConfig) {
  let zoneIdFlagCount = 0;

  argv.forEach((argument) => {
    switch (argument) {
      case '--zone-id':
        zoneIdFlagCount += 1;
        break;
      default:
        break;
    }
  });

  if (zoneIdFlagCount > 1) {
    throw new Error('You can specify \'--zone-id\' argument only one time.');
  }

  const argIdx = argv.findIndex((el) => el === '--zone-id');
  if (typeof argIdx !== 'number' || Number.isNaN(argIdx) || argIdx < 0) {
    return;
  }
  const zoneIdValue = argv[argIdx + 1];

  if (typeof zoneIdValue !== 'string' || zoneIdValue.length === 0) {
    throw new Error('If you provided \'--zone-id\' argument, you need to also specify the value of the Zone ID.');
  }

  if (zoneIdFlagCount === 1) {
    cliConfig.zoneId = zoneIdValue;
  }
}

export { setConfigZoneId };
