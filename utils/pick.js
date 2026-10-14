// Copies only the listed keys that are actually present on obj
const pick = (obj = {}, keys) => {
  const result = {};
  for (const key of keys) {
    if (obj[key] !== undefined) result[key] = obj[key];
  }
  return result;
};

export default pick;
