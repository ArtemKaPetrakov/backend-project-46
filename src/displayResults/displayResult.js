import displayJSON from './displayJSON.js';

export default (file, fileExtension) => {

  switch (fileExtension) {
    case '.json': 
    return displayJSON(file);
    case '.yaml' || '.yml': 
    return displayYAML(file);
    default:
      console.log('ХЗ что делать!')
  }
};