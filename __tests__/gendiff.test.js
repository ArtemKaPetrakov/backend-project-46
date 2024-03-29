/* eslint-disable no-undef */
// import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
//  константа  __filename содержит абсолютный путь к файлу, в котором она используется
const __dirname = path.dirname(__filename);
//  константа  __dirname cодержит абсолютный путь, к каталогу.
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const resultPathStylish = getFixturePath('expected_file_stylish.txt');
const resultPathPlain = getFixturePath('expected_file_plain.txt');
const resultPathJson = getFixturePath('expected_file_json.txt');
//  путь до файла с результатом
const resultStylish = fs.readFileSync(resultPathStylish, 'utf8');
const resultPlain = fs.readFileSync(resultPathPlain, 'utf8');
const resultJson = fs.readFileSync(resultPathJson, 'utf8');

test('Generate Differense - stylish - .json', () => {
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  expect(actual).toEqual(resultStylish);
});
test('Generate Differense - stylish - .yaml', () => {
  const actual = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish');
  expect(actual).toEqual(resultStylish);
});
test('Generate Differense - plain - .json', () => {
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(actual).toEqual(resultPlain);
});
test('Generate Differense - plain - .yaml', () => {
  const actual = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain');
  expect(actual).toEqual(resultPlain);
});
test('Generate Differense - JSON - .json', () => {
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(actual).toEqual(resultJson);
});
test('Generate Differense - JSON - .yaml', () => {
  const actual = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json');
  expect(actual).toEqual(resultJson);
});
