const Clock = new THREE.Clock();
let camera, scene, renderer;
let ENABLE_HUD, MenuDisplay, OverlayDisplay, ConsoleDisplay;

let Time = { deltaTime: 0 };

function init() {
  console.clear();
  scene = new THREE.Scene();
  // Color Format in 0xRRGGBB
  scene.background = new THREE.Color(0x33D5FF);
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  document.addEventListener('keydown', () => {
    onKeyDown(event)
  }, false);
  document.addEventListener('keyup', () => {
    onKeyUp(event)
  }, false);
  document.addEventListener("mousemove", mouseMove, false);
  MenuDisplay = document.getElementById("Menu").style;
  ConsoleDisplay = document.getElementById("Console").style;
  OverlayElement = document.getElementById('overlay');
  InitObjects();
  SpawnPlayer();
  Music.init();
  ALLOW_MOVEMENT = true;
  ENABLE_HUD = false;
}

const render = () => { renderer.render(scene, camera) }
async function animate() {
  render();
  requestAnimationFrame(animate);
  Time.deltaTime = Clock.getDelta();
  world.step(1 / 60);
  Move(), SyncBodyMesh();
  Sprint(), UpdateBlock();
  RenderMenu(), UpdateCords();
}

function UpdateCords() {
  OverlayElement.innerHTML = `XYZ: 
  ${camera.position.x.toFixed(1)},
  ${camera.position.y.toFixed(1)},
  ${camera.position.z.toFixed(1)},
  Debug: ${Debug.log}`;
}

function RenderMenu() {
  if (!ENABLE_HUD) {
    MenuDisplay.display = "none";
    ConsoleDisplay.display = "none";
  } else {
    MenuDisplay.display = "";
    ConsoleDisplay.display = "";
  }
}

init(), animate();