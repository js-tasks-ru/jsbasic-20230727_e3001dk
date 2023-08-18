function hideSelf () {
  const button = document.querySelector('.hide-self-button');

  function hideButton (evt) {
    this.hidden = true;
  }

  button.addEventListener('click', hideButton);
}
