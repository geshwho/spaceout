function getMousePosition() {
  const e = window.event
  var mouseX = e.pageX;
  var mouseY = e.pageY;
  return {mouseX, mouseY}
}

export function getMouseObjectDiff(objectId) {
  const {mouseX, mouseY} = getMousePosition();
  const {x, y} = document.getElementById(objectId).getBoundingClientRect();
  const relX = mouseX-x;
  const relY = mouseY-y;
  return {relX, relY};
}
