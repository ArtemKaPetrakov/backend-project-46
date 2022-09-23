import _ from 'lodash';
import getContent from './getContent.js'; 
import path from 'path';

// ./имядиректории - подразумевается что директория (или файла) лежит в текущей для вас директории (открытой в терминале или директори исполнения скрипта).
// Такой формат особенно актуален при запуске исполняемых файлов -- мы как бы показываем, что запускаем не команду вообще, а именно файл из этой директории с таким именем.

export default (file1, file2) => {
  
  const filepath1 = getContent(file1);
  const filepath2 = getContent(file2);

  const fileExtension = path.extname(file1);
  // определить формат файла 

  const parser = (fileExtension) => {
    switch (fileExtension) {
      case '.json' :
        return JSON.parse;
      default: 
        console.log('Неизвестный формат')
    }
  };

  const parserType = parser(fileExtension);

  const obj1 = parserType(filepath1);
  const obj2 = parserType(filepath2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const unionKeys = _.union(keys1, keys2).sort();

  const result = unionKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (value1 === value2) {
      return {type: 'equal', key, value: obj1[key]}
    }
    if ((Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) && value1 !== value2) {
      return {type: 'updated', key, oldValue: value1, newValue: value2}
    }
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return {type: 'removed', key, value: value1} 
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return {type: 'added', key, value: value2} 
    }
  })
  return result;
  };


