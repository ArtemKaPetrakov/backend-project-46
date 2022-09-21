import _ from 'lodash';
import getContent from './getContent.js'; 

// ./имядиректории - подразумевается что директория (или файла) лежит в текущей для вас директории (открытой в терминале или директори исполнения скрипта).
// Такой формат особенно актуален при запуске исполняемых файлов -- мы как бы показываем, что запускаем не команду вообще, а именно файл из этой директории с таким именем.

export default (file1, file2) => {
  
  const filepath1 = getContent(file1);
  const filepath2 = getContent(file2);

  const obj1 = JSON.parse(filepath1);
  const obj2 = JSON.parse(filepath2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const unionKeys = _.union(keys1, keys2).sort();

  const result = unionKeys.reduce((acc, key) => {
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      acc += `\n - ${key}: ${obj1[String(key)]}`;
    }
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key) && obj1[key] === obj2[key]) {
      acc += `\n   ${key}: ${obj1[key]}`;
    }
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key) && obj1[key] !== obj2[key]) {
      acc += `\n - ${key}: ${obj1[key]}`;
      acc += `\n - ${key}: ${obj2[key]}`;
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      acc += `\n - ${key}: ${obj2[key]}`;
    }
    return acc;
  },'');

  return `{${result}\n}`;
  
};


