const { attributes } = require('structure');

import { BaseManager } from './BaseManager';

const ZoneEntity = attributes({
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
})(class ZoneEntity {
});

const GetZonesResponse = attributes({
  records: {
    type: Array,
    itemType: ZoneEntity,
    required: true,
  },
})(class GetZonesResponse {
});

interface IZoneTextVerification {
  name: string;
  token: string;
}

interface IZone {
  id: string;
  created: string;
  modified: string;
  legacy_dns_host: string;
  legacy_ns: Array<string>;
  name: string;
  ns: Array<string>;
  owner: string;
  paused: boolean;
  permission: string;
  project: string;
  registrar: string;
  status: string;
  ttl: number;
  verified: string;
  records_count: number;
  is_secondary_dns: boolean;
  txt_verification: IZoneTextVerification;
}

interface IZonesResponseMetaPagination {
  page: number;
  per_page: number;
  last_page: number;
  total_entries: number;
}

interface IZonesResponseMeta {
  pagination: IZonesResponseMetaPagination;
}

interface IZonesResponse {
  zones: Array<IZone>;
  meta: IZonesResponseMeta;
}

class ZoneManager extends BaseManager {
  constructor(apiToken: string) {
    super(apiToken);
  }

  public async getAll(): Promise<IZonesResponse> {
    const urlString = `https://dns.hetzner.com/api/v1/zones`;
    const response = await this.get(urlString);

    const validationResults = GetZonesResponse.validate(response);
    if (!validationResults.valid) {
      throw new Error(`API '${urlString}' returned an unexpected payload; errors from validation are '${JSON.stringify(validationResults.errors)}'`);
    }

    return response as IZonesResponse;
  }
}

export { ZoneManager };
