function highlight (table) {
  const titles = table.tHead.rows[0].cells;

  const indexes = {};
  for (let i = 0; i < titles.length; i++) {
    indexes[titles[i].textContent] = i;
  }

  for (let row of table.tBodies[0].rows) {
    const availability = row.cells[indexes.Status].dataset.available;
    if (availability) {
      row.classList.add(availability === 'true' ? 'available' : 'unavailable');
    } else {
      row.hidden = true;
    }

    const gender = row.cells[indexes.Gender].textContent;
    row.classList.add(gender === 'm' ? 'male' : 'female');

    const age = +row.cells[indexes.Age].textContent;
    if (age < 18) {
      row.style = 'text-decoration: line-through';
    }
  }
}
