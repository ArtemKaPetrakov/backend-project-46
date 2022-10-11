/* eslint-disable no-undef */
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';


const __filename = fileURLToPath(import.meta.url);
// константа  __filename содержит абсолютный путь к файлу, в котором она используется
const __dirname = dirname(__filename); 
//константа  __dirname cодержит абсолютный путь, к каталогу.
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const resultPath = getFixturePath('expected_file.txt');
// путь до файла с результатом
const result = fs.readFileSync(resultPath, 'utf8');

test('Generate Differense .json', () => {
  let actual = genDiff(getFixturePath(`file1.json`) , getFixturePath(`file2.json`));
  expect(actual).toEqual(result);
});
test('Generate Differense .yaml', () => {
  let actual = genDiff(getFixturePath(`file1.yaml`) , getFixturePath(`file2.yaml`));
  expect(actual).toEqual(result);
});