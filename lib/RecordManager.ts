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
  record: {
    type: RecordEntity,
    required: true,
  },
})(class GetRecordResponse {
});

const EmptyObject = attributes({

})(class EmptyObject {
});

const DeleteRecordResponse = attributes({
  error: {
    type: EmptyObject,
    required: true,
  },
})(class DeleteRecordResponse {
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

class RecordManager extends BaseManager {
  constructor(apiToken: string) {
    super(apiToken);
  }

  public async getAll(zoneId: string): Promise<{ records: Array<IRecord> }> {
    const urlString = `https://dns.hetzner.com/api/v1/records?zone_id=${zoneId}`;
    const response = await this.get<{ records: Array<IRecord> }>(urlString);
    this.validate(urlString, response, GetRecordsResponse);
    return response;
  }

  public async getOne(recordID: string): Promise<IRecord> {
    const urlString = `https://dns.hetzner.com/api/v1/records/${recordID}`;
    const response = await this.get<{ record: IRecord }>(urlString);
    this.validate(urlString, response, GetRecordResponse);
    return response.record;
  }

  public async update(recordID: string, payload: IKeyValue): Promise<IRecord> {
    const record = await this.getOne(recordID);

    const urlString = `https://dns.hetzner.com/api/v1/records/${recordID}`;
    const response = await this.put<{ record: IRecord }>(urlString, { ...record, ...payload });
    this.validate(urlString, response, GetRecordResponse);
    return response.record;
  }

  public async create(payload: IKeyValue): Promise<IRecord> {
    const urlString = 'https://dns.hetzner.com/api/v1/records';
    const response = await this.post<{ record: IRecord }>(urlString, payload);
    this.validate(urlString, response, GetRecordResponse);
    return response.record;
  }

  public async remove(recordID: string): Promise<void> {
    const urlString = `https://dns.hetzner.com/api/v1/records/${recordID}`;
    const response = await this.delete<{ error: { [key: string]: any } }>(urlString);
    this.validate(urlString, response, DeleteRecordResponse);
  }
}

export { RecordManager };
