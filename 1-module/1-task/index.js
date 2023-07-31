function factorial (n) {
  if (n) {
    let result = n;
    for (let i = 1; i < n; i++) {
      result *= n - i;
    }
    return result;
  }
  return 1;
}
