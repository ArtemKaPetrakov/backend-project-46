import yaml from 'js-yaml';

export default (fileExtension) => {
  switch (fileExtension) {
    case '.json' :
      return JSON.parse;
      case'.yaml' :
        return yaml.load;
    default: 
      console.log('Неизвестный формат');
  }
};

