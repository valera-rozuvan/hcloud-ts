# hcloud-ts

a TypeScript library for the Hetzner Cloud API

## prerequisites

You need ENV variable `HETZNER_API_TOKEN` set. You can do so:

```shell
export HETZNER_API_TOKEN="8try83ru3908ru329r32ur390ru"
```

Where `8try83ru3908ru329r32ur390ru` is the value of `HETZNER_API_TOKEN`.

## arguments

General invocation of the CLI tool:

```shell
npx ts-node ./index.ts {{entity option}} {{mode option}} {{optional - resource ID}} {{optional - data to set}}
```

Available arguments for the CLI:

```text
entity option:
  --zone    -  retrieves DNS zones
  --record  -  retrieves DNS records


mode option:
  --get-all  -  get all items
  --get-one  -  get one item (based on ID provided)
  --update   -  update an item
  --create   -  create a new item
  --delete   -  delete an item


optional - resource ID:
  --record-id {{UID}} -  ID of the record to get/update/delete
  --zone-id {{UID}}   -  ID of the zone to get/update/delete


optional - data to set:
  # In order to create/update an item, you need to set property values.
  # You can do so like so:

  --set-PROPERTY-NAME PROPERTY-VALUE

  # The above will set 'PROPERTY_NAME' to 'PROPERTY_VALUE'. These are case sensitive!
  # For example:

  --set-ttl 600

  # If the value contains spaces, put quotes around it:

  --set-value "Hello, world!"
```

## example invocation

Example of how to run the CLI:

```shell
npx ts-node ./index.ts --record --update --record-id "fc249227f4ae170dafa99394971da92b" --set-name "orgid-v2"
```

---

## license

The project `'hcloud-ts'` is licensed under the MIT License.

See [LICENSE](./LICENSE) for more details.

The latest source code can be retrieved from one of several mirrors:

1. [github.com/valera-rozuvan/hcloud-ts](https://github.com/valera-rozuvan/hcloud-ts)

2. [gitlab.com/valera-rozuvan/hcloud-ts](https://gitlab.com/valera-rozuvan/hcloud-ts)

3. [git.rozuvan.net/hcloud-ts](https://git.rozuvan.net/hcloud-ts)

Copyright (c) 2022-2023 [Valera Rozuvan](https://valera.rozuvan.net/)
