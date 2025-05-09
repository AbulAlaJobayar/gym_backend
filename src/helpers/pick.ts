const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Partial<T> => {
  return keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Partial<T>);
};
export default pick;
