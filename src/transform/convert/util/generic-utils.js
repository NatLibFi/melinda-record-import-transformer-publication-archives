
/**
 * Deduplicate array of primitives
 * @param {string[]|number[]} inputArray - array containing input which is of primitive type (e.g., string, int)
 * @returns {string[]|number[]} deduplicated array
 */
export function deduplicatePrimitives(inputArray) {
  return inputArray.reduce((prev, next) => prev.includes(next) ? prev : [...prev, next], []);
}

/**
 * Deduplicate array of objects based on given key
 * @param {Object[]} inputArray - array containing input which is of object type that will contain given key
 * @param {string} deduplicateKey - attribute based on which value for each objects deduplication will occur
 * @returns {Object[]} deduplicated array
 */
export function deduplicateObjects(inputArray, deduplicateKey) {
  return inputArray.reduce((prev, next) => {
    const currentEntryKeyVal = next[deduplicateKey];
    const containsEntry = prev.find(entry => entry[deduplicateKey] === currentEntryKeyVal);

    if (containsEntry) {
      return prev;
    }

    return [...prev, next];
  }, []);
}