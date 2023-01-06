import { ICliConfig } from '../types';

function setConfigApiBaseUrl(env: { [key: string]: string | undefined; }, cliConfig: ICliConfig) {
  const apiBaseUrl = env.HETZNER_API_BASE_URL;

  if (typeof apiBaseUrl === 'string') {
    cliConfig.apiBaseUrl = apiBaseUrl;
  } else {
    delete cliConfig.apiBaseUrl;
  }
}

export { setConfigApiBaseUrl };
