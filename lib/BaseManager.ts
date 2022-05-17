import fetch, {Headers, HeadersInit, Request, RequestInit} from "node-fetch";

import { ApiCallOptions } from '../types';
import { URL } from "url";

class BaseManager {
  private readonly apiToken: string;

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  protected async get(urlString: string): Promise<any> {
    const url = new URL(urlString);

    const apiRequest = this.buildRequestObject({
      httpMethod: "GET",
      url: url.toString(),
    });

    const apiResponse = await fetch(apiRequest);
    const response = await apiResponse.json();

    if (!apiResponse.ok) {
      throw new Error(`Unexpected error calling API '${urlString}'; status is '${apiResponse.status}'; response is '${JSON.stringify(response)}'`);
    }

    return response;
  }

  protected buildRequestHeaders(): HeadersInit {
    const requestHeaders = new Headers();
    requestHeaders.set("Auth-API-Token", this.apiToken);
    return requestHeaders;
  }

  protected buildRequestObject(options: ApiCallOptions): Request {
    const requestHeaders = this.buildRequestHeaders();

    const requestInit: RequestInit = {
      method: options.httpMethod,
      headers: requestHeaders,
    };

    if (options.httpMethod.toLowerCase() !== "get") {
      requestInit.body = options.stringifiedPayload;
    }

    return new Request(
      options.url,
      requestInit
    );
  }
}

export { BaseManager };
