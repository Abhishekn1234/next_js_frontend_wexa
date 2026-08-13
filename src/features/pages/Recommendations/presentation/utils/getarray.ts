 export const getArray = (value: any) => {
    if (Array.isArray(value)) {
      return value;
    }
    if (Array.isArray(value?.data)) {
      return value.data;
    }
    return [];
  };
