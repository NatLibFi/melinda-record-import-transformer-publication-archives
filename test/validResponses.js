/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* Publication archives record transformer for the Melinda record batch import system
*
* Copyright (C) 2018 University Of Helsinki (The National Library Of Finland)
*
* This file is part of melinda-record-import-transformer-publication-archives
*
* melinda-record-import-transformer-publication-archives program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* melinda-record-import-transformer-publication-archives is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
* @licend  The above is the entire license notice
* for the JavaScript code in this file.
*
*/

'use strict';
const custom = [
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:ISBN:111-222-33-4444-5"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "a",
            "value": "Tampere:"
          },
          {
            "code": "b",
            "value": "Tampere University Press,"
          },
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:ISBN:111-222-33-4444-5"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  { //This dummy object tests if dc.publisher.place is placed correctly to 264 and custom access level is used in 506. (not "openAccess")
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "a",
            "value": "Tampere:"
          },
          {
            "code": "b",
            "value": "Tampere University Press,"
          },
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Osittain rajattu"
          }
        ]
      }

    ]
  },
  { //This dummy object should get two 856 fields trough since there is no dc.identifier.urn
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000snull    fi |||||o|||||||| ||null  "
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://randomurl.com/url"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://randomurl.com/uri"
          }
        ]
      }
    ]
  }
];

const utaChecked = [
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "020",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "978-952-03-0864-3"
          },
          {
            "code": "q",
            "value": "PDF"
          }
        ]
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:ISBN: 978-952-03-0864-3"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "von Essen, Magdaléna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Mechanobiology in Health and Disease : Exploring Talin’s mechanobiology with computational modeling and simulation techniques."
          }
        ]
      },
      {
        "tag": "246",
        "ind1": "1",
        "ind2": "3",
        "subfields": [
          {
            "code": "a",
            "value": "Terveyden ja sairauden mekanobiologiaa : Taliinin mekanobiologian tarkastelua laskennallisen mallinnuksen ja simulaatioiden avulla"
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "b",
            "value": "Tampere University Press,"
          },
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Acta Electronica Universitatis Tamperensis,"
          },
          {
            "code": "x",
            "value": "1456-954X;"
          },
          {
            "code": "v",
            "value": "1933"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Artikkeliväitöskirja"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Artikkeliväitöskirja :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Lääketieteen ja biotieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kaikki elävät organismit..."
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "All living organisms..."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "taliini"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "mekanobiologia"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "ateroskleroosi"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "laskennallinen molekyylidynamiikka"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Gromacs"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "talin"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "mechanobiology"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "atherosclerosis"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "computational molecular dynamics"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:ISBN: 978-952-03-0864-3"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  }
];

const utaSingle = [
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2011    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "020",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "9783905404579"
          },
          {
            "code": "q",
            "value": "PDF"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Grönroos, Mauri,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Cultural and intercultural negotiating aspects."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "b",
            "value": "Olten, Switzerland : University of Applied Sciences of Northwestern Switzerland, School of Business,"
          },
          {
            "code": "c",
            "value": "2011."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (54-66 sivua)"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "globalization"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "culture"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "negotiations"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Seppänen, Ann,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://www.doria.fi/handle/10024/73840"
          }
        ]
      }
    ]
  }
];

/*******************************************/

