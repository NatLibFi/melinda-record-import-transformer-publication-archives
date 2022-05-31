export function getHandle(value) {
  const baseUrlRegex = /https?:\/\/(?<source>[^?#/]+)/u;
  const handleRegex = /(?<handle>\/[0-9a-zA-Z]+\/[^/]+$)/u;

  const {source} = value.match(baseUrlRegex) ? value.match(baseUrlRegex).groups : {source: null};
  const {handle} = value.match(handleRegex) ? value.match(handleRegex).groups : {handle: null};

  if (source !== null && handle !== null) {
    return {source, handle};
  }

  return false;
}

export function isValidLink(value) {
  const httpProtocolRegex = /^(?:https?|ftp):\/\/[-a-zA-Z0-9]+\.[-a-zA-Z0-9]+/u;
  return value.match(httpProtocolRegex) !== null;
}
