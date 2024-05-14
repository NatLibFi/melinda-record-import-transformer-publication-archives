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
  - style: Stringified string array
  - example: '["exampleProfile"]'
* SOURCEMAP
  - note: All sources that will be transformed to SIDs
  - style: Stringified JSON map
  - example: '{"www.example.com":"REPO_EXAMPLE"}'
* HARVEST_SOURCE
  - note: This will automagically add "MELINDA_RECORD_IMPORT_REPO:" part to 884 $k
  - style: Uppercase string
  - example: "EXAMPLE"
  - options:
    | Source                      | HARVEST_SOURCE value | description                                                         |
    |-----------------------------|----------------------|---------------------------------------------------------------------|
    | Aaltodoc                    | AALTO                | Aalto-yliopisto                                                     |
    | Doria                       | DORIA                | 10 organisaatiota                                                   |
    | Helda                       | HELDA                | Helsingin yliopisto ja 10 muuta organisaatiota                      |
    | Jukuri                      | JUKURI               | Luonnonvarakeskus                                                   |
    | Julkari                     | JULKARI              | 6 pääasiassa sosiaali- ja terveysministeriön alaista organisaatiota |
    | Jultika                     | JULTIKA              | Oulun yliopisto                                                     |
    | JyX                         | JYX                  | Jyväskylän yliopisto                                                |
    | Lauda                       | LAUDA                | Lapin yliopisto                                                     |
    | LutPub                      | LUTPUB               | Lappeenrannan teknillinen yliopisto                                 |
    | Osuva                       | OSUVA                | Vaasan yliopisto                                                    |
    | Theseus                     | THESEUS              | 26 ammattikorkeakoulua                                              |
    | Trepo                       | TREPO                | Tampereen yliopisto                                                 |
    | UEF Electronic Publications | UEF                  | Itä-Suomen yliopisto                                                |
    | UTUPub                      | UTUPUP               | Turun yliopisto                                                     |
    | Valto                       | VALTO                | Valtioneuvosto                                                      |

### Filtering environment variables
* FILTER_FILETYPE_ONLY
  - description: Filters records without filetype information
  - style: integer 0 or 1 parsed to boolean
  - default: false
* FILTER_ISBN_ONLY
  - description: Filters records without isbn information in field dc.identifier.isbn
  - style: integer 0 or 1 parsed to boolean
  - default: false
* FILTER_ISSUED_AFTER
  - description: Filters records which have dc.date.issued year less than what is configured
  - style: string year "2022" parsed to integer
  - default: 0
* FILTER_MATERIALTYPES
  - description: Filters record that have material type currently unsupported by the transformation (dc.type.okm is A3, B2 or D2)
  - style: integer 0 or 1 parsed to boolean
  - default: true

### Optional environmental values
These values have default values in inherited configuration file from [melinda-record-import-commons](https://github.com/NatLibFi/melinda-record-import-commons). Default values may change.
* ABORT_ON_INVALID_RECORDS
  - style: integer 0 or 1 parsed to boolean
  - default: false
* API_CLIENT_USER_AGENT
  - style: Uppercase string
  - default: "_RECORD-IMPORT-TRANSFORMER"

## Configuration
Transformation is configurated in src/config.js file. [More details.](https://github.com/NatLibFi/melinda-record-import-transformer-publication-archives/wiki/Configuration)

## License and copyright

Copyright (c) 2020, 2023-2024 **University Of Helsinki (The National Library Of Finland)**

This project's source code is licensed under the terms of **MIT** or any later version.