const utaComplex = [
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2011    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "020",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "978-951-44-8464-3"
          },
          {
            "code": "q",
            "value": "PDF"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Paavolainen, Teemu,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Theatre/Ecology/Cognition. Theorizing Performer-Object Interaction in Grotowski, Kantor, and Meyerhold."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "b",
            "value": "Tampere University Press,"
          },
          {
            "code": "c",
            "value": "2011."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Acta Universitatis Tamperensis,"
          },
          {
            "code": "v",
            "value": "1619"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Väitöskirja"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Väitöskirja :"
          },
          {
            "code": "c",
            "value": "University of Tampere"
          },
          {
            "code": "d",
            "value": "2011."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tutkimus käsittelee esiintyjän ja esineen keskinäisiä vuorovaikutussuhteita teatteriesityksissä, kantavana tutkimuskysymyksenään, miten ja millaisia merkityksiä tämä jo sinällään toiminnan ja havainnon tasoilla kantaa ja tuottaa. Teoreettisesti työ edustaa humanististen tieteiden kognitiivista käännettä, mutta pyrkii aihepiirinsä mukaisesti käsittämään mielen ja kognition myös olennaisesti ekologisena ilmiönä, päätä ja aivoja laajempana, toiminnan ja havainnon prosesseihin liudentuvana. Tutkimuksen keskeiset käsitteet (metafora, kuvaskeemat ja tarjoumat eli affordanssit) perustuvat kognitiiviseen kielitieteeseen ja ekologiseen psykologiaan, tärkeimpinä vaikuttajina Mark Johnson, James J. Gibson ja Tim Ingold. Keskeiset tapaustutkimukset pureutuvat Jerzy Grotowskin, Tadeusz Kantorin ja Vsevolod Meyerholdin valittuihin ohjauksiin.\r\n\r\nEnsimmäisessä luvussa havainnon, toiminnan ja kognition prosesseja havainnollistetaan temaattisesti keskeisillä toimijuuden ja esineyden käsitteillä. Näkökulma horjuttaa teatteriesineistön perinteistä jakoa lavastukseen, tarpeistoon ja puvustukseen. Filosofisemmalla tasolla luku kyseenalaistaa metaforan  olemisen suuresta ketjusta , jossa mieli asettuu aineen ja subjekti objektin yläpuolelle. Sen teoreettiseksi vaihtoehdoksi kehitellään kognition ekologista perustaa ruumiillisena, paikallisena, toiminnallisena ja ympäristöön hajautuvana (embodied, embedded, enacted, extended).\r\n\r\nMetodologia tarkentuu toisen luvun ekologisessa esitysanalyysissä Meyerholdin Jalomielisestä aisankannattajasta (1922). Paitsi tämän lavastusta ja näyttelijäntyötä   konstruktivismia ja biomekaniikkaa   luvussa tarkastellaan varhaisen Neuvosto-Venäjän kulttuuriekologiaa sekä analysoitavasta esityksestä näiden kaikkien vuorovaikutuksessa tarjoutuneita tulkintoja. Kolmannessa luvussa Grotowskin ja Kantorin ajatuksia  köyhästä teatterista  suhteutetaan näiden puolestaan heijastamaan kommunistisen Puolan kulttuuriekologiaan: samojen perustavien skeemojen esitetään metaforisesti määrittävän molempien ohjaajien ajattelua ja toimintaa, usein tosin vastakkaisilla tavoilla.\r\n\r\nSeuraavien lukujen yksityiskohtaiset analyysit Grotowskin Akropoliksesta (1962-69) ja Kantorin ohjauksesta Kuolkoot taiteilijat! (1985) purkavat paitsi kyseisten esitysten esinedramaturgioita, myös ohjaajien pidemmän aikavälin painotuksia ja heidän perinteistä profiloitumistaan  näyttelijöiden  ja  esineteatteriin . Lyhyessä epilogissa tarkastellaan yleisempiä jännitteitä ja jatkumoita suhteessa tämän hetken länsimaista kulttuuri- ja esitysekologiaa enenevästi määrittävään medioitumiseen ja teknologisoitumiseen."
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The general theme of the thesis is performer-object interaction, as enacted and perceived in the theatre   its overarching research question, how varieties of  meaning  may already be enacted and perceived, thereby. In theorizing this, the work generally subscribes to the cognitive turn of the humanities, but also aspires to nudge it toward an ecological ontology, more congenial to the theme: of mind or cognition  beyond the brain,   out of our heads,  inseparable from action and perception. The key concepts of the study (metaphor, image schemas, affordances) originate from cognitive linguistics and ecological psychology; the central case studies concern three specific productions directed by Jerzy Grotowski, Tadeusz Kantor, and Vsevolod Meyerhold.\r\n\r\nChapter 1 isolates the key notions of agent and object, to theorize general processes of perception, action, and cognition: progressively blurring such traditional terms for stage objects as set, props, or costume, it proceeds from  domain-specific  abstractions through  basic-level  categories and  ecological  affordances, to the  domain-general  work of conceptual blending and metaphor. In its more philosophical framing, the chapter addresses metaphors of  the Great Chain of Being    instrumental to the artificial division of mind over matter and subjects over objects   and instead, makes a theoretical case for the ecological grounding of all cognition, modified by the four influential e s: mind as embodied, embedded, extended, enacted.\r\n\r\nIn Chapter 2, this theoretical framework is further elaborated in a detailed analysis of Meyerhold s 1922 staging of The Magnanimous Cuckold   from the affordances of its  constructivist  setting to an extended discussion of its  biomechanical  acting (the then metaphors of reflexology and Taylorism, contrasted with distributed and enactive notions of cognition and skill) and from the  cultural ecology  of early Soviet Russia to the variety of interpretations the interplay of all these have historically afforded. Toward the end, the general theory is developed into something of a tentative method, as concerns how the notions of image schemas and affordances may intertwine to serve the  ecological validity  of performance analysis.\r\n\r\nWith Chapter 3, the conceptual focus shifts to Kantor s and Grotowski s notions of  poor theatre,  reflecting as they seem, a cultural ecology very different from that of Meyerhold s Russia   that of  real socialism  in Communist Poland. Key metaphors of the general mindset thus identified, Chapters 4 and 5 present detailed analyses of Akropolis, as staged by Grotowski and Józef Szajna first in 1962, and of Kantor s 1985 production of Let the Artists Die!   the former, ranging from  plot points  of performer-object interaction to the ecological and enactive emphases of Grotowski s later work; the latter, from some of Kantor s overarching objects and metaphors, throughout his career, to  distributed  notions of memory and selfhood.\r\n\r\nTo conclude, a brief Epilogue will address not only the metonymical and metaphorical  afterlives  of Grotowski and Kantor, respectively, but some of the tensions and continuities that go with  performing humanity  in the ever more mediatized ecologies of new technology that we currently inhabit. While only emerging with these new ecologies, on the notions of extended and distributed cognition such ostensibly contemporary metaphors as the  cyborg  or the  posthuman  only go to define what we ve always been already   if by the  human post  we mean a self-contained Cartesian individual, somehow disentangled from its ecological embedding."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "teatteri"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "ekologia"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kognitio"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "esineet"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Puola"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "theatre"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "ecology"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "cognition"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "objects"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Poland"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://tampub.uta.fi/handle/10024/66755"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2012    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "020",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "978-951-44-8963-1"
          },
          {
            "code": "q",
            "value": "PDF"
          }
        ]
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:ISBN:978-951-44-8963-1"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Intermediality and media change."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "b",
            "value": "Tampere University Press,"
          },
          {
            "code": "c",
            "value": "2012."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (304 s. sivua)"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "This book is about intermediality as an approach to analysing and understanding media change. Intermediality and Media Change is critical of technological determinism that characterises 'new media discourse' about the ongoing digitalization, framed as a revolution and creating sharp contrasts between old and new media. Intermediality instead emphasises paying attention to continuities between media of all types and privileges a comparative perspective on technological changes in media over time and space.\r\n\r\nThe concept of intermediality refers to interaction and interrelationships between media. This focus is important in two ways. It strengthens the mutual construction and articulation of media (forms) as a vital element of the research agenda. In contrast to the emphasis on convergence, it also permits the consideration of the parallel construction and articulation of specific features and identities that characterise a medium, as well as the emergence of new divergences. \r\n\r\nIntermediality and Media Change studies intermediality from both theoretical and empirical perspectives. The book starts by positioning intermediality as a theory and a methodological approach. The first group of articles focuses on critical reflection of media and mediation as concepts. The second group deals with intermediality in discourses about media change. The third group concentrates on analysis of representative cases, and the fourth group focuses on media institutions and professions."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Herkman, Juha"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hujanen, Taisto"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Oinonen, Paavo"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:ISBN:978-951-44-8963-1"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2012    fi |||||o|||||||| ||fin  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "urn:nbn:fi:uta-1-23087"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "fin"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "HAAPALA, RITVA,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "MISTÄ TYYTYMÄTTÖMYYS SYNTYY? Hallintokantelun sisällöt sosiaalipalveluissa ja toimeentulotuessa."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2012."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (139 +7 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lisensiaatintyö"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lisensiaatintyö :"
          },
          {
            "code": "c",
            "value": "University of Tampere"
          },
          {
            "code": "d",
            "value": "2012."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tutkimuksessa kuvataan hallintokantelujen sisältöä sosiaalipalvelujen asiakkaan näkökulmasta. Siinä selvitetään mistä tyytymättömyys palvelutapahtumassa ja ensi vaiheen päätöksenteossa syntyy ja mitkä oikeudenmukaisuuden periaatteet jäävät toteutumatta. Tutkimuksessa etsitään vastausta kysymykseen ”Mistä tyytymättömyys sosiaalipalvelujen palvelutapahtumassa syntyy?”Tutkimusaineistona on Länsi-Suomen lääninhallituksessa vuosina 2007 ja 2008 ratkaistuista kanteluista asiakirjahallintajärjestelmään tehtyjä merkintöjä (498 kantelua) ja niitä koskevia asiakirjoja (30 kantelukirjettä).\n\nTilastollisen analyysin avulla selvitetään, miten sosiaalipalveluja koskevat kantelut jakaantuvat alueittain, mihin sosiaalipalveluihin ne kohdistuvat ja mikä on niiden syy. Laadullisessa analyysissä kategoria-analyysin avulla kuvataan tarkemmin kanteluun johtaneita syitä.Tilastolliset tutkimustulokset osoittavat, että kantelut koskevat yleisimmin toimeentulotukea, vanhustenhuoltoa ja lastensuojelua. Asiakkaiden tyytymättömyys kohdistuu erityisesti palvelun järjestämiseen ja toimintatapoihin liittyviin tekijöihin, päätöksen sisältöön sekä hoidon laatuun ja resursseihin. Laadulliset tulokset syventävät ja monipuolistavat tilastollisia tuloksia. Niiden perusteella sosiaalipalvelujen tyytymättömyys kohdistuu eniten työntekijöiden hallintomenettelylliseen osaamiseen, palvelun järjestämiseen ja toimintatapoihin sekä asiakkaan kohteluun.Tilastollisen analyysin perusteella esiin nousee kolme tyytymättömyyden syytä, jotka liittyvät sekä jakavan että menettelytapojen oikeudenmukaisuuden periaatteisiin. Laadullisten tulosten mukaan eniten tyytymättömyyttä herättäneet syyt liittyvät menettelytapojen oikeudenmukaisuuteen, jakavaan oikeudenmukaisuuteen sekä vuorovaikutuksen oikeudenmukaisuuteen.\n\nTutkimus vahvistaa käsitystä siitä, että asiakkaiden tuottama ”toinen tieto” tulee asettaa sosiaalityön tutkimuksessa arvostetulle paikalle eikä toiminnan kehittäminen saa perustua yksin tilasto- tai rekisteriaineistoihin. Tutkimustulosten perusteella nousee tärkeänä esiin viranomaisten velvollisuus jatkuvasti kehittää tilastointi- ja rekisteröintimenetelmiä, joissa myös asiakkaan ääni tulee konkreettisesti esiin ja samalla kerätään moniulotteisempaa tietoa. Palvelun järjestämiseen, hallintomenettelyyn ja asiakkaan kohteluun liittyvät tekijät tulee nostaa työmenetelmien kehittämisessä keskiöön. Hallintomenettelyn osaamiseen ja vuorovaikutustaitojen kehittämiseen tulee panostaa entistä enemmän alan koulutuksen suunnittelussa. Hallintomenettelyn oikeellisuuden takaaminen on sosiaalityön yksi vahvoista kulmakivistä yhdessä varsinaisen sosiaalityön sisällön kanssa ja se tulee asettaa sille kuuluvalle paikalle, samalle tasolle sosiaalialan substanssiosaamisen kanssa.\n\nAsiasanat: sosiaalipalvelu, toimeentulotuki, hallintomenettely, hallintokantelu, oikeudenmukaisuus"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/urn:nbn:fi:uta-1-23087"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2015    fi |||||o|||||||| ||fin  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201503021156"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "fin"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mettälä, Marika,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Vanhempien kokemuksia lapsivuodeajan hoidosta potilashotellin lapsivuodeosastolla."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2015."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (46 s. + 2 liitettä sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere"
          },
          {
            "code": "d",
            "value": "2015."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "lapsivuodeaika"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kokemus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "vanhemmat"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201503021156"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2015    fi |||||o|||||||| ||fin  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201507282171"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "fin"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Åkerman, Christa,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "\"Finland, a country with an unshakable sense of fair play\" : The New York Timesin suomalaisrepresentaatiot 2003-2013."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2015."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (83 sivua sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere"
          },
          {
            "code": "d",
            "value": "2015."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "closedAccess"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "representaatio"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "stereotypia"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "maakuva ja kansallisuus"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201507282171"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2016    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "020",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "978-952-03-0038-8"
          },
          {
            "code": "q",
            "value": "PDF"
          }
        ]
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:ISBN:978-952-03-0038-8"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pokkinen, Satu,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Pain After Hysterectomy: Some anaesthesiological and surgical aspects."
          }
        ]
      },
      {
        "tag": "246",
        "ind1": "1",
        "ind2": "3",
        "subfields": [
          {
            "code": "a",
            "value": "Anestesiologisia ja leikkausteknisiä näkökohtia kohdunpoistoleikkauksen jälkeiseen kipuun"
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "b",
            "value": "Tampere University Press,"
          },
          {
            "code": "c",
            "value": "2016."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Acta Electronica Universitatis Tamperensis,"
          },
          {
            "code": "x",
            "value": "1456-954X;"
          },
          {
            "code": "v",
            "value": "1637"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Artikkeliväitöskirja"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Artikkeliväitöskirja :"
          },
          {
            "code": "c",
            "value": "University of Tampere"
          },
          {
            "code": "d",
            "value": "2016."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kipu kohdunpoistoleikkauksen jälkeen\r\n\r\nPitkittynyt lantion alueen kipu on yleistä kohdunpoistoleikkauksen jälkeen. Tässä väitöstyössä 26 % potilaista ilmoitti kokevansa kipua vielä kuusi kuukautta tähystysleikkauksella tai emättimen kautta tehtävän kohdunpoiston jälkeen. Tupakointi osoittautui vahvimmaksi ennustekijäksi kivun pitkittymiselle. Vaikka suurimmalla osalla potilaista kipu oli lievää, kivun pitkittyminen heikensi elämänlaatua. Akuutin leikkauksen jälkeisen kivun voimakkuus vaihteli huomattavasti potilaiden kesken. Nukutusaineen valinnalla ei ollut vaikutusta välittömään leikkauksen jälkeisen kivun voimakkuuteen, mutta kipu oli vähäisempää tähystystoimenpiteen jälkeen kuin emättimen kautta tehtävän kohdunpoiston jälkeen.\r\n\r\nHuolimatta kivun hoidon ja leikkaustekniikoiden kehittymisestä leikkauksen jälkeisestä kivusta kärsii edelleen merkittävä osa leikkauspotilaista. Opioidit ovat yleisessä käytössä leikkauksen jälkeiseen kivun hoitoon, mutta niillä on useita ei-toivottuja, käyttöä rajoittavia sivuvaikutuksia. Huonosti hoidettu akuutti kipu aiheuttaa turhaa kärsimystä, pitkittää paranemista ja voi olla syynä kivun pitkittymiselle.\r\n\r\nLeikkauksen jälkeisen kivun syyt ovat moninaiset. Potilaan kokeman kivun voimakkuuteen vaikuttavat kudosvaurion lisäksi perimä ja psykososiaaliset tekijät. On myös esitetty, että nukutusaineisiin liittyvillä tekijöillä saattaisi olla merkitystä leikkauksen jälkeisen kivun voimakkuuteen. Leikkauksen jälkeen kipu pitkittyy merkittävälle osalle potilaista. Aiempien tutkimusten mukaan jopa 60 % potilaista kärsii pitkittyneestä kivusta mm. raajan amputaation tai rintaonteloon kohdistuvan leikkauksen jälkeen. Kohdunpoistoleikkauksen jälkeisen pitkittyneen kivun esiintyvyydeksi on eri tutkimuksissa saatu 5 – 32 %. Suomessa tehdään vuosittain noin 6700 hyvänlaatuisista syistä johtuvaa kohdunpoistoleikkausta. Kohdunpoiston leikkaustekniikat ovat muuttuneet viime vuosina. Avoimet kohdunpoistoleikkaukset ovat vähentyneet merkittävästi ja tähystysleikkaukset lisääntyneet. Pitkittyneen kivun esiintyvyydestä tähystysleikkauksella tehtävän kohdunpoiston jälkeen on ollut aiemmin vähän tietoa.\r\n\r\nVäitöstyön aineisto koostuu 242 potilaasta, joille tehtiin kohdunpoisto joko tähystystoimenpiteenä tai emättimen kautta hyvänlaatuisista syistä. Potilaat nukutettiin joko kaasulla tai suonensisäisellä nukutusaineella. Seuranta-aika välittömän leikkauksen jälkeisen kivun osalta oli 20 tuntia. Potilaille lähetettiin kirjekysely kuusi kuukautta kohdunpoiston jälkeen. Kuudelletoista potilaalle tehtiin lisäksi kliininen tutkimus, kun aikaa leikkauksesta oli kulunut 10 - 44 kuukautta.\r\n\r\nTämä tutkimus osoitti, että pitkittynyt leikkauksen jälkeinen kipu on yleistä myös tähystysleikkauksella tai emättimen kautta tehtävän kohdunpoiston jälkeen. Iso osa tästä kivusta on hermoperäistä. Ehkäistäksemme kivun pitkittymistä, tulee meidän pyrkiä löytämään ennalta ne potilaat, joilla riski kivun pitkittymiseen on suurentunut.  Kova akuutti kipu on yksi tunnetuista riskitekijöistä kivun pitkittymiselle. Koska yksilöllinen vaihtelu kivun voimakkuudessa on huomattavaa, tulee akuutti kipu hoitaa yksilöllisesti eri kivun hoidon keinoja yhdistellen.  Jos kipu pitkittyy, tulee se hoitaa kivun luonteen mukaisesti."
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Postoperative pain is one of the most significant factors that impact on the patient´s recovery from surgery. Despite many advances in pain management it remains a challenge to achieve the appropriate treatment for every surgical patient. Many factors affect the severity of acute pain. It remains unresolved whether the choice of anaesthetic has any significance on the severity of postoperative pain. How different approaches to hysterectomy affect the pain experienced likewise remains unknown. Severe acute postsurgical pain is a risk factor for persistent pain. A surgical technique entailing a great risk of nerve damage is another of the significant predictors of persistent postsurgical pain. However, very little is known about the specific predictors and characteristics of persistent pain after hysterectomy.\r\n\r\nThe aim of this thesis was to study whether the choice of anaesthetic, i.e. propofol or sevoflurane, or the choice of surgical technique (vaginal or laparoscopic), has any impact on acute postoperative pain. The aims were also to ascertain the prevalence of persistent postsurgical pain after vaginal or laparoscopic hysterectomy, the characteristics of persistent pain after hysterectomy, predictors for persistent pain, and the impact of pain on patients´ health related quality of life.\r\n\r\nIn Study I, the consumption of oxycodone among 148 women undergoing laparoscopic hysterectomy with or without salpingo-oophorectomy for benign conditions was measured for 20 postoperative hours. The patients were randomly assigned to receive either sevoflurane or propofol as their main anaesthetic during surgery. The patients were blinded in regard to the anaesthetic. The primary endpoint was the cumulative consumption of oxycodone.  The secondary endpoints were the severity of pain, nausea and state of sedation. \r\n\r\nStudy II included women undergoing hysterectomy with or without salpingo-oophorectomy for non-malignant reasons. Vaginal and laparoscopic surgical procedures were used in 90 and 74 patients respectively. The main indication in both groups was uterine leiomyomas. General anaesthesia was used in all cases. The anaesthesia protocol was the same as in the propofol group in Study I. The primary endpoint was the cumulative consumption of oxycodone in 20 postoperative hours. The secondary endpoints were severity of pain, duration of surgery, length of hospital stay and blood loss.\r\n\r\nIn Study III, the prevalence of persistent postsurgical pain six months after hysterectomy was evaluated using a questionnaire sent to the 242 patients of Studies I and II. The final study population consisted of 227 respondents.  Questions about the severity and characteristics of persistent pelvic pain, sleeping disorders and the effect of pain on daily activities were included.\r\n\r\nIn Study IV clinical examinations were performed on 16 women who had participated in Study III and suffered persistent pelvic pain for over six months after hysterectomy. The patients were also asked to complete the SF-36 generic health status measure.\r\nThe choice of anaesthetic, sevoflurane or propofol, for the maintenance of anaesthesia had no impact on the amount of oxycodone consumed, or on the severity of pain as rated by pain scores in the acute phase period after hysterectomy. The pain was more severe one hour after vaginal hysterectomy than after laparoscopic hysterectomy. Thereafter the need for oxycodone was greater after vaginal hysterectomy than after laparoscopic hysterectomy although the difference was significant only four and six hours after surgery. The prevalence of persistent pelvic pain six months after hysterectomy was 26%. Pain was rated mild by most of the patients and severe by four (6.9%) of the 58 patients. In a multivariable analysis, smoking, severity of acute postoperative pain and laparoscopic procedure were associated with persistent pain after hysterectomy. The persistent pelvic pain after hysterectomy was regarded as pain mostly caused by surgery and was neuropathic in nature in over half of the patients. The women suffering from persistent pain after hysterectomy had impaired health related quality of life compared with the Finnish general female cohort of 1,133 women.\r\n\r\nIn summary, anaesthetic seems to have no clinical significant effect on the severity of pain. Postoperative acute pain seems to be less severe after laparoscopic hysterectomy than after vaginal hysterectomy. Persistent postsurgical pain is common after hysterectomy, the underlying mechanisms appear to be variable and smoking is the strongest predictor for pain. Although persistent pain interferes little with daily activities it has an impact on the health related quality of life."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kohdunpoisto"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kipu"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "anestesia"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "hysterectomy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "pain"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "anaesthesia"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:ISBN:978-952-03-0038-8"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2015    fi |||||o|||||||| ||fin  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201603071283"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "fin"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Koskela, Minja,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Se on työtä vaan : seksityöntekijänä suomalaisessa yhteiskunnassa - vapaaehtoisesti seksityötä tekevien suomalaisnaisten kokemuksia."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2015."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (103 s. sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere"
          },
          {
            "code": "d",
            "value": "2015."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "closedAccess"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "seksityö"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "toimijuus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "stigma"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "seksin oston kriminalisointi"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201603071283"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2016    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201611142566"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mäkinen, Ilkka,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "From library and information science through information studies to information studies and interactive media: emergence, expansion and integration of information studies at the University of Tampere illustrated in word clouds."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2016."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1368-1613;"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Journal has an CC-BY-NC-ND 3.0-licence"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "informaatiotutkimus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "informaatiotutkimus ja interaktiivinen media"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tampereen yliopisto"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "sanapilvet"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "tieteenhistoria"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "information studies"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "information studies and interactive media"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "University of Tampere"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "word clouds"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "history of science"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Järvelin, Kalervo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Savolainen, Reijo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Sormunen, Eero,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201611142566"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "2",
        "subfields": [
          {
            "code": "u",
            "value": "http://www.informationr.net/ir/21-1/memo/memo4.html"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2016    fi |||||o|||||||| ||fin  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201612162852"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "fin"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lindfors, Pirjo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Koulujen toimintakulttuuri hyvinvoinnin näkökulmasta."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "b",
            "value": "Helsingin yliopisto,"
          },
          {
            "code": "c",
            "value": "2016."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Helsingin yliopisto. Käyttäytymistieteellinen tiedekunta. Opettajakoulutuslaitos. Tutkimuksia,"
          },
          {
            "code": "v",
            "value": "398"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Karvonen, Sakari,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Minkkinen, Jaana,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Rimpelä, Arja,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hotulainen, Risto"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Rimpelä, Arja"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hautamäki, Jarkko"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Karvonen, Sakari"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kinnunen, Jaana M"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kupiainen, Sirkku"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lindfors, Pirjo"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Minkkinen, Jaana"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pere, Lasse"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Thuneberg, Helena"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Vainikainen, Mari-Pauliina"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Wallenius, Tommi"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201612162852"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2012    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201612212892"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hakkarainen, Jani,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Kaila's Reception of Hume."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "b",
            "value": "Societas philosophica Fennica,"
          },
          {
            "code": "c",
            "value": "2012."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Acta Philosophical Fennica,"
          },
          {
            "code": "x",
            "value": "0355-1792;"
          },
          {
            "code": "v",
            "value": "89"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Niiniluoto, Ilkka"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pihlström, Sami"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201612212892"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201703291375"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Millei, Zsuzsa,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Ad-hoc numbers forming provision and policy: round and round of universal access in an Australian preschool."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0300-4430;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201703291375"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201703301377"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Oulasvirta, Lasse,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Adoption of comprehensive risk management in local government."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0300-3930;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Anttiroiko, Ari-Veikko,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201703301377"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201705021493"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kudo, Saki,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "The influence of firms on female lifecycle decisions."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (64pp sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Recently, a dramatic increase in the labor force participation of women in many countries has occurred. Female lifestyle choices appear to be more flexible than they were earlier. Yet certain cross-national differences remain. What causes these differences to emerge? \r\n\r\nMy Master's thesis addressed how the decisions of firms regarding family leave influence the decision-making process of women. According to a game theoretic model, the availability and cost of childcare are the two central factors in the explanation of the choices that women make in relation to having a child and returning to work after taking a leave. Moreover, the replacement rate of paternity leave raises the question of the father's participation in taking care of a child. The length of leave strengthens the preference of a child during a leave. Lastly, the possibility of a fine has an effect on the recruitment phase as it might weight the cost of hiring a new employee in case the firms decide not to offer leave. In addition, a laboratory experiment demonstrated the impact of absence on the interactive decision-making between firms and workers. The positive and statistically significant correlation and causality between the wage provision by firms and the effort level set by workers was observed. Moreover, the absence of workers decreased the wage provision and the effort level. \r\n\r\nIn sum, this study contributed to the way in which female lifecycle decisions are formed theoretically. The influence of firms on the lifecycle decision of female workers was found to be absolutely substantial. The results of the model and the laboratory experiment provided a rigorous scientific foundation for developing the efficient instruments of promoting a gender equal society."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "gender equality"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "lifecycle decisions"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "family policy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "the absence of work"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "the influence of firms"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "lifestyle preferences"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201705021493"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2016    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201705081535"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Ulmanen, Sanna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Students’ experiences of the development of emotional engagement."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2016."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0883-0355;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "oppilaiden emotionaalinen koulutyöhön kiinnittyminen"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kuulumisen kokemus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "opettaja-oppilas vuorovaikutus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "vertaisvuorovaikutus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "students' emotional engagement"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "sense of belonging"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "teacher-student relationships"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "peer relationships"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Soini, Tiina,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pietarinen, Janne,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pyhältö, Kirsi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201705081535"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2016    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201705101549"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kallio, Kirsi Pauliina,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Children's caring agencies."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2016."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0962-6298;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "huolenpidon politiikka"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "lasten poliittisuus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "huolehtiva toimijuus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "poliittinen maantiede"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "politics of care"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "children's politics"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "caring agency"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "political geography"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Bartos, Ann E.,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201705101549"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201705161571"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Sianoja, Marjaana,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Enhancing daily well-being at work through lunchtime park walks and relaxation exercises : Recovery experiences as mediators."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1939-1307;"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Online First Publication March 3 2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "lunchtime recovery"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "park walking"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "relaxation exercise"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "detachment"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "enjoyment"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Syrek, Christine,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "de Bloom, Jessica,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Korpela, Kalevi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kinnunen, Ulla,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201705161571"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2016    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201705301737"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kuusela, Hanna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "The Material Trajectories of Cultural Texts : The Bookseller of Kabul and the Ahistoric Women of Afghanistan."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2016."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0256-0046;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201705301737"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201706011774"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pascucci, Elisa,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Community infrastructures: shelter, self-reliance and polymorphic borders in urban refugee governance."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "2162-2671;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201706011774"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201706192048"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lobanovskiy, Arseniy,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Guessing right and wrong : intra-party bargaining and electoral uncertainty : a game-theoretical study of policy-motivated factions and voters in a two-party democracy with a laboratory experiment."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (73 + bibliorgaphy + appendices sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "How do political parties work on the inside? Which factors determine their policies? What is the place of the electorate in the functioning of parties? In the past two decades, the search for the answers to these questions have spurred a number of important contributions to the game theoretical literature on political parties that examined party politics either at the level of individual politicians and voters, or as a process involving factions- the intra-party groups of like-minded party members. This thesis attempts to expose the internal policy-setting mechanism of political parties by reconciling the logic of the two approaches. A formal model is introduced to describe how the two factions of a governing party decide on its official policy point in a one-dimensional policy space, and how their choice is assessed by the individual voters, whose policy preferences coincide with those of either of the factions. The theoretical predictions derived from the analysis of the model are evaluated with a laboratory experiment. The findings from the statistical evaluation of the experimental results confirm that the policy change that leads to the re-election of the party occurs in a fragile equilibrium characterised by a positive policy distance difference between the ideal points of the factions and voters, who see the electoral uncertainty as less important than the policy motivation. A negative policy distance difference tends to result in the re-election of the incumbent party on its current policy preserved by the factions. Still, the greater presence of imperfect information significantly increases incentives for a policy change and induces voter defection to the opposition if the current policy is retained, as shown by the theory and the experimental analysis. In general, this study places voters at the heart of intra-party policy-setting while benefitting our understanding of the collective aspect of factional bargaining and shedding a new light on the electoral success and policy stability of political parties."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "political parties"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "party factions"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "voting behaviour"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "imperfect information"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "sequential game"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "laboratory experiment."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201706192048"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201706262090"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Heba Sigurðardóttir,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "There is only one colour that truly matters - Global identification and consciousness in Avaaz discourse on global activism."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (70 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The topic of this thesis is to study how the digital activist movement Avaaz facilitates global identification and global consciousness via their framing and discourse on various social and ecological issues in their campaigns. This case study also examines how members of Avaaz talk about the goals of the organization and their world vision in a global public sphere. By examining such discourses one can discern what kind of a common understanding among peoples of diverse national backgrounds exist. \r\n\r\nI will look at the case of Avaaz from the perspective of world society theory and neo-institutionalism, and make comparison to perspectives from social movement theories.  One of the main arguments presented is how world culture provides an important impetus for global civic activism in contrast of being simply a question of availability of political opportunities or resources as maintained by some social movement theories. \r\n\r\nAs a method of investigation, I use critical discourse analysis on texts produced by Avaaz in the form of emails, Internet web pages and comments posted by Avaaz members. As analytical tools, I make use of concepts of scripts, framing and membership categorization to showcase how a discourse plays important role in facilitating global identification and moral justification for global activism.\r\n\r\nI argue that Avaaz uses moral frames when highlighting issues for their audiences, in particular through certain narrative structure, vernacular and via images where actors become defined belonging to certain categories that imply moral and immoral actions. Furthermore, the Avaaz rhetoric makes assumptions on the universality of values and norms and of identity and thus appeals to a  global identification  and a  global consciousness.  It is through such collective identity that global activism becomes justified as well through certain social imageries of the world that appear through narrative scripts.  Furthermore, through utilizing language of inclusion and through offer of empowerment Avaaz frames activism as relevant on an intimate and personal level making global activism as much about the individual as it is about the world.  Finally, I argue that Avaaz utilizes epistemic governance in their act of persuasion, that the movement utilizes moral authority which explains in part the  discursive power  of Avaaz and its appeal to global society.  Thus I suggest that the significance of new digital social movements can be understood in the way they circulate and re-inforce certain discourses that tie to world culture.  In addition, the act of signing petitions and participating in demonstrations are also performances of morality that rather than actions that are expected to bring about immediate changes."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "global identity"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "global consciousness"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "new social movements"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Avaaz"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "epistemic governance"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "membership categorization"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201706262090"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201706262093"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hietala, Verneri,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Think Global, Act Local : Cultural Policies of Dundee from World Cultural Perspective."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (59 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Despite growing interest in neo-institutionalism and world culture theory in recent years, few studies have researched urban cultural policies from this perspective. By far the most research on urban cultural policy-making relies on rational choice and structural theoretical perspectives. The purpose of this thesis is to acquire new knowledge on urban cultural policies by examining the main justifications of cultural policies in Dundee from world cultural theoretical perspective. \r\n\r\nThis thesis is organised as a case study and it analyses the justifications ascribed to cultural policies in the official cultural policy documents of the city of Dundee. It utilises critical discourse analysis and social-interactive discourse theory as its prime methodological tools. \r\n\r\nThe analysis indicates that the cultural policies are justified using economic, social, intrinsic as well as global justifications. While the use of economic, social and intrinsic benefits as justifications has been identified in earlier research, the additional emphasis on global justifications in the documents of Dundee is a finding which lends credence to the explanatory power of world culture theory. Further analysis of the documents reveals clear diffusion of global influences which takes place through four key conduits of world culture: international organisations, universities, statistics and measurement, and global political culture. Finally, the analysis reveals some contradictory features in the documents, which do not make sense from pure rational choice and structural perspectives. This suggests that it is not only possible but in fact imperative to trace back the sources of different cultural policy justifications to the global discourse on cultural policies. \r\n\r\nThe results of the study emphasise the need to conduct more research on urban cultural policies from the perspective of world culture theory. This is because the theory reveals how different policies, which are conventionally viewed to be of local origin and to serve local interests, are in fact better understood as globally shared policy models."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "world culture theory"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "urban cultural policies"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "discourse analysis"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "policy documents"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Dundee"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201706262093"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201706262098"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kalchev, Daniel,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "The impact of positive emotions on altruism in the presence of familiarity."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (66 pp + appendices + figures sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "This research studies the impact of positive emotions on altruism in different social contexts (or degrees of familiarity). In other words, it investigates to what extent emotional inducement techniques are able to stimulate pro-social behavior among perfect strangers and among real-life friends. \r\n\r\nA growing body of literature has studied the complex nature of emotions and their role in the decision making process. Other scholars have investigated how social networks influence people s behavior. Yet most of the laboratory experiments in the field have focused predominantly on negative emotions, while keeping the subjects anonymous to each other without account for familiarity. To address this research gaps, I designed an experiment that compares four different treatments - a control group, a positive emotions group with strangers, an emotionally neutral group with friends, and a positive emotions group with friends. The participants in all groups were matched in pairs and played the  dictator game . \r\n\r\nThe results from the statistical analysis show that friendship is a highly significant predictor of altruistic behavior   the dictators in these treatments redistributed more money on average. On the other hand, positive emotions are not statistically significant, thus, failing to reject the null hypothesis. I look at three social theories that provide explanations for the strong connection between social relationships and altruism. Furthermore, I discuss why the emotional framing was not successful and stress on the role of negative emotions to provoke empathy and desire to help others. Additionally, I analyze the self-reported justifications of the subjects who pointed to sense of fairness and equality as their main motives to redistribute more. All of the presented arguments reveal the ambiguous nature of pro-social behavior - pure versus impure altruism. \r\n\r\nDespite some limitations, my experiment produced valid and interesting findings that raised some questions for future research."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "experimental economics"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "laboratory experiment"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "altruism"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "familiarity"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "positive emotions"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "dictator game"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201706262098"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201706262101"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kuivalainen, Tuomo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Comparative education systems : student performance & private and public funding, management and schools : a case study of Finland and Sweden."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (57 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Student performance has been used extensively in discussion about the quality of education systems in both academic and non-academic writing. This thesis examines the role of private and public provision of education in student performance. Using PISA data from 2003-2015 this thesis examines Finland and Sweden as most similar cases with a major difference in the role of market incentives in their education systems. \r\n\r\nThis thesis uses a multilevel regression model with student and school level variables. While private schools tend to correlate with higher student performance results for an individual student, the student level features such as socio-economic background have a more significant impact on student attainment. The analysis does not support the theoretical notion that through competition school quality will increase in both the private and public sector when measuring student performance. Further research into student selection can help in determining factors regarding the possible performance gap in private and public schools yet lower overall student performance in a system with a larger private sector."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "education systems"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "education policy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "private provision"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "public provision"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201706262101"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201706262112"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Qureshi, Mohammad Ahsan,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Epistemic Governance in the Discourse Around the Blasphemy Laws in Pakistan: A review of columns in Dawn and Daily Jang."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (74 pp +7 appendix pages sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "After visiting Aasia Bibi, a convicted blasphemer, Governor Salman Taseer criticized the Blasphemy Laws and sought amendments in them to make them more transparent. In a matter of weeks, his own body guard, Mumtaz Qadri, killed the Governor. This chain of events led to some cautioned debate across different segments of the Pakistani society. This study looks at the discourse around the Laws after Taseer visited Aasia Bibi till the execution of Qadri. Columns from Dawn and the Daily Jang were analyzed in the study using the epistemic governance approach. As predicted by the theory, the study found a wide array of imageries and objects of epistemic work throughout the narratives. Differences and similarities between the findings from the two newspapers were recognized and contextualized in line with their targeted readership. Interestingly, the forms of governance and imageries were very similar between the two papers even though they catered to different segments of the society. The study also recognized the clashing and integration of different world cultures within the discourse around the Laws. Further findings include the observation of heroism and mythification of historical figures in the narratives."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Blasphemy Laws"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Epistemic Governance"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "World Culture"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201706262112"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201706272121"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hänninen, Timo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Interpreting change on the SCAT3 in professional ice hockey players."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1878-1861;"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "© <2017>. This manuscript version is made available under the CC-BY-NC-ND 4.0 license http://creativecommons.org/licenses/by-nc-nd/4.0/"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "brain concussion"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "head injuries"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "baseline survey"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "ice hockey"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Parkkari, Jari,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tuominen, Markku,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Iverson, Grant L,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Öhman, Juha,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Vartiainen, Matti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Luoto, Teemu M,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201706272121"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201706292160"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Harjunpää, Ielyzaveta,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Nudging Sustainability: Triggering Conservation Behaviour in the Household s Electricity Consumption."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (43 pages + 1 appendix sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "This study looks at potential polycentric solutions for reducing greenhouse gas emission by engaging and nudging residents to lower their household s electricity consumption. More specifically, it seeks to nudge respondents towards energy conservational behavior using libertarian paternalism ideology and the principles of choice architecture. The study is focused on subjects in Finland, where the electricity bill is not a financial burden and society is environmentally responsible. Based on the limited data provided by an energy company, the analysis provides insights on the patterns of household s electricity consumption and comparison of electricity usage between household s with smart solutions and without. Based on previous research and findings of the study, a prepaid contract is suggested to nudge people to more sustainable behavior in regards to their energy consumption with long-term effects and without the need for any financial incentives."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "nudge"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "choice architecture"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "behavioral economics"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "energy behavior"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "environmental values"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "polycentricity"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201706292160"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201708292341"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Koski, Kaisu,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Exploring Vaccine Hesitancy Through an Artist–Scientist Collaboration: Visualizing Vaccine-Critical Parents’ Health Beliefs."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1872-4353;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Holst, Johan,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201708292341"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201709122420"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Serlachius, Anna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Does high optimism protect against the inter-generational transmission of high BMI? The Cardiovascular Risk in Young Finns Study."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0022-3999;"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "© <2017>. This manuscript version is made available under the CC-BY-NC-ND 4.0 license http://creativecommons.org/licenses/by-nc-nd/4.0/"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pulkki-Råback, Laura,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Juonala, Markus,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Sabin, Matthew,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lehtimäki, Terho,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Raitakari, Olli,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Elovainio, Marko,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201709122420"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201709122421"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mauno, Saija,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Does recovery buffer against emotional labor outcomes at work? Analyzing age differences care professionals."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0897-1897;"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "© <2017>. This manuscript version is made available under the CC-BY-NC-ND 4.0 license http://creativecommons.org/licenses/by-nc-nd/4.0/"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Ruokolainen, Mervi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "de Bloom, Jessica,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kinnunen, Ulla,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201709122421"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201709192448"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Helve, Helena,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Identity Horizons Among Finnish Postsecondary Students : A Comparative Analysis."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1528-3488;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Côté, James,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Svynarenko, Arseniy,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Sinisalo-Juha, Eeva,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mizokami, Shinichi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Roberts, Sharon E,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Nakama, Reiko,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201709192448"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201709222465"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Soini, Tuuli,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Long-term Follow-up After Endometrial Ablation in Finland : Cancer Risks and Later Hysterectomies."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0029-7844;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Rantanen, Matti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Paavonen, Jorma,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Grénman, Seija,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mäenpää, Johanna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pukkala, Eero,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Gissler, Mika,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hurskainen, Ritva,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201709222465"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201709282489"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hirvonen, Hanna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "The effect of cryotherapy on total antioxidative capacity in patients with active seropositive rheumatoid arthritis."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1437-160X;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "rheumatoid arthritis"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "cryotherapy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "antioxidant capacity"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "peroxyl radical trapping"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "rehabilitation"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kautiainen, Hannu,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Moilanen, Eeva,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mikkelsson, Marja,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Leirisalo-Repo, Marjatta,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201709282489"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||fin  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201709282488"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "fin"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Härkönen, Saaga,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Konflikteja, yhteisymmärrystä ja monipuolisia merkityksiä : digitaalinen media nuoren ja vanhemman välisessä suhteessa."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (92 s., 3 liites. sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tutkimuksen aiheena on digitaalinen media nuoren ja vanhemman välisessä suhteessa. Aikaisempi tutkimus on usein keskittynyt tarkastelemaan digitaalista mediaa joko sen negatiivisten tai positiivisten puolien näkökulmasta. Nuoria ja digitaalista mediaa koskevaa julkista keskusteluakin on leimannut sekä moraalipaniikki että näkemys taitavien diginatiivien sukupolvesta. Tämän tutkimuksen tavoitteena on tarkastella monipuolisemmin digitaaliseen mediaan liittyviä merkityksiä, kokemuksia ja keskusteluja, jotka paikantuvat nuoren ja vanhemman väliseen suhteeseen. \r\n\r\nTutkimusaineistona käytettiin eläytymismenetelmän avulla kerättyjä tarinoita. Tarinoiden kirjoittajina olivat 15-vuotiaat nuoret. Tutkimuksellisena kiinnostuksenkohteena oli, millaisia kertomuksia nuoret pystyvät kuvittelemaan kännykkään sekä nuoren ja vanhemman väliseen suhteeseen liittyen, sekä millaisia erilaisia positioita tarinoissa konstruoidaan nuorelle ja vanhemmalle. Analyysissä hyödynnettiin diskurssianalyysiä erityisesti positioteorian osalta, sekä kertomusten ja kerronnallisuuden tutkimusta fiktiivisen aineiston analysointiin. Tutkimuksen metateoreettinen tausta painottuu ontologiseen sosiaaliseen konstruktionismiin. \r\n\r\nAnalyysin pohjalta nuorten tarinoista muodostettiin kaksi perustarinaa: konfliktitarina, joissa kännykkä aiheutti nuoren ja vanhemman välille konfliktin, sekä yhteisymmärrystarina, joissa kännykän ympärillä tapahtuva tilanne päättyy nuoren ja vanhemman yhteisymmärrykseen. Näiden kahden perustarinan kategorian sisälle aineistosta muodostettiin tyyppikertomuksia, joiden avulla tarkasteltiin spesifimmin konfliktiin tai yhteisymmärrykseen johtaneita tilanteita, sekä nuoren ja vanhemman positiointeja näihin tilanteisiin liittyen. \r\n\r\nTutkimuksesta käy ilmi, että erityisesti vanhempien toiminnalla vaikutti olevan merkitystä siinä, päättyvätkö tilanteet konfliktiin vai yhteisymmärrykseen. Konfliktitarinoista oli konstruoitavissa autoritääristen vanhempien positio, jossa vanhemmat eivät kuunnelleet nuorta. Yhteisymmärrystarinoista puolestaan oli konstruoitavissa ymmärtäväisten vanhempien positio, jossa vanhemmat huomioivat nuoren näkökulman ja ymmärsivät, miksi digitaalinen media on nuorelle tärkeä. Tutkimuksen tulosten pohjalta voidaan sanoa, että digitaalinen media on nuoren ja vanhemman välisessä suhteessa moniaineksinen ilmiöalue, joka ei asetu yksiselitteisesti joko positiiviseksi tai negatiiviseksi asiaksi. Tutkimuksesta käy ilmi, että digitaalinen media voi esimerkiksi yhdistää ja erottaa nuorta ja vanhempaa eri tavoin, tuoda nuorelle arvostusta perheessä, aiheuttaa ristiriitoja, sekä synnyttää rakentavia keskusteluja."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "digitaalinen media"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kännykkä"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "nuoret"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "vanhemmat"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "sosiaalinen konstruktionismi"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eläytymismenetelmä"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kertomukset"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kerronnallisuus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "positiot"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201709282488"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201709282492"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lauronen, Sirkka-Liisa,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Thermal suit in preventing unintentional intraoperative hypothermia during general anaesthesia: a randomized controlled trial."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0001-5172;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kalliomäki, Maija-Liisa,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aho, Antti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kalliovalkama, Jarkko,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Riikonen, Jarno,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mäkinen, Marja-Tellervo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Leppikangas, Heli,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Yli-Hankala, Arvi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201709282492"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201709282494"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Marttila, Saara,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Human endogenous retrovirus HERV-K(HML-2) env expression is not associated with markers of immunosenescence."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0531-5565;"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "© <2017>. This manuscript version is made available under the CC-BY-NC-ND 4.0 license http://creativecommons.org/licenses/by-nc-nd/4.0/."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "human endogenous retrovirus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "HERV-K(HML-2)"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "ageing"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "immunosenescence"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "B cells"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Nevalainen, Tapio,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Jylhävä, Juulia,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kananen, Laura,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Jylhä, Marja,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hervonen, Antti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hurme, Mikko,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201709282494"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201710042514"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Ikonen, Hanna-Mari,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "'I <3 my high-performance dog’ : love for the sport in agility coach representations in social media."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1743-0445;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "tunteet ja talous"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "sosiaalinen media"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "koiraurheilu"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "agility"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "urheiluvalmennus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "rakkaus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "affective economies"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "social media"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "dog sports"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "agility"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "sport coaching"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "love"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pehkonen, Samu,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201710042514"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201710042520"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Raittio, Lauri,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Comparison of volar-flexion, ulnar-deviation and functional position cast immobilization in the non-operative treatment of distal radius fracture in elderly patients : a pragmatic randomized controlled trial study protocol."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1471-2474;"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "BioMed Central open access"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "CC BY 4.0"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Launonen, Antti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hevonkorpi, Teemu,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Luokkala, Toni,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kukkonen, Juha,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Reito, Aleksi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Sumrein, Bakir,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Laitinen, Minna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mattila, Ville M,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201710042520"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201710042526"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Niemi, Riikka,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Urinary polyamines as biomarkers for ovarian cancer."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1525-1438;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Roine, Antti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Häkkinen, Merja,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kumpulainen, Pekka,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Keinänen, Tuomo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Vepsäläinen, Jouko,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lehtimäki, Terho,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Oksala, Niku,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mäenpää, Johanna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201710042526"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2016    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201710102578"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Enroth, Linda,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Cardiometabolic and Inflammatory Biomarkers as Mediators Between Educational Attainment and Functioning at the Age of 90 Years."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2016."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1758-535X;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Background: Low socioeconomic status (SES) is associated both with poorer functioning and elevated levels of inflammatory and cardiometabolic biomarkers, however knowledge of such relations for the oldest old is limited. Our aim was to study whether education is associated with cardiometabolic (cholesterol levels, BMI and leptin) and inflammatory (CRP, IL-6, IL-1Ra) biomarkers for the 90-year-olds who participated in the Vitality 90+ study. In addition, we investigated whether these biomarkers explain educational inequalities in functioning.\r\n\r\nMethods: All persons in Tampere, Finland, who were born in 1909 or 1910, were invited to participate, irrespective of their health status or dwelling place. The sample consisted of 262 participants who went through the home interview and blood tests. The SES indicator used was the highest education, and physical functioning was assessed using the Barthel index. The association of education with individual and combined biomarker scores, and with functioning, was analyzed cross-sectionally applying generalized linear models.\r\n\r\nResults: The low- and mid-level-educated participants had greater odds of belonging to the high risk group in cardiometabolic biomarkers than did the high-educated. Differences were statistically significant in three individual biomarkers (HDL-cholesterol, leptin, BMI) and in a cardiometabolic score. There were no educational differences in inflammatory biomarkers. When all biomarkers were combined, they mediated educational differences in functioning on an average of 23%. After controlling for smoking, alcohol use and diseases, biomarkers mediated part of the differences between the mid-level- and high-educated. \r\n\r\nConclusions: High education was associated with better cardiometabolic biomarkers and functioning among the 90-year-olds. In part, educational inequalities in functioning were explained by cardiometabolic biomarkers"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Raitanen, Jani,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hervonen, Antti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lehtimäki, Terho,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Jylhävä, Juulia,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hurme, Mikko,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Jylhä, Marja,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201710102578"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201710102580"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Karvonen, Tuomas,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Comparison of feasibility and estimates of central and peripheral nitric oxide parameters by different mathematical models."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1752-7163;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kankaanranta, Hannu,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Saarelainen, Seppo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Moilanen, Eeva,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lehtimäki, Lauri,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201710102580"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201710112598"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Ikonen, Hanna-Mari,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Passionately yours : Managing emotional and spatial boundaries in lifestyle-based hospitality businesses."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "2042-7913;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "koirat"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "matkailu ja majoitustoiminta"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "elämäntapayrittäjyys"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "uusi työ ja talous"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "intohimo"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "työn ja muun elämän yhteensovittaminen"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "dogs"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "hospitality"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "lifestyle entrepreneurship"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "new economy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "passion"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "work–life balance"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201710112598"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201710262635"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Harju, Eeva,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "The Health-Related Quality of Life of Patients with Prostate Cancer and Their Spouses before Treatment Compared with the General Population."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1440-172X;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eturauhassyöpäpotilas"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "terveyteen liittyvä elämänlaatu"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "puoliso"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "prostate cancer"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "quality of life"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "spouses"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Rantanen, Anja,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kaunonen, Marja,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Helminen, Mika,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Isotalo, Taina,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Åstedt-Kurki, Päivi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201710262635"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "020",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "978-952-03-0557-4"
          },
          {
            "code": "q",
            "value": "PDF"
          }
        ]
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:ISBN:978-952-03-0557-4"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Jalkanen, Ville,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Soluble urokinase Plasminogen Activator Receptor in Critical Illness."
          }
        ]
      },
      {
        "tag": "246",
        "ind1": "1",
        "ind2": "3",
        "subfields": [
          {
            "code": "a",
            "value": "Liukoinen urokinaasityyppinen plasminogeenia aktivoiva reseptori kriittisen sairauden ennustetekijänä"
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "b",
            "value": "Tampere University Press,"
          },
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Acta Electronica Universitatis Tamperensis,"
          },
          {
            "code": "x",
            "value": "1456-954X;"
          },
          {
            "code": "v",
            "value": "1823"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Artikkeliväitöskirja"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Artikkeliväitöskirja :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Lääketieteen ja biotieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Soluble urokinase Plasminogen Activator Receptor (suPAR) on seerumista, plasmasta, aivo-selkäydinnesteestä, amnionnesteestä tai muista elimistön nestetiloista mitattava biomarkkeri, jonka tutkimusnäyttö on osoittanut olevan useissa sairaustiloissa ja myös väestötasolla ennusteellinen. \r\n\r\nTehohoitoisella tai kriittisesti sairaalla potilaalla suPARin ennustearvo on ollut huonosti tiedossa. SuPAR-pitoisuuksien tiedetään lisääntyvän hapenpuutteessa, tulehduksissa ja tulehduksellisissa tiloissa. SuPARin on useissa tutkimuksissa osoitettu olevan ennusteellinen elintoimintahäiriöille ja erityisesti vakavissa infektiotilanteissa suPAR saattaa olla ennusteellinen kuolemalle.\r\n\r\nVäitöskirjan osatöissä selvitettiin suPARin diagnostista ja ennusteellista arvoa neljässä tehohoitoon yleisesti johtavassa sairaustilassa. Ensimmäinen osatyö käsitteli akuuttia hengitysvajausta, joka on yleisin tehohoitoon johtava syy maailmassa. Osatyössä määriteltiin suPAR-pitoisuudet seerumissa eri ajanhetkillä 454 kansalliseen FINNALI-tutkimukseen osallistuneelta tehohoitoiselta hengitysvajauspotilaalta. SuPARin ennustearvoa kuolleisuuteen ja elintoimintahäiriöihin arvioitiin operatiivisilla ja non-operatiivisilla potilailla.\r\n\r\nToisessa osatyössä tutkittiin suPARin ennustearvoa sairaalan ulkoisen sydänpysähdyksen jälkeen. Neurologisen toipumisen ennustaminen sydänpysähdyksen jälkeen on haasteellista ja perustuu kliinisen tilanteen lisäksi kuvantamistutkimuksiin, elektrofysiologisiin tutkimuksiin sekä neuroni-spesifisen enolaasin (NSE) tai S-100B-proteiinin mittaamiseen. Tutkimuksessa suPAR määritettiin 287 FINNRESUSCI-tutkimukseen osallistuneelta sairaalan ulkopuolisen sydänpysähdyksen saaneelta potilaalta. Keskeisimpinä päätemuuttujina seurattiin potilaiden kuolleisuutta ja neurologista toimintakykyä vuoden seurantajakson jälkeen ja suPARin kykyä ennustaa näitä päätemuuttujia.\r\n\r\nKolmannessa osatyössä selvitettiin suPARin ennusteellista ja diagnostista arvoa akuutissa, valtimonpullistuman aiheuttamassa lukinkalvonalaisessa verenvuodossa ja sen komplikaatioissa. Akuutti lukinkalvonalainen verenvuoto on merkittävä äkkikuoleman aiheuttaja ja saattaa aiheuttaa kuolleisuuden lisäksi vaikeaa toimintakyvyn alenemaa myös nuorille potilaille. Kaikilta Tampereen yliopistolliseen sairaalaan hoitoon tulleilta lukinkalvonalaista verenvuotoa sairastavilta potilailta määritettiin plasman suPAR-pitoisuudet eri ajanhetkillä tehohoidon aikana ja niiden ennustearvoa neurologiseen toipumiseen, aivo-selkäydinnesteen kiertohäiriöihin ja valtimoiden poikkeavan supistelutaipumuksen ja aivoverenkiertohäiriöiden ennustamisessa sekä diagnostiikassa arvioitiin.\r\n\r\nNeljännessä osatyössä tutkittiin suPARin käyttäytymistä pre-eklampsiassa. Pre-eklampsia on yleisin äitikuolleisuutta aiheuttava sairaus maailmanlaajuisesti ja tulehdusreaktion arvellaan olevan keskeinen patofysiologinen mekanismi sairauden taustalla. Tutkimus suunniteltiin pieneksi pilottitutkimukseksi ja siihen otettiin 10 Tampereen yliopistolliseen sairaalan hoitoon tullutta vaikeaa pre-eklampsiaa sairastavaa raskausviikoilla 24-34 olevaa äitiä. Verrokkiryhminä käytettiin 10 perustervettä fertiili-ikäistä naista sekä 10 vastaavilla raskausviikoilla olevaa naista, joiden raskaus oli edennyt normaalisti. \r\nTutkimustulosten mukaan suPAR pitoisuudet seerumissa ja plasmassa ovat suurentuneita kriittisesti sairailla potilailla. Hengitysvajauspotilailla matala suPAR ennustaa hyvää toipumista, erityisesti non-operatiivisilla potilailla. Elvytyksen ennustearvioinnissa suPAR osoittautui yhtä hyväksi ennustetekijäksi kuin yleisesti käytetty neuroni-spesifinen enolaasi, NSE. Matala suPAR-pitoisuus elvytyksen jälkeen on hyvän neurologisen toipumisen ennustemerkki. Akuutissa lukinkalvonalaisessa verenvuodossa suPAR-pitoisuudet olivat erittäin matalia, eikä pitoisuuksilla ollut ennusteellista tai diagnostista arvoa tutkittuihin päätetapahtumiin. Kliinisesti ilmenevässä vaikeassa pre-eklampsiassa suPAR-pitoisuudet ovat merkittävästi koholla. Löydöksen kliininen merkittävyys tulee arvioida suuremmissa jatkotutkimuksissa.\r\n\r\nVäitöskirjan johtopäätöksinä todetaan, että kriittisesti sairailla hengitysvajaus- ja sydänpysähdyspotilailla suPAR on ennusteellinen ja pre-eklampsiassa mahdollisesti diagnostinen. Ennusteellista arvoa kuitenkin heikentää pitoisuuksien suuri vaihteluväli ja vain kohtalaisiksi jäävät herkkyys ja tarkkuus. Matala suPAR-pitoisuus osoittautui hyvän ennusteen merkiksi hengitysvajauspotilailla ja elvytetyillä potilailla. Akuutissa valtimonpullistumasta johtuvassa lukinkalvonalaisessa verenvuodossa suPAR ei ollut ennusteellinen tai diagnostinen päätetapahtumien suhteen."
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Soluble urokinase Plasminogen Activator Receptor (suPAR) is a biomarker. The concentration of suPAR can be assayed in serum, plasma, cerebrospinal fluid, amnionic fluid or in other extracellular fluids. Current research has indicated that in several different conditions as well as in the general population, circulating suPAR levels are prognostic for mortality or severe disease progression.\r\n\r\nIn critically ill patients, the prognostic capabilities of suPAR have remained largely unexplored. The circulating suPAR concentration is known to increase during hypoxia, inflammation and infections. In previous studies, suPAR has been claimed to be prognostic for organ failure and especially in severe infections, suPAR may be prognostic for mortality and disease severity.\r\n\r\nIn the studies included in this thesis, the prognostic and diagnostic capability of suPAR concentrations in four different conditions commonly requiring intensive care unit admission were evaluated. The first investigation examined acute respiratory failure, which is the most common indication for intensive care worldwide. SuPAR levels were measured at different time points from 454 patients suffering from acute respiratory failure, admitted to intensive care and included in the national FINNALI-study. The prognostic capability of suPAR for mortality and organ failure in operative and non-operative patients was assessed.\r\n\r\nThe second publication focused on suPAR levels after out-of-hospital-cardiac arrest. The neurological prognostication after cardiac arrest is challenging and is based on clinical evaluation, radiological findings and measurement of biomarkers like neuron-specific enolase and S-100B protein. In study II, suPAR concentrations were measured from 287 patients included in the FINNRESUSCI-study. All patients had suffered an out-of-hospital cardiac arrest. The main outcomes were mortality and neurological outcome after 12 months and the prognostic capability of suPAR to predict these outcomes.\r\n\r\nThe third publication evaluated the predictive value of suPAR concentrations in acute aneurysmal subarachnoid hemorrhage. Aneurysmal subarachnoid hemorrhage is an important cause of sudden death and is responsible for severe disability, even in young patients. The plasma suPAR level was measured at different time points in patients suffering from aneurysmal subarachnoid hemorrhage who were treated in Tampere University Hospital intensive care unit. The predictive value of suPAR was determined with respect to neurological outcome and diagnostic value on vasospasm, delayed cerebral ischemia and development of hydrocephalus.\r\n\r\nIn the fourth publication, we evaluated whether assaying suPAR levels would provide clinically useful information in pre-eclampsia. Pre-eclampsia is the most common global condition causing maternal mortality and morbidity. Inflammation is thought to have a central role in the pathophysiology of pre-eclampsia. The trial was planned as a small pilot study and included 10 patients with severe pre-eclampsia in gestational weeks 24-34 who had been admitted to Tampere University Hospital. We determined SuPAR levels from ten healthy pregnant patients at similar gestational weeks and also from ten previously healthy, fertile-aged women as controls. \r\n\r\nThe results of these studies indicate that suPAR levels were elevated in critically ill patients. In acute respiratory failure, a low suPAR concentration was indicative of a good outcome in non-operative patients. In the prognostication after cardiac arrest, suPAR levels may be as predictive as the commonly used biomarker, neuron specific enolase. Low serum levels of suPAR after cardiac arrest were an indicator for good neurological outcome. In clinical pre-eclampsia, serum suPAR levels were significantly elevated. The clinical value of this result will need to be further evaluated in larger studies. In aneurysmal subarachnoid hemorrhage, suPAR levels in plasma were very low and they conferred no diagnostic or prognostic value for the evaluated outcomes.\r\n\r\nThe main conclusion emerging from this thesis is that suPAR can be prognostic in critically ill patients suffering from acute respiratory failure or after out-of-hospital cardiac arrest. SuPAR levels may be diagnostic for pre-eclampsia. However, the diagnostic and prognostic value suffers from the wide range of concentrations that lowers the sensitivity and specificity of suPAR in prognostication. Nonetheless, a low suPAR concentration is suggestive of a good outcome in acute respiratory failure and after cardiac arrest. In aneurysmal subarachnoid hemorrhage, suPAR is neither diagnostic nor prognostic."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "suPAR"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "prognostiikka"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "liukoinen urokinaasityyppinen plasminogeenia aktivoiva reseptori"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "tehohoito"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "prognostication"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "soluble urokinase plasminogen activator receptor"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "intensive care"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:ISBN:978-952-03-0557-4"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201710312652"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Haukka, Jari,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Risk of Cause-Specific Death in Individuals with Cancer — Modifying Role Diabetes, Statins and Metformin."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1097-0215;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "cancer survival"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "diabetes"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "statins"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "metformin"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Niskanen, Leo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Auvinen, Anssi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201710312652"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201710312653"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Halonen, Mia,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Tracing the indexicalization of the notion \"Helsinki s\"."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0024-3949;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Vaattovaara, Johanna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201710312653"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711022671"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Liehu-Martiskainen, Milla,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Interleukin 17A gene polymorphism rs2275913 is associated with osteitis after the Bacillus Calmette-Guérin vaccination."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0803-5253;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Bacillus Calmette-Guérin"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "innate immunity"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "interleukin 17A"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "tuberculosis"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "vaccination complications"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Korppi, Matti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Teräsjärvi, Johanna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Vuononvirta, Juho,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Huhtala, Heini,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Nuolivirta, Kirsi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kröger, Liisa,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Peltola, Ville,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pöyhönen, Laura,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "He, Quishui,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711022671"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711202725"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tirkkonen, Maria T.,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Human rights brought home : domestication of human rights discourse in Vienna."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (62 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "closedAccess"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "This thesis examines domestication of human rights discourse through the world society theory which explains the spreading of human rights as a part of the world culture. The international community has built a vast network of legal instruments and policy models which help to respect, protect, and promote human rights around the globe. Yet, the domestication of human rights involves not only legal tools and official policies, but also promotion of common understandings about human rights as moral principles. This turns my attention to the local policy-making and local actors which are key players in fitting the human rights in the local environment. \r\n\r\nDespite the growing interest in local implementation of international human rights norms, few studies have investigated the discursive side of this process. This thesis contributes to filling of this gap by conducting a case study focusing on the city of Vienna in Austria. In this thesis, discourse analysis is used as a methodological approach to analyse the city council debate over a human rights city declaration. My approach is further guided by interpretive policy analysis in considering how human rights are framed by the various parties to the debate. \r\n\r\nThe analysis is formed around five discourses which are used in the city council to give meaning to human rights. These are moral, legal, functionality, credibility and modernity discourses. Each discourse frames the issue in a different way which has consequences for the proposed policy solutions. Furthermore, while some arguments for strengthening the human rights work in the city are relevant in a certain frame, in another discourse they can seem nonsensical. \r\n\r\nThe results of the study emphasis how crucial the domestication of international ideas is in order for the international human rights ideas to be truly manifested in everyday life of people. However, the persistent focus on local political hot topics shows that the impact of world culture is blurred with locally relevant issues. Hence, I argue that the significance of local actors is great in determining whether international ideas gain local legitimacy or not. Yet, many elements of the council discourses are better explained through world culture and globally shared scripts than conventional local politics. Thus, I suggest that globalisation affects the local decision-making to an extent which goes way beyond legal standards."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711202725"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711202735"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Härkönen, Kati,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Hybrid cochlear implantation : quality of life, quality of hearing, and working performance compared to patients with conventional unilateral or bilateral cochlear implantation."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1434-4726;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kivekäs, Ilkka,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kotti, Voitto,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Sivonen, Ville,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Vasama, Juha-Pekka,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711202735"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711212747"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Honkaniemi, Noora,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Characteristics of social media usage in a B2B company : case: UPM Raflatac."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (70 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Viestintätieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Social media has become a part of our daily lives. Consumers and companies both use social media as a means of communication, way to stay connected and a channel to report on important topics. There is plenty of research investigating how B2C companies use social media to their advantage, but very little information is available on how B2B companies utilize it. Keeping in mind digital future developments, B2B studies are becoming more and more important.\r\n\r\nThis research acknowledges previous research on social media marketing, analytics and social CRM. Based on theoretical findings a proposed model for a B2B social CRM strategy is presented. Relevant social media channels are explained, highlighting how they differ from each other. Twitter, LinkedIn and Facebook are the three social media channels that are further examined and used in the case study analysis.\r\n\r\nThe aim of this thesis is to explore and analyze the characteristics of social media usage in a B2B company. This is achieved by exploring the most successful and unsuccessful social media posts a B2B company has posted on their social media channels. The empirical study is conducted by analyzing social media posts in three different social media channels, during the course of one year. The empirical research identifies different content and post types a B2B company posts on their social media channels. The study explains the characteristics of a successful and an unsuccessful post on different channels and results are finalized into a B2B social CRM strategy. A cross tabulation and chi-square analysis are also conducted. Concrete recommendations are made to the commissioned company, UPM Raflatac.\r\n\r\nThe discoveries of this study show nine different content types, based on the focus point of each social media post. Results conclude it is recommended for the company to continue posting on Twitter and Facebook. Posts on LinkedIn should not be about sustainability and the updates should not be posted on Mondays, as they have low engagements. Technical jargon should be avoided, as well as long and difficult products names. Special attention should be put on the tone of voice of each post, as it should not be too formal but relaxed and conversational. The results of this thesis give guidance to social media managers and encourage them to analyze available data and act according to the results."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "social media"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "B2B"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Facebook"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "LinkedIn"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Twitter"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "engagement rate"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711212747"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711212750"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tötterman, Kristian,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "The effects of fiscal policy on long-term interest rates : evidence from 29 OECD countries."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (79 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "How does fiscal policy affect long-term interest rates? Despite the broad literature in this field of research, the results on both the magnitude of the effect and under which conditions it prevails still remain vague today. This thesis seeks to clarify these issues. It begins by discussing the link between fiscal policy and interest rates from a theoretical point of view and by reviewing the empirical literature on the topic. The empirical part of the thesis then applies fixed effects estimation on a panel of 29 OECD economies over the last three decades. A so-called baseline regression with common specifications is estimated first, as it provides the base case for our empirical analysis. The model is then expanded in several ways to tackle factors that are omitted in the baseline regression but have strong theoretical reasoning to be included in the model.\r\n\r\nWe find the baseline regression to describe poorly the variation of long-term interest rates with the post-financial crisis data, but to provide plausible results when it is estimated solely for the pre-crisis data. Our results imply that this is due to certain complexities caused by the crisis that cannot be tackled with the baseline regression alone. By extending the model, the presence of unconventional monetary policy tools, credit ratings and capital account openness are all found to have an important effect on the relationship between fiscal policy and long-term interest rates. Furthermore, our results imply that the addition of the prior two measures successfully tackles most of the complexities caused by the crisis. Hence, we propose them to be an important part of a robust setup for studying the interest rate effect of fiscal policy with post-financial crisis data.\r\n\r\nAs has been typically found in the prior literature, our results show that fiscal policy comes over to long-term interest rates mainly through the flow variable. While a one percentage point deterioration in the primary balance-to-GDP ratio raises long-term interest rates by 13 basis points, an equivalent change in the public debt-to-GDP ratio has an interest rate effect of only one basis point at the most, which is not statistically significant. Additionally, we find the weak interest rate effect of the public debt-to-GDP ratio to decline even further as we add credit ratings to the model. This implies that bulk of the effect of the stock variable on long-term interest rates comes via the default premium, and once sovereign creditworthiness is controlled for with another measure, the public debt-to-GDP ratio becomes irrelevant for long-term interest rates."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "fiscal policy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "budget deficit"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "public debt"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "long-term interest rates"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "OECD countries"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "panel data"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "fixed effects estimation"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "omitted factors"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "financial crisis of 2007–08"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711212750"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711222760"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Chen, Tingji,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Modulation of the eyeblink and cardiac startle reflexes by genuine eye contact."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1469-8986;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "affective evaluation"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "direct gaze"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "heart rate"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "implicit response"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "startle reflex"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Peltola, Mikko,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Dunn, Richard,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pajunen, Sanna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hietanen, Jari,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711222760"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711222761"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Sohail, Hasan,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Prevalence and risk factors associated with under-5 mortality : a multi-country comparative study in South Asia."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (75 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Background: Remarkable achievements have been made in the last decade to reduce the child mortality worldwide. However, South Asia has one of the highest numbers of child deaths. Out of 10 child deaths worldwide, three occur in South Asia. The under-5 mortality rate is still very high with 51 deaths per 1000 live births. Moreover, the overall and country-specific risk factors associated with under-5 mortality in the region are largely unknown. This thesis aimed to study the difference in under-5 mortality in WHO South Asian countries and then to explore whether the associated risk factors are the same or different across the countries of South Asia.\r\n\r\nMethods:  This study was based on Demographic and Health Survey (DHS), data collected from five South Asian countries (Bangladesh, India, Maladies, Nepal, and Pakistan). Data were obtained from the most recent live under-5 births from mothers within five years prior to the survey (n=570676). Under-5 mortality, death of the children from day of birth to fifth birthday of child was the outcome variable in this study. Association of under-5 mortality with risk factors including socio-demographic variables was studied using Cox Proportional hazard method. The estimates were presented as hazard ratio (HR) and their 95% confidence interval (CI). Survival Curves were used to explain the difference in survival of under-5 children in each country.\r\n\r\nResults: Overall prevalence of under-5 mortality in South Asian countries according to pooled data was 10%. Country-specific results showed that Nepal having the highest prevalence (11.1%) of under-5 mortality followed by India (10.3%) and Pakistan (10.2%) in South Asia. In a multivariable model in pooled data, older age of the women (HR 0.70, 95% CI 0.68-0.72), being employed (HR 1.09, 95% CI 1.07-1.12), having husband with higher education (HR 0.74, 95% CI 0.70-0.78) and having higher education (HR 0.36, 95% 0.32-0.40) were significantly associated with under-5 mortality. Among other maternal and child factors, being female child (HR 0.95, 95% CI 0.93-0.97), wanted no children (HR 0.92, 95% CI 0.87-0.97), no contraceptive use (HR 0.95, 95% CI 1.30-1.37), currently pregnant (HR 1.17, 95% CI 1.17-1.23), no smoking (HR 0.85, 95% CI 0.83-0.87), male sex of children was associated with under-5 mortality. Most of the studied risk factors were common across the countries, but some difference in the factors associated with under-5 were country-specific. \r\n\r\nConclusion: The prevalence of under-5 mortality is still high in South Asia. Most of the socio-demographic factors are associated with under-5 mortality and are common risk factors for under-5 mortality across WHO South Asian countries. For improving the under-5 survival and achieving the Sustainable Development 2030 target, countries in South Asian region needs to put efforts on maternal and child health. Country-specific strategy should be focused on most prevalent risk factors. A multi-faceted approach that includes health and other related measures is needed to improve the child survival."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Under-5 mortality"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "WHO South Asian countries"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "DHS"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Sustainable Development Goals"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Socio-demographic variables"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711222761"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711222774"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Agbebi, Motolani,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Dependency Theory : A Conceptual lens to Understand China’s presence in Africa."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1891-1765;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "dependency theory"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "China"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Africa"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "development"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "economic engagement"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Virtanen, Petri,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711222774"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711222782"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Sokuri, Paula,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "National high-flow nasal cannula and bronchiolitis survey highlights need for further research and evidence-based guidelines."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1651-2227;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "bronchiolitis"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "high-flow nasal cannula"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "respiratory syncytial virus epidemic"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "treatment instructions"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "weaning instructions"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Heikkilä, Paula,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Korppi, Matti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711222782"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711222783"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lehtonen, Arttu O,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Incidence rates, correlates, and prognosis of electrocardiographic P-wave abnormalities : a nationwide population-based study."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0022-0736;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "P-wave"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "risk marker"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "atrial fibrillation"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "electrocardiography"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "epidemiology"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Langén, Ville L,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Puukka, Pauli J,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kähönen, Mika,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Nieminen, Markku S,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Jula, Antti M,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Niiranen, Teemu J,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711222783"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711232792"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hännikäinen, Jari,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "When does the yield curve contain predictive power? Evidence from a data-rich environment."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0169-2070;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Yield curve"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Factor model"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Data-rich environment"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Macroeconomic forecasting"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Macroeconomic regimes"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Conditional predictive ability"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711232792"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711242796"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hietanen, Jari K,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Your attention makes me smile : Direct gaze elicits affiliative facial expressions."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1873-6246;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "affect"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "facial EMG"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eye contact"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "facial expression"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "SCR"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Helminen, Terhi M,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kiilavuori, Helena,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kylliäinen, Anneli,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lehtonen, Heidi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Peltola, Mikko J,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711242796"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711292821"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Islam, Zahedul,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Customer perspective to sharing location based data."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (94 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Location Based Service (LBS) has the potential to be one of the most influential aspects in the digital business world. LBS opens a large amount of opportunities to the business world and gives access to customers directly in real time.  LBS is capable of creating customer value by delivering context-relevant messages directly to customers based on their current location, activities, interests, and preferences. Additionally, in order for the LBS to function properly and bring the expected outcomes, it is vital to have the essential technological solution, as well as to understand customers’ perspectives of sharing location based data (LBD). Although, remarkable progress has been made in LBS technology on the research and development side, customers’ perspectives of LBD is largely unexplored, especially in academia. Therefore, the purpose of this study is to build a customer perspective to sharing LBD. In order to do that, customer value has been chosen as the key theoretical concept. Customer value is widely used in identifying customers’ perceived benefits and sacrifices. The study has been conducted by taking an interpretive approach based on qualitative data, collected through focus group discussion and face-to-face interview. The results indicated that people’s willingness to share location data varies on several characteristics. Consumer identified navigation, exploring a new place, getting discounts and being part of the society are some of the fundamental perceived benefits of sharing LBD. On the other hand, sharing LBD comes with certain risks, as the data revealed consumer concern over risks involving privacy, physical risks, monetary risks, and risks of intrusion."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Location based data (LBD)"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Location Based Service (LBS)"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Customer data"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Customer value"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Perceived benefits"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "and perceived Sacrifices."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711292821"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711302833"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Vuorinen, Riikka-Liisa K,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Costs of Robotic-Assisted Versus Traditional Laparoscopy in Endometrial Cancer."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1048-891X;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mäenpää, Minna M,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Nieminen, Kari,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tomas, Eija,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Luukkaala, Tiina,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Auvinen, Anssi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mäenpää, Johanna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711302833"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711302834"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Malmelin, Nando,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Managing for Serendipity: Exploring the Organizational Prerequisites for Emergent Creativity."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1424-1277;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Virta, Sari,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711302834"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201711302841"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Ihalainen, Johanna K,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Resistance training status modifies inflammatory response to explosive and hypertrophic resistance exercise bouts."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1138-7548;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Ahtiainen, Juha P,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Walker, Simon,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Paulsen, Goran,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Selänne, Harri,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hämäläinen, Mari,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Moilanen, Eeva,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Peltonen, Heikki,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mero, Antti A,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201711302841"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201712072878"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Teh, Soo Yee,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Small firm perspective in customer relationship management implementation."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (78 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "CRM has been a popular topic since the 90s and several of studies have been conducted by academic scholars from diverse multidisciplinary fields of study. CRM implementation have always been focused in large organizations and not that much attention given has been to smaller size organization. However, with the emerging small size firms in the market CRM software providers shifted the attention from larger firms to smaller size firms. The ready to use software, lower cost and features functions attract small size firms to implement CRM for their business. Furthermore, the demand to implement CRM in firms is to achieve competitive advantage and survival in the global market.\r\n\r\nThe objective of this study is to gain an understanding from a small firm perspective in implementing CRM. To achieve this, both benefits and challenges related to CRM framework processes were identified and discussed. The study also aims to identify the challenges as well as the benefits encounter during the implementation process. Customer Relationship Management (CRM) term have been around since 1990s. Many CRM implementation studies have been conducted in a large organization however there is limited study conducted from a small firm perspective.\r\n\r\nThe studies begin with exploring CRM definitions. However, there is no one define definition found in literature. CRM concepts: process, data, customer knowledge and technology are being introduced. Next, concept of small firm being introduced. The connection between small firm and CRM are being explored in three perspectives: drivers to implement CRM, potential benefits and challenges of CRM. Those perspectives are based on previous studies found in existing literature reviews.\r\n\r\nThe empirical study is based on qualitative methodology and conducted as a single case study. The single case is built on a small firm operating in Finland. The research data was gathered as a combination of semi-structured interviews and author’s observations. The findings verified the importance of having a similar CRM definition among the employees in order to achieve a successful CRM implementation. Based on the result of the study, challenges and benefits of CRM have been identified, reflected and discussed related to previous academic studies. The result showed that CRM is commonly viewed as a technological tool or project rather than cross-functional long-term business process. The finding of this thesis may assist future small firms in having more effective strategy and less frustration during the implementation process."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Small firm"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "customer relationship management (CRM)"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "CRM process"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201712072878"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201712112904"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Van der Velde, Anna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Narrating everyday peace in Libya : a study of Libyan youth civil society activists’ framings and enactments of peace."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (122 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "closedAccess"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "In the aftermath of the Libyan uprisings in 2011, both the political and academic foci have been predominantly placed on high-level political solutions to achieve peace. Thus, peacebuilding efforts on the grassroots level and civil society groups’ roles in furthering peace have been mostly neglected. This thesis seeks to address this gap, focusing specifically on marginalised Libyan youth civil society activists and their approaches to building peace within the larger society-state peacebuilding context. Utilising ten in-depth interviews conducted in the summer of 2015, the thesis examines how these interviewed Libyan youth frame and enact notions of everyday peace in the conflict environment. For this purpose, civil society in peacebuilding and everyday peace theories are employed as epistemological tools, while Kohler-Riessman’s performance analysis of narratives serves as methodological approach.\r\n\r\nThe study finds that Libyan youth civil society activists frame peace in the everyday in a threefold manner: in negative terms as an absence of violence, as an interim phase that perpetuates violence recognising the continuous presence of conflicts, and in positive forms as experiences that counter structural violence. These framings turn into actions to further peace. In response to their daily conflict environment, and national and international discourses, participants vary between strategies of resistance and the assumption of liberal peace practices to further negative peace. Positive peace is promoted through creative solutions employing traditional network structures and international civil society practices that empower individuals and create alternative communication networks and spaces for civil society to act, and subsequently a sense of belonging. It is argued that this varied understanding of peace, responding to constantly changing conflict dynamics, translates into hybrid strategies that have the potential to alter existing societal discourses and practices, and contains significant conflict transformation potential on the grassroots level. Additional research is suggested using different methodological approaches to uncover alternative narratives on peace and to monitor the further development of Libyan civil society and peacebuilding efforts."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Libya"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Youth"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Civil Society in Peacebuilding"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Everyday Peace"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Narratives"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Performance Analysis"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201712112904"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201712112911"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hintikka, Marianna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Representations of prostitutes and prostitution as a metaphor in nineteenth-century English newspapers."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "2199-2908;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "linguistic representation"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "evaluative person reference"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "conceptual metaphors"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Victorian press"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Nevala, Minna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201712112911"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201712122916"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Becerra Zamora, Yuritzi G.,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Conceptualization and interventions of social inclusion in higher education institutions."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (97 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The contrast of the recently assumed values of efficiency and productivity, with equity and social inclusion, creates an interesting context to study social inclusion policies in higher education institutions (HEIs). Higher education (HE) practices towards social inclusion are known to vary enormously, and the experiences of HEIs in Western developed nations are well documented. However, the phenomenon has gone surprisingly unexplored in other contexts. This study aims at exploring the experiences with social inclusion of a single HEI, the Autonomous University of Queretaro (Mexico), and to develop a context-sensitive model for analyzing the conceptualization and the institutional policies for social inclusion in HEIs. The study engages with the context of the university, by looking at hierarchical structures unveiled by postcolonial theorists. Postcolonialism is a contemporary global condition in which ethnic, sexual, epistemological, economic, and gender hierarchical relations are observable in modern day societies. The impact of postcolonialism in HE is rarely explored, yet highly relevant, especially in the discussions around social inclusion. Through interviews with students, faculty members and administrators, the qualitative case study explores the conceptualization of social inclusion in the university and the forms in which it compares to the policies for social inclusion at place. A context-sensitive model is designed and presented in the study. The model enables the exploration of both the conceptualization and the policies or interventions of social inclusion in the case study university, and can eventually be utilized to analyze the experiences of other HEIs. The result findings include the model itself, feedback on the utility of the model for the case university and other HEIs in other contexts, and practical recommendations for the case university."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "social inclusion"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "higher education"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "postcolonialism"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "policy analysis"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mexico"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201712122916"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201712142930"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Forsman, Jan,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Descartes on Will and Suspension of Judgment: Affectivity of the Reasons for Doubt."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "b",
            "value": "Eötvös University Press,"
          },
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Descartes"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "varhaismoderni filosofia"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "affektiivisuus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "vapaa tahto"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "moraalinen vastuu"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "doksastinen voluntarismi"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "arvostelmasta pidättäytyminen"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "epäily"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "early modern philosophy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "affectivity"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "free will"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "moral responsibility"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "doxastic voluntarism"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "suspension of judgment"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "doubt"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Boros, Gábor"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Szalai, Judit"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tóth, Olivér István"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "776",
        "ind1": "0",
        "ind2": "8",
        "subfields": [
          {
            "code": "z",
            "value": "978-963-284-820-4"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201712142930"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201712182939"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Vänskä, Mervi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Parental pre- and postpartum mental health predicts child mental health and development."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1741-3729;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "child development"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "child mental health"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "maternal depression"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "parental mental health"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "paternal depression"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "pre- and postpartum period"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Punamäki, Raija-Leena,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lindblom, Jallu,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Flykt, Marjo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tolvanen, Asko,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Unkila-Kallio, Leila,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tulppala, Maija,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tiitinen, Aila,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201712182939"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201712182942"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mustonen, Anni,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Maintaining presence : Catholic aid agencies in Sri Lanka's civil war − towards a socio-theoretical perspective to humanitarian access and power."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (97 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Maintaining presence and proximity is an increasing challenge for humanitarian agencies. The final phase of Sri Lanka’s civil war (1983-2009) was characterised by humanitarian crisis. The government of Sri Lanka denounced a demarcated safe zone in Vanni, the Northern Province of Sri Lanka, claiming it was providing a haven for civilians but prohibited humanitarian agencies accessing the area. \r\n\r\nIn my research, I focused on the Catholic aid agencies who were authorised to remain or to pay short visits to the restricted area. I sook to describe the political and institutional aspects which contributed to the presence of these actors. \r\n\r\nI collected data by interviews conducted in Sri Lanka and via Skype, by qualitative surveys (questionnaires) as well as humanitarian reports by aid and development and online news articles. The method for analysis was two-part. The first part consisted of discourse and content analysis of the news sources, reports and interviews. Another part composed of a theoretical framework that guided the analysis of semiotics and political discourses to particular themes. Here, I adopted Alex Golub’s (2014) theory of feasibility, which aims to describe how collective actors become powerful social and political actors, “leviathans”. I asked through which discourses or processes (historical, semiotic, political, institutional) the Catholic Church and its aid bodies have become (and may have failed to become) legitimate and neutral humanitarian actors.\r\n\r\nMy research indicated that the feasibility of Catholic aid agencies is supported by the institutional structure of the Catholic Church. On the one hand, the system facilitates localisations, and on the other, the Church can engage in the high-level negotiations and advocacy. Regarding politics, the Church and its aid agencies have managed the relationship with different political factions in a way that has facilitated humanitarian work on the ground. Lastly, through the theorisation of leviathan as an analytical tool which helped to analyse a range of elements that characterise the Church, I argued that that the Church’s power derives from an ability to subsume various elements “into one” (Golub 2014, 13) for the feasibility of its humanitarian missions. \r\n \r\nIn terms of the research on humanitarianism, my analysis demonstrates the benefits of problematising conventional notions of humanitarian presence and actors (such as the UN agencies and ICRC). As a discussant pointed out earlier, there are under-researched or under-reported organisations or even individuals who gain access and have the presence during the conflict. Thus, by broadening the perspective to other actors and then identifying the extended networks that go beyond humanitarian programming enables to see the presence and influence of the side-lined actors, as paraphrased by Johnson (2016)."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Sri Lanka"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "humanitarianism"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "churches"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "religion and politics"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "institutions"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201712182942"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201712182947"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Nguyen, Duy,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Determinants of profitability in commercial banks : case of Vietnam."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (92 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The financial system of Vietnam’s economy considers the banking system as the engine for its development and the growth of economy just like other countries in the world. Similar to most other private sectors, in order to sustain and develop the business, commercial banks need to earn and maintain positive and growing profitability. However, in the volatile business environment and during the economic transitional stage, banking sector tends to suffer unstable profitability and declining performance. Therefore, this research is carried out with the purpose to investigate which factors are the key determinants or driver of the profitability of commercial banks in Vietnam in the past 10 years. By reviewing prior studies and evidence from different countries and regions in the world, this research is going to supplement the current studies in Vietnam with a more potential factors that can potentially drive the profitability of local banking sectors. Internal factors such as financing structure, assets structure, asset quality, capitalization, operating efficiency, size of bank and income diversification will be studied in relation with profitability. Besides internal factors, external or macro-economic factors such as GDP growth rate, inflation rate and market concentration are also taken in to evaluation. This research contributes to existing literature by introducing the role diversification, non- performing loans, operating efficiency and banking sector concentration level in the context of Vietnam. Multiple linear regression for balance panel data will be employed to serve the purpose of this research. Data includes 16 largest banks in Vietnam during the period of 10 years from 2007 to 2016. The outcomes are relatively mixed. While it suggests the significant effect of market concentration level, the importance of capitalization, the ability to manage the banks effectively and control non-performing loans, there is not enough evidence to support the benefit of income diversification. Besides, the loans level and bank size are found to be not relevant in the context of Vietnam."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Vietnam commercial banks"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "profitability"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "determinants"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "regression"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201712182947"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201712192973"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Nguyen, Thao,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Undergraduate students’ use of Facebook for educational purposes : advantages, difficulties, and potential for connected learning."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (66 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Kasvatustieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Facebook  is  currently  the  most  popular  social  networking  site  globally  and  inevitably  getting integrated into different facets of life. The prevalence of Facebook and its  profuse affordances (both technical and social) have raised controversial opinions among scholars on applying  Facebook to education. In Vietnam, while the number of Facebook users is ranking as the 7th largest worldwide, research  on  this  platform  remains  remarkably  insufficient  and  mostly  limited  within  social  or psychological  perspectives.  Also,  while  the  country  is  struggling  to  improve  its  long-criticized education system and catch up with  global trends of integrating new technologies into learningteaching contexts, there is a void of understanding on social networking sites, especially Facebook, in relation to education. \r\n\r\nThe  research  aims  at  examining  how  Facebook  is  utilized  for  educational  purposes  by undergraduate students from Ho Chi Minh University of Education (Vietnam) and  their perceptions of  applying  Facebook  to  the  teaching-learning  process,  upon  which  the  advantages  and disadvantages  of Facebook as an educational tool in  higher education  are  clarified. Additionally, through students’ actual usage and perceptions, the potential of Facebook for connected learning is discerned  in search  for  feasible solutions to the  Vietnamese  educational  reform.  The Theory of Facebook for Educational Usage and Theory of Connected Learning set the theoretical framework for this study.\r\n \r\nIn  the  research, the mixed methodology of qualitative and quantitative approach was applied to attain optimal understanding. Data were collected from an online semi-structured survey of 394 voluntary undergraduates and five following-up theme-based interviews.\r\n \r\nFindings  from the research  confirmed  the  three  primary  usages of Facebook for educational purposes (Mazman & Usluel, 2010)  including communication, collaboration,  and sharing resources or materials. Besides those assisting functions of Facebook for education, particular problems were detected,  namely  distraction,  ineffective collaboration and communication, information accuracy, and cyber-bullying.  Although most students  were  using Facebook in diverse ways to benefit their studies,  a proportion of them  held  relatively  skeptical views on the empowering role  of Facebook for education, indicating a gap between students’ actual usage and perception.  It was also found that Facebook had  the  potential  for promoting connected learning, however,  the site still had certain drawbacks that were worth consideration. Based on aforementioned findings, some implications are drawn out for higher education and research."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "social  networking  sites"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Facebook"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "higher  education"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "usage"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "perception"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "connected learning"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201712192973"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201712192975"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Park, Woojung,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Promoting digital media literacy for the best quality of music performance."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (82 pages sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Kasvatustieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Upon the 21st century, media educators have focused on audio-visual media such as newspaper, television or film, and neglected the educational need for music as a medium. Music is the important channel of students to form their unique identity and define their inner being, history, and emotions, as other audio-visual media provide the platform for that. The negligence toward music in media education has been compensated by research conducted for the media use in music education. However, most of the studies were about gaining musical knowledge more effectively, music composition through digital media and creating the online community of practice for students to form their musical identity. As media education emphasizes, expressing one’s emotions, identity and their message in an effective way is highly important, and in terms of the medium of music, people express and empower themselves through music performance. \r\n\r\nThis action research aimed to discover the effective digital media use to promote the best quality of music performance by conducting and analyzing from the perspective of flow theory and music performance anxiety. This project-based action research was conducted by two participants as co-researchers and main researcher preparing and performing a concert to gather qualitative data, such as personal in-depth interview, research diary, audio records and video records. Then, the framework analysis method was used to describe, analyze and synthesize the result. The findings derived from the framework analysis describes that the personal and collective use of digital recording device and digital media contents such as YouTube videos were highly effective to promote flow experience and reduce the debilitative music performance anxiety level. However, poor quality of the microphone and speaker system on the stage caused the debilitative music performance anxiety for all band members consisting of two co-researchers and the main researcher. \r\n\r\nBy reflecting this research, following groups can be beneficiaries to increase their expertise and reveal the musical identity more effectively: media educators, music educators, amateur musicians and students taking music classes in public school or privately."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "media education"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "media literacy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "flow"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "music performance anxiety"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "music performance"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "music education"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "YouTube"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201712192975"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201712192977"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Nguyen, Thi Bich Tram,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Domestication of global higher education policies : legitimating narratives in advocating student mobility in Finland and Vietnam."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (57 pages sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The spread of global higher education policies has recently drawn much attention from scholars in social sciences. Much research conducted on this topic refers to the ritual enactment of world culture as the account for the diffusion of global higher education policies, that is research based on the world society theory perspective. However, the existing research fails to explain how such global policy models become domesticated as part of national higher education policies. It also leaves the important role of local actors with little attention. The intention of this thesis is to fulfill these limitations by approaching the topic from a different angle and that is from the domestication theory perspective.\r\n\r\nThe thesis is organized as a case study, which examines how a global policy idea became part of national higher education policy two countries Finland and Vietnam through the review and analysis of government documents. The central research questions posed in this thesis are: How is student mobility advocated in Finnish and Vietnamese higher education policy debates? What are the different justifications used when actors promote student mobility as a domestic higher education policy objective? Are there differences in the justifications used? If so, what is the explanation for these differences? These questions are answered by applying the notion of discourse by Michel Foucault and the theory of rhetoric by Chaïm Perelman to identify different justifications used in governmental documents to advocate a global policy idea in the two local contexts. These justifications are referred as “legitimating narratives” to illustrate stories or imaginaries which are used by local actors to justify a proposed policy model.\r\n\r\nThe findings of the thesis indicate various justifications or legitimating narratives which Finnish and Vietnamese policymakers have used to advocate student mobility as part of their national higher education policies.  Further the findings indicate there are not only commonalities but also differences in the justifications identified. It is also seen from the study that whilst the global education policy idea of student mobility does not originate from either of the two countries in question, it disperses through the nations with justifications directly linked to national interests and gradually develops into a domestic matter. In addition, the findings reveal that local policymakers within both countries, Finland and Vietnam, make use of justifications which are widely shared and accepted within their local societies to advocate student mobility as part of their national higher education policy. This strengthens the domestication theory viewpoint that countries do not construct themselves as imitators. Rather, local policy actors in the domestication process build their justifications for the adoption of global policy models so that they are not be seen to merely imitate what other countries have done.\r\n\r\nIn general, the study has contributed to current discussion about the adoption of global higher education policies and complemented the domestication theory in terms of national higher education policy making. However, future research is recommended with focus on global policies in other fields and different sources of data to discover more comprehensive findings, which will further complement the domestication theory."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "domestication"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "student mobility"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "global higher education policies"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201712192977"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201712202990"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Palmu, Sauli,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "National allergy programme had little impact on parent-reported food allergies in children aged 6-7 years."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1651-2227;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "avoidance diets"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "food allergies"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "national allergy programme"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "school health nurses"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Heikkilä, Paula,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Uski, Virpi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Niitty, Siina,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kurikka, Sari,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Korppi, Matti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201712202990"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201712293022"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Penttilä, Janne,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Business-based contributions to peacebuilding and conflict prevention : identifying the Finnish private sector potential."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (73 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Partnerships and cooperation with the private sector for peace and studying the economic preconditions for creating peaceful societies is a new trend in the practice of peacebuilding and conflict prevention. Few scholarly work exists on the role of business in peacebuilding that focuses on companies, not states, as primary actors.\r\n\r\nThis graduation thesis studies business-based peacebuilding and conflict prevention and seeks to identify undiscovered potential of the Finnish private sector to contribute to peacebuilding. Businesses can have a considerable contribution to create and foster peaceful societies, and thus, business-based peacebuilding is focusing on what those companies actually do which do make a positive contribution to peace.\r\n\r\nThis thesis applies an exploratory expert interview method to business-based peacebuilding and the potential of the Finnish private sector to contribute to peace. Senior experts are interviewed from Finnish peace organizations, Crisis Management Initiative and Safer Globe. Both organizations have experience and interest in value-adding private sector cooperation for the advancement of their work. Practical experiences and analytic reports of companies and business actors on the corporate engagement with peace and conflict constitute another part of the research material and complement the expert interviews.\r\n\r\nBusiness-based peacebuilding is a pragmatic and strategic private sector activity which is sensitive to the conflict context and integrated to the peace constituency. Business-based peacebuilding is a present- and future-focused approach to conflict resolution and peacebuilding that concentrates more on present conditions and needs than on removing causes. Pragmatic business-based peacebuilding efforts as managed and implemented by companies and commercial actors should not, or can not, diverge from core business practices. Business-based peacebuilding is then an extension of doing business by other means.\r\n\r\nPragmatic and preventative peacebuilding efforts in which Finnish SMEs can contribute to could trigger intra-organizational learning and strategic response from the side of the Finnish private sector contrary to comprehensive cause-driven peacebuilding schemes. Tools for assessing business-based peacebuilding and its correlation to successful business are direly needed; nevertheless, forward-looking debate on Finland’s potential in peacetech innovations is already underway."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "peacebuilding"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "conflict prevention"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "private sector"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "sustainability"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "NGOs"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "corporate responsibility"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "global governance"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201712293022"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201801021004"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aleburu, Omoikhefe Lynda,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "The association between depression and self-perceived oral health in migrants of Russian, Somali and Kurdish origin living in Finland : a population based study."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (83 pp sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Abstract. \r\nBackground: Scientific literature shows a bi-directional association between depression and poor oral health. However, studies conducted among migrants are not available. This study examines the association between depression and self-reported oral health among Russian, Somali and Kurdish migrant populations in Finland.\r\n\r\nMethods: Data from the cross sectional Finnish Migrant Health and Wellbeing Study was utilized. The participants were persons of Russian, Somali and Kurdish origin aged 18-64 years living in Finland. Depressive symptoms were assessed using the Hopkins Symptom Checklist (HSCL-25). Oral health measures included self-estimated oral health status, need for oral health care and dental /denture problems in the last 12 months. The data were analysed separately for men and women using logistic regression.\r\n\r\nResults: After adjusting for relevant socio-demographic and health factors, depressive symptoms were positively associated with poor oral health among Russian men odds ratio (OR) 8.10 (95% confidence interval, CI, 2.05-32.05), Kurdish men OR 1.69 (95% CI 1.09-2.85), and Kurdish women OR 2.07 (95% CI 1.20-3.57). Depressive symptoms were positively associated with need for dental care among Russian men OR 7.32 (95% CI 1.68-32.14), Kurdish men OR 1.72 (95% CI 1.00-2.98) and Kurdish women OR 2.19 (95% CI 1.26-3.83).\r\nDepressive symptoms were positively associated with having had dental or denture problems in the last 12 months only among the Kurdish women OR 1.73 (95% CI 1.05-2.84). No significant associations were found among the Somalis. \r\n\r\nConclusions: The association between depressive symptoms and poor oral health varies among different migrant populations, being strongest in the Kurdish population."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Key words: depression"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "oral health"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "mental health"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "migrant"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201801021004"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201801041011"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Partanen, Essi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Zebrafish genes affecting susceptibility to pneumococcal infection."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (101 (+ 6 pages of unpublished appendices) sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Lääketieteen ja biotieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "closedAccess"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201801041011"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201801081028"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Minkkinen, Jaana,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Health as a predictor of students’ academic achievement: a 3-level longitudinal study of Finnish adolescents."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0022-4391;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "nuoret"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kouluterveys"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "psykososiaalinen oireilu"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "krooniset sairaudet"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "monitasomallinnus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "adolescent"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "school health"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "externalizing and internalizing behavior"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "chronic disease"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "multilevel modeling"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lindfors, Pirjo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kinnunen, Jaana,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Finell, Eerika,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Vainikainen, Mari-Pauliina,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Karvonen, Sakari,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Rimpelä, Arja,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201801081028"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201801081030"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Zheng, Gaoming,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Towards an analytical framework for understanding the development of a quality assurance system in an international joint programme."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "2156-8243;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "quality assurance"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Europe"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "China"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Portugal"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "doctoral education"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "international joint programme"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "organizational innovation"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "institutional logics"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Cai, Yuzhuo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Ma, Shaozhuang,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201801081030"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201801121047"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Malkamäki, Maarit,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "The power of intergroup contact and experiential learning on individual perceptions in the United World College in Mostar, Bosnia and Herzegovina : a path towards bottom-up reconciliation?."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (vii + 125 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The post-conflict society of Bosnia and Herzegovina (BiH), following the General Framework Agreement for Peace in Bosnia and Herzegovina in 1995, is still politically, administratively and socially segregated between the three main national groups; the Bosniaks, the Croats and the Serbs. Hence, the public education systems are separated for children of different nationalities, who are thus learning under three different curricula, and in different languages. Additionally, the country is politically and socially vulnerable, unstable, and administratively inefficient. \r\n\r\nThis master’s thesis focuses on the United World College in Mostar (UWCiM); an international school of secondary education that integrates local students from all these main national groups to live and study together, under the International Baccalaureate Diploma Programme (IBDP). The college belongs to the broader United World College movement, which promotes experiential learning. The objectives of the college include the enhancement of peace and justice, intercultural understanding, celebration of difference, and the contribution to the post-conflict reconciliation in BiH. The aim of the present research is to analyse the experienced potential of the college’s educational model and setting in contributing to the process of reconciliation within the social context, by also reflecting on the Contact Hypothesis, proposed by Allport (1954), and other relevant educational concepts and theories. The research has been conducted by in-depth qualitative interviews with local students and both local and international staff members of the college.\r\n\r\nThe findings of the present master’s thesis indicate a clear transformation of the local students’ understanding of identity, as they expressed an enhanced comprehension of the complexity of individuals’ fundamental identities. This has also been found to occur in other contexts of nationally integrated education. Through the experiences of intergroup contact with students from the other local national groups, particularly during the social life outside class and with the experienced contrast to the international students within the small and intimate environment of the college, all local students have mutually come to experience a strong sense of shared cultural unity and belonging. Additionally, they have learned to understand and respect the identified religious differences between each other. However, the contested nationalist issues of the past and the contemporary intergroup tensions are to a certain extent avoided within UWCiM, and the members of the community experience an urgent need for the appropriate means to address the issues. Hence, the national identities are mostly segregated within the college community, but a clear sense of distance to them and the nationalist issues is evident in the students’ approach.\r\n\r\nAdditionally, the students have evidently gained skills in critical thinking and confidence to speak up, increased courage to face new challenges, and further motivation to take initiative. The students’ approach to reconciliation is clearly bottom-up. However, the broader social influence of these experiences and the intergroup contact, and the consequently gained skills, perspectives and knowledge, has been limited. The local students specifically experience difficulties in transferring the learned skills and perceptions to their home communities. Most of them also plan to go study and live abroad after graduation."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "United World College"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Bosnia & Herzegovina"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Reconciliation"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Contact Hypothesis"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Intergroup Contact Theory"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Experiential Learning"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201801121047"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201801161057"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Zhang, Yitian,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Breast-feeding patterns in rural China : a population based study."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (57 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Background: Breast-feeding is considered to contribute infant’s health and development, protecting children from a variety of acute and chronic disorders as well as potential benefits for mothers. Breastfeeding has also potential to protect against childhood obesity; however, the evidence on the risk factors of breastfeeding remains unclear especially in the context of rural settings.\r\n\r\nObjective: The objective of this study is to analyze the patterns and determinants of breastfeeding in three rural provinces of China.\r\n\r\nMethods: A survey of new mothers in five rural counties among three province-level administrative divisions (Anhui, Shanxi, and Chongqing) in China was conducted in 2009. Data were collected by an interview after the interventions, including the demographic and pregnancy related characteristics of the mothers.  Exclusive breastfeeding was measured by asking mothers the duration of the breastfeed only (in months) and categorized into two (0 to5 months and 6 to 11 months). Logistic regression was used to model the relationship of measured characteristics to the duration of exclusive breastfeeding. Odds ratios (ORs) and their 95% confidence intervals (CIs) were reported as the measure of the associations.\r\n\r\nResults: The rate for exclusive breastfeeding over 6 months is relatively low. Only 3.9% of the babies received exclusive breastfeeding for more than 6 months in Chongqing. The key demographic determinants vary significantly among provinces. In Anhui, maternal age was found to be positively associated with exclusive breastfeeding duration, and in Shaanxi family income was found negatively associated with exclusive breastfeeding duration. Mothers with higher education level in this study were less likely to practice exclusive breastfeeding.\r\n\r\nConclusion:  Exclusive breastfeeding over 6 months is relatively low in rural China, however the pattern largely varied by province. The key demographic determinants of exclusive breastfeeding include maternal age, education, occupation, as well as paternal occupation and family income."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "breastfeeding"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "exclusive breastfeeding"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "rural China"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201801161057"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201801161060"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Wang, Haoxue,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Am I professional as a nurse in Finland? : Chinese migrant nurses' interpretation of themselves as professionals."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (80 pp sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Under the background of globalization and nursing shortage in Finland, there is an increasing trend of nurse migration from China to Finland. Nurse is a highly professional occupation. Understanding nurses’ interpretation of themselves as professionals would lay the foundation for promoting these nurses’ professional level, which would improve the quality of care nurses provide to patients, help to retain nurses in the area, and mitigate the shortage of nursing force. Nevertheless, there are currently few studies conducted from the perspective of professionalism of migrant nurses. As a result, I decide to situate my study in this field, and my research question is: How do migrant nurses from China to Finland interpret themselves as professionals. To answer this research question, a qualitative research was conducted and nine interviews were done with Chinese migrant nurses that are currently working in Finland.\r\n\r\nStudies on professionalism point out that professionalism has been tranforming from occupational to organizational, with many occupations losing their control of the profession to large organizations. Legislation, professional associations and hospitals are the three main factors influencing nursing professionalism. Miller with colleagues  developed a model evaluating nursing professionalism that was widely used later on. Combining Miller’s model with empirical studies on nursing professionalism, I focused on four prominent categories in my research: educational background, continuing education and competency, communicative skills, and adherence to the code of ethics. Two other categories that were rarely mentioned in literature emerged from my data: difference in nursing practice, and respect from patients and colleagues.\r\n\r\nThis study found out that the shift of these migrant nurses' interpretation is multi-layered. Better chances of further education, being able to pay more attention to each patient, being more respected make the nurses believe that they are professional in Finland; huge language barrier makes them cause damage to their self-confidence as professionals. Differences in the nurses' daily practicing procedures have various influence on their self-interpretation as professionals, while differences in nursing education and training have little influence on the interpretation."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "nursing professionalism"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "migrant nurses"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "social policy"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201801161060"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201801291146"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Ilikbaev, Aleksandr,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "A great divide on homosexuality in the contemporary world : how do attitudes change?."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (81 pp + Appendix sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The purpose of this paper is to investigate the issue of global divide on homosexuality in the contemporary world, to determine the main predictors of homonegativity and to understand how societal attitudes towards homosexuality change. A brief historical excursion from pre Christian era to modern days was conducted to observe how societal attitudes towards homosexuality were changed several times throughout history. I derived several theories from social psychology to explain this attitude change, the most important of which was expertise heuristics. Taking into account historical patterns and theoretical background, we conducted empirical cross-country and multiple regression analysis based on the global data from more than 100 countries. \r\n\r\nI discovered that religion and religiosity are one of the main factors which contribute to homonegativity by shaping personal attitudes and societal values. The mechanism of religious influence could be explained by the expertise heuristics effect. This effect means that persons derive their attitudes from the experts’ statements and judgements. Thus, confidence in authorities matters. In case of religion, more confidence in religious institutions a particular person has, more these institutions and their propaganda affect attitudes and opinions of this person. Applying this to attitudes towards homosexuality, greater confidence in religious institutions contributes to more homonegativity. However, the negative effect of religion differs for different religious denominations. I discovered that Islam is the most homonegative of all religious denominations while Protestantism is the least homonegative one. \r\n\r\nOur main finding is that religion shapes attitudes towards homosexuality through homonegative propaganda by its institutions which influence societal attitudes and values. The possible way to value change is secularization and decrease of the role of religious institutions in society. These findings are supported by historical patterns and by our empirical results."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "homosexuality"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "attitudes"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "value change"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "homonegativity"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "religiosity"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "religious denomination"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "World Values Survey"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "European Values Study"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201801291146"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201801311169"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Sabia, Taha,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Managing the popularity of streams in the Twitch.tv gatekeeping network."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (107 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Viestintätieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "In a digital age where user generated content is spreading rapidly on the internet and its use and consumption are becoming more and more popular, information control becomes harder to exercise by institutions on social networks where the information circulation is growing rapidly. The influence of power evolves from a unidirectional exercise of power, to a negotiated power in a multidirectional gatekeeping network. Gatekeepers in these networks hold different power positions based on how they each affect the flow of information inside a network. On Twitch.tv, the information is the streams broadcasted on the social platform, and their circulation is reflected by the popularity of these streams and how large of an audience they draw. This study explores how the gatekeepers influence the popularity of the live streams in Twitch. The gatekeepers present in the Twitch gatekeeping network each affect the popularity of the streams differently resulting in a changing power positions in the network.\r\n\r\nIn the gatekeeping network theory model established by Karine Barzilai-Nahon, thirteen gatekeeping bases were identified: Selection, Addition, Withholding, Display, Channeling, Shaping, Manipulation, Repetition, Timing, Localization, Integration, Disregard, and Deletion. These bases are the processes by which the gatekeepers affect the circulation of information in a network. This study identifies the gatekeepers who constitute the Twitch network (namely game publishers, Twitch, streamers, and the audience), then seeks to identify the gatekeeping bases used by each gatekeeper to affect the popularity of the streams on Twitch. This process will help establish the relative power of each gatekeeper in comparison to the others. To answer these questions, mixed methods were used combining a netnography and a questionnaire. To identify which bases are used by the game publishers, Twitch, and the streamers, netnography in the form of participant observation was used. A selection of screenshots and a collection of web articles were collected and analyzed to identify the bases used by these respective gatekeepers. This analysis was conducted using manual qualitative coding based on a large selection of screenshots captured during the netnography. An immersion of the researcher in the platform seeks to establish the processes used by these gatekeepers and how they reflect on the popularity of the streams. To identify which bases are used by the audience, a questionnaire was used to generate insights about how the audience chooses streams to watch and how it contributes to spreading them online and thus helping to popularize them. \r\n\r\nFinally, a discussion of the results shows how the gatekeeping network of Twitch is a dynamic one where the popularity of the streams is negotiated between the different gatekeepers not only confirming the change in theory from a unilateral model to a multidirectional model, but also hinting to an increasing influence of the active audience over this popularity. The popularity of the streams is then the result of a participatory effort by all the stakeholders that results in the popularity of the streams and the Twitch platform in which the audience plays a central role. The implications provide a couple of first few hints to how Twitch can make more engaging tools to encourage audience participation in the live streams, while providing better visual content to the viewers."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Twitch"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Twitch.tv"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "video games"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "online streaming"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "live streaming"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "esports"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "online audience"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201801311169"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201802131216"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kaakinen, Markus,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Cybercrime victimization and subjective well-being: An examination of buffering effect hypothesis among adolescents and young adults."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "2152-2715;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Keipi, Teo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Räsänen, Pekka,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Oksanen, Atte,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201802131216"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2017    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201802141221"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Norri, Juhani,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "The Mystery of Mould 'Top of the Head' in Middle English Remedybooks."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2017."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0028-3754;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "parannusoppaat"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "englanti"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "keskiaika"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "terminologia"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "remedybooks"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "English"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Middle Ages"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "terminology"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201802141221"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "2",
        "subfields": [
          {
            "code": "u",
            "value": "http://www.helsinki.fi/jarj/ufy/julkaisut.htm"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201802141224"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Virtanen, Pekka,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Self-rated Health of the Temporary Employees in a Nordic Welfare State : Findings from the Finnish Public Sector Study."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1536-5948;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Finland"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "welfare state model"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "public sector"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "temporary employment"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "self-rated health"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pentti, Jaana,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Vahtera, Jussi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kivimäki, Mika,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Virtanen, Marianna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201802141224"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201802191267"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Li, Cai,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Consumer-brand relationship of American luxury brands in the Finnish market – A case study of Michael Kors."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (76 pp sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The Finnish market for luxury fashion brands is experiencing a radical change. There is an increasing availability of American fashion for Finnish domestic consumers than ever before. In this modern customer-oriented competitive market, understanding how customers recognize specific brand meanings and its subsequent influence on buying behavior is crucial. \r\n\r\nThe purpose of this research is to study how young female consumers build up a brand relationship with American luxury brands in Finland, and to compare the cultural influence, Chinese vs. Finnish culture, on their concepts of brand meanings. This research applies the qualitative method, with data generated by conducting interviews on ten Michael Kors young lady consumers, of which five are Chinese participants and five are Finnish. The purpose of the interviews is to bring a better understanding on how Michael Kors builds its brand meanings, and how this brand-consumer relationship possibly influences purchase and contributes its relative success in the Finnish market. The study also compares how cultural perspectives, Chinese and Finnish, influence the Michael Kors brand meanings and the buying behavior. \r\n\r\nIn conclusion, the brand meaning of Michael Kors is influenced by factors including “Appreciating beauty, art and quality”, “Pursuing hedonistic pleasure, “Expressing the self”, and “Matter of investment. Factors that influence the behavior of purchase include the fashion phenomenon, quality and design, and price aspects. Michael Kors has made great efforts in achieving a rapid growth world widely as well as in Finland. These efforts are potentially linked with its content of brand meanings and contribute to its increased benefits. For example, their investment in public media may form the key driving force of street phenomenon, which consequently attracted a multitude of Chinese and Finnish consumers. Furthermore, this study provides empirical data which support the pivotal role of culture in the brand meaning of Michael Kors and its influence on the consumption behavior."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "American luxury brand"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "brand meaning"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "consumer-brand relationship"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201802191267"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201802221295"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kyrönlahti, Saila,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Educational differences in mobility decline in older adults over an 11-year follow-up."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (48 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "closedAccess"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201802221295"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201803051326"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Zhu, Yijun,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Exploring consumer online product returning behavior : Chinese e-consumers’ perspective."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (78 pp + 5 pp appendices sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "In the retail world, product returns are a common practice by consumers. Many businesses have been attempting to obtain more sales by providing customers with lenient return policies as well as customer-friendly return processes and procedures. Over the past decade, the issue of product returns by consumers is on the rise and drawing increased attention from practitioners and researchers.\r\nThe objective of this thesis is to explore Chinese e-consumers’ perception of fraudulent returning behavior and identify the characteristics of Chinese consumers’ online returning behavior on fashion products, in the context of China’s thriving e-commerce market. Fashion products are the most popular items online, thus the thesis mainly focuses on fashion product returns. Mixed methods approach is employed in conducting the research. The author first conducts in-depth interviews with respondents, and then sends out an online survey. Both the qualitative and quantitative data are analyzed as to provide holistic results and findings for the thesis.\r\nFindings of this thesis provide an overview of Chinese consumers’ fashion product return motives, product return rates, demographical characteristics, and their attitudes towards fraudulent returning behavior. The theory of planned behavior proves to be suitable to explain the findings of this thesis and subsequently sheds light on the uniqueness of China’s online retail environment. Chinese online consumers are more critical of fraudulent returning behavior therefore the findings do not consider fraudulent returns as a problematic issue in China."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "E-commerce"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "online product returning behavior"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Chinese online consumer"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "fraudulent returning behavior"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201803051326"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201803071345"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Riabova, Ksenia,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Baltic dimension in the contemporary foreign policy of the USA : analysis of the relations of the USA and the Baltic States concerning security and defence issues."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (78 pp sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The United States of America has significant international standing. That is why a researcher cannot but take into account the political preferences of the USA investigating problematic issues of the world politics. The main purpose of this thesis is to analyze the US foreign policy in the Baltic region through the analysis of the American administrations views on the Baltic States. \r\nThe current situation in the political arena and strained relations caused by the Ukrainian crisis make my work relevant and enhance its significance. The Baltic region is strategically very important for the region, so regional countries support is very important to the USA. It helps it to gain a foothold in the strategically important points of the continent and to strengthen control.\r\nThe subject of the thesis is the foreign policy of the United States of America in the Baltic region. The following issues are considered in the thesis: the relations between the USA and the Baltic States from a historical perspective; President Obama’s foreign policy towards the Baltic States; factors that the USA used while forming the foreign and domestic policy of the Baltic region; the prospects of the relations between the USA and the Baltic States; and the role and importance of the Baltic region in the USA foreign policy. \r\nReferring to the neoliberal theory and the concept of soft power the research highlights the fact that the military expansion of the USA still exists but at the same time it is taking on a new meaning and being applied through new instruments. As a result, NATO presence in the Baltic region is not considered by states of the region as occupation or a threat to the sovereignty or intervention in the internal affairs. For the Baltic States, the USA and NATO actions are positive and they look like the guarantors of stability in the region deterring the aggressor. Besides, I argue that the concept of soft power, which became very popular during President Obama’s Administration, provides a very accurate description of the USA modern policy on the world arena, when troops do not mean war and destruction, but maintaining peace and prosperity of the nation.\r\nThe thesis shows how the American politicians use mechanisms of soft power involving different international actors in the decision-making process as well as using economic and cultural levers of influence. As a consequence, there is a process of evolution of American militarism in case of implementation of the Baltic States mechanisms of soft power."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "USA foreign policy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Baltic region"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "mechanisms of soft power"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "militarism"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "neoliberal theory"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "NATO"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "the UN"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201803071345"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2016    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201803131377"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Geneid, Ahmed,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Kulning (Swedish Cattle Calls) : Acoustic, EGG, Stroboscopic and High-Speed Video Analyses of an Unusual Singing Style."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "b",
            "value": "ISCA,"
          },
          {
            "code": "c",
            "value": "2016."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1990-9770;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Laukkanen, Anne-Maria,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "McAllister, Anita,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Eklund, Robert,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Nelson, Morgan"
          },
          {
            "code": "e",
            "value": "toimittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201803131377"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201803191425"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pellinen, Tapio,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Rules make the world better : justifications of Civilian Crisis Management in the EU Concept Core Course."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (68 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Civilian crisis management is a part of the European Union's foreign policy, but it and its impacts has been studied empirically relatively little. This study explores how doing civilian crisis management is justified to personnel being trained to work on those missions. The aim of this study is to chart out what civilian crisis management purports to pursue, so creating testable hypotheses for future research becomes easier.\r\nThis study was conducted by participatory observation of an ENTRi-certificated EU Concept Core Course held by Crisis Management Center Finland in April 2017. The Core Course is the most basic training given to almost all personnel willing to work in civilian crisis management missions. It outlines the foundations, basic vocabulary, central concepts and aspects of practical work that are deemed most important for working on a mission. These observations were then analysed against a framework of liberal peacebuilding and its critique using a grounded theory methodology.\r\nThe main findings were that civilian crisis management is justified in five major ways: creating security for the EU, creating a rules-based liberal order, spreading liberal values that are deemed universal, acting as tools in foreign policy, and making societal changes efficient and sustainable. The EU's civilian crisis management subscribes to a liberal-realist hybridisation of an orthodox view on international peacebuilding, where force-controlling states shape the creation of liberal institutions and pursue their own gains while trying to balance values, rights and fairness."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "European Union"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "liberal peace"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "liberal peacebuilding"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "civilian crisis management"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "liberal peace critique"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "CSDP"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201803191425"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201803201429"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Satomaa, Anna-Liisa,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Local changes in computational non-rapid eye movement sleep depth in infants."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1388-2457;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Saarenpää-Heikkilä, Outi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Huupponen, Eero,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kirjavainen, Turkka,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Heinonen, Juhani,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Himanen, Sari-Leena,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201803201429"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201803221443"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hevonkorpi, Teemu,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Incidence of distal radius fracture surgery in Finns aged 50 years or more between 1998 and 2016 : too many patients are yet operated on?."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1471-2474;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "cc by 4.0"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "distal radius"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "epidemiology"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "surgical treatment"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "volar plating"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "forearm fractures"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Launonen, Antti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Huttunen, Tuomas,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kannus, Pekka,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Niemi, Seppo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mattila, Ville M,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201803221443"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201803221445"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pham, Thao,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "The effect of intranasal oxytocin on the neural process of child-related social signals on young mothers."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (59 pages+ 3 appendices sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Background: Over the past few decades, oxytocin (OT) has been identified as a neural hormone playing positive roles in parental bonding, sexual behaviours, and social affiliation behaviours. Additionally, OT has shown to be correlated with parental sensitivity, parenting contact, and parent-child synchrony, thus helping to strengthen the parent-child bonding. Therefore, the use of OT as an intervention of harsh and difficult parenting such as maternal depression or parent-child bonding disorders has attracted wide attention from academia and research.\r\n\r\nObjectives: The thesis study primarily aimed at investigating whether intranasal administration of OT affected the neurocognitive process in young mothers perceiving infant’s facial emotional stimuli via the Event-related Potentials (ERPs), i.e. a neural technique used to investigate brain functioning. Subsequently, the secondary objective was to examine whether the subjective perception of bonding in mothers got influenced by OT via two questionnaires.\r\n\r\nData and methods: The thesis study was a sub-set of the project study conducted by University Hospital of Tampere (TAYS), from which two different types of data were extracted and analysed: the ERPs (three components: N170, EPN and LPP) and two modified questionnaires (i.e. Postpartum Questionnaire (PBQ) and Experiences of Close Relationship-Relationship Structure Questionnaire (ECR-RS)). The thesis study was conducted in a placebo-controlled, double-blind, within-subjects design with 52 participants. They were asked to visit one laboratory two times with a one-month interval in order to perform the ERP task and fill in two questionnaires. Using the ERP data for the primary objective, the N170 and posterior EPN components were analyzed with a 2 x 2 x 2 x 2 repeated-measures analysis of variance (ANOVA) with Face (Infant vs. Adult), Emotion (Happy vs. Sad/distressed), Condition (OT, vs. PL), and Hemisphere (left vs. right) as within-subjects factors. Likewise, the LPP data were analyzed with 2 x 2 x 2 ANOVA with the factors Age, Emotion and Condition. In contrast, the questionnaire data was analysed through a paired sample t-test to compare the results of the questionnaires between OT and placebo condition.\r\n\r\nResults and Discussion: When analyzing interactions among variables in all three ERP components, OT was not found to significantly affect the neurocognitive process in young mothers (p-values= 0.97, 0.13 and 0.46 for N170, EPN and LPP, respectively). Interestingly, then interaction Face x Condition in the N170 component was found to be marginally significant (F (1, 37) =3.30, effect size=0.08, p-value=0.07), indicating that there was a difference in the effect of OT on the social-emotional mothers’ perception. However, this effect was either faintly supported by the present analysis or very minute if the effect did exist. Besides, only in the N170 component, the main effect of Condition appeared significantly (F (1, 37) =15.11, effect size=0.16, p-value=0.01 ), which indicated the OT held larger negativity than placebo (-6.65±0.50µV and -6.34±0.49µV, respectively). Contrary to expectations, the results of two questionnaires yielded no significant difference in questionnaires’ scores of the mothers when receiving either OT or placebo (p-value=0.6, 0.82 and 0.34 for the PBQ, Avoidance, and Anxiety scores of ECR-RS, respectively). The study contributes to the current evidence of the pro-social effects of OT, which has shown to be inconsistent and incoherent. Therefore, successive studies with larger population could be conducted to increase the reliability of the results. Moreover, the effect of genetic factors and epigenetics should be also taken into account in further studies since literature evidence suggests individual variations in OT may contribute to OT responses."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "OT"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "double-blind within-subject design"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Event-Related Potentials"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "young mothers"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "infant’s face stimuli"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Postpartum Questionnaire"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Experiences of Close Relationship-Relationship Structure Questionnaire"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201803221445"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201803261452"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Harju, Teemu,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "The effect of inferior turbinate surgery on ear symptoms."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1531-4995;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Eustachian tube dysfunction"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "inferior turbinate surgery"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "nasal obstruction"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "placebo-controlled"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "randomized"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "symptoms"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kivekäs, Ilkka,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Numminen, Jura,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Rautiainen, Markus,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201803261452"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201803291472"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Makkonen, Teemu,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Cross-border knowledge transfer and innovation in the European neighbourhood : Tourism cooperation at the Finnish-Russian border."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0261-5177;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "542",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "1",
            "value": "CC-BY-NC-ND"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Williams, Allan M,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Weidenfeld, Adi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kaisto, Virpi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201803291472"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201804031480"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Jegede, Kolawole,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Evaluation of the impact of a school based health education program on caregivers’ knowledge, attitude and practices of malaria, diarrhea and pneumonia in Ibadan north local government area of Oyo state, Nigeria."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (58 pages + 8 pages of appendices sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Malaria, diarrhea and pneumonia (MDP) are the highest disease specific contributors to childhood mortality in sub Saharan Africa and southern Asia with 82% of deaths emanating from Sub-Saharan Africa and southern Asia. Preventable infectious diseases are responsible for 58% of all deaths among children aged 5 to 14 years; 8% from Malaria, 18% from diarrhoea and 10% from pneumonia. There is need to develop new models of preventive health information dissemination so as to reach out to hitherto unreached people in affected low and middle income countries (LMIC). \r\nGovernment sponsored public primary schools attended by majority of the population in Nigeria provide a good platform for interacting with caregivers considered hitherto unreached by preventive health campaigns due to their socio-economic status. The frequent mandatory parents and teachers association meetings (PTA) provide a vantage for participatory preventive health information dissemination ceteris paribus.  \r\n\r\nThis study aimed to evaluate the impact of a school based health education program on caregivers’ preventive health knowledge, attitude and practices regarding malaria, diarrhea and pneumonia in Ibadan metropolis, Oyo state, Nigeria. The impact of awareness creation about risks of school sustained injury among primary school pupils on incidence of injury in selected schools was also evaluated.\r\nThis study was based on a developmental program tagged Improving Child Health in Public Schools (IPCIP) which was carried out in Ibadan North area of Oyo state, Nigeria. The methodology adopted was a before and after approach. Data collected from caregivers of pupils with a validated knowledge, attitude and practices (KAP) questionnaire at baseline were compared with those collected using the same questionnaire after preventive health education interventions on malaria, diarrhea, pneumonia and school sustained injury(for pupils) in nine study schools. They were compared to a control group of three schools with no such interventions.\r\nChanges in caregivers’ knowledge of causes and symptoms of MDP, medication compliance attitude and care seeking practices (Primary healthcare utilization) were measured and scored before and after two years of interventions at PTA meetings. Trend of school sustained injuries was also monitored in both groups with pupils in the intervention group receiving injury prevention counseling. Responses from study groups were compared using pearson chi square test and socio-demographic differences among study groups factored in using binary logistic regression analysis. Test of proportions was used to compare school sustained injuries in both groups.\r\n\r\nThe result of the study reveals that caregivers’ attitude on medication compliance and healthcare seeking practices can be improved significantly by the introduction of preventive health education to Parents and Teachers Association (PTA) meetings. However, changes in the knowledge of causes and symptoms of MDP varied and were not significant except in malaria. The result also indicates that pneumonia should be emphasized as a public health emergency due to relatively low awareness and paucity of studies on it relatively to malaria and diarrhea. Counseling of pupils on injury risks drastically reduced the incidence of injury in the intervention group. Training of teachers on preventive health, injury risk reduction, first aid administration and availability of first aid kits in schools in Nigeria are recommended considering the alarming proportion of pupils that sustained injuries in the study schools."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "malaria"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "diarrhea"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "pneumonia"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "PTA meeting"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "medication compliance"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "knowledge"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "attitude and practices questionnaire"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "school injury"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201804031480"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201804051501"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Linna, Malla,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Preparedness for mental health and psychosocial support in humanitarian assistance : a discourse analysis of nurses' experiences in the Ebola Virus Disease epidemic in West Africa in 2014-2016."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (63 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "closedAccess"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "mental health and psychosocial support"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "preparedness"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "humanitarian assistance"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Ebola"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "nurses"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "discourse analysis"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201804051501"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201804051502"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pasternack, Camilla,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Self-reported fractures in dermatitis herpetiformis compared to coeliac disease."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "2072-6643;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "cc by 4.0"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mansikka, Eriika,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kaukinen, Katri,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hervonen, Kaisa,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Reunala, Timo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Collin, Pekka,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Huhtala, Heini,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mattila, Ville M,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Salmi, Teea,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201804051502"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201804191552"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mäkelä, Ville,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Semi-Automated, Large-Scale Evaluation of Public Displays."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1532-7590;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "public displays"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "evaluation"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "logged data"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "observation"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "pervasive displays"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "long-term studies"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "deployment-based research"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Heimonen, Tomi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Turunen, Markku,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201804191552"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201804231565"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Molz, Erich,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Does intercultural competence matter? : new perspectives on relationship-building in unarmed civilian protection."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (96 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Objective: Previous research has shown that building positive relationships with locals is crucial for the effectiveness and personal safety of Unarmed Civilian Peacekeepers/ Protectors (UCPs). The present study investigated how UCPs attempt to build such relationships, what role intercultural competence plays and what challenges UCPs face in this endeavor.\r\n\r\nMethods: Situated within the grounded theory methodology, semi-structured interviews with 12 former and current UCPs from three different non-governmental organizations were conducted. Data analysis followed common open and selective coding procedures. \r\n\r\nFindings: Results suggest that UCPs’ main strategies for building positive relationships with locals are finding similarities with the locals, being respectful, and, most importantly, behaving in open-minded ways. Intercultural competence proved integral to building positive relationships with locals, with most interviewees associating it with self-awareness. The most commonly reported challenges in building positive relationships with locals include feelings of intense stress and pressure, and a propensity for abandoning a balanced perspective on the given conflict. Curiously, team-internal relationships were viewed as much more volatile and prone to conflict than relationships with locals, especially in moments of loneliness, boredom and consensus decision-making. \r\n\r\nConclusion: While positive relationships with the locals are the bedrock of Unarmed Civilian Peacekeeping/ Protection, and intercultural competence plays a crucial role therein, the present study also highlights the troubles of building and maintaining them."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "unarmed civilian peacekeeping"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "unarmed civilian protection"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "accompaniment"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "relationship-building"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "intercultural competence"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "cross-cultural competence"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "intercultural sensitivity"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "cultural intelligence"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201804231565"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201805041634"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pham, Thi Thu Hang,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "The development of capacity for labour inspection : a case study of Ministry of Labour, Invalids and Social Affairs in Vietnam."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (66 pages + 10 tables + 6 figures + references + appendix sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "This research is about capacity development for labour inspection. Within the scope of this study, the capacity of the labour inspection could include the capability of all individuals, their organizations and resources. A major reason leads to this research is that labour inspection in Vietnam has been facing many challenges but it seems not to have an effective solution to resolve its issues. Many countries have made great efforts to address the shortcomings of the labour inspectorate but the problem would seem not to be improved significantly. A specific policy on capacity development for labour inspection of Vietnam was chosen for analysis in this research. Although this policy has been undertaken for four years, its implementation is limited and likely to come to failure. The research aims to examine the theoretical framework of capacity development, theoretical as well practical rationales of the policy of capacity development of labour inspection in Vietnam; identify challenges in labour inspection, especially in the case of Vietnam; and seek sound solutions for better implementation of the capacity development of labour inspection. The qualitative method was used for data analyzing. Overall, this study provides three main findings. First, policy-makers did not identify the challenges of labour inspection of Vietnam adequately when building the policy on capacity development for labour inspection. Second, this policy was not established based on the theoretical framework of capacity development. The last but not least is the policy on capacity development for labour inspection was not guaranteed by a specific financial plan. This study then proposed three recommendations corresponding to the three findings. They include identifying and dealing properly with the identified challenges in labour inspection, developing a theoretical framework for the capacity development policy, and sufficient financial resources for the implementation of the policy."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "capacity"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "capacity development"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "capacity building"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "inspection"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "labour inspection"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201805041634"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201805041636"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Alfaro Viquez, Helen,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Appealing multimodal languages to access first year university students’ understanding of mathematical concepts in Costa Rica."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (62 pp + 23 appendices sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Kasvatustieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The current situation regarding the lack of skills and mathematical knowledge that students have when entering the university, has caused that institutions of higher education take certain actions such as the inclusion of courses or content reduction. Most of the measures taken involve curricular changes or partitioning of contents. However, the problem requires also methodological changes that improve students' understanding. Therefore, following the mathematical proficiency and the multimodal approach theories, this qualitative research seeks to use the written languaging exercises that involve the use of natural, symbolic and pictorial languages as a tool to address this situation, promoting the active participation of students to justify and explain their procedures. The aim is to find out student and teachers’ experiences with the languaging exercises.\r\n \r\nThis research was conducted in a Calculus 1 course of the University of Costa Rica, with 33 engineering students and two teachers. The design involves three instruments to collect infor-mation: 17 exercises of languaging designed on the topic of derivatives that were applied during the class or as homework during seven weeks, a questionnaire with 18 Likert scale statements and six open ended questions answered by students after the applications of the exercises, and a semi-structured interview for the teachers.\r\n\r\nThe results indicated positive experiences of the participants. They expressed that the languaging exercises are useful to make learning more meaningful, to identify the different ways in which student’s appropriate knowledge, as well as the misconceptions they have, through the explanations they provide. The exercises also favor, in their opinion, the development of analytical, reasoning, abstract thinking and metacognition skills."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "languaging exercises"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "mathematical proficiency"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "university mathematics"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "knowledge gap"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201805041636"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201805041637"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mikhuta, Maryna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "The sound of radio speech : a comparative analysis of prosody in Swedish and Russian radio programs."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (75 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Viestintätieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Prosody plays an important role in human communication processes. Moreover, the results of researches in intonation are actively used in various fields, e.g. the development of speech production and speech recognition technologies, sound recording software creation, teaching first language to the hearing impaired, speech reconstruction after brain damaging conditions, teaching a foreign language, etc. \r\n\r\nThe research primarily examines phrase-level intonation patterns occurring in radio speech in Swedish and Russian. Within the study, radio represents the context. Radio programs were chosen as a source of data, since the recordings can provide high sound quality, and radio journalists are taught to speak clearly and actively use intonation patterns. The research comprises beginning parts of six programs in each language. Moreover, the programs were grouped into “serious” and “entertaining”.\r\n\r\nThe research is conducted within the post-structural methodology of the research prism combined with the theoretical views of Jakobson. The research is conducted on auditory and instrumental level, and includes the elements of literature review. The auditory level was conducted by the researcher herself, for the instrumental level sound analysis software Praat© was exploited. The key method within the study is visualization. On the auditory level visualization includes textual representation in written form, including a specially developed sign system. On the instrumental level visualization comprises software-created spectrograms and their textual description.\r\n\r\nThe results show some correlations between the topic of the radio program and the prosodic pattern used. In particular, the more emotional speech attributed to the “entertaining” programs exploits a wider pitch change range than the speech of the “serious” programs. However, the results are ambiguous and the issue deserves further studies including a bigger data sampling."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "radio speech"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "intonation"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "prosody"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Swedish"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Russian"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201805041637"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201805141663"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Suuronen, Aleksi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Political competition and social media : can Facebook change the status quo of Finnish politics?."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (112 pp sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The rise of multiple social media platforms such as Facebook and Twitter have sparked a debate within political sciences on the degree to which these new platforms influence the overall political system. For some, the expected impact is assumed to diversify the number of people who wield and influence political power, while for others the impact concentrates and solidifies power to those who could be considered as political elites.   \r\n\r\nThe purpose of this thesis is thus to investigate the underlying assumptions surrounding this debate and to construct a theoretical understanding of how social media can influence political power relations. The research conducted in this area has thus far mainly focused on studying Twitter and not many studies exist that have examined Facebook. Moreover, considerable gaps exist within the Finnish context, and no studies exist there that have explicitly examined what direct political gains social media platforms are able to give to its users. \r\n\r\nThis thesis aims to fill these gaps by adopting a case study strategy on the 2015 parliamentary elections held in Finland by using quantitative techniques to estimate the impact that Facebook has had on the electoral performance of those candidates who have chosen to use it in their campaign. \r\n\r\nThe results of this study show that Facebook is indeed linked with electoral gains, and especially the ability of candidates to acquire Facebook ‘likes’ is a significant factor that can boost their electoral performance. Furthermore, not all candidates are equal in this, and it is non-incumbent politicians who have gained the most from Facebook during these elections.\r\n\r\nThese results highlight the fact that social media in general and Facebook in particular are important subjects of political study and that they do capture a resource that the candidates can use to impact political outcomes. Moreover, this has implications for the future of the status quo of political competition within Finland and might change how politics and deliberation are conducted in the future."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Facebook"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "social Media"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "elections"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Finland"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201805141663"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201805151697"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Nurmi, Rakel,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Celiac disease or positive tissue transglutaminase antibodies in patients undergoing renal biopsies."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1590-8658;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Metso, Martti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pörsti, Ilkka,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Niemelä, Onni,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Huhtala, Heini,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mustonen, Jukka,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kaukinen, Katri,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mäkelä, Satu,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201805151697"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201805211726"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Sommerova, Lucie,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Environmental Kuznets Curve - The case studies for the Czech Republic and Finland."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (103 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "This diploma thesis deals with the Environmental Kuznets curve in order to prove or disprove its validity for CO2 and SO2 pollutants in the Czech Republic and Finland. During empirical analysis the attention was also paid to external effects, especially to environmental regulations, which may influence the variables and EKC’s shape. Based on the results of the regression analysis, the existence of a U-shape curve (EKC) was confirmed only for Finnish CO2 emissions. This conclusion confirms the ECC hypothesis assertion that the country's rising wealth reduces the amount of pollutant in the country's environment. Conversely, SO2 emissions did not confirm the U-shaped curve, but the U-shaped curves in both countries. In this case, the existence of the EKC cannot be confirmed or refuted, due to insufficient data availability."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Finland"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The Czech Republic"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Environmental Kuznets curve"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "relationship between GDP per\r\ncapita and pollutants per capita"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "regression analysis"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "environmental regulations"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pollution\r\nHeaven Hypothesis"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201805211726"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201805251775"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Murtola, Teemu,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Fasting blood glucose, glycaemic control and prostate cancer risk in the Finnish Randomized Study of Screening for Prostate Cancer."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0007-0920;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Vihervuori, Ville,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lahtela, Jorma,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Talala, Kirsi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Taari, Kimmo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tammela, Teuvo LJ,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Auvinen, Anssi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201805251775"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||fin  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201805291804"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "fin"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Oinonen, Inka,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Mullistaako laaja-alaisuus kouluopetuksen? Luokanopettajien käsityksiä laaja-alaisuudesta vuoden 2016 opetussuunnitelmassa."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (20 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Kasvatustieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Vuonna 2016 käyttöönotettu uusi opetussuunnitelma on herättänyt paljon keskustelua niin koulutuksen kentällä kuin valtakunnallisestikin. Suurelle yleisölle mieleenpainuvimmat muutokset lienevät opetussuunnitelmassa ilmenevät pienemmät yksityiskohdat, kuten ruotsin kielen opiskelun alkaminen jo kuudennella luokalla sekä käsialakirjoituksen muuttuminen vapaaehtoiseksi. Opetussuunnitelmaan on kuitenkin tullut suurilinjaisempiakin muutoksia, joita ovat esimerkiksi laaja-alaisuuden tavoite sekä monialaiset oppimiskokonaisuudet. Tiedot, taidot, arvot, asenteet ja tahto muodostavat kokonaisuuden, joka voidaan nimetä laaja-alaiseksi osaamiseksi. Laaja-alaiseen osaamiseen kuuluu lisäksi se, että osaa käyttää tietoja ja taitoja tilanteen vaatimalla tavalla. Monialaiset oppimiskokonaisuudet tarkoituksena on eheyttää opetusta ja luoda kokonaisuuksia, jotka perustuvat oppiaineiden yhteistyöhön. (POPS 2014.) Tämä pro gradu -tutkielma muodostuu kasvatustieteiden tiedekunnan ohjeiden mukaisesta vertaisarviointiin hyväksytystä tutkimusartikkelista. Tutkimuksen tarkoituksena on selvittää miten laaja-alaisuus ja monialaiset oppimiskokonaisuudet käytännössä toteutuvat ja millaisia mahdollisuuksia ja haasteita niihin liittyy koulun arjessa.\r\n  \r\nTutkimusaineisto (N=32) kerättiin eläytymismenetelmällä. Tutkimukseen osallistuneet opettajat kirjoittivat kertomuksen joko innostuneen tai huolestuneen opettajan näkökulmasta. Opettajat esittivät monipuolisia näkemyksiä laaja-alaisuuteen ja monialaisiin oppimiskokonaisuuksiin liittyen, joten niiden pohjalta muodostettiin neljä tutkimyskysymystä, joiden pohjalta aineisto teemoiteltiin. Tutkimuskysymykset ovat: 1) Miten monialaiset oppimiskokonaisuudet ja sitä kautta laaja-alainen osaaminen näkyy opetuksessa? 2) Millaisia käsityksiä opettajilla on laaja-alaisuuden ja monialaisten oppimiskokonaisuuksien roolista koulun arjessa? 3) Miten laaja-alaisuus on muuttanut opetusta? 4) Mitkä asiat mahdollistavat/estävät laaja-alaisuuden sekä monialaisten oppimiskokonaisuuksien toteuttamista?\r\n \r\nTutkimustulokset jaoteltiin edellä esitettyihin tutkimuskysymyksiin sekä niiden pohjalta muodostettuihin teemoihin. Laaja-alaisen oppimisen ja monialaisten oppimiskokonaisuuksien toteutumista opetuksessa jäsennettiin kahden teeman kautta: laaja-alaisuus opetuksessa ja monialaiset oppimiskokonaisuudet opetuksessa. Koulun arkeen liittyvän tutkimuskysymyksen kautta muodostuneet teemat olivat: osa koulun arkea, toiveena/tavoitteena, ei yhteistä toimintakulttuuria sekä yhteistyö. Uuden opetussuunnitelman tuomaa muutosta havainnollistetaan opettajan, oppilaan ja opetussuunnitelman sisällön kautta. Neljännessä tutkimuskysymyksessä teemoja oli useita. Mahdollistavien ja estävien tekijöiden lisäksi huolestuneesti opetussuunnitelmaan suhtautuvien opettajien vastaukset oli jaoteltu estävien tekijöiden osalta kolmeen alateemaan: aika/kiire, laitteet ja opettajat. \r\n\r\nTämän tutkimuksen tulokset osoittivat opettajilla olevan hyvin ristiriitaisia käsityksiä uudessa opetussuunnitelmassa ilmenevistä laaja-alaisuudesta ja monialaisista oppimiskokonaisuuksista. Tutkimuksen tulosten perusteella ei voida sanoa, että laaja-alaisuudesta ja monialaisista oppimiskokonaisuuksista olisi tullut luonteva osa koulun arkea, vaikka osan innostuneista opettajista vastaus olikin tämän suuntainen. Uudessa opetussuunnitelmassa ilmenevät käsitteet laaja-alaisuus ja monialaiset oppimiskokonaisuudet ovat vaikuttaneet opetukseen ja jopa muuttaneet sitä monin tavoin. Opettajat näkevät laaja-alaisuudessa mahdollisuuksia, vaikka myös monia estäviä tekijöitä oli mainittu."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "laaja-alainen osaaminen"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "monialainen oppimiskokonaisuus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "opetussuunnitelma"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eläytymismenetelmä"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201805291804"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201805301834"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Nguyen, Hoang,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Consumers' pursuit of uniqueness in online fashion consumption."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (86 pp + appendices sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The theory of uniqueness and need for uniqueness (NU) have had considerable influence on consumers’ consumption behaviours. Depending on individual differences, consumers perceive NU differently and behave correspondingly. While the research phenomenon has been studied widely in the context of traditional fashion consumption, minimal analysis has been done to investigate consumption behaviour in the online environment. The purpose of this research is to understand consumer uniqueness-seeking behaviours undertaken online by exploring their motivations for engaging in online fashion shopping, perspective of NU, and manifestation of NU. To address the determined research purpose, the author adopts the interpretive approach to examine consumers’ perception and experiences of performing certain uniqueness-seeking behaviours online to assure their status of uniqueness. Semi-structured and in-depth interviews have been conducted to collect empirical data to answer the complementary research questions. Derived from the result, consumers are driven online by various factors, including convenience, product availability, price along with others. Throughout the study, consumers classify themselves into groups that share similar degree of NU. Those with similar degree of concern for uniqueness share similar perceptions and exhibitions of NU categorised into three dimensions, namely creative choice and unpopular choice counter-conformity, and avoidance of similarity. The findings might contribute beneficial insights for fashion businesses to better satisfy consumers with diversified NU as targeted market."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "need for uniqueness"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "uniqueness-seeking behaviour"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "online fashion consumption"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201805301834"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201805311873"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Limani, Keti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Branding with content : Digital content marketing as a viable online brand equity approach for Software-as-a-Service firms in business markets."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (126pp + 8pp appendices + 2pp figures sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Viestintätieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Background: The advent of the Internet has created challenges and opportunities for branding. While, purely online brands, such as Software-as-a-Service applications, are expected to generate online brand equity in digital settings, online business consumers display a growing resistance to marketing messages and make decisions based on personal standards. The shifting branding paradigms call for alternative marketing communications approaches and marketers are, now, increasingly using content to achieve business and branding goals online. \r\nPurpose: Extant academic literature has produced fragmented insights in relation to online branding in business markets as well as in Software-as-a-Service contexts. Therefore, the purpose of the current research is to examine how Software-as-a-Service brands create online brand equity by distributing firm-generated content targeted to business consumers. \r\nMethods: The research strategy was grounded on the development of a theoretical framework based on existing branding literature and adapted for the purposes of the current research. A qualitative case study research approach was adopted and, as a result, the findings were derived from the examination of a Finnish Software-as-a-Service firm with business customers. The data collection methods comprised of semi-structured interviews and observation. \r\nResults: The study found that value-added, firm-generated content, delivered through the content marketing process, can impact online brand equity by positively affecting brand perceptions in the minds of target consumer groups. Furthermore, the empirical findings showed that content can also be used as a tool to achieve organizational goals, such as customer conversion and sales."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Content marketing"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Online branding"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Online brand equity"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Inbound marketing"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Firm-generated content"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "SaaS"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "B2B"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201805311873"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806111975"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Saari, Antti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "The rhetoric of the ‘digital leap’ in Finnish educational policy documents."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1474-9041;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Säntti, Janne,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806111975"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806121982"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Enroth, Linda,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Does use of long-term care differ between occupational classes among the oldest old? Vitality 90+ Study."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1613-9380;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "socioeconomic factors"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "institutionalisation"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "oldest old"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "mortality"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aaltonen, Mari,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Raitanen, Jani,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Nosraty, Lily,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Jylhä, Marja,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806121982"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806121985"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Viskari, Hanna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Live attenuated anterovirus vaccine (OPV) is not associated with islet autoimmunity in children with genetic susceptibility to type 1 diabetes : prospective cohort study."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "b",
            "value": "Diabetologia,"
          },
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "1432-0428;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "embargoedAccess"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "autoantibody"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "enterovirus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "inactivated polio vaccine"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "oral polio vaccine"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "type 1 diabetes"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Oikarinen, Sami,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hoppu, Sanna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Vuorinen, Tytti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Huhtala, Heini,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Toppari, Jorma,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Veijola, Riitta,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Ilonen, Jorma,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Knip, Mikael,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Hyöty, Heikki,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806121985"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806121995"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kuoppa, Arttu,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Recommended by algorithm : relevance, affordances and agency of music recommender systems."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (106 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Viestintätieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Software has indeed become an essential part of how cultural artifacts are circulated. Due to advancements in technology in the last decades, a significant amount of our everyday life activities is now mediated by these various applications. Software does not, however, only provide us tools we need; it also shapes our actions and transfers our boundaries of abilities to act. Therefore, it is not enough to analyze the relationship between user and technology only as a relationship between an actor and a tool. Instead, the relationship should be problematized and it should be acknowledged that it has become more complex and intertwined than ever before.\r\n\r\nIn my thesis, I focus on music recommender systems that are great examples of software technology since they increasingly influence on what information we receive and perceive most relevant. They also represent the development in which personalization and customization of services are becoming more common. In overall, these systems have been studied mostly from the technical perspective leaving a more cultural approach and user point of view often disregarded. In this thesis, I sought to to fill this gap in research by focusing on the user experiences instead of the systems. My main research question was: “how recommender systems shape and participate in the practices of music discovery and consumption of the users?”. This question was further divided into three themes: taste, relevance and agency.\r\n\r\nIn order to be able to answer my research questions, I interviewed eight people by using semi-structured focused interview as my data collection method and analyzed it by using theory-related content analysis. The interviews were conducted in Finnish as well as the analysis. The quotations presented in this thesis, however, are translated into English.\r\n\r\nThe results suggest that the user perceptions of the ability of the recommender systems to learn the taste of the user varied a lot. For some, recommendations were accurate and constructed a stylistic or aesthetic ‘profile’ of the user whereas in other cases, users thought that recommender systems made too simplifying deductions or misinterpreted the taste totally. The attitude towards recommendations was also shaped by how users perceived themselves as discoverers of music. Furthermore, it turned out that music recommender systems have its biases and affordances – for better or worse. The recommender systems were mostly given a great deal of autonomy which blurred the perception of who or what is actually acting."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "music recommender systems"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "taste"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "relevance"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "agency"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "software"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "algorithms"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806121995"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||fin  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806192036"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "fin"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Nurminen, Minna,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Kohti yhteistä tietoa ja sen jakamista : kollektiivisen asiantuntijuuden kehittyminen ja hyödyntäminen lastensuojelun avohuollon uudessa tiimissä."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (104 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Kasvatustieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tässä toimintatutkimuksella toteutetussa tutkimuksessa selvitettiin, miten kollektiivista asiantuntijuutta voidaan hyödyntää ja kehittää lastensuojelun avohuoltoon perustetussa uudessa tiimissä. Tutkimuksessa tarkasteltiin sekä koko kaupungin lastensuojelun avohuoltoa että yhden alueen lastensuojelun kahta uutta tiimiä. Uudet tiimit muodostuivat kahden eri työmuodon työntekijöistä ja heidän esimiehistään. Tiimien toiminnan kehittäminen aloitettiin toukokuussa ja ensimmäinen arviointi kehittämisprosessista tehtiin joulukuussa. \r\n\r\nAsiantuntijuuden ja osaamisen kollektiivinen hyödyntäminen ja kehittäminen uudessa tiimissä edellyttää, että tiimi pystyy yhteiseen tiedon muodostukseen ja dialogiseen vuorovaikutukseen. Tämän pohjalta keskeisiksi käsitteiksi muodostuivat asiantuntijuuden yksilölliset ja yhteisölliset ulottuvuudet, asiantuntijuuden kehitysvaiheet ja kollektiivinen asiantuntijuus. Asiantuntijuuden lisäksi tarkasteltiin yhteistä tiedon muodostusta vuorovaikutuksen, dialogin ja tiimin muodostumisen kautta.\r\n\r\nKehittämisprosessin aikana toimintaa kehitettiin kolmella tasolla. Ensimmäisen tason muodostivat alueen esimiesten vetämät kehittämispäivät ja tiimikokoukset. Toinen tason käsitti tutkijan vetämät työpajat. Kolmannen taso muodosti palvelukokonaisuuden päällikön johdolla tehty laajempi kehittäminen. Tutkimuksen aineiston muodostivat näillä tasoilla toteutetut kyselyt, ryhmätöiden tuotokset ja havainnoinnit. Moninaisen aineiston yhdistäminen tehtiin käyttäen analysointimenetelmänä kertovan muutoselonteon menetelmää, joka mahdollisti kehittämisprosessin ja tapahtuneen muutoksen kuvaamisen.\r\n\r\nMuutokseen vaikutti eniten se, että osa työntekijöistä koki kehittämisen tavoitteen olleen epäselvä koko prosessin ajan. Tämän vuoksi kehittämiseen ei täysin sitouduttu. Sitoutumattomuudesta huolimatta työntekijät osallistuivat hyvin työpajoihin ja niissä käytyihin keskusteluihin, joihin esimiehet olivat järjestäneet kaikille mahdollisuuden osallistua. Keskustelut mahdollistivat Oman tehtäväkuvan ja roolin avaamisen toisille sekä tiedon saannin toisten tehtävistä ja roolista suhteessa omaan työhön. Näin päästiin muodostamaan yhteistä ymmärrystä uudessa tiimissä toimimisesta. Esimiesten rooli uudessa tiimissä koettiin epäselväksi ja sen avaaminen tarpeelliseksi. Kehittämisprosessin loppuvaiheessa saatiin tieto yhteisiin toimitiloihin siirtymisestä. Tämän uskottiin tuovan enemmän mahdollisuuksia dialogiin ja yhdessä toimimiseen sekä oman ja tiimin kollektiivisen asiantuntijuuden hyödyntämiseen ja kehittämiseen. \r\n\r\nAineiston pohjalta näyttä siltä, että työpajatyöskentelyn vaikutuksena oli enemmän kollektiivisen asiantuntijuuden kehittämistä estävien tekijöiden esille nostaminen ja suunnitelman luominen seuraavalle kehittämissyklille, kuin osaamisen kehittyminen sinänsä. Tutkimuksen lyhyt aikajakso mahdollisti vain yhden toimintatutkimuksen syklin toteuttamisen. Aikaa olisi tarvittu enemmän esimerkiksi työpajoissa sovittujen asioiden käyttöönottoon arjessa ja niiden toimivuuden arviointiin. Muutosprosessi synnytti tarpeen mallintaa toimintatutkimusta hyödyntävä kehittämisen malli, jossa kaikilla on mahdollisuus osallistua yhteiseen keskusteluun ja kehittämiseen. Tämän kehittämistoiminnan kautta muodostetaan yhteistä tietoa, toimitaan yhdessä, opitaan toinen toisilta ja luodaan uusia toimintatapoja."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "asiantuntijuus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "dialogi"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kollektiivinen asiantuntijuus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "tiimi"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "toimintatutkimus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "yhteinen tiedon muodostus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kertovan muutosselonteon menetelmä"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806192036"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806252080"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Panula-Ontto, Juha,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Cross-impact analysis of Finnish electricity system with increased renewables : Long-run energy policy challenges in balancing supply and consumption."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "x",
            "value": "0301-4215;"
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "cc by-nc-nd 4.0"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "cross-impact analysis"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "electricity system"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "low-carbon"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "renewables"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "transition"
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Luukkanen, Jyrki,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kaivo-oja, Jari,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "O'Mahony, Tadhg,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Vehmas, Jarmo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Valkealahti, Seppo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Björkqvist, Tomas,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Korpela, Timo,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Järventausta, Pertti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Majanne, Yrjö,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kojo, Matti,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aalto, Pami,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Harsia, Pirkko,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kallioharju, Kari,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Holttinen, Hannele,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "700",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Repo, Sami,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806252080"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806282102"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Walt, Charlene van der,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Sustainability reporting practices in small-to-medium sized enterprises."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (73 pp + 2 appendices + 10 figures sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "There is an abundance of literature on sustainability reporting although it has been claimed that most focus is on MNEs and LEs. While SMEs are valuable in a country’s economy and in the supply chains of MNEs, SMEs have been portrayed as being laggards in accounting for their sustainability impacts. MNEs and SMEs operate in the same environment, but they operate in different ways as they have different characteristic influences. The most notable difference is size and limited resources, hindering effective sustainability reporting. Reporting frameworks have been introduced to guide sustainability reporting, such as the well-known GRI framework, The GRI framework and guidelines has been criticized as being too complex and costly for SMEs. Therefore, it was claimed that SMEs need a concise set of sustainability indicators.  \r\n\r\nThus, the purpose of the thesis is to gain more insight into the current state of SME sustainability reporting, specifically investigating sustainability indicators reported by active SME reporters applying the GRI-G4 guidelines. In the pursuit to explore the contemporary sustainability reporting practices in SMEs, the study further questions whether there is a pattern of frequently reported sustainability indicators by SMEs.\r\n\r\nThe data was collected from 52 SME reporting companies which incorporated the GRI-G4 framework in their sustainability reports and published their reports in the GRI Database. Each report included a GRI Content Index which summarized all the sustainability indicators they reported in their reports. Data was collected from the organizations and the indexes, inserted in tables and charts, and analyzed. Content analysis was used to analyze the data.\r\n\r\nIt was found that half of reporting SMEs utilizes the GRI reporting framework. Although the sustainable reporting rate in sustainable indicator disclosures was very low, it presented a slight pattern in the most common indicators SMEs disclosed, but also limited the accuracy of the results. Different common sustainability reporting themes were identified rather than specific indicators due to many limitations which questioned the accuracy of the results which encourage further research into SME sustainable reporting."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "sustainability reporting"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "GRI"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "SME sustainability reporting"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "sustainability indicators"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806282102"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806282107"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Diez Uriarte, Maria,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Analysis of the autonomy and the regulations of the private higher education in Mexico."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (154 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "According to the Mexican law, private individuals are allowed to grant higher education as long as they fulfill the established requirements. Different a priori (legislation, agreements, basic requirements and approvals) and a posteriori (supervisions and recognition of degrees) instruments are used by multiple authorities to regulate the system, constraining mainly the academic autonomy of the higher education institutions. However, these mechanisms seem not to be sufficient because, in recent years, many low quality private higher education institutions have flourished. Therefore, in order to understand how these regulations constrain or enhance the institutions’ capacities and explore their role in the proliferation of low quality institutions, this study analyzes in depth the nature of the private higher education in Mexico, the current mechanisms that regulate the sector, and the different degree of the autonomy that they enjoy in their several dimensions.\r\nTo achieve the purpose of this study, a qualitative research, and more specifically, an exploratory qualitative inquiry research, has been carried out. Hence, first of all, this research starts by analyzing the private higher education and the characteristics of the autonomy it enjoys, as well as the current mechanisms that exist for its regulation. Second, it reviews the policy documents that today regulate the private higher education in Mexico (The Mexican Constitution, The General Law of Education, The Law for the Coordination of Higher Education, the Agreement 243 and the Agreement 17/11/17), and the contributions that other authors have made over time, to have a better understanding of the phenomenon. Third, it analyzes the information collected in several interviews, in order to comprehend the interpretations of those involved in the phenomenon. Thus, a purposive sampling was selected and semi-structured interviews were carried out to explore the perspectives of different actors that are part of the higher education system in Mexico, playing diverse roles in the field, and with varied working experiences in different institutions. \r\nThe findings of this research reveal that private higher education in Mexico is perceived as a fundamental sector of the tertiary education level, playing a specific role for the formation of the elites that opposed the ideology taught at the public sector, but also for granting education to a sector of the population that is left without access from the public sector. Therefore, private education has become a complex topic of study. In general, it has been found that private higher education institutions enjoy a high degree of autonomy, as regulations do not seem to limit very much their ability to act and self-govern. While they enjoy higher degrees of autonomy in the financial, organizational and staffing dimensions, the academic dimension is the most constrained. Despite this high degree of autonomy, most participants do not consider that regulations have been the reason for the proliferation of low quality education institutions, as the literature has pointed out; on the contrary, participants concur that the lack of access is the main reason for their proliferation."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "higher education"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "private higher education"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "autonomy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "regulatory policy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "regulatory instruments"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "regulations"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806282107"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806282111"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Rautela, Devashish,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Characteristics of successful online marketing strategies in small and medium sized enterprises: A multiple case study."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (86 pp + appendices sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "It is essential that companies structure KPIs that are aligned, attainable, acute, accurate, actionable, and alive to influence consumers and influence their business. By measuring the key performance indicators, digital marketing can change the course of SMEs and increase their profitability. This is an analytical study with a purpose to explain the relationship between implemented marketing strategies, with reference to PPC, on a business’s performance, where increased revenues and the ROI will be taken into account as indicators of SME success. It combines findings from case study analysis, online survey and secondary data to draw conclusions. Main findings suggest the various challenges for SMEs while creating their marketing strategies for digital platforms. These challenges included the absence of the digital marketing strategy at all, conversions rates, high costs of cost-per-conversion (CPC) rate, revenues, online visibility, and need to attract more qualified traffic to their websites. Experiences from the six cases and analysis that was focused on PPC, and different aspects of this online marketing strategy, including account structure, keywords, budgets for different cases, testing right elements and optimization, lead to several important observations."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "online marketing"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "key performance indicators (KPIs)"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "return on\r\ninvestment (ROI)"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "cost per acquisition (CPA)"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806282111"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806282122"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Zuev, Roman,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Identity Transformation through Dialogue: A Case Study of Student Video Messages Exchange in Russia-Ukraine Conflict."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (86 pp sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806282122"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806282125"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Githieya, Njoki,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "An analysis of key approaches and influencers of deradicalization of violent extremists : a case study of Al-Shabaab."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (72 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "closedAccess"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806282125"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806282136"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Zhou, Hui,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Characteristics of user experience in art e-commerce : case \"buybuy Art\"."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (83 pp sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "With the development of mobile Internet technology and the proposed of “Internet plus” by Chinese government, art trading online and offline is not just limited to the simple combination but innovated to realize a new business model in art market. In order to conform to the new consumption trends, art e-commerce providers should shift their operation principles from commodity-centered to user-centered, from items to customers. Thus, by taking user experience as a breakthrough, exploring the suitable methods to attract increasing potential customers will be the mainline in this research.\r\nThe adoption of relativist position as the methodology paradigm will provide this paper not only an aspect of empirical argument from interviews and literature reviews, but also a scientific demonstration through case study of “buybuy Art” and interviews. \r\nAfter searching, identifying and reviewing a series of literatures in regard to combination of Internet and art, analysis of interview as well as case observation, those dedicate to attain holistic viewpoints of user experience for art e-commerce platforms. From that, the characteristics of users trading art online will be defined. Besides, the existing problems such as authenticity of artworks and credit issues still need to be paid attention to. The introduce of light social media such as WeChat and products recommended in personalization can optimize the user experience."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "art electronic supplier"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "art e-commerce"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "interactive design"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "user experience"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "artworks"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806282136"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806282143"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Ke, Da,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Conceptual design on computer sentencing simulation based on SVM."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (54 pages + 3 reference pages + 6 index and appendix pages + 23 figures sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Luonnontieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The criminal law in China is a relatively uncertain statutory punishment law, and the judge exercise the equitable discretion within the extent for discretionary action of sentencing. However, influenced by many objective and subjective factors, the punishment imparity exists inevitably. To farthest implement the justice goal that criminal law pursues and get the largest benefit from criminal penalty, the Support Vector Machine (SVM), one of the machine learning method that newly emerged in the artificial intelligence theory, is adopted for the application of measurement method research of penalty in this thesis, and the SVM measurement model of penalty (SVM sentencing model) is presented, which attempted to decrease the imparity in the measurement of penalty through the improvement of sentencing method. Based on the SVM sentencing model as the core measurement method of penalty, the machine learning based sentencing expert system’s general frame is described. Finally, the theft crime is taken as an example, the realization procedures and details of expert system are illustrated."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "sentencing"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "sentencing circumstances sentencing method"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "machine learning"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "support vector machines."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806282143"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806282144"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Trubachyova, Yuliya,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Seen from the outside : perceptions of the EU in Kazakhstan."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (111 pp + 3 pages of Appendix sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "This study covers EU perceptions by different groups of Kazakhstani elites. The significance of the research is supported by the growing cooperation of Kazakhstan and the EU (for example, the Enhanced Partnership and Cooperation Agreement, 2015). Furthermore, the Kazakhstani perceptions of the EU are recognized understudied. Simultaneously, some controversy can be observed between the alleged and the real perception of the EU abroad.\r\n \r\nMethodologically, in order to study elite perceptions, the thesis consists of two levels of analysis. First, the study relies on qualitative content analysis (QCA) of the mass media articles, namely, Kazakhstanskaya Pravda and Tengrinews portal, with 86 articles in total published during the 2015-2017 period. Second, with the help of QCA it reflects on the author-conducted interviews with media and business elites, civil society and experts/ academics in October-December 2017.\r\n \r\nAccording to my analysis, the EU-Kazakhstan relations are perceived positively by both different parts of the Kazakhstani elite and different sources of data, namely, the mass media and the author-conducted interviews. The perception of the EU as a normative power is quite ambiguous while the image of the EU as an economic power is prominent. This topic should be included into the further studies to enhance mutual understanding and cooperation between Kazakhstan and the EU. The results may help IR scholars, policymakers as well as general public to broaden the horizon of the understanding of the EU international identity."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806282144"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806282148"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pankakoski, Iiro,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Youth livelihoods and the local conflict in North Kivu : a case study in the Eastern Democratic Republic of Congo."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (109 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "North Kivu in the eastern Democratic Republic of Congo has long been a hotbed of ethnic tensions, conflicts over minerals, as well as struggles over land and power. Multiple humanitarian and development actors, including Finn Church Aid who exited in March 2016, have been active in the region, due to it constituting a protracted humanitarian challenge, with forced displacement, violence and other human rights abuses taking place regularly. This thesis identifies the relations between youth livelihoods and the local conflict in North Kivu based on project narrative reports and staff interviews from Finn Church Aid. It uses Grounded Theory methodology to code the data, and scientific literature on youth, livelihoods and conflict to place the data into context, and to assist locating and conceptualising the relations between youth livelihoods and the local conflict. The conclusion is that the relations are complex. Youth under-employment is related to the local level conflict through various social processes with the involvement of other factors. Conflict generally is destructive to livelihoods, and it creates and exacerbates vulnerability through various ways, such as displacement or trauma. Livelihood development can be used to mitigate and address conflict drivers, although at worst it can also drive conflict itself, which means that interventions must be conflict-sensitive. In general, the thesis demonstrates the complexity of the relations as well as highlights how challenging it is to successfully design and implement development interventions in fragile contexts."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "youth"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "livelihoods"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "conflict"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "development programmes"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "North Kivu"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Finn Church Aid"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806282148"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806282149"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Durante, Francesco,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Russia's international energy cooperation : the Yamal LNG case."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (103 pp sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "International cooperation is an important but often neglected topic. In 2017 the Russian Federation together with Asian and European partners completed the Yamal LNG project, one of the biggest in the world and the first within the Arctic Circle, only with a small delay in the schedule despite the Ukrainian crisis and the subsequent financial sanctions and ruble crisis. \r\n\r\nThe dissertation aims to understand how and why this project became reality and how international energy cooperation emerges by using the social–structurationist model of energy policy formation. Cooperation in IR is defined as ‘policy coordination’ but because energy policy constitutes its antecedent, the impact of domestic factors is also researched. \r\n\r\nThe topic is approached by a descriptive-explanatory case study with theory–driven qualitative content analysis as its method which permits to extract information from a text and to process it independently of the text. The data are diverse and include companies’ press releases, governmental and ministerial documents and transcripts of press interviews and meetings.\r\n\r\nFrom the analysis it resulted that the socio-economic development of Russia was the primary interest of the government whose support allowed the project to run on time. Other actors held mainly a business frame whereas foreign partners were also fundamental in providing technology and financings. The importance of domestic factors also emerged as so did the way in which the structural dimensions enabled and constrained the outcome. \r\n\r\nFew broader considerations can be drawn from this study: first, it appears that politically motivated financial sanctions might obstruct but not halt international energy projects. Second, with low oil prices Russia seems to be more cooperative. Third, it appears that the backing of a strong central government to a private energy project can positively affect cooperation. Fourth, with limited financing and technology a country could seek partnership only if its resource base is wide enough and it can preserve advantageous or best returns for itself."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "JSC Yamal LNG"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "international energy cooperation"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Arctic"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Russian energy policy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "qualitative content analysis"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "structuration."
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806282149"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806282157"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mochizuki Pelaez, Elisa,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Open governance for a social agenda across welfare states in Europe."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (iii, 65 pp + appendix sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "closedAccess"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806282157"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201806292186"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Ambrose Gregory, Charlotte,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Working life discrimination among migrant registered nurses in hospitals in Finland : a pilot study."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (57 pp sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Discrimination at the workplace is a major source of dissatisfaction among migrant nurses in other countries such as United Kingdom and Australia. Despite acknowledging the difficulty of retaining internationally educated nurses in Finland, there is a paucity of data concerning workplace discrimination of migrant registered nurses (RNs) in Finland.\r\n\r\nThe aim of this pilot study is to look at whether migrant RNs in hospitals and hospital-like settings in Finland experience workplace discrimination and if so, the nature of this discrimination. The purpose of this study is to inform health centres about issues that need to be addressed to ensure a discrimination-free workplace that is conducive to nurses of all ethnic and racial backgrounds.\r\n\r\nData were collected through semi-structured interviews and analysed using thematic analysis. The themes that emerged were sorted using Feagin and Eckberg's Typology of Discrimination. Discrimination can exist on the personal level (microlevel discrimination) and on the organizational level (macrolevel discrimination). The major component of microlevel discrimination was microaggression, which can be broken down into microinsults, microinvalidations and microassaults. Barriers to language and communication, limited career opportunities and deskilling emerged under the macrolevel discrimination category.\r\n\r\nThis study shows workplace discrimination of RNs who have migrated to Finland on both the microlevel and macrolevel. It provides valuable insight on how migrant RNs experience discrimination in their working lives and what issues need to be addressed to rectify the problem. Eradicating discrimination at the workplace is a good way to retain nurses and ensure a healthy work environment for all."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "workplace discrimination"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "migrant registered nurses"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Finland"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "job satisfaction"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201806292186"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||fin  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201807022190"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "fin"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Drufva, Satu,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Kohti osallistavaa verkko-ohjausta : tarkastelussa liiketalouden ammattitutkintoihin valmistava koulutus."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (74 sivua, 10 liitesivua sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Viestintätieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Ammatillisen koulutuksen reformi on yksi valtioneuvoston kärkihankkeista. Ammatillisen koulutuksen uudistaminen on välttämätöntä, koska tulevaisuuden työelämässä tarvitaan uudenlaista osaamista ja ammattitaitoa. Yhteiskunnallinen osallistuminen edellyttää, että kansalaisilla on riittävä kyky käyttää ja tulkita mediaa. Työpaikalla tapahtuva oppiminen, yksilölliset opintopolut sekä suotuisan toimintaympäristön luominen digitaalisille palveluille ja uusille liiketoimintamalleille on kirjattu hallitusohjelman tavoitteisiin. Ammatillinen opettaja on uudistusten toimeenpanijana ison urakan edessä.  Kuinka selvitä uudistuksista, kun samalla määrärahoja leikataan?  \r\n\r\nPääkäsitteet, joiden kautta pyrin ymmärtämään ja kehittämään osallistavaa verkko-ohjausta ovat ammattikasvatus ja mediakasvatus. Tavoittelen vastauksia perehtymällä mediasuhteen, mainonnanlukutaidon, aktiivisen oppimisen, kriittisen mediakasvatuksen ja osallistavan pedagogiikan käsitteille sekä digitaalisen voimistumisen spiraali -malliin. Tässä tutkimuksessa on tavoitteena etsiä osallistavia verkko-ohjauksen tapoja sekä luoda kartta, jossa hahmottuvat kivikkoiset umpikujat ja vahvasti kohti ammatillista kasvua vievät polut.\r\n\r\nToimintatutkimus on tehty liiketalouden ammattitutkintoihin valmistavassa koulutuksessa. Tarkasteltavana on viisi sykliä: kaksi liittyen aloitusvaiheen ohjaukseen ja kolme erilaisella toteutussuunnitelmalla toteutettuun monikanavaisen viestinnän opintojaksoon. Aineistona tutkimuksessa on käytetty muun muassa tutkimuspäiväkirjaa, osallistuvaa havainnointia, opintojaksopalautteita, Aipal-palautteita, videotallenteita sekä opintojaksojen opetusmateriaalia ja tehtäviä. Tutkimuksen tukiaineistona on lisäksi benchmarking, videot, haastattelut sekä opettajakollegoille lähetetty Forms-kysely.\r\n\r\nTutkimustulokset kannustavat ohjaamaan opiskelijaa ja ryhmää digitaalisen voimistumisen spiraalin mukaan. Yksilön motivaatiosta ja yhteisön tuesta lähtevä voimistuminen avaavat aktiivisen oppimisen prosessin, jolloin opiskelija ottaa itse vastuun opinnoistaan. Tutkimustulosten pohjalta rakentuneessa kartassa polut ovat yksilöllisiä ja opettaja toimii ohjaajana navigoinnissa.  Osallistavassa verkko-ohjauksessa opettaja on keskustelun vetäjän, oppaan ja kriittisen kanssakulkijan roolissa. Kyky tulkita ja tuottaa mediasisältöjä on olennainen osa ammattikasvatusta, sillä tieto rakentuu sekä sosiaalisesti että yksilön oman aktiivisuuden, medialukutaitojen ja kriittisyyden kautta.  \r\n\r\nDigitaalisen voimistumisen spiraali toimii myös opettajan voimistajana. Tutkimuksen mukaan opettajat kaipasivat hyvien käytäntöjen jakamista, yhteisopettajuutta ja toisinaan vierihoitoa tarpeellisten työkalujen käytössä.  Voimistumiseen ja osallistamiseen tarvitaan digitaalisten taitojen lisäksi uusia verkko-ohjaukseen soveltuvia vuorovaikutteisia toimintamalleja ja yhteisön tukea.\r\n\r\nTutkimuksen mukaan osallistavassa ammatillisen koulutuksen verkko-ohjauksessa olennaista on siis voimistaminen, aktivoiminen, osallistaminen, kokeileminen, kehittäminen, tukeminen ja jakaminen.  Tutkimus soveltuu digikehittämisen tarkasteluun myös muilla koulutustasoilla."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "ammattikasvatus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "mediakasvatus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "verkko-ohjaus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "aktiivinen oppiminen"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "osallisuus"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201807022190"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201807022191"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Väänänen, Tiina,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Can immigration save the ageing economy of Finland? : the labor market integration of immigrants in the 21st century and the impacts of immigration on public economics."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (95 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The population of Finland is ageing, and the demographic dependency ratio is weakening. In order to fix the sustainability gap of the public sector, several institutions have suggested increasing international net migration to be a solution to the ageing population and the potential lack of labor force. In this thesis, the aim was to observe whether immigration could possibly solve the financial problems faced by the public sector as the demographic structure becomes older. The question is approached with the help of two sub-questions. The first part observes the labor market integration of immigrants in the 21st century, and the second observes the net impacts of immigrant population on public economics in the light of previous economic research and literature.\r\n\r\nIf immigration is going to be a realistic solution to the sustainability gap of public economics, the immigrants should find employment and be able to contribute to the economy as tax payers. In this thesis, the labor market participation of immigrants in 2000-2015 was observed with the help of labor market integration indicators used by the OECD and the data provided by Statistics Finland, Eurostat and OECD. The results show, that the employment of immigrants has been considerably weaker in comparison to the natives in the 21st century. In an international comparison, the gap in unemployment between natives and immigrants is exceptionally large in Finland. However, when comparing the Finnish immigrant population to immigrants living in Sweden, the labor market integration of migrants has improved significantly in 2000-2015, and the immigrant populations living in Finland and in Sweden do as well on the labor markets, on average.\r\n\r\nIt is clear, that the population is ageing, and the share of tax payers is diminishing. Immigration could fix the age structure relatively fast, yet its net impact on public economics is challenging to estimate. International research has estimated the net impact of an immigrant to be similar to a native. On the other hand, the Finnish studies state that the net impacts on public sector vary strongly among immigrant population depending on their background characteristics. The net costs caused by the heterogenic immigrant population vary across immigrant groups. The migrants arriving from other EU and EFTA member states do not differ from natives, as those migrants who have arrived due to humanitarian reasons, can cause relatively large costs to the public sector. As the indicator of labor market integration revealed, there is a significant share of labor force potential among immigrants. Immigration could therefore fix some of the problems caused by the ageing population, but the challenge is to integrate them to the Finnish labor markets. At the moment, it seems like immigration cannot solve all the problems alone but can work well together with other policy measures focusing on affecting the problems caused by the ageing of population."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "demographic dependency ratio"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "economic dependency ratio"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "immigration"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "labor market integration"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "labor markets"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "population structure"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201807022191"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201807022192"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Gräschke, Lucia,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "The transportation of animals by air : a case study on international agreements and Lufthansa."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (61 pages + 2 appendixes sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "In the modern world, non-human animal life is increasingly regulated by legal rules. Many of these rules circulate globally. Despite the growing number of animal studies in the field of social sciences and sociology, the impact of globalization on non-human animal life has received little attention.\r\n\r\nThis study contributes research to the intersection of globalization and animals, by exploring how local and international soft law regulations organize the transportation of animals by air. The study will analyze how international agreements regulate the business of animal transportation by air, as an example, of governance beyond the nation-state. In detail, this study explores how internationally set agreements without binding legal force, here referred as soft law documents, construct authority, and how the local actor Lufthansa exercises power to position itself as an expert in the field of animal transportation by air. Furthermore, the study looks at common rules which organize the transportation of animals, as well as their local modifications.\r\n\r\nFour international agreements — the Live Animal Regulations of the International Air Transportation Association, the Terrestrial Animal Health Code of the World Organisation for Animal Health, the Council of Europe Convention on the transportation of animals, the European Union Regulation 1/2005 — and 24 documents published by Lufthansa have been analyzed using a qualitative content analysis as a method.\r\n\r\nUsing the theoretical concept of soft governance, the analysis identifies that authority of soft law documents has been constructed by cross-references between the soft law documents. Furthermore, the local actor Lufthansa exercises epistemic work to manifest its position as a professional expert in the field of animal transportation. All documents agree on a set of rules, which organize the transport of animals. Together these rules create a template which ensures the successful transportation of animals. Apart from following the rules of this template, the local actor Lufthansa, further, modifies guidelines of the international agreements. These modifications follow two kinds of editing rules. On the one hand, Lufthansa modifies time- and space- bounded features of international guidelines. On the other hand, Lufthansa adds additional rules when interpreting the international guidelines for its own, internal purposes.\r\n\r\nThe case study discusses the results in the perspective of the biopolitical management of animal life during the transportation and reflects on Lufthansa’s attempts to improve the well-being of animals."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "soft law governance"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "epistemic governance"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "editing rules"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Scandinavian institutionalism"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "translation"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "circulating templates"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Lufthansa"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "biopolitics"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201807022192"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201807022193"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Kim, You Kyung,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Developing youth’s multicultural perspective within media education."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (70 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Kasvatustieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "2015 European immigration crises accelerated the speed of globalization and desperate need of multicultural education. This study attempts to show how we can implement multicultural learning within media education especially in informal and nonlocal settings, including online platforms for youth. To illustrate how global media literacy, within both digital and non-digital context, figures its form regarding cultural learning, this study analyzes youths’ way of perception and their developments toward other cultures by using multi-modal tools.\r\n\r\nThis study was carried out in an upper secondary school in one of the Top 3 populated cities of Finland. 4-hour-length of cultural lectures using various media tools, movie appreciation, internet surfing, VR (Virtual Reality) tool utilization, and lastly a media content creation serve this study as an empirical case, a generic concept of qualitative action research. The findings indicate that overall session of combining cultural studies to geographical class aided the students to engage in and to develop their media literacy. Moreover, the project gave the participants a chance to rethink concepts of the difference and others. This study implicates the probability of having better efficiency on multicultural education system by using various media contents that are consumed and produced by geographically distant places, compared to the traditional method of learning. Lastly, this study calls for the need of the change of curricular, development of learning materials, change of mindset, and last but not least, a necessity of more study for a sustainable globe."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Media information literacy(MIL)"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "media education"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "multicultural education"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "VR (Virtual Reality)"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "action research"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "youth education"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "sustainability"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201807022193"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201807022205"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Furs, Volha,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Motivation, management and workflow in short-term media related innovation projects."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (90 pp + 30 pp sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Viestintätieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Innovation is a crucial component for sustainability in media economy and requires creativity and motivation on the part of the creative labor. The purpose of this thesis is to investigate the relationship between team members’ motivation, managers’ behavior and workflow. In particular, I examine the connection between motivation, autonomy supportive or controlling management behavior and the workflow in the innovation media related projects. The research strategy combines two theories: self-determination theory and the componential theory of creativity. The mixed-methods approach was applied to the case study of media related projects within Demola Tampere innovation platform during autumn campaign 2017. The approach consists of qualitative semi-structured interviews and a quantitative survey. The study reveals the importance of the leadership and team members’ personal motivation for the workflow."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "motivation"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "management"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "workflow"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "creativity"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "innovation"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "short-term media projects"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201807022205"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201807022206"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "An, Zihua,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Intercultural project-based learning and multiliteracy : an ethnography study on Finnish-Chinese PLATINUM project."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (54 pages + 4 pages of appendices sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Viestintätieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Here are growing numbers of exchanges and cooperation projects among universities around world. Most of these projects are interdisciplinary and intercultural. Participants’ different cultural and disciplines background requires participants to have many abilities to work with others. Although considerable researches have been devoted to personal competences in intercultural project based learning, rather less attention has been paid to how multiliteracy and intercultural group work as project based learning affect the outcome of the project. This present thesis focuses on dialogue between multiliteracy and intercultural project based learning in intercultural university projects. The aim of the study is exploring how intercultural group work as project based learning and students’ multiliteracy in dialogue with each others and affect the outcome of the project. The main question is how intercultural project-based learning contributes to participants’ multiliteracy and the outcome of designing a virtual reality game. The goals of this thesis are pursued by utilizing the method of ethnography. From observation and interview, the study finds that intercultural group work has a positive influence on students’ multiliteracy through collaborations with other members and works on media products. Instruction, restriction, grouping, courses and schedule are key factors for promoting efficiency of intercultural project based learning. This study supports an earlier intercultural fieldwork research about factors fostering intercultural competence on personal level. This study extends an earlier research about the progress of university students’ multiliteracy. The study finds that students like to put elements from other culture to the final artifacts. This study gives some empirical experience on how to promote efficiency in intercultural project based learning and the significance of multiliteracy in intercultural project based learning. More virtual reality gamed related intercultural projects could be set for promoting teachers and students’ multiliteracy. Empirical driving questions and curriculum schedule should be taken into account before projects start in designing intercultural group work."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "ethnography?intercultural competence?media literacy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "multiliteracy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "project based learning"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "university students?virtual reality game"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201807022206"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201807022207"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Glotov, Sergei,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Teaching film literacy for international educators."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (57 pages + 2 pages of appendix sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Viestintätieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The influence of film is continuously growing, despite of that, film is rarely studied on its own. The research to data has focused on using film instructively, presenting it as an audio-visual tool for learning various disciplines. However, this approach does not stimulate understanding of film or, in other words, development of film literacy.\r\n\r\nThe specific objective of this study is to establish film literacy education and to participate in the discussion on film education for international teachers. Due to the globalization, openness of universities to international students and rise of immigrants, there is need to develop teaching practices that are suitable for international film literacy class.\r\n\r\nThis action research is based on Film Literacy Course conducted in University of Tampere, Finland during Summer School 2017. The course had 12 students from various countries. The research data is drawn from three course assignments and the research diary. The thematic analysis was used to review, analyze and synthesize the results. The findings revealed that during the course students developed critical thinking, extended cultural knowledge and broaden practical and theoretical knowledge about filmmaking. These learning outcomes justify film literacy education approach and teaching practices that were adopted for the course. \r\n\r\nThe study describes a way of teaching film literacy for international educators and recognizes the need for film literacy education among adult population. Therefore, this study calls for the inclusion of film literacy education in media education policy."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "film literacy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "film literacy education"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "film education"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "media literacy"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "media education"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "international educators"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201807022207"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||fin  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201807022208"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "fin"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Autiosaari, Suvi,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "\"Sydän lyö kotimaan tahtiin\" : maahanmuuttajanuorten kuulumisen merkityksiä paikallisessa ja ylirajaisessa arjessa."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (102 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tutkielmassa tarkasteltiin maahanmuuttajataustaisten nuorten paikalliselle ja ylirajaiselle kuulumiselle antamia merkityksiä. Tutkimustehtävänä oli selvittää, millaista paikallinen ja transnationaali kuuluminen ja kuulumattomuus on maahanmuuttajanuorten arjessa, ja mitä merkityksiä he sille antavat.\r\n\r\nTeoreettinen viitekehys rakentui arjen sosiologian, kuulumisen ja transnationaalisuuden teorioille, ja näkökulmina painotettiin erityisesti emotionaalista ja poliittista kuulumista, kuulumisen politiikkaa ja kuulumattomuutta. Kuulumisen teorian hyödyntäminen mahdollisti maahanmuuttajanuorten arjen kokemusten tarkastelun laajemmassa yhteiskunnallisen muutoksen kontekstissa. Tutkimusote rakentui suomalaisen muuttoliike- ja monikulttuurisuustutkimuksen perinteeseen, jossa painotetaan maahanmuuttajien oman kokemuksen ja äänen kuuluville tuomista, ymmärrystä kulttuurisesta moninaisuudesta ja rodullistamisen prosesseista.\r\n\r\nAineisto koostui kuudesta löyhästi strukturoidusta teemahaastattelusta, jotka tehtiin 19–27 -vuotiaiden pakolaistaustaisten nuorten kanssa. Aineiston analyysissä yhdisteltiin kategoria- ja diskurssianalyysia. Analyysiprosessi paljasti nuorten kerronnassa kolme olennaista kuulumisen merkitystä: emotionaalisen kuulumisen, poliittisen kuulumisen ja kuulumattomuuden. Emotionaalinen kuuluminen liittyi lähtömaahan ja Suomeen liitettyihin tunnemerkityksiin ja kulttuuriseen kuulumiseen, ja se oli vahvassa vuoropuhelussa nuorten paikallisen ja transnationaalin arjen kanssa. Poliittisen kuulumisen rakentamisessa korostuivat nuorten paikalliset ja ylirajaiset lähiyhteisöt, kuten perhe ja vertaisyhteisöt, sekä kansalaisoikeuksiin ja -velvollisuuksiin perustuva tilan vaatiminen suomalaisessa yhteiskunnassa. Kuulumattomuus ilmeni maahanmuuttajanuorten elämässä valtaväestön yhteisöjen ulossulkemisina, kuten kiusaamisena ja arjen rasismina sekä laajempina yhteiskunnallisina ja globaaleina eriarvoisuuksina. \r\n\r\nTutkielma osoitti, että maahanmuuttajanuorten kuuluminen jakautuu monitasoisesti ja ylirajaisesti emotionaalisen ja poliittisen kuulumisen ja kuulumattomuuden teemoihin, jonka vuoksi nuorten erilaisia kuulumisen tapoja tulisi tukea samanaikaisesti ja monitasoisesti. Erilaiset kuulumisen tasot ovat myös vuoropuhelussa keskenään, ja yhden kuulumisen tason tukeminen tukee myös muun kuulumisen rakentamista. Maahanmuuttajanuorten kokemusta tulisi kuulla kotoutumis- ja maahanmuuttopolitiikkaa laadittaessa. Erityisesti haavoittuvimmassa asemassa olevat yksintulleet ja pakolaisnuoret tulisi huomioida paremmin. Rasismia ja sen syntyä yhteiskunnallisena ilmiönä tulisi tutkia tarkemmin ja siihen pitäisi puuttua poliittisella ja toimenpiteiden tasolla."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "maahanmuuttajanuoret"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kuuluminen"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "transnationaali"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "muuttoliike"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "osallisuus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "rasismi"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "sijattomuus"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201807022208"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201807022210"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Alasalmi, Juho,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Motivated prospects of upward mobility."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (81 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Johtamiskorkeakoulu, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The prospect of upward mobility (POUM) hypothesis conjectures that the reason why the poor do not expropriate the rich and sometimes seem to vote against their self-interest is that they expect to move upward in the income ladder and fear that the higher redistribution may negatively affect them in the future. This thesis explicitly models the beliefs agents have about their future income and studies how and when these beliefs can be overly optimistic resulting in low redistribution. \r\n\r\nThe model of motivated prospects of upward mobility is built on a model proposed by Minozzi (2013) and differs from it in that this work adopts a cognitive technology of belief distortion from Bénabou and Tirole (2002). In the model, agents collectively choose a linear tax rate under uncertainty about their exogenous future incomes. In addition to the utility from consumption, agents derive utility from the anticipation of their future consumption. This incentivizes them to distort their beliefs. Given the technology for belief distortion, the motivated prospects of upward mobility emerge endogenously as a result of agents' choices between anticipation and consumption. \r\n\r\nWhen belief formation and voting are strategic, the poor will form overly optimistic beliefs and vote for low taxes if the value of anticipation is high enough and if their optimism does not cause too drastic a change in tax policy. If belief formation and voting are non-strategic, the poor will always indulge in optimism and may even vote against their own best interest. A striking result is that if the incomes of the rich increase as the transfers to the poor stagnate, the poor may demand less redistribution. That is, contrary to the classic benchmark model of Meltzer and Richard (1981), an increase in inequality does not necessarily lead to an increase in demand for redistribution. It is also shown, how Minozzi's (2013) model is a special case of fully naive inference and that Minozzi's results are not robust to Bayesian rational agents.  \r\n\r\nLastly, a dichotomy between naive and sophisticated cognitive technologies for endogenous belief distortion in the literature of psychological economics is identified, and a general model of motivated beliefs which brings these various cognitive technologies together and shows how they relate is proposed."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "prospect of upward mobility"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "redistribution"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "endogenous beliefs"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "motivated beliefs"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "motivated reasoning"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "biased beliefs"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "over-optimism"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "anticipation"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201807022210"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "020",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "978-952-03-0777-6"
          },
          {
            "code": "q",
            "value": "PDF"
          }
        ]
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:ISBN:978-952-03-0777-6"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Mäkinen, Meeri,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Functionality of Brain in a Dish : Methods and study of electrophysiological phenomena in human pluripotent stem cell-derived neural networks."
          }
        ]
      },
      {
        "tag": "246",
        "ind1": "1",
        "ind2": "3",
        "subfields": [
          {
            "code": "a",
            "value": "Maljalla kasvatettujen aivojen toiminta : Ihmisperäisistä kantasoluista erilaistettujen hermoverkkojen sähköinen toiminta ja sen tutkimusmenetelmiä"
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "b",
            "value": "Tampere University Press,"
          },
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "490",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Acta Electronica Universitatis Tamperensis,"
          },
          {
            "code": "x",
            "value": "1456-954X;"
          },
          {
            "code": "v",
            "value": "1900"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Artikkeliväitöskirja"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Artikkeliväitöskirja :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Lääketieteen ja biotieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Ihmisaivot koostuvat sähköisesti aktiivisista verkostoista. Nämä verkostot ovat aivotoimintamme perusta ja ne saavat alkunsa jo ennen syntymää. Aivojen kehityksen aikana ensimmäiset verkostot muodostuvat yksittäisistä hermosoluista. Samaan aikaan aivojen rakenne ja sähköinen toiminta muuttuvat vaiheittain. Emme kuitenkaan täysin ymmärrä kuinka yksittäisten hermosolujen toiminta johtaa aivotoimintaan. Tätä voidaan tutkia laboratoriossa, kasvattamalla hermosoluja ihmisperäisistä kantasoluista. Näin kasvatetut hermosolut muistuttavat ominaisuuksiltaan hermosoluja, joita voidaan löytää kehittyvistä aivoista eri vaihessa. Tämän lisäksi ihmisperäisistä kantasoluista tuotetut hermosolut kykenevät tuottamaan sekä yksittäin, että verkostona sähköistä aktiivisuutta. \r\n\r\nTämän väitöskirjan tavoitteena oli tutkia tarkemmin miten ja millaista sähköistä aktiivisuutta ihmisperäisistä kantasoluista kasvatetuissa hermoverkoissa muodostuu ja näin auttaa meitä tulevaisuudessa ymmärtämään kuinka aivotoiminta muodostuu terveissä ja sairaissa aivoissa. Tavoitteena oli myös selvittää eroja ihmisen ja eläinten aivotoiminnan kehittymisen välillä. Jotta hermosolujen kehittyviä sähköisiä ominaisuuksia voitiin seurata samaan aikaan kun mitattiin laajemman verkoston ominaisuuksia, kehitettiin väitöskirjassa uusia koe- ja analyysityökaluja. \r\n\r\nTässä väitöskirjatyössä varmistettiin ensin, että ihmisperäisistä kantasoluista kasvatetut solut todellakin olivat hermosoluja. Tämä suoritettiin tarkastelemalla solujen muotoa, sekä niissä esiintyviä proteiineja. Tämän lisäksi hermosolujen ja hermoverkkojen sähköistä aktiivisuutta ja sen kehittymistä seurattiin. Seuraaminen toteutettiin mittaamalla sähköistä aktiivisuutta useasta hermosolusta samaan aikaan mikroelektrodihilalla (MEA) tai kuvaamalla tiheään kalsiumionipitoisuusherkällä väriaineella värjätyä hermoverkkoa (kalsiumkuvannus). Yksittäisten hermosolujen solukalvon sähkönjohtavuuden muutoksia mittattiin solun sisään asetettavalla elektrodilla (patch clamp). Hermosolujen aktiivisuusmittausten tehostamiseksi, selvitettiin kasvattaako hermosolujen kasvupinta-alan ja nestetilavuuden rajoitus mittausherkkyyttä. Sähköisen toiminnan muodostumista tarkisteltiin yhdistämällä MEA-mittaukset ja kalsium-kuvannukseen, jotta voitaisiin selvittää kuinka yksittäisten hermosolut toimivat suhteessa verkoston toimintaan. Lisäksi verkostoja altistettiin erilaisille toimintaa häiritseville aineille, jotta saataisiin tarkempaa tietoa siitä mitkä hermosolujen ominaisuudet ovat kriittisiä koko verkoston toiminnan kannalta. Väitöskirjatyön aikana kehitettiin ja testatiin uusia analyysiohjelmistoja, jotta voitaisiin tarkemmin erotella sähköistä aktiivisuutta MEA elektrodien mittaamasta signaalista, ja jotta voitaisiin automaattisesti tunnistaa ja päätellä kalsiumkuvannuksen tuottamista kuvasarjoista yksittäisten hermosolujen ja verkoston aktiivisuutta. \r\n\r\nHermosolujen kasvupinta-alan ja nestetilavuuden rajoituksen havaittiin lisäävän mittauksissa näkyvää aktiivisuutta. Avuksi kehitetyt analyysiohjelmistot mahdollistivat toisiaan täydentävän datan tuottamisen yhtäaikaisista MEA- ja kalsium-kuvannusmittauksista. Lisäksi sähköisen aktiivisuuden ja häiritsevien aineiden vaikutuksien tarkastelu paljasti ihmisperäisille hermoverkoille ominaisia piirteitä, mutta myös piirteitä, joita on havaittu muiden eliöiden aivojen kehityksen aikana. \r\n\r\nLoppupäätelmänä voidaan sanoa, että ihmisperäististä kantasoluista kasvatetut hermoverkot ja kehitetyt mittaus- ja analyysityökalut muodostavat kokonaisuuden, joka tulevaisuudessa mahdollistaa aivoaktiivisuuden ja siihen vaikuttavien tekijöiden takana olevien yksityiskohtien selvittämisen."
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "The brain consists of electrically active circuits that carry out the functions of human cognition. These circuits are formed during development via structural and functional brain development. Our understanding of how the functional aspect arises from the cellular components remains incomplete. In vitro neuronal networks derived from human pluripotent stem cells (hPSCs) can be harnessed to repeat several key steps of structural brain development. Furthermore, hPSC-derived neurons are able to capture the development of functionality on an individual level and have been shown to display features of network activity.\r\n\r\nThe aim of this thesis was to aid the understanding of human specific cellular physiology underlying network activity formation during neural development and generation of abnormal brain functions by studying the spontaneous emergence of network activity patterns in hPSC-derived neural networks. For studying the immature physiological properties of hPSC-derived neurons in the context the emerging network activity patterns, new experimental and analytical tools were developed.\r\n\r\nIn this thesis, hPSC-derived neural networks were characterized on morphological and molecular levels to ensure the generation of neural cells. Furthermore, the emergence of network activity patterns and the underlying single neuron activity was investigated with microelectrode arrays (MEAs), calcium imaging and patch-clamp technique. To enhance the recordings of neural activity the effects of area and volume restriction by microfluidic devices were investigated. To assess the physiological properties of single neurons in the context the emerging network activity patterns, calcium imaging was combined with MEA measurements while performing pharmacological manipulations. Furthermore, new analytical tools for improving activity detection on MEAs and for collecting large scale single cell activity data from calcium imaging were developed and tested.\r\n\r\nThe activity measurements of hPSC-derived neural networks were found to be improved by restricting the growth area and volume. The developed analysis methods allowed two powerful measurement methods to be combined, providing improved temporal and spatial resolution. Furthermore, the hPSC-derived networks were found to recapitulate general as well as species-specific features and mechanisms of network activity pattern development.\r\n\r\nIn conclusion, hPSC-derived networks in combination with the developed tools will be a valuable system for unraveling the detailed mechanisms of the formation of abnormal brain functions in the future studies."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kantasolut"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "hermoverkkoaktiivisuus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "mikroelektrodihila"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kalsiumkuvantaminen"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "analyysimenetelmät"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "stem cells"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "neural network activity"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "microelectrode array"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "calcium imaging"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "analysis methods"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:ISBN:978-952-03-0777-6"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201807022216"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Järvi, Theodora,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Impact of information acquisition costs on voting choices : an experimental study on information acquisition and ideological distances."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (91 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Individual decision-making and its applications have been of scientific interest for a long time. Decision-making is central to behaviour and can have multiple stages and contexts. This thesis looks at voting behaviour with a focus on the very initial stages of choice-making. The aim is to investigate how influential information acquisition and the related costs are to a personally rational decision – one in which the individual chooses a representative for themselves that best complements their ideological views. This thesis takes the unique viewpoint of a multiparty setting and adapts mathematical models to quantify the different variables associated with voting choices. To build a fuller representation of how these information acquisition costs influence choices, a pilot laboratory experiment is conducted. The results obtained suggest that information acquisition is highly influential to the outcomes of voting and needs to be well balanced, as information enhances the gains from voting, but the costs from acquiring information can have a negative impact on the outcome. Additionally, it is found that the initial information an individual possesses guides their further desire to look for information. This study concludes that there seems to be a need to study the issue further to better understand how decisions are made in a multiparty system and how information affects these decisions."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "voting behaviour"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "correct voting"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "rational voting"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "information acquisition"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "information acquisition costs"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "utility maximization"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "ideological distances"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201807022216"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||eng  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201807022218"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "eng"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Jokipalo, Veera,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Basic income and gift exchange : a laboratory experiment."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (69 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "closedAccess"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201807022218"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||fin  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201807022220"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "fin"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Grönholm, Pauliina,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "Arki nuorten turvapaikanhakijoiden silmin : ylirajaista mediaosallisuutta kehittämässä."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (110 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Viestintätieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Turvapaikkaprosessi on yksintulleelle nuorelle raskas ja pitkä prosessi, johon liittyy paljon odottamista. Tämä toimintatutkimus pohtii, miten yksintulleiden turvapaikanhakijoiden yhteiskunnallista osallisuutta voidaan parantaa mediakasvatuksen keinoin turvapaikkaprosessin aikana. \r\n\r\nTutkimus on osa Nuoret estradille: toimijaksi monilukutaidolla -tutkimushanketta (2015–2017), jonka tavoitteena tukea nuoren kasvua yhteiskunnan aktiiviseksi jäseneksi taiteelliseen itseilmaisuun perustuvin mediapedagogisin menetelmin.\r\n\r\nTeoreettisesti tutkimus perustuu osallisuusteorioihin sekä mediaosallisuuden ja ylirajaisen medialukutaidon käsitteisiin. Tutkimuksessa hahmotellaan ylirajaisen mediaosallisuuden elementtejä, joihin kuuluvat empatia, luottamus, yhteistoiminnallisuus, tavoitteellisuus sekä itseilmaisu. Nämä muodostavat osallisuutta tukevia käytäntöjä, jotka ovat voimaantumisen edellytyksiä.\r\n\r\nTutkimuksen käytännön osuus toteutettiin osallistavien valokuvaustyöpajojen muodossa Pelastakaa Lapset ry:n ylläpitämässä yksintulleiden turvapaikanhakijoiden tukiasuntolan yhteydessä Espoossa. Osallistujien ottamista kuvista koottiin Espoon Sellon kirjastoon näyttely Puoli vuottani Suomessa – Arki nuorten turvapaikanhakijoiden silmin (14.–29.6.2016).  \r\n\r\nTutkimuksen osallistujat olivat 16–17-vuotiaita yksintulleita turvapaikanhakijoita. Heistä seitsemän osallistui näyttelyn työstämiseen. Tutkimusaineisto koostuu tutkijan havaintopäiväkirjasta, osallistavista valokuvaustehtävistä, projektiin osallistuneiden nuorten haastatteluista sekä heidän työpajojen välisenä aikana ottamistaan kuvista.\r\n\r\nTutkimuksen tulokset osoittavat, että julkisen mediaosallisuuden kautta on mahdollista vahvistaa yksitulleiden turvapaikanhakijoiden osallisuutta sekä kiinnittymistä uuteen kulttuuriin. Mediaosallisuus mahdollistaa myös ylirajaisten mediataitojen kehittymisen. Näitä taitoja voidaan tarkastella sisällöllisinä, teknisiä sekä yhteistoiminnallisina taitoina, jotka limittyvät toisiinsa. Osallisuus, ymmärrys ja itse tekeminen kulkevat siten käsikädessä."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kriittinen mediakasvatus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "osallisuus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "osallistava valokuvaus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "yksintulleet turvapaikanhakijat"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "ylirajaisuus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "mediaosallisuus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "toimintatutkimus"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201807022220"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  },
  {
    "leader": "01704nam a  002653i   00",
    "fields": [
      {
        "tag": "007",
        "value": "cr |||||||||||"
      },
      {
        "tag": "008",
        "value": "000000s2018    fi |||||o|||||||| ||fin  "
      },
      {
        "tag": "024",
        "ind1": "7",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "URN:NBN:fi:uta-201807032226"
          },
          {
            "code": "2",
            "value": "urn"
          }
        ]
      },
      {
        "tag": "041",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "fin"
          }
        ]
      },
      {
        "tag": "100",
        "ind1": "1",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Ranne, Tiia,"
          },
          {
            "code": "e",
            "value": "kirjoittaja."
          }
        ]
      },
      {
        "tag": "245",
        "ind1": "1",
        "ind2": "0",
        "subfields": [
          {
            "code": "a",
            "value": "\"Kun ollaan ulapalla, on soudettava eteenpäin\" : alueellisen identiteetin ja identiteettiresurssin käyttö mielipidekirjoituksissa muutoksen aikana."
          }
        ]
      },
      {
        "tag": "264",
        "ind1": " ",
        "ind2": "1",
        "subfields": [
          {
            "code": "c",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "300",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "1 verkkoaineisto (72 sivua)"
          }
        ]
      },
      {
        "tag": "500",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma"
          }
        ]
      },
      {
        "tag": "502",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Pro gradu -tutkielma :"
          },
          {
            "code": "c",
            "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
          },
          {
            "code": "d",
            "value": "2018."
          }
        ]
      },
      {
        "tag": "506",
        "ind1": "0",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Aineisto on vapaasti saatavissa."
          },
          {
            "code": "f",
            "value": "Unrestricted online access"
          },
          {
            "code": "2",
            "value": "star"
          }
        ]
      },
      {
        "tag": "520",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "Tämän pro gradu-tutkimuksen aiheena on alueellisen identiteetin rakentuminen sekä identiteetin resurssikäyttö aluerakennemuutoksessa. Tutkimuksessani tuon esille satakuntalaisen identiteetin rakentumista mielipidekirjoituksissa sosiaali- ja terveydenhuoltouudistuksen sekä maakuntauudistuksen aikana vuonna 2016. Identiteetin rakentumisen lisäksi tutkin identiteetin käyttöä resurssina. Aluerakennemuutoksissa on syytä ottaa huomioon myös alueella asuvien ihmisten kokema alueellinen identiteetti. Identiteetti voi toimia joko muutosta eteenpäin vievänä resurssina, tai se voi toimia vastavoimana muutokselle, jolloin se hidastaa alueiden kehitystä ja niillä tapahtuvia muutoksia. Alueellisella identiteetillä onkin jo aiemmin todettu olevan suurta vaikutusta alueen muutoskestävyydessä.\r\n\r\nAineistona tutkimuksessani on maakunnan suurimman päivittäin ilmestyvän sanomalehden Satakunnan Kansan vuoden 2016 mielipidekirjoitukset. Rajasin aineiston koskemaan niitä kirjoituksia, jotka käsittelivät sosiaali- ja terveydenhuoltouudistusta tai maakuntauudistusta. Toteutan tutkimukseni laadullisena tutkimuksena, jonka teoreettisena lähtökohtana ovat sosiaalisen konstruktionismin mukaiset käsitykset kielestä todellisuuden tuottajana. Taustateorioina toimivat historiallis-kulttuurinen identiteetin käsite sekä vanhan regionalismin mukainen käsitys paikasta rajattuna tilana ja alueesta hitaasti muuttuvana territoriona. Aineiston jäsentämisessä käytän sisällönanalyysia.\r\n\r\nAluerakennemuutokset aktualisoivat satakuntalaisten alueellista identiteettiä. Identiteettiä rakennetaan sekä erottautumisen että kiinnittymisen kautta. Aineistossa oma asuinalue erotetaan tietoisesti muista alueista ja erontekojen kautta alueiden rajat korostuvat. Kiinnittymistä rakennetaan yhteisöllisyyden ja samuuden kokemuksilla sekä kollektiivisten muistojen kautta. Identiteettiresurssia käytetään mielipidekirjoituksissa sekä muutosta vahvistavana että muutosta vastustavana resurssina. Muutosta vahvistavassa resurssissa identiteettiä käytetään yhteisen tahtotilan luomiseen, kun taas muutosta vastustavassa resurssikäytössä alueellisella identiteetillä perustellaan muutoksen sopimattomuutta omalle alueelle. \r\n\r\n\r\nABSTRACT\r\n” WHEN LOST AT SEA, JUST KEEP SAILING”- The formation of the regional identity and the use of the identity resource during the municipal reforms in the opinion pieces.\r\n\r\nThe subject in my thesis is the formation of the regional identity and the use of identity as resource during the municipal structural change. In my study I found out how the regional identity is formed during the service structure reform of social welfare and health care, and regional reform at 2016 in Satakunta. I also find out how people use the identity as resource for regional development during the reform. My research question is the construction of the regional identity in the opinion pieces during the municipal structure reforms.\r\n\r\nMy thesis matter are opinion pieces in the Satakunnan Kansa newspapers, which have been published at 2016. I gathered up opinion pieces concerning the service structure reform of social welfare and health care or regional reform. My thesis is a qualitative research with a theoretical framework of social constructionism. In this study, it means that I understand regional identity as language-created social construction.\r\n \r\nThe importance of regional identity has been neglected in regional development. I want to prove that regional identity plays a decisive role in the successful implementation of regional development. Regional identity may develop to a resource for regional development and the people who are living in the area have a large role during structural changes.\r\n \r\nExamined pieces are stories, which through writers participate to constructing social reality and create meanings using their opinion about the regional identity and municipal reform. The opinion pieces have been analyzed with content analysis.\r\n\r\nThe research shows that there are a few most important pillars, which influence about the construction of the regional identity. In my study I found both communality and differentiation as the basis of regional identity. In the opinion pieces identity resource was seen as confirmation of changes as response to change. There is quite strong regional identity in Satakunta and people seems to be ready to defend their own historical area."
          }
        ]
      },
      {
        "tag": "540",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "c",
            "value": "This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited."
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "alueellinen identiteetti"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "identiteettiresurssi"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "kuntarakenneuudistus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "mielipidekirjoitus"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "sisällönanalyysi"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "regional identity"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "identity resource"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "municipal structural reform"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "opinion piece"
          }
        ]
      },
      {
        "tag": "653",
        "ind1": " ",
        "ind2": " ",
        "subfields": [
          {
            "code": "a",
            "value": "content analysis"
          }
        ]
      },
      {
        "tag": "856",
        "ind1": "4",
        "ind2": "0",
        "subfields": [
          {
            "code": "u",
            "value": "http://urn.fi/URN:NBN:fi:uta-201807032226"
          },
          {
            "code": "y",
            "value": "Linkki verkkoaineistoon"
          }
        ]
      }
    ]
  }
];

/*******************************************/

const doriaSingle = [{
  "leader": "01704nam a  002653i   00",
  "fields": [
    {
      "tag": "007",
      "value": "cr |||||||||||"
    },
    {
      "tag": "008",
      "value": "000000s2011    fi |||||o|||||||| ||eng  "
    },
    {
      "tag": "020",
      "ind1": " ",
      "ind2": " ",
      "subfields": [
        {
          "code": "a",
          "value": "9783905404579"
        },
        {
          "code": "q",
          "value": "PDF"
        }
      ]
    },
    {
      "tag": "041",
      "ind1": " ",
      "ind2": " ",
      "subfields": [
        {
          "code": "a",
          "value": "eng"
        }
      ]
    },
    {
      "tag": "100",
      "ind1": "1",
      "ind2": " ",
      "subfields": [
        {
          "code": "a",
          "value": "Grönroos, Mauri,"
        },
        {
          "code": "e",
          "value": "kirjoittaja."
        }
      ]
    },
    {
      "tag": "245",
      "ind1": "1",
      "ind2": "0",
      "subfields": [
        {
          "code": "a",
          "value": "Cultural and intercultural negotiating aspects."
        }
      ]
    },
    {
      "tag": "264",
      "ind1": " ",
      "ind2": "1",
      "subfields": [
        {
          "code": "b",
          "value": "Olten, Switzerland : University of Applied Sciences of Northwestern Switzerland, School of Business,"
        },
        {
          "code": "c",
          "value": "2011."
        }
      ]
    },
    {
      "tag": "300",
      "ind1": " ",
      "ind2": " ",
      "subfields": [
        {
          "code": "a",
          "value": "1 verkkoaineisto (54-66 sivua)"
        }
      ]
    },
    {
      "tag": "500",
      "ind1": " ",
      "ind2": " ",
      "subfields": [
        {
          "code": "a",
          "value": "Pro gradu -tutkielma"
        }
      ]
    },
    {
      "tag": "502",
      "ind1": " ",
      "ind2": " ",
      "subfields": [
        {
          "code": "a",
          "value": "Pro gradu -tutkielma :"
        },
        {
          "code": "c",
          "value": "University of Tampere, Yhteiskuntatieteiden tiedekunta, "
        },
        {
          "code": "d",
          "value": "2011."
        }
      ]
    },
    {
      "tag": "653",
      "ind1": " ",
      "ind2": " ",
      "subfields": [
        {
          "code": "a",
          "value": "globalization"
        }
      ]
    },
    {
      "tag": "653",
      "ind1": " ",
      "ind2": " ",
      "subfields": [
        {
          "code": "a",
          "value": "culture"
        }
      ]
    },
    {
      "tag": "653",
      "ind1": " ",
      "ind2": " ",
      "subfields": [
        {
          "code": "a",
          "value": "negotiations"
        }
      ]
    },
    {
      "tag": "700",
      "ind1": "1",
      "ind2": " ",
      "subfields": [
        {
          "code": "a",
          "value": "Seppänen, Ann,"
        },
        {
          "code": "e",
          "value": "kirjoittaja."
        }
      ]
    },
    {
      "tag": "856",
      "ind1": "4",
      "ind2": "0",
      "subfields": [
        {
          "code": "u",
          "value": "http://www.doria.fi/handle/10024/73840"
        }
      ]
    }
  ]
}];

export {custom, utaChecked, utaSingle, utaComplex, doriaSingle};