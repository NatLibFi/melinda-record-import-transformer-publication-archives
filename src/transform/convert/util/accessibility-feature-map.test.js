import assert from 'node:assert';
import {describe, it} from 'node:test';

import {getAccessibilityFieldInfo} from './accessibility-feature-map.js';

describe('getAccessibilityFieldInfo', () => {
  // structuralNavigation
  it('maps "otsikkotasot merkitty" properly', () => {
    const input = 'otsikkotasot koodimerkitty';
    const expected = {a: 'textual', b: 'structuralNavigation'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  it('maps "rubriknivåer taggade" properly', () => {
    const input = 'rubriknivåer taggade';
    const expected = {a: 'textual', b: 'structuralNavigation'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  it('maps "heading levels tagged" properly', () => {
    const input = 'heading levels tagged';
    const expected = {a: 'textual', b: 'structuralNavigation'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  // alternativeText
  it('maps "kuvilla vaihtoehtoiset kuvaukset" properly', () => {
    const input = 'kuvilla vaihtoehtoiset kuvaukset';
    const expected = {a: 'visual', b: 'alternativeText'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  it('maps "alternativa textuella beskrivningar för bilder" properly', () => {
    const input = 'alternativa textuella beskrivningar för bilder';
    const expected = {a: 'visual', b: 'alternativeText'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  it('maps "alternative textual descriptions for images" properly', () => {
    const input = 'alternative textual descriptions for images';
    const expected = {a: 'visual', b: 'alternativeText'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  // readingOrder
  it('maps "looginen lukemisjärjestys" properly', () => {
    const input = 'looginen lukemisjärjestys';
    const expected = {a: 'textual', b: 'readingOrder'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  it('maps "logisk läsordning" properly', () => {
    const input = 'logisk läsordning';
    const expected = {a: 'textual', b: 'readingOrder'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  it('maps "logical reading order" properly', () => {
    const input = 'logical reading order';
    const expected = {a: 'textual', b: 'readingOrder'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  // MathML
  it('maps "mathML" properly', () => {
    const input = 'mathML';
    const expected = {a: 'textual', b: 'MathML'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  // describedMath
  it('maps "matemaattiset kaavat kuvailtu" properly', () => {
    const input = 'matemaattiset kaavat kuvailtu';
    const expected = {a: 'textual', b: 'describedMath'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  it('maps "matematiska formler beskrivna" properly', () => {
    const input = 'matematiska formler beskrivna';
    const expected = {a: 'textual', b: 'describedMath'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  it('maps "mathematical formulas described" properly', () => {
    const input = 'mathematical formulas described';
    const expected = {a: 'textual', b: 'describedMath'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  // openCaptions
  it('maps "tekstitys kuulovammaisille" properly', () => {
    const input = 'tekstitys kuulovammaisille';
    const expected = {a: 'auditory', b: 'openCaptions'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  it('maps "textning för hörselskadade" properly', () => {
    const input = 'textning för hörselskadade';
    const expected = {a: 'auditory', b: 'openCaptions'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  it('maps "captions for hearing impaired" properly', () => {
    const input = 'captions for hearing impaired';
    const expected = {a: 'auditory', b: 'openCaptions'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  // taggedPDF
  it('maps "koodimerkitty PDF" properly', () => {
    const input = 'koodimerkitty PDF';
    const expected = {a: 'textual', b: 'taggedPDF'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  it('maps "taggad PDF" properly', () => {
    const input = 'taggad PDF';
    const expected = {a: 'textual', b: 'taggedPDF'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  it('maps "tagged PDF" properly', () => {
    const input = 'tagged PDF';
    const expected = {a: 'textual', b: 'taggedPDF'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  // unknown
  it('maps "ei tietoa saavutettavuudesta" properly', () => {
    const input = 'ei tietoa saavutettavuudesta';
    const expected = {a: 'textual', b: 'unknown'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  it('maps "okänd tillgänglighet" properly', () => {
    const input = 'okänd tillgänglighet';
    const expected = {a: 'textual', b: 'unknown'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  it('maps "unknown accessibility" properly', () => {
    const input = 'unknown accessibility';
    const expected = {a: 'textual', b: 'unknown'};

    const result = getAccessibilityFieldInfo(input);
    assert.deepStrictEqual(result, expected);
  });

  // Note: terms that are to be deprecatd are not tested here but rather in old integration tests
});