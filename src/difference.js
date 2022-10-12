import parser from './parser.js';
import _ from 'lodash';
import getContent from './content.js'; 
import path from 'path';
import getFormatter from './formatters.js';
// ./имядиректории - подразумевается что директория (или файла) лежит в текущей для вас директории (открытой в терминале или директори исполнения скрипта).
// Такой формат особенно актуален при запуске исполняемых файлов -- мы как бы показываем, что запускаем не команду вообще, а именно файл из этой директории с таким именем.
export default (file1, file2, option) => {

  const filepath1 = getContent(file1);
  const filepath2 = getContent(file2);
  const fileExtension = path.extname(file1);

  // определить формат файла 
  const parserType = parser(fileExtension);
  // выбирает парсинг в зависимости от разрешения файла и парсит его 
  const obj1 = parserType(filepath1);
  const obj2 = parserType(filepath2);

  //! Получили ключи и объеденяем их 
  //! Дальше надо реализвать функцию сравнения для рекурсивных структур данных  
  const generateDiff = (object1, object2) => {

    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    // !Получили ключи 
    const unionKeys = _.union(keys1, keys2).sort();
    //!Объединили и отортировали ключи 
    const result = unionKeys.flatMap((key) => {
    //! пошли по ключам и если объект то вызываем функицю заново, дальше все как было 
    if (typeof object1[key] === 'object' && typeof object2[key] === 'object') {
      return {type: 'nested', key, currentValue: generateDiff(object1[key], object2[key])}
    }
    if (object1[key] === object2[key] ) {
      return {type: 'equal', key, currentValue: object1[key]}
    }
    if ((Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) && object1[key] !== object2[key]) {
      return {type: 'updated', key, removedValue: object1[key], currentValue: object2[key]}
    }
    if (Object.hasOwn(object1, key) && !Object.hasOwn(object2, key)) {
      return {type: 'removed', key, currentValue: object1[key]} 
    }
    if (!Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
      return {type: 'added', key, currentValue: object2[key]} 
    }
  }) 
  return result;
  };
  const data = generateDiff(obj1, obj2);
  const dataFormatter = getFormatter(option);
  return `{\n${dataFormatter(data)}\n}`;
};