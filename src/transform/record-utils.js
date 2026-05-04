import {AUTHOR_ROLES} from '../data-constants.js';

/**
 * Getter for record main author and contributors.
 * @param {import('../types.js').ValueInterface} valueInterface ValueInterface containing getValue/getValues functions
 * @returns {import('../types.js').ItemContributors} object containing item main author and contributor information
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
