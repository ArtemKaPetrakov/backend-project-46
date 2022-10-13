import fs from 'fs';
import path from 'path';
import process from 'process';
import parser from './getParser.js';

const getData = (filePath) => {
  const currentDir = process.cwd(); // текущая директория 
  const fullPath = path.resolve(currentDir, filePath); // путь до файла 
  const data = fs.readFileSync(fullPath, { encoding: 'utf8' }); // абсолютный путь с кодирование, иначе абракадабра
  const dataExtension = path.extname(filePath); // расширение файла 
  return parser(data, dataExtension) // возвращаем файлы после парсинга, зависяший от расширения
};
export default getData;
