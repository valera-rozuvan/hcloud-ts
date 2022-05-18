import { ICliConfig } from '../types';

function setConfigApiToken(env: { [key: string]: string | undefined; }, cliConfig: ICliConfig) {
  const apiToken = env.API_TOKEN;

  if (typeof apiToken !== 'string' || apiToken.length === 0) {
    throw new Error('Please provide ENV variable \'API_TOKEN\'.');
  }

  cliConfig.apiToken = apiToken;
}

export { setConfigApiToken };
