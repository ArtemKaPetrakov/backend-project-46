export default (fileExtension) => {
  switch (fileExtension) {
    case '.json' :
      return JSON.parse;
    default: 
      console.log('Неизвестный формат');
  }
};