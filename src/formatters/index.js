import { stylish }  from "./stylish.js";

export default (data, option) => {
  switch (option) {
    case 'stylish' :
      return `{\n${stylish(data)}\n}`;
    default:
      return `{\n${stylish(data)}\n}`;
    }
  };
