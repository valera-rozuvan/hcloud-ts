import fetch, {
  Headers, HeadersInit, Request, RequestInit, Response,
} from 'node-fetch';

import { URL } from 'url';
import { ApiCallOptions, IKeyValue } from '../types';

const DEFAULT_HETZNER_API_URL = 'https://dns.hetzner.com';

interface IResponseErrorPayload {
  message?: string;
  code?: string | number;
}

interface IResponseError {
  error?: IResponseErrorPayload;
}

class BaseManager {
  private readonly apiToken: string;

  protected apiBaseUrl = '';

  constructor(apiToken: string, apiBaseUrl?: string) {
    this.apiToken = apiToken;

    if (typeof apiBaseUrl === 'string' && apiBaseUrl.length > 0) {
      this.apiBaseUrl = apiBaseUrl;
    } else {
      this.apiBaseUrl = DEFAULT_HETZNER_API_URL;
    }
  }

  private async processApiResponse<T>(urlString: string, apiResponse: Response): Promise<T> {
    /*
     * Expected statuses, as returned by Hetzner API:
     *
     *  - 200: Successful response
     *  - 201: Created
     *  - 400: Pagination selectors are mutually exclusive
     *  - 401: Unauthorized
     *  - 403: Forbidden
     *  - 404: Not found
     *  - 406: Not acceptable
     *  - 409: Conflict
     *  - 422: Unprocessable entity
     *
     * If we get some other status code, this is an error.
     */
    if (![200, 201, 400, 401, 403, 404, 406, 409, 422].includes(apiResponse.status)) {
      throw new Error(
        'Unexpected response status while calling API; '
        + `urlString is '${urlString}'; `
        + `status is '${apiResponse.status}'; `
        + `statusText is '${apiResponse.statusText}'; `
        + `apiResponse is '${JSON.stringify(apiResponse)}'`,
      );
    }

    let response;
    try {
      response = await apiResponse.json();
    } catch (err) {
      throw new Error(
        'Unexpected error while parsing API response; '
        + `urlString is '${urlString}'; `
        + `status is '${apiResponse.status}'; `
        + `statusText is '${apiResponse.statusText}'; `
        + `apiResponse is '${JSON.stringify(apiResponse)}'`,
      );
    }

    const responseErr = response as IResponseError;
    if (responseErr.error && (responseErr.error.message || responseErr.error.code)) {
      throw new Error(
        'API response contains an error payload; '
        + `urlString is '${urlString}'; `
        + `status is '${apiResponse.status}'; `
        + `statusText is '${apiResponse.statusText}'; `
        + `the error payload is '${JSON.stringify(responseErr.error)}'.`,
      );
    }

    return response as T;
  }

  private buildRequestHeaders(): HeadersInit {
    const requestHeaders = new Headers();
    requestHeaders.set('Auth-API-Token', this.apiToken);
    return requestHeaders;
  }

  private buildRequestObject(options: ApiCallOptions): Request {
    const requestHeaders = this.buildRequestHeaders();

    const requestInit: RequestInit = {
      method: options.httpMethod,
      headers: requestHeaders,
    };

    if (options.httpMethod.toLowerCase() !== 'get') {
      requestInit.body = options.stringifiedPayload;
    }

    return new Request(
      options.url,
      requestInit,
    );
  }

  protected async get<T>(urlString: string): Promise<T> {
    const url = new URL(urlString);

    const apiRequest = this.buildRequestObject({
      httpMethod: 'GET',
      url: url.toString(),
    });

    const apiResponse = await fetch(apiRequest);
    const response = await this.processApiResponse<T>(urlString, apiResponse);

    return response;
  }

  protected async put<T>(urlString: string, payload: IKeyValue): Promise<T> {
    const url = new URL(urlString);

    const apiRequest = this.buildRequestObject({
      httpMethod: 'PUT',
      url: url.toString(),
      stringifiedPayload: JSON.stringify(payload),
    });

    const apiResponse = await fetch(apiRequest);
    const response = await this.processApiResponse<T>(urlString, apiResponse);

    return response;
  }

  protected async post<T>(urlString: string, payload: IKeyValue): Promise<T> {
    const url = new URL(urlString);

    const apiRequest = this.buildRequestObject({
      httpMethod: 'POST',
      url: url.toString(),
      stringifiedPayload: JSON.stringify(payload),
    });

    const apiResponse = await fetch(apiRequest);
    const response = await this.processApiResponse<T>(urlString, apiResponse);

    return response;
  }

  protected async delete<T>(urlString: string): Promise<T> {
    const url = new URL(urlString);

    const apiRequest = this.buildRequestObject({
      httpMethod: 'DELETE',
      url: url.toString(),
    });

    const apiResponse = await fetch(apiRequest);
    const response = await this.processApiResponse<T>(urlString, apiResponse);

    return response;
  }

  protected validate(urlString: string, response: any, validator: any): void {
    const validationResults = validator.validate(response);
    if (!validationResults.valid) {
      throw new Error(`API '${urlString}' returned an unexpected payload; errors from validation are '${JSON.stringify(validationResults.errors)}'`);
    }
  }
}

export { BaseManager };
