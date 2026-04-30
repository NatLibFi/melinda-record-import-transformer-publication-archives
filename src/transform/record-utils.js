import {AUTHOR_ROLES} from '../data-constants.js';

/**
 * Getter for record main author and contributors.
 * @param {import('../types.js').ValueInterface} valueInterface ValueInterface containing getValue/getValues functions
 * @returns {{name: string, isNameInverted: boolean, isGroupAuthor: boolean, role: string}[]} object containing item main author and contributor information
 */
export function getContributors({getFieldValues}) {
  const authors = getFieldValues('dc.contributor.author').map((v) => ({
    name: v,
    role: AUTHOR_ROLES.AUTHOR,
    isGroupAuthor: false,
  }));

  const creators = getFieldValues('dc.creator').map((v) => ({
    name: v,
    role: AUTHOR_ROLES.AUTHOR,
    isGroupAuthor: false,
  }));

  const editors = getFieldValues('dc.contributor.editor').map((v) => ({
    name: v,
    role: AUTHOR_ROLES.EDITOR,
    isGroupAuthor: false,
  }));

  const groupAuthors = getFieldValues('dc.contributor.groupauthor').map((v) => ({
    name: v,
    role: AUTHOR_ROLES.AUTHOR,
    isGroupAuthor: true,
  }));

  // Construct full authorinfo package by combining all gathered information
  return creators.concat(authors, editors, groupAuthors).reduce((p, author) => {
    const isNameInverted = getIsNameInverted(author.name, author.groupAuthor);
    const nameImpliesEditorRole = isEditor(author.name);

    const authorInfo = {
      name: processAuthorName(author.name),
      isNameInverted,
      role: nameImpliesEditorRole ? AUTHOR_ROLES.EDITOR : author.role,
      isGroupAuthor: author.isGroupAuthor,
    };

    const canBeMainAuthor = authorInfo.role === AUTHOR_ROLES.AUTHOR;
    if (!p.mainAuthor && canBeMainAuthor) {
      return {mainAuthor: authorInfo, contributors: p.contributors};
    }

    return {mainAuthor: p.mainAuthor, contributors: p.contributors.concat(authorInfo)};
  }, {mainAuthor: null, contributors: []});


  function getIsNameInverted(name, isGroupAuthor) {
    // If name contains comma and is not group author, name is evaluated to be inverted
    if (!isGroupAuthor && name.includes(',')) {
      return true;
    }

    return false;
  }

  function isEditor(name) {
    return (/\((toimittanut|toim|eds|).*\)$/).test(name);
  }

  function processAuthorName(name) {
    // Remove content within parenthesis at end of field
    return name.replace(/\(.*\)$/, '').trim();
  }
}

export function translateAuthorRole(role) {
  const translateMap = {
    [AUTHOR_ROLES.AUTHOR]: 'kirjoittaja',
    [AUTHOR_ROLES.EDITOR]: 'toimittaja'
  };

  const mapIncludesRole = Object.keys(translateMap).includes(role);

  // Should not ever happen and if it does, may error out since situation needs to be fixed ASAP
  if (!mapIncludesRole) {
    throw new Error(`Attempted to translate unsupported author role: ${role}`);
  }

  return translateMap[role];
}

/**
 * Unified getter for record title.
 * @param {import('../types.js').ValueInterface} valueInterface ValueInterface containing getValue/getValues functions
 * @returns {{title: string | null, subtitle: string | null}} object containing item main author and contributor information
 */
