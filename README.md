# Publication archives record transformer for the Melinda record batch import system  [![Build Status](https://travis-ci.org/NatLibFi/melinda-record-import-transformer-publication-archives.svg)](https://travis-ci.org/NatLibFi/melinda-record-import-transformer-publication-archives) [![Test Coverage](https://codeclimate.com/github/NatLibFi/melinda-record-import-transformer-publication-archives/badges/coverage.svg)](https://codeclimate.com/github/NatLibFi/melinda-record-import-transformer-publication-archives/coverage)

Publication archives record transformer for the Melinda record batch import system. Consumes Dublic Core records from [publication archives](https://www.kansalliskirjasto.fi/en/services/system-platform-services/publication-archive-service).

## License and copyright

Copyright (c) 2019 **University Of Helsinki (The National Library Of Finland)**

This project's source code is licensed under the terms of **GNU Affero General Public License Version 3** or any later version.

## Environment variables
### Mandatory environment values
Following variables are required for passing harvested records to import system. (API) This behaviour is inherited from [melinda-record-import-commons](https://github.com/NatLibFi/melinda-record-import-commons). 
* API_URL
* API_USERNAME
* API_PASSWORD
* AMQP_URL
* BLOB_ID
* PROFILE_ID

### Optional environmental values
These values have default values in inherited configuration file from [melinda-record-import-commons](https://github.com/NatLibFi/melinda-record-import-commons). Default values may change.
* ABORT_ON_INVALID_RECORDS
  - default: false
* HEALTH_CHECK_PORT
  - Port to check if transformer is functioning
  - default: 8080
* API_CLIENT_USER_AGENT
  - default: _RECORD-IMPORT-TRANSFORMER

  
## Configuration
Transformation is configurated in src/config.js file. [More details.](https://github.com/NatLibFi/melinda-record-import-transformer-publication-archives/wiki/Configuration)
