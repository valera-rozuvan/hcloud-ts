import { RecordManager, ZoneManager } from './lib';
import {
  setConfigApiToken,
  setConfigApiBaseUrl,
  setConfigEntity,
  setConfigMode,
  setConfigZoneId,
  setConfigRecordId,
  setConfigUpdateData,
} from './utils';
import { ECliConfigEntity, ECliConfigMode, ICliConfig } from './types';

async function run(): Promise<any> {
  const cliConfig: ICliConfig = {
    apiToken: '',
    entity: null,
    mode: null,
    zoneId: '',
    recordId: '',
    updateData: {},
  };

  // Get API token, and API base URL (if provided), from the ENV variables.
  setConfigApiToken(process.env, cliConfig);
  setConfigApiBaseUrl(process.env, cliConfig);

  // Get configuration from command line arguments.
  setConfigEntity(process.argv, cliConfig);
  setConfigMode(process.argv, cliConfig);
  setConfigZoneId(process.argv, cliConfig);
  setConfigRecordId(process.argv, cliConfig);
  setConfigUpdateData(process.argv, cliConfig);

  let manager;
  let managerResponse;
  let result;

  switch (cliConfig.entity) {
    case ECliConfigEntity.Zone:
      manager = new ZoneManager(cliConfig.apiToken, cliConfig.apiBaseUrl);

      switch (cliConfig.mode) {
        case ECliConfigMode.GetAll:
          managerResponse = await manager.getAll();

          result = managerResponse.zones.map((zone) => ({
            id: zone.id,
            name: zone.name,
          }));

          break;
        case ECliConfigMode.GetOne:
          managerResponse = await manager.getOne(cliConfig.zoneId);

          result = managerResponse;

          break;
        default:
          break;
      }

      break;
    case ECliConfigEntity.Record:
      manager = new RecordManager(cliConfig.apiToken, cliConfig.apiBaseUrl);

      switch (cliConfig.mode) {
        case ECliConfigMode.GetAll:

          managerResponse = await manager.getAll(cliConfig.zoneId);

          result = managerResponse.records.map((record) => ({
            id: record.id,
            type: record.type,
            name: record.name,
            value: record.value,
            ttl: record.ttl,
          }));

          break;
        case ECliConfigMode.GetOne:
          managerResponse = await manager.getOne(cliConfig.recordId);

          result = managerResponse;

          break;
        case ECliConfigMode.Update:
          managerResponse = await manager.update(cliConfig.recordId, cliConfig.updateData);

          result = managerResponse;

          break;
        case ECliConfigMode.Create:
          managerResponse = await manager.create(cliConfig.updateData);

          result = managerResponse;

          break;
        case ECliConfigMode.Delete:
          managerResponse = await manager.remove(cliConfig.recordId);

          result = managerResponse;

          break;
        default:
          break;
      }

      break;
    case null:
    default:
      throw new Error('No valid entity argument provided!');
  }

  return result;
}

run().then((result) => {
  console.log(JSON.stringify(result));
  process.exit(0);
}).catch((err) => {
  console.error('Application caught an exception!');
  console.error(err.message);
  process.exit(1);
});
