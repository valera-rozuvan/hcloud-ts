enum ECliConfigEntity {
  Zone = 'ZONE',
  Record = 'RECORD',
}

enum ECliConfigMode {
  GetAll = 'GET_ALL',
  GetOne = 'GET_ONE',
  Update = 'UPDATE',
}

interface ICliConfig {
  apiToken: string;
  entity: ECliConfigEntity | null;
  mode: ECliConfigMode | null;
}
export {
  ECliConfigEntity,
  ECliConfigMode,
  ICliConfig,
};
