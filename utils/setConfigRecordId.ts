import { ICliConfig } from '../types';

function setConfigRecordId(argv: Array<string>, cliConfig: ICliConfig) {
  let recordIdFlagCount = 0;
  let recordIdFlagIdx = -1;

  argv.forEach((argument, idx) => {
    switch (argument) {
      case '--record-id':
        recordIdFlagCount += 1;
        recordIdFlagIdx = idx;

        break;
      default:
        break;
    }
  });

  if (recordIdFlagCount === 0) {
    return;
  }

  if (recordIdFlagCount > 1) {
    throw new Error('You can specify \'--record-id\' argument only one time.');
  }

  const recordIdValue = argv[recordIdFlagIdx + 1];

  if (typeof recordIdValue !== 'string' || recordIdValue.length === 0) {
    throw new Error('If you provided \'--record-id\' argument, you need to also specify the value of the Record ID.');
  }

  cliConfig.recordId = recordIdValue;
}

export { setConfigRecordId };
