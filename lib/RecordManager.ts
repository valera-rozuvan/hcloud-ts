import { BaseManager } from './BaseManager';
import { IKeyValue } from '../types';

const { attributes } = require('structure');

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

  public async getAll(zoneId: string): Promise<IRecordsResponse> {
    const urlString = `https://dns.hetzner.com/api/v1/records?zone_id=${zoneId}`;
    const response = await this.get(urlString);
    this.validate(urlString, response, GetRecordsResponse);
    return response as IRecordsResponse;
  }

  public async getOne(recordID: string): Promise<IRecord> {
    const urlString = `https://dns.hetzner.com/api/v1/records/${recordID}`;
    const response = await this.get(urlString);
    this.validate(urlString, response, GetRecordResponse);
    return response.record as IRecord;
  }

  public async update(recordID: string, payload: IKeyValue): Promise<IRecord> {
    const record = await this.getOne(recordID);

    const urlString = `https://dns.hetzner.com/api/v1/records/${recordID}`;
    const response = await this.put(urlString, { ...record, ...payload });
    this.validate(urlString, response, GetRecordResponse);
    return response.record as IRecord;
  }

  public async create(recordID: string, payload: IKeyValue): Promise<IRecord> {
    const urlString = 'https://dns.hetzner.com/api/v1/records';
    const response = await this.post(urlString, payload);
    this.validate(urlString, response, GetRecordResponse);
    return response.record as IRecord;
  }
}

export { RecordManager };
