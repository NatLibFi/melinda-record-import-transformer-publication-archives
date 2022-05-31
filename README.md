# Publication archives record transformer for the Melinda record batch import system  [![Build Status](https://travis-ci.org/NatLibFi/melinda-record-import-transformer-publication-archives.svg)](https://travis-ci.org/NatLibFi/melinda-record-import-transformer-publication-archives) [![Test Coverage](https://codeclimate.com/github/NatLibFi/melinda-record-import-transformer-publication-archives/badges/coverage.svg)](https://codeclimate.com/github/NatLibFi/melinda-record-import-transformer-publication-archives/coverage)

Publication archives record transformer for the Melinda record batch import system. Consumes Dublic Core records from [publication archives](https://www.kansalliskirjasto.fi/en/services/system-platform-services/publication-archive-service).

## Environment variables
### Mandatory environment values
Following variables are required for passing harvested records to import system. (API) This behaviour is inherited from [melinda-record-import-commons](https://github.com/NatLibFi/melinda-record-import-commons).
* RECORD_IMPORT_API_URL
* RECORD_IMPORT_API_USERNAME_TRANSFORMER
* RECORD_IMPORT_API_PASSWORD_TRANSFORMER
* AMQP_URL
* PROFILE_IDS

### Filtering environment variables
* FILTER_FILETYPE_ONLY
  - description: Filters records without filetype information
  - default: false
* FILTER_ISBN_ONLY
  - description: Filters records without isbn information in field dc.identifier.isbn
  - default: false
* FILTER_ISSUED_AFTER
  - description: Filters records which have dc.date.issued year less than what is configured
  - default: 0
* FILTER_MATERIALTYPES
  - description: Filters record that have material type currently unsupported by the transformation (dc.type.okm is A3, B2 or D2)
  - default: true

### Optional environmental values
These values have default values in inherited configuration file from [melinda-record-import-commons](https://github.com/NatLibFi/melinda-record-import-commons). Default values may change.
* ABORT_ON_INVALID_RECORDS
  - default: false
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

## License and copyright

Copyright (c) 2020 **University Of Helsinki (The National Library Of Finland)**

This project's source code is licensed under the terms of **MIT** or any later version.
