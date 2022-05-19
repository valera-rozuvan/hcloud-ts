import { ICliConfig } from '../types';

function setSingleUpdateItem(name: string, value: string | null | undefined, cliConfig: ICliConfig) {
  if (typeof value !== 'string') {
    throw new Error(`If you want to update property '${name}', you need to specify the value for it.`);
  }

  let typedValue: string | number | boolean | null = null;

  if (value === 'true') {
    typedValue = true;
  } else if (value === 'false') {
    typedValue = false;
  } else if (value === 'null') {
    typedValue = null;
  } else {
    const numericValue = Number.parseInt(value, 10);

    if (!Number.isNaN(numericValue) && /^\d+$/.test(value)) {
      // case when value is a positive integer
      typedValue = numericValue;
    } else {
      // final case - it's just a generic value of type `string`
      typedValue = value;
    }
  }

  cliConfig.updateData[name] = typedValue;
}

function setConfigUpdateData(argv: Array<string>, cliConfig: ICliConfig) {
  argv.forEach((arg, idx) => {
    if (arg.startsWith('--set-')) {
      const name = arg.replace('--set-', '');
      const value = argv[idx + 1];

      setSingleUpdateItem(name, value, cliConfig);
    }
  });
}

export { setConfigUpdateData };
