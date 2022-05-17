import { ZoneManager } from './lib'
import { setConfigApiToken, setConfigEntity, setConfigMode } from './utils';
import { ECliConfigEntity, ECliConfigMode, ICliConfig } from './types';

async function run() {
  const cliConfig: ICliConfig = {
    apiToken: '',
    entity: null,
    mode: null,
  };

  setConfigApiToken(process.env, cliConfig);
  setConfigEntity(process.argv, cliConfig);
  setConfigMode(process.argv, cliConfig);

  let results = null;

  switch (cliConfig.entity) {
    case ECliConfigEntity.Zone:
      console.log(`We are working with 'Zones'.`);

      const zoneManager = new ZoneManager(cliConfig.apiToken);

      switch (cliConfig.mode) {
        case ECliConfigMode.GetAll:
          console.log(`We will perform a 'getAll' operation.`);

          results = await zoneManager.getAll();
          break;
        default:
          break;
      }

      break;
    case ECliConfigEntity.Record:
      console.log('We are working with "Records".');
      break;
  }

  return results;
}

run().then((results) => {
  console.log(results);
});

// dnsRecordManager.findRecordByName(recordNameToFind)
//   .then(async (foundRecord) => {
//     if (foundRecord) {
//       const recordId = foundRecord.id;
//       console.log(`Found a record with name '${recordNameToFind}'. Record ID is '${recordId}'; Will try to retrieve the record by it's ID.`);
//
//       let record;
//       try {
//         record = await dnsRecordManager.getRecord(recordId);
//       } catch (err) {
//         console.log(err);
//         return;
//       }
//
//       console.log(record);
//     } else {
//       console.log(`Record with name '${recordNameToFind}' not found!`);
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//   });
