import { ICliConfig } from '../types';

function setConfigZoneId(argv: Array<string>, cliConfig: ICliConfig) {
  let zoneIdFlagCount = 0;
  let zoneIdFlagIdx = 0;

  argv.forEach((argument, idx) => {
    switch (argument) {
      case '--zone-id':
        zoneIdFlagCount += 1;
        zoneIdFlagIdx = idx;
        break;
      default:
        break;
    }
  });

  if (zoneIdFlagCount === 0) {
    return;
  }

  if (zoneIdFlagCount > 1) {
    throw new Error('You can specify \'--zone-id\' argument only one time.');
  }

  const zoneIdValue = argv[zoneIdFlagIdx + 1];

  if (typeof zoneIdValue !== 'string' || zoneIdValue.length === 0) {
    throw new Error('If you provided \'--zone-id\' argument, you need to also specify the value of the Zone ID.');
  }

  if (zoneIdFlagCount === 1) {
    cliConfig.zoneId = zoneIdValue;
  }
}

export { setConfigZoneId };
