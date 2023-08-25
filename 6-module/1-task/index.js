export default class UserTable {
  constructor(rows) {
    this.headers = ['Имя', 'Возраст', 'Зарплата', 'Город'];
    this.rows = rows;
    this.elem = this.renderTable();
  }

  onButtonClick(evt) {
    if (evt.target.matches('button')) {
      evt.target.closest('tr').remove();
    }
  }

  renderTdRow(row) {
    let tdRow = '';
    Object.values(row).forEach((el) => {
      tdRow += `<td>${el}</td>`;
    });
    tdRow += '<td><button>X</button></td>';
    return tdRow;
  }

  renderTbody() {
    const tbody = document.createElement('tbody');
    this.rows.forEach((row) => {
      tbody.insertAdjacentHTML('beforeend', this.renderTdRow(row));
    });
    return tbody;
  }

  renderThRow() {
    const thRow = document.createElement('tr');
    this.headers.forEach((header) => {
      thRow.insertAdjacentHTML('beforeend', `<th>${header}</th>`);
    });
    return thRow;
  }

  renderThead() {
    const thead = document.createElement('thead');
    thead.append(this.renderThRow());
    return thead;
  }

  renderTable() {
    const table = document.createElement('table');
    table.append(this.renderThead());
    table.append(this.renderTbody());

    table.addEventListener('click', this.onButtonClick);

    return table;
  }
}
