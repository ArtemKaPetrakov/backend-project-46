export default (file) => {

const result = file.reduce((acc, item) => {
  if (item.type === 'removed') {
    acc += ` - ${item.key}: ${item.value}\n`
  }
  if (item.type === 'equal') {
    acc += `   ${item.key}: ${item.value}\n`
  }
  if (item.type === 'updated') {
    acc += ` - ${item.key}: ${item.oldValue}\n`
    acc += ` + ${item.key}: ${item.newValue}\n`
  }
  if (item.type === 'added') {
    acc += ` + ${item.key}: ${item.value}\n`
  }
  return acc;
}, '');

return `{\n${result}}`;

};