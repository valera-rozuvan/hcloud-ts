import {DnsRecordManager} from "./dns_record_manager";

const apiToken = process.env.API_TOKEN || "";
const zoneId = process.env.ZONE_ID || "";
const recordNameToFind = process.env.DNS_RECORD || "";

const dnsRecordManager = new DnsRecordManager(apiToken, zoneId);

dnsRecordManager.findRecordByName(recordNameToFind)
  .then(async (foundRecord) => {
    if (foundRecord) {
      const recordId = foundRecord.id;
      console.log(`Found a record with name '${recordNameToFind}'. Record ID is '${recordId}'; Will try to retrieve the record by it's ID.`);

      let record;
      try {
        record = await dnsRecordManager.getRecord(recordId);
      } catch (err) {
        console.log(err);
        return;
      }

      console.log(record);
    } else {
      console.log(`Record with name '${recordNameToFind}' not found!`);
    }
  })
  .catch((err) => {
    console.log(err);
  });
