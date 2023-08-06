function sumSalary (salaries) {
  let result = 0;

  for (let property in salaries) {
    if (Number.isFinite(salaries[property])) {
      result += salaries[property];
    }
  }

  return result;
}
