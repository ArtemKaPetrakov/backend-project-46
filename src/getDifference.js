import _ from 'lodash';
import getData from './getData.js';
import getNewFormat from './formatters/index.js';

const generateDiff = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const unionKeys = _.union(keys1, keys2).sort();
  // const sortedUnionKeys = _.sortedUniq(unionKeys);

  return unionKeys.map((key) => {
    if (typeof object1[key] === 'object' && typeof object2[key] === 'object') {
      return { type: 'nested', key, currentValue: generateDiff(object1[key], object2[key]) };
    }
    if (object1[key] === object2[key] ) {
      return { type: 'equal', key, currentValue: object1[key] };
    }
    if ((Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) && object1[key] !== object2[key]) {
      return { type: 'updated', key, removedValue: object1[key], currentValue: object2[key] }
    }
    if (Object.hasOwn(object1, key) && !Object.hasOwn(object2, key)) {
      return { type: 'removed', key, currentValue: object1[key] };
    }
    if (!Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
      return { type: 'added', key, currentValue: object2[key] };
    }
  });
};

export default (filePath1, filePath2, format) => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);
  const diff = generateDiff(data1, data2);
  return getNewFormat(diff, format);
};