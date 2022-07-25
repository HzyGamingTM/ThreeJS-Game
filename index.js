let camera, scene, renderer;
let ENABLE_HUD, MenuElement, OverlayElement, ConsoleElement;

const Clock = new THREE.Clock();
let Time = {  
  deltaTime: 0,
};

function init() {
  console.clear();
  scene = new THREE.Scene();
  // Color Format in 0xRRGGBB
  scene.background = new THREE.Color(0x33D5FF);
  renderer = new THREE.WebGLRenderer({
    antialias: false,
    powerPreference: "high-performance"
  });
  renderer.setSize(
    window.innerWidth, window.innerHeight
  );
  document.body.appendChild(renderer.domElement);
  document.addEventListener('keydown', () => {
    onKeyDown(event) 
  }, false);
  document.addEventListener('keyup', ()=>{
    onKeyUp(event)
  }, false);
  document.addEventListener("mousemove",
    mouseMove, false
  );
  MenuElement = document.getElementById("Menu");
  ConsoleElement = document.getElementById("Console");
  OverlayElement = document.getElementById('overlay');
  InitObjects();
  ALLOW_MOVEMENT = true;
  ENABLE_HUD = false;
  camera.rotation.order = "YXZ";
  FinishLoad();
}

async function animate() {
  render();
  requestAnimationFrame(animate);
  Time.deltaTime = Clock.getDelta();
  world.step(1/60);
  Move();
  SyncBodyMesh();
  UpdateCords();
  Sprint();
  UpdateBlock();
  RenderMenu();
}

function render() { 
  renderer.render(scene, camera) 
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
    MenuElement.style.display = "none";
    ConsoleElement.style.display = "none";
  }
  else {
    MenuElement.style.display = "";
    ConsoleElement.style.display = "";
  }
}

function FinishLoad() {
  document.getElementById("render").innerHTML = "";
}

init(), animate();