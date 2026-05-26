export function getAccessibilityFieldInfo(accessibilityTerm) {
  const structuralNavigationTerms = [
    'otsikkotasot koodimerkitty',
    'rubriknivåer taggade',
    'heading levels tagged'
  ];

  const alternativeTextTerms = [
    'kuvilla vaihtoehtoiset kuvaukset',
    'alternativa textuella beskrivningar för bilder',
    'alternative textual descriptions for images'
  ];

  const readingOrderTerms = [
    'looginen lukemisjärjestys',
    'logisk läsordning',
    'logical reading order'
  ];

  const mathMlTerms = [
    'mathML',
  ];

  const mathDescribedTerms = [
    'matemaattiset kaavat kuvailtu',
    'matematiska formler beskrivna',
    'mathematical formulas described'
  ];

  const captionsTerms = [
    'tekstitys kuulovammaisille',
    'textning för hörselskadade',
    'captions for hearing impaired'
  ];

  const taggedPdfTerms = [
    'koodimerkitty PDF',
    'taggad PDF',
    'tagged PDF'
  ];

  const unknownAccessibilityTerms = [
    'ei tietoa saavutettavuudesta',
    'okänd tillgänglighet',
    'unknown accessibility'
  ];

  if (structuralNavigationTerms.includes(accessibilityTerm)) {
    return {a: 'textual', b: 'structuralNavigation'};
  }

  if (alternativeTextTerms.includes(accessibilityTerm)) {
    return {a: 'visual', b: 'alternativeText'};
  }

  if (readingOrderTerms.includes(accessibilityTerm)) {
    return {a: 'textual', b: 'readingOrder'};
  }

  if (mathMlTerms.includes(accessibilityTerm)) {
    return {a: 'textual', b: 'MathML'};
  }

  if (mathDescribedTerms.includes(accessibilityTerm)) {
    return {a: 'textual', b: 'describedMath'};
  }

  if (captionsTerms.includes(accessibilityTerm)) {
    return {a: 'auditory', b: 'openCaptions'};
  }

  if (taggedPdfTerms.includes(accessibilityTerm)) {
    return {a: 'textual', b: 'taggedPDF'};
  }

  if (unknownAccessibilityTerms.includes(accessibilityTerm)) {
    return {a: 'textual', b: 'unknown'};
  }

  // Note: these will be deprecated in future
  const navigationTerms = ['navigointi mahdollista'];
  const tableTerms = ['taulukot saavutettavia'];

  if (navigationTerms.includes(accessibilityTerm)) {
    return {a: 'textual', b: 'structuralNavigation'};
  }

  if (tableTerms.includes(accessibilityTerm)) {
    return {a: 'textual', b: 'readingOrder'};
  }

  return null;
}