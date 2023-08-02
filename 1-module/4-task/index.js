function checkSpam (str) {
  str = str.toLowerCase();
  const words = ['1xbet', 'xxx'];

  for (let word of words) {
    if (str.includes(word)) {
      return true;
    }
  }
  return false;
}
