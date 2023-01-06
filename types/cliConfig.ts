enum ECliConfigEntity {
  Zone = 'ZONE',
  Record = 'RECORD',
}

enum ECliConfigMode {
  GetAll = 'GET_ALL',
  GetOne = 'GET_ONE',
  Update = 'UPDATE',
  Create = 'CREATE',
  Delete = 'DELETE',
}

interface IKeyValue {
  [key: string]: string | number | boolean | null;
}

interface ICliConfig {
  apiToken: string;
  apiBaseUrl?: string;
  entity: ECliConfigEntity | null;
  mode: ECliConfigMode | null;
  zoneId: string;
  recordId: string;
  updateData: IKeyValue;
}

export {
  ECliConfigEntity,
  ECliConfigMode,
  IKeyValue,
  ICliConfig,
};
