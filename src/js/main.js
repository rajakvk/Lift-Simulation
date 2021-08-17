;(function() {
  var lift,
  init = () => {
    lift = document.querySelector('.lift');
  },
  moveLift = (e) => {
    const floor = e.target.dataset['floor'];
    const direction = e.target.dataset['direction'];
    switch (floor) {
      case "1":
        lift.style.cssText = `bottom: 0px;`;
        break;
      case "2":
        lift.style.cssText = `bottom: 100px;`;
        break;
      case "3":
        lift.style.cssText = `bottom: 200px;`;
        break;
      case "4":
        lift.style.cssText = `bottom: 300px;`;
        break;
      default:
        // left intentionally
    }
  },
  bindEvents = () => {
    document.querySelectorAll('.button-container .button').forEach(element => {
      element.addEventListener('click', moveLift);
    });
  };

  document.addEventListener('DOMContentLoaded', (event) => {
    init();
    bindEvents();
  });
})();
