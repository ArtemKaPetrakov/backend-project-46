
import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);

// константа  __filename содержит абсолютный путь к файлу, в котором она используется

const __dirname = dirname(__filename); 

//константа  __dirname cодержит абсолютный путь, к каталогу.

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedResult = getFixturePath('expected_file');

test('Generate Differense', () => {
  const actual = genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json');
  expect(expectedResult).toBe(actual);
});