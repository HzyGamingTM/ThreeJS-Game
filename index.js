const Clock = new THREE.Clock();
let Time = {deltaTime:0};
let ENABLE_HUD, MenuDisplay, OverlayDisplay;

function init() {
  MenuDisplay = document.getElementById("Menu").style;
  OverlayElement = document.getElementById('overlay');
  RegisterEvents();
  InitObjects();
  SpawnPlayer();
  Music.init();
  ALLOW_MOVEMENT = true;
  ENABLE_HUD = false;
}

function RegisterEvents() {
  document.addEventListener('keydown',()=>onKeyDown(event), false);
  document.addEventListener('keyup',()=>onKeyUp(event), false);
  document.addEventListener("mousemove", mouseMove, false);
}

const render = () => renderer.render(scene, camera);
async function animate() {
  render();
  requestAnimationFrame(animate);
  Time.deltaTime = Clock.getDelta();
  world.step(1/60);
  Move(), SyncBodyMesh();
  Sprint(), UpdateBlock();
  RenderMenu(), UpdateCords();
}
function UpdateCords() {
  OverlayElement.innerHTML = `XYZ: 
  ${camera.position.x.toFixed(1)},
  ${camera.position.y.toFixed(1)},
  ${camera.position.z.toFixed(1)},
  Debug: ${Debug.log}`
}
function RenderMenu() {
  if (!ENABLE_HUD) MenuDisplay.display = "none";
  else MenuDisplay.display = "";
}
init(), animate();