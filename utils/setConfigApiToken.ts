import { ICliConfig } from '../types';

function setConfigApiToken(env: { [key: string]: string | undefined; }, cliConfig: ICliConfig) {
  const apiToken = env.API_TOKEN;

  if (typeof apiToken !== 'string' || apiToken.length === 0) {
    console.error("Please provide ENV variable 'API_TOKEN'.");
    process.exit(1);
  }

  cliConfig.apiToken = apiToken;
}

export { setConfigApiToken };
