import {URL} from "url";
import fetch, {Headers, HeadersInit, Request, RequestInit} from "node-fetch";

const {attributes} = require("structure");

const RecordEntity = attributes({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  ttl: {
    type: Number,
    required: false,
  },
  zone_id: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    required: true,
  },
  modified: {
    type: String,
    required: true,
  },
})(class RecordEntity {
});

const GetRecordResponse = attributes({
  record: RecordEntity,
})(class GetRecordResponse {
});

const GetRecordsResponse = attributes({
  records: {
    type: Array,
    itemType: RecordEntity,
    required: true,
  },
})(class GetRecordsResponse {
});

interface IRecord {
  id: string;
  type: string;
  name: string;
  value: string;
  ttl?: number;
  zone_id: string;
  created: string;
  modified: string;
}

interface IRecordsResponse {
  records: Array<IRecord>;
}

interface ApiCallOptions {
  url: string;
  httpMethod: string;
  stringifiedPayload?: string;
}

class DnsRecordManager {
  private readonly apiToken: string;
  private readonly zoneId: string;

  constructor(apiToken: string, zoneId: string) {
    this.apiToken = apiToken;
    this.zoneId = zoneId;
  }

  public async getRecords(): Promise<IRecordsResponse> {
    const urlString = `https://dns.hetzner.com/api/v1/records?zone_id=${this.zoneId}`;
    const url = new URL(urlString);
    const apiRequest = this.buildRequestObject({
      httpMethod: "GET",
      url: url.toString(),
    });
    const apiResponse = await fetch(apiRequest);
    if (!apiResponse.ok) {
      const response = await apiResponse.json();

      throw new Error(`Unexpected error calling API '${urlString}'; status is '${apiResponse.status}'; response is '${JSON.stringify(response)}'`);
    }

    const response = await apiResponse.json();
    const {valid, errors} = GetRecordsResponse.validate(response);

    if (!valid) {
      throw new Error(`API '${urlString}' returned an unexpected payload; errors from validation are '${JSON.stringify(errors)}'`);
    }

    return response as IRecordsResponse;
  }

  public async getRecord(recordID: string): Promise<IRecord> {
    const urlString = `https://dns.hetzner.com/api/v1/records/${recordID}`;
    const url = new URL(urlString);
    const apiRequest = this.buildRequestObject({
      httpMethod: "GET",
      url: url.toString(),
    });
    const apiResponse = await fetch(apiRequest);
    if (!apiResponse.ok) {
      const response = await apiResponse.json();

      throw new Error(`Unexpected error calling API '${urlString}'; status is '${apiResponse.status}'; response is '${JSON.stringify(response)}'`);
    }

    const response = await apiResponse.json();
    const {valid, errors} = GetRecordResponse.validate(response);

    if (!valid) {
      console.log(response);
      throw new Error(`API '${urlString}' returned an unexpected payload; errors from validation are '${JSON.stringify(errors)}'`);
    }

    return response.record as IRecord;
  }

  public async findRecordByName(name: string): Promise<IRecord | null> {
    const allRecords = await this.getRecords();

    const foundRecord = allRecords.records.filter((record) => {
      return record.name === name;
    });

    if (foundRecord && foundRecord.length === 1) {
      return foundRecord[0];
    } else {
      return null;
    }
  }

  private buildRequestHeaders(): HeadersInit {
    const requestHeaders = new Headers();
    requestHeaders.set("Auth-API-Token", this.apiToken);
    return requestHeaders;
  }

  private buildRequestObject(options: ApiCallOptions): Request {
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

export {DnsRecordManager};
