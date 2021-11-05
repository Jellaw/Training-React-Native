export function createIdMapping(list, property) {
  if (!property) {
    // create mapping from id to every element in list
    return list.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
  }
  return list.reduce((acc, item) => {
    acc[item.id] = item[property];
    return acc;
  }, {});
}

export function countLine(str) {
  return str.split('\n').filter(line => line.length > 0).length;
}

export function numberThousandSeparator(num, separator = ',') {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function convertCamelCaseToCapitalize(input) {
  const capitalize = ([first, ...rest]) =>
    first.toUpperCase() + rest.join('').toLowerCase();

  return input
    .split(/(?=[A-Z])/)
    .map(v => capitalize(v))
    .join(' ');
}

export function textTruncate(str, length, ending) {
  if (typeof length === 'undefined') {
    length = 100;
  }
  if (typeof ending === 'undefined') {
    ending = '...';
  }

  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  }

  return str;
}
