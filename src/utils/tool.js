export function removeEmptyValues(obj) {
    const result = {};
    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
        result[key] = obj[key];
      }
    }
    return result;
  }