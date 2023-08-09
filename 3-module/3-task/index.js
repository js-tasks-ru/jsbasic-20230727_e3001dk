function camelize (string) {
  const words = string.split('-');

  let result = '';

  for (let i = 0; i < words.length; i++) {
    if (i) {
      result += words[i][0].toUpperCase() + words[i].slice(1);
      continue;
    }
    result += words[i];
  }

  return result;
}
