const validID = (id) => {
  if (String(id).indexOf('.') !== -1) {
    return false;
  }
  const num = Number(id);

  if (Number.isNaN(num) || num % 1 !== 0 || num < 1) {
    return false;
  }
  return true;
};


export default validID;
