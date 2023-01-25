import _ from 'lodash';

const plain = (data, path = '') => {
  // console.log(data);
  const result = data.flatMap((item) => {

    const isComplexValue = (value) => _.isPlainObject(value) ? '[complex value]' : typeof value === 'string' ? `'${value}'` : value;
    const { type, key, removedValue, currentValue } = item;

    const fullPath = [path, key].filter((item => item !== '')).join('.');

    switch (type) {
      case 'equal': 
        return ''; // без пустой строки возвращал undefined
      case 'removed':
        return `Property '${fullPath}' was removed`;
      case 'added':
        return `Property '${fullPath}' was added with value: ${isComplexValue(currentValue)}`;
      case 'updated':
        return `Property '${fullPath}' was updated. From ${isComplexValue(removedValue)} to ${isComplexValue(currentValue)}`;
      case 'nested':
        return plain(currentValue, fullPath);     
    }
  }).filter(((item) => item !== '')).join('\n');
  return result;
};

export default (data) => {
  const result = plain(data);
  return result;
};