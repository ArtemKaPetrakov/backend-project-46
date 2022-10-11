import fs from 'fs';
import path from 'path';
import process from 'process';


const getContent = (file) => {
  const currentDir = process.cwd(); // текущая директория 
  const fullPath = path.resolve(currentDir, file); // путь до файла 
  const readFile = fs.readFileSync(fullPath, { encoding: 'utf8' }); // абсолютный путь с кодирование, иначе абракадабра
  return readFile;
};

export default getContent;
