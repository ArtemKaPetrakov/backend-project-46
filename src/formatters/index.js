import { stylish }  from "./stylish.js";
// import { plain }  from "./plain.js";

export default (data, option) => {
  switch (option) {
    case 'stylish' :
      return `{\n${stylish(data)}\n}`;
    case 'plain' :
      return plain(data); 
    default:
      return `{\n${stylish(data)}\n}`;
    }
  };
