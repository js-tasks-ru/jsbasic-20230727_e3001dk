function getMinMax (str) {
  const numbers = str.split(' ').filter((el) => {
    if (isFinite(el)) {
      return el;
    }
  });

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}
