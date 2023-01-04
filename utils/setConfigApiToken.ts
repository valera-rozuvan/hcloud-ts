import { ICliConfig } from '../types';

function setConfigApiToken(env: { [key: string]: string | undefined; }, cliConfig: ICliConfig) {
  const apiToken = env.HETZNER_API_TOKEN;

  if (typeof apiToken !== 'string' || apiToken.length === 0) {
    throw new Error('Please provide ENV variable \'HETZNER_API_TOKEN\'.');
  }

  cliConfig.apiToken = apiToken;
}

export { setConfigApiToken };
