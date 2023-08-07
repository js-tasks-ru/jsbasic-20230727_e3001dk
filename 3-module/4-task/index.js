function showSalary (users, age) {
  const correctAgeUsers = users.filter((user) => user.age <= age);

  const usersSalaries = correctAgeUsers.map((user) => `${user.name}, ${user.balance}`);

  return usersSalaries.join('\n');
}
