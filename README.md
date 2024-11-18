# Publication archives record transformer for the Melinda record batch import system

DC to MARC21 json record transformer for the Melinda record batch import system. May also be used as standalone cli. Consumes Dublic Core records and outputs JSON.

## Usage
1. clone repo
2. setup env
  - Note: if you are running cli, only FILTERS and configuration related to selected filters is required
3. run as part of record import system / as standalone cli
  - Cli example usage: ```DOTENV_CONFIG_PATH=envs/.env.myenv npm run cli:dotenv -- -rvf true -d /path/to/converted/data /path/to/input.xml```

## Configuration

### Record import system
| Name                     | Description                                                 | default                  |
|--------------------------|-------------------------------------------------------------|--------------------------|
| ABORT_ON_INVALID_RECORDS | If record transformation fails abort transformation process | false                    |
| PROFILE_IDS              | Record-import profiles that wish to use this transformer    | ["foobar"]               |
| AMQP_URL                 | Rabbit MQ container url                                     | "amqp://127.0.0.1:5672/" |
| MONGO_URI                | MongoDB connection                                          | "mongodb://127.0.0.1/db" |
|                          |                                                             |                          |


### Filters
Filters define which records should and should not be converted based on the source XML data. The following filters are available:
- filterByFileType: requires kk:file tag to be present and have some value to pass
- filterByIsbnIdentifier: requires dc.identifier.isbn to be presend and have some value to pass
- filterByIssuedYear: requires dc.date.issued to be equal or greater than what is defined in FILTER_YEAR_NOT_BEFORE to pass
- filterByMaterialType: if dc.type.okm is found, requires the value be something else than A3/B2/D2 to pass

| Name                   | Description                                                            | default |
|------------------------|------------------------------------------------------------------------|---------|
| FILTERS                | Names of filters which should be applied before converting record      | []      |
| FILTER_YEAR_NOT_BEFORE | Configuration for filterByIssuedYear: oldest publication year to allow | []      |
|                        |                                                                        |         |


#### Other configuration
Please note sourceConfig contents are static and are used by some of the field generators. This configuration is also expanded for automated tests and applied when NODE_ENV === 'test'.


## License and copyright

Copyright (c) 2020, 2023-2024 **University Of Helsinki (The National Library Of Finland)**
