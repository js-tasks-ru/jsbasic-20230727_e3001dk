function toggleText () {
  const button = document.querySelector('.toggle-text-button');
  const text = document.querySelector('#text');

  const hideText = () => text.hidden = !text.hidden;

  button.addEventListener('click', hideText);
}
