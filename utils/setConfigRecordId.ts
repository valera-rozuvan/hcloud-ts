import { ICliConfig } from '../types';

function setConfigRecordId(argv: Array<string>, cliConfig: ICliConfig) {
  let recordIdFlagCount = 0;

  argv.forEach((argument) => {
    switch (argument) {
      case '--record-id':
        recordIdFlagCount += 1;
        break;
      default:
        break;
    }
  });

  if (recordIdFlagCount > 1) {
    throw new Error('You can specify \'--record-id\' argument only one time.');
  }

  const argIdx = argv.findIndex((el) => el === '--record-id');
  if (typeof argIdx !== 'number' || Number.isNaN(argIdx) || argIdx < 0) {
    return;
  }
  const recordIdValue = argv[argIdx + 1];

  if (typeof recordIdValue !== 'string' || recordIdValue.length === 0) {
    throw new Error('If you provided \'--record-id\' argument, you need to also specify the value of the Record ID.');
  }

  cliConfig.recordId = recordIdValue;
}

export { setConfigRecordId };
