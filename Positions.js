let camera, scene, renderer;
let img_material;
let groundBody, world;
let playerMesh, playerBody;
let testMesh, testBody, testObj;

// DOCS: https://pmndrs.github.io/cannon-es/docs/index.html
function InitObjects() {
  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true, powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  // World
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x33D5FF);
  world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);
  
  // Camera
  camera = new THREE.PerspectiveCamera(
    MIN_FOV, window.innerWidth/window.innerHeight, 0.1, 10000
  );
  camera.position.z = 5;
  
  // Player
  const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
  const playerMaterial = new THREE.MeshStandardMaterial();
  playerMaterial.color.set(0x00ff00);
  playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
  playerBody = new CANNON.Body({
    mass: 1,
    shape: new CANNON.Box(new CANNON.Vec3(1/2, 1/2, 1/2))
  });
  
  // Texture
  const img_texture = new THREE.TextureLoader().load("Resource/dirt.png");

  // Material
  material = new THREE.MeshStandardMaterial();
  material.color.set(0x00c5cc);
  img_material = new THREE.MeshLambertMaterial({
    map: img_texture
  });
  
  // Mesh
  floorGeometry = new THREE.PlaneGeometry(100, 100);
  floor = new THREE.Mesh(floorGeometry, material);
  
  groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(100/2, 100/2),
  });
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  groundBody.position.set(0, -0.5, 0);
  const testGeo = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
  testObj = new THREE.Mesh(testGeo, playerMaterial);
  
  testBody = new CANNON.Body({
    shape: new CANNON.Cylinder(0.5/2, 0.5/2, 2/2, 32/2),
    mass: 1,
  });
  testBody.position.set(3,3,3);
  
  // Light
  const light = new THREE.AmbientLight(0xffffff, 0.5);
  light.castShadow = true;

  // Helpers
  const axesHelper = new THREE.AxesHelper(5);
  
  scene.add(axesHelper);
  scene.add(light);
  scene.add(camera);
  scene.add(floor);
  scene.add(playerMesh);
  scene.add(testObj);
  world.add(testBody);
  world.addBody(groundBody);
  world.addBody(playerBody);
  TerrainGeneration();
}

function SyncBodyMesh() {
  floor.position.copy(groundBody.position);
  floor.quaternion.copy(groundBody.quaternion);
  playerMesh.position.copy(playerBody.position);
  playerMesh.quaternion.copy(playerBody.quaternion);
  camera.quaternion.copy(playerBody.quaternion);
  playerBody.position.x = camera.position.x;
  playerBody.position.z = camera.position.z;
  camera.position.y = playerBody.position.y;
  testObj.position.copy(testBody.position);
  testObj.quaternion.copy(testBody.quaternion);
}

function SpawnPlayer() {
  playerBody.position.set(0,5,0);
}

let tempCubeRB, ylevelbuff;
let mesh_array = [];
let rb_array = [];
function TerrainGeneration() {
  let cube = new THREE.BoxGeometry(1, 1, 1);
  let halfExt = new CANNON.Vec3(0.5, 0.5, 0.5);
  for (i = 0; i < 10; i++) {
    let tempmesh = new THREE.Mesh(cube, img_material);
    tempCubeRB = new CANNON.Body({
      shape: new CANNON.Box(halfExt),
      type: CANNON.Body.STATIC
    });
    tempCubeRB.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    mesh_array.push(tempmesh);
    rb_array.push(tempCubeRB);
    scene.add(tempmesh);
    world.add(tempCubeRB);
  }
  for (i = 0; i < 10; i++) {
    let randomY = Math.floor(Math.random() * 2);
    mesh_array[i].position.x = i;
    mesh_array[i].position.y += randomY;
    rb_array[i].position.x = i;
    rb_array[i].position.y += randomY;
  }
}
function RegenTerrain() {
  ylevelbuff = 0;
  for (i = 0; i < 10; i++) {
    mesh_array[i].position.x = i;
    rb_array[i].position.x = i;
    ylevelbuff += Math.floor(Math.random() * 2);
    mesh_array[i].position.y = ylevelbuff;
    rb_array[i].position.y = ylevelbuff;
  }
}