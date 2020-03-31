# Publication archives record transformer for the Melinda record batch import system  [![Build Status](https://travis-ci.org/NatLibFi/melinda-record-import-transformer-publication-archives.svg)](https://travis-ci.org/NatLibFi/melinda-record-import-transformer-publication-archives) [![Test Coverage](https://codeclimate.com/github/NatLibFi/melinda-record-import-transformer-publication-archives/badges/coverage.svg)](https://codeclimate.com/github/NatLibFi/melinda-record-import-transformer-publication-archives/coverage)

Publication archives record transformer for the Melinda record batch import system. Consumes Dublic Core records from [publication archives](https://www.kansalliskirjasto.fi/en/services/system-platform-services/publication-archive-service).

## License and copyright

Copyright (c) 2020 **University Of Helsinki (The National Library Of Finland)**

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
* SOURCE
  - default: "Tuntematon lähde"
  - options:
    - Aaltodoc – Aalto-yliopisto | MELINDA_RECORD_IMPORT_REPO:AALTO
    - Doria – 10 organisaatiota | MELINDA_RECORD_IMPORT_REPO:DORIA
    - Helda – Helsingin yliopisto ja 10 muuta organisaatiota | MELINDA_RECORD_IMPORT_REPO:HELDA
    - Jukuri – Luonnonvarakeskus | MELINDA_RECORD_IMPORT_REPO:JUKURI
    - Julkari – 6 pääasiassa sosiaali- ja terveysministeriön alaista organisaatiota | MELINDA_RECORD_IMPORT_REPO:JULKARI
    - Jultika– Oulun yliopisto | MELINDA_RECORD_IMPORT_REPO:JULTIKA
    - JyX – Jyväskylän yliopisto | MELINDA_RECORD_IMPORT_REPO:JYX
    - Lauda – Lapin yliopisto | MELINDA_RECORD_IMPORT_REPO:LAUDA
    - LutPub – Lappeenrannan teknillinen yliopisto | MELINDA_RECORD_IMPORT_REPO:LUTPUB
    - Osuva – Vaasan yliopisto | MELINDA_RECORD_IMPORT_REPO:OSUVA
    - Theseus – 26 ammattikorkeakoulua | MELINDA_RECORD_IMPORT_REPO:THESEUS
    - Trepo – Tampereen yliopisto | MELINDA_RECORD_IMPORT_REPO:TREPO
    - UEF Electronic Publications – Itä-Suomen yliopisto | MELINDA_RECORD_IMPORT_REPO:UEF
    - UTUPub – Turun yliopisto | MELINDA_RECORD_IMPORT_REPO:UTUPUP
    - Valto – Valtioneuvosto | MELINDA_RECORD_IMPORT_REPO:VALTO
  
## Configuration
Transformation is configurated in src/config.js file. [More details.](https://github.com/NatLibFi/melinda-record-import-transformer-publication-archives/wiki/Configuration)
