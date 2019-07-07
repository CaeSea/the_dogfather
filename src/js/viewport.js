let ViewportControl = (function() {
  return {
    calculateHeight: function() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  };
})();

document.addEventListener("DOMContentLoaded", ViewportControl.calculateHeight);
window.addEventListener("resize", ViewportControl.calculateHeight);