export function getRecordTitle({getFields}) {
  const fields = getFields('dc.title');

  if (fields.length === 0) {
    return {title: null, subtitle: null};
  }

  const titleText = fields.length > 0 ? fields[0].$.value : null;

  const {title, alternativeSubtitle} = getTitle(titleText);

  // Fix plausible newlines (both Windows/Unix variants)
  const processedTitle = normalizeTitleString(title);
  const processedSubtitle = normalizeTitleString(alternativeSubtitle);

  return {
    title: processedTitle,
    subtitle: processedSubtitle
  };

  // Splits title to title+subtitle if title contains any of patterns that require this type of processing.
  // Note: this getter is same as one defined within ONIX-transformer
  function getTitle(titleText) {
    const regexObj = findRegex(titleText);
    const result = regexObj ? regexObj.regex.exec(titleText) : undefined;

    if (!result) {
      return {title: titleText.trimEnd(), alternativeSubtitle: undefined};
    }

    const titleResult = regexObj.keepResult === true ? {
      title: (titleText.slice(0, result.index + regexObj.keepCharactersFromStart) + result).trimEnd(),
      alternativeSubtitle: titleText.slice(result.index + result[0].length - regexObj.keepCharactersFromEnd).trimEnd().trimStart()
    }
      : {
        title: titleText.slice(0, result.index + regexObj.keepCharactersFromStart).trimEnd(),
        alternativeSubtitle: titleText.slice(result.index + result[0].length - regexObj.keepCharactersFromEnd).trimEnd().trimStart()
      };

    return titleResult;

    function findRegex(titleText) {
      // Note: order defines priority
      const pluralOfRegex = [
        // split title to mainTitle and subtitle at first ':', do not keep ':'
        {keepCharactersFromStart: 0, keepCharactersFromEnd: 0, regex: /:\s+/u},
        // split title to mainTitle and subtitle at first '.' that is not directly following a number, do not keep '.' but keep the prior character.
        {keepCharactersFromStart: 1, keepCharactersFromEnd: 0, regex: /[^0-9]\.\s+/u},
        // split title to mainTitle and subtitle at first ' - ', do not keep the separator
        {keepCharactersFromStart: 1, keepCharactersFromEnd: 1, regex: /[^0-9]\s+[\u2013\u2014-]\s+[^0-9]/u},
        // split title to mainTitle and subtitle at '! ' or '? ', keep question and exclamation marks, they are part of the title
        {keepCharactersFromStart: 0, keepCharactersFromEnd: 0, keepResult: true, regex: /!+|\?+/u}
      ];

      return pluralOfRegex.find(({regex}) => regex.test(titleText));
    }
  }

  function normalizeTitleString(value) {
    const cannotFix = !value || typeof value !== 'string';
    if (cannotFix) {
      return value;
    }

    const windowsNewline = /\\r\\n/g;
    const unixNewline = /\\n/g;
    const multiSpace = /\s+/g;

    return value
      .replaceAll(windowsNewline, ' ') // First remove windows newlines, otherwise carriage return would be left intact
      .replaceAll(unixNewline, ' ') // Remove unix newlines
      .replaceAll(multiSpace, ' ') // Normalize multiple whitespaces to one as these may occur after processing newlines
      .trim(); // Remove whitespaces surrounding the string
  }
}

export function translateIso6931Lang(isoLanguage) {
  const translateMap = {
    'ar': 'Arabia',
    'da': 'Tanska',
    'en': 'Englanti',
    'es': 'Espanja',
    'et': 'Viro',
    'fa': 'Persia',
    'fi': 'Suomi',
    'fr': 'Ranska',
    'de': 'Saksa',
    'hu': 'Unkari',
    'is': 'Islanti',
    'it': 'Italia',
    'ja': 'Japani',
    'ko': 'Korea',
    'la': 'Latina',
    'lv': 'Latvia',
    'lt': 'Liettua',
    'nl': 'Hollanti',
    'no': 'Norja',
    'pl': 'Puola',
    'pt': 'Portugali',
    'ru': 'Venäjä',
    'se': 'Saami, pohjois-',
    'so': 'Somali',
    'sv': 'Ruotsi',
    'uk': 'Ukraina',
    'zh': 'Kiina',
  };

  const hasTranslation = Object.keys(translateMap).includes(isoLanguage);
  if (!hasTranslation) {
    return null;
  }

  return translateMap[isoLanguage];
}
