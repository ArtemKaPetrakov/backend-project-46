import yaml from 'js-yaml';

export default (data, dataExtension) => {
  switch (dataExtension) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return yaml.load(data);
    case '.yml':
      return yaml.load(data);
    default:
      return `unknown extension :${dataExtension}`;
  }
};
