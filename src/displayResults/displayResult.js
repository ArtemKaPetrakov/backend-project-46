import displayJSON from './displayJSON.js';

export default (file, fileExtension) => {

  switch (fileExtension) {
    case '.json': 
    return displayJSON(file);
    default:
      console.log('ХЗ что делать!')
  }
};