import _ from "lodash";

const stylish = (data, depth = 1) => {
  // console.log(data);
  const result  = data.map((item) => {

    const makeIndent = (depth) => `${'  '.repeat(depth + 1)}`;

    const { type, key, removedValue, currentValue } = item;

    const stringify = (data, depth) => {
      if (!_.isPlainObject(data)) {
        return `${data}`;
      }
      const entries = Object.entries(data);
      const result = entries.map((item) => {
        const [key, value] = item;
        return `\n${makeIndent(depth)}  ${key}: ${stringify(value, depth + 2)}`;
      });
      return `{${result.join('')}\n${makeIndent(depth - 1)}}`;
    };

    switch (type) {
      case 'equal':
        return `${makeIndent(depth - 1)}  ${key}: ${stringify(currentValue, depth + 1)}`;
      case 'removed':
        return `${makeIndent(depth - 1)}- ${key}: ${stringify(currentValue, depth + 1)}`;
      case 'added':
        return `${makeIndent(depth - 1)}+ ${key}: ${stringify(currentValue, depth + 1)}`;
      case 'updated':
        return `${makeIndent(depth - 1)}- ${key}: ${stringify(removedValue, depth + 1)}\n${makeIndent(depth - 1)}+ ${key}: ${stringify(currentValue, depth + 1)}`;
      case 'nested':
        return `${makeIndent(depth - 1)}  ${key}: {\n${stylish(currentValue, depth + 2)}\n${makeIndent(depth - 1)}  }`;
    }
  });
  return result.join('\n');
};

export default (data) => {
  const result = stylish(data);
  return `{\n${result}\n}`
};
