import { ICliConfig } from '../types';

function setSingleUpdateItem(argName: string, argv: Array<string>, cliConfig: ICliConfig) {
  const argIdx = argv.findIndex((el) => el === argName);
  if (typeof argIdx !== 'number' || Number.isNaN(argIdx) || argIdx < 0) {
    return;
  }
  let value: string | number | boolean | null = argv[argIdx + 1];

  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`If you provided '${argName}' argument, you need to also specify the value.`);
  }

  const numericValue = Number.parseInt(value as string, 10);

  if (value === 'true') {
    value = true;
  } else if (value === 'false') {
    value = false;
  } else if (value === 'null') {
    value = null;
  } else if (!Number.isNaN(numericValue) && /^\d+$/.test(value)) {
    value = numericValue;
  }

  const name = argName.replace('--set-', '');

  cliConfig.updateData[name] = value;
}

function setConfigUpdateData(argv: Array<string>, cliConfig: ICliConfig) {
  const setArgs: Array<string> = [];

  argv.forEach((arg) => {
    if (arg.startsWith('--set-')) {
      setArgs.push(arg);
    }
  });

  setArgs.forEach((arg) => {
    setSingleUpdateItem(arg, argv, cliConfig);
  });
}

export { setConfigUpdateData };
