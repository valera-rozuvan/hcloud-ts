import { BaseManager } from './BaseManager';

const { attributes } = require('structure');

const ZoneEntityTxtVerification = attributes({
  name: {
    type: String,
    required: true,
    empty: true,
  },
  token: {
    type: String,
    required: true,
    empty: true,
  },
})(class ZoneEntityTxtVerification {
});

const ZoneEntityZoneType = attributes({
  id: {
    type: String,
    required: true,
    empty: true,
  },
  name: {
    type: String,
    required: true,
    empty: true,
  },
  description: {
    type: String,
    required: true,
    empty: true,
  },
  prices: {
    type: Object,
    required: true,
    nullable: true,
  },
})(class ZoneEntityZoneType {
});

const ZoneEntity = attributes({
  id: {
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
  legacy_dns_host: {
    type: String,
    required: true,
    empty: true,
  },
  legacy_ns: {
    type: Array,
    itemType: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ns: {
    type: Array,
    itemType: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
    empty: true,
  },
  paused: {
    type: Boolean,
    required: true,
  },
  permission: {
    type: String,
    required: true,
    empty: true,
  },
  project: {
    type: String,
    required: true,
    empty: true,
  },
  registrar: {
    type: String,
    required: true,
    empty: true,
  },
  status: {
    type: String,
    required: true,
  },
  ttl: {
    type: Number,
    required: true,
  },
  verified: {
    type: String,
    required: true,
    empty: true,
  },
  records_count: {
    type: Number,
    required: true,
  },
  is_secondary_dns: {
    type: Boolean,
    required: true,
  },
  txt_verification: {
    type: ZoneEntityTxtVerification,
    required: true,
  },
  zone_type: {
    type: ZoneEntityZoneType,
    required: true,
  },
})(class ZoneEntity {
});

const ZonesResponseMetaPagination = attributes({
  page: {
    type: Number,
    required: true,
  },
  per_page: {
    type: Number,
    required: true,
  },
  previous_page: {
    type: Number,
    required: true,
  },
  next_page: {
    type: Number,
    required: true,
  },
  last_page: {
    type: Number,
    required: true,
  },
  total_entries: {
    type: Number,
    required: true,
  },
})(class ZonesResponseMetaPagination {
});

const ZonesResponseMeta = attributes({
  pagination: {
    type: ZonesResponseMetaPagination,
    required: true,
  },
})(class ZonesResponseMeta {
});

const GetZonesResponse = attributes({
  zones: {
    type: Array,
    itemType: ZoneEntity,
    required: true,
  },
  meta: {
    type: ZonesResponseMeta,
    required: true,
  },
})(class GetZonesResponse {
});

const GetZoneResponse = attributes({
  zone: {
    type: ZoneEntity,
    required: true,
  },
})(class GetZoneResponse {
});

interface IZoneTextVerification {
  name: string;
  token: string;
}

interface IZoneZoneType {
  id: string;
  name: string;
  description: string;
  prices: any | null;
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
  zone_type: IZoneZoneType;
}

interface IZonesResponseMetaPagination {
  page: number;
  per_page: number;
  previous_page: number;
  next_page: number;
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
  constructor(apiToken: string, apiBaseUrl?: string) {
    super(apiToken, apiBaseUrl);
  }

  public async getAll(): Promise<IZonesResponse> {
    const urlString = `${this.apiBaseUrl}/api/v1/zones`;
    const response = await this.get(urlString);
    this.validate(urlString, response, GetZonesResponse);
    return response as IZonesResponse;
  }

  public async getOne(zoneId: string): Promise<IZone> {
    const urlString = `${this.apiBaseUrl}/api/v1/zones/${zoneId}`;
    const response = await this.get(urlString);
    this.validate(urlString, response, GetZoneResponse);
    return response as IZone;
  }
}

export { ZoneManager };
