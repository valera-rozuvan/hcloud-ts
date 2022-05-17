const { attributes } = require('structure');

import { BaseManager } from './BaseManager';

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

class RecordManager extends BaseManager {
  constructor(apiToken: string) {
    super(apiToken);
  }

  public async getRecords(zoneId: string): Promise<IRecordsResponse> {
    const urlString = `https://dns.hetzner.com/api/v1/records?zone_id=${zoneId}`;
    const response = await this.get(urlString);

    const validationResults = GetRecordsResponse.validate(response);
    if (!validationResults.valid) {
      throw new Error(`API '${urlString}' returned an unexpected payload; errors from validation are '${JSON.stringify(validationResults.errors)}'`);
    }

    return response as IRecordsResponse;
  }

  public async getRecord(recordID: string): Promise<IRecord> {
    const urlString = `https://dns.hetzner.com/api/v1/records/${recordID}`;
    const response = await this.get(urlString);

    const validationResults = GetRecordResponse.validate(response);
    if (!validationResults.valid) {
      throw new Error(`API '${urlString}' returned an unexpected payload; errors from validation are '${JSON.stringify(validationResults.errors)}'`);
    }

    return response.record as IRecord;
  }

  public async findRecordByName(zoneId: string, name: string): Promise<IRecord | null> {
    const allRecords = await this.getRecords(zoneId);

    const foundRecord = allRecords.records.filter((record) => {
      return record.name === name;
    });

    if (foundRecord && foundRecord.length === 1) {
      return foundRecord[0];
    } else {
      return null;
    }
  }
}

export { RecordManager };
