import { RecordManager, ZoneManager } from './lib';
import {
  setConfigApiToken, setConfigEntity, setConfigMode, setConfigZoneId, setConfigRecordId, setConfigUpdateData,
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

  setConfigApiToken(process.env, cliConfig);
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
      manager = new ZoneManager(cliConfig.apiToken);

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
      manager = new RecordManager(cliConfig.apiToken);

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
          managerResponse = await manager.create(cliConfig.recordId, cliConfig.updateData);

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
    default:
      break;
  }

  return result;
}

run().then((result) => {
  console.log(JSON.stringify(result));
  process.exit(0);
}).catch((err) => {
  console.log(err.message);
  process.exit(1);
});
