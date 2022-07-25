let img_material, physicsMaterial;
let groundBody, world;
let playerMesh, playerBody;

// WARNING: Cannonjs is Z Up!

function InitObjects() {
  // World
  world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);
  // DOCS: https://pmndrs.github.io/cannon-es/docs/index.html
  // Camera
  camera = new THREE.PerspectiveCamera(MIN_FOV,
    window.innerWidth/window.innerHeight, 0.1, 10000
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
  playerBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
  playerBody.position.set(2, 5, 2);
  
  // Texture
  const img_texture = new THREE.TextureLoader().load("Resource/dirt.png");

  // Material
  material = new THREE.MeshStandardMaterial();
  material.color.set(0x00c5cc);
  material.transparent = true;
  material.opacity = 0.7;
  img_material = new THREE.MeshLambertMaterial({
    map: img_texture
  });
  
  // Mesh
  floorGeometry = new THREE.PlaneGeometry(100, 100);
  // floorGeometry.rotateX(-Math.PI / 2);
  floor = new THREE.Mesh(floorGeometry, material);
  
  groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
  });
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  groundBody.position.set(0, -0.5, 0);
  
  // Light
  const light = new THREE.AmbientLight(0xffffff, 0.5);
  light.castShadow = true;

  // Helpers
  const axesHelper = new THREE.AxesHelper( 5 );
  
  scene.add(axesHelper);
  scene.add(light);
  scene.add(camera);
  scene.add(floor);
  scene.add(playerMesh);
  world.addBody(groundBody);
  world.addBody(playerBody);
  TerrainGeneration();
}

function SyncBodyMesh() {
  floor.position.copy(groundBody.position);
  floor.quaternion.copy(groundBody.quaternion);
  playerMesh.position.copy(playerBody.position);
  playerMesh.quaternion.copy(playerBody.quaternion);
}

let tempmesh, tempcube, ylevelbuff
let mesh_array = [];
function TerrainGeneration() {
  let cube = new THREE.BoxGeometry(1, 1, 1);
  tempmesh, tempcube = "";
  for (let i = 0; i < 10; i++) {
    tempcube = new THREE.BoxGeometry(1,1,1);
    tempmesh = new THREE.Mesh(cube, img_material);
    mesh_array.push(tempmesh);
    scene.add(tempmesh);
    tempmesh, tempcube = "";
  }
  for (let i = 0; i < 10; i++) {
    mesh_array[i].position.x = i;
    mesh_array[i].position.y += Math.floor(Math.random() * 2);
  }
}
function RegenTerrain() {
  ylevelbuff = 0;
  for (let i = 0; i < 10; i++) {
    mesh_array[i].position.x = i;
    ylevelbuff += Math.floor(Math.random() * 2);
    mesh_array[i].position.y = ylevelbuff;
  }
}