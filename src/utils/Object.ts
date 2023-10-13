export const getKeyByValue = (object: any, value: string) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const getValueByKey = (object: any, key: string) => {
  return object[key];
};
