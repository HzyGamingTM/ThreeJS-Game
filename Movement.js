let Forward, Backward, Left, Right, FlyUp, FlyDown = false;
let speed;

const SPEED = {
  walk: 3, rotate: 3,
  flight: 3, sprint: 6
};

const jumpVel = 5;

const MAX_FOV = 110.0;
const MIN_FOV = 90.0;

let angleX = 0; 
let angleY = 0;

function Move() {
  if (Right) {
    angleX -= 3 * Time.deltaTime;
    playerBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), angleX);
    if (ENABLE_POINTER) camera.translateX(speed * Time.deltaTime);
    //else camera.rotation.y -= SPEED.rotate * Time.deltaTime;
  }
  if (Left) {
    angleX += 3 * Time.deltaTime;
    playerBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), angleX);
    if (ENABLE_POINTER) camera.translateX(-speed * Time.deltaTime);
    //else camera.rotation.y += SPEED.rotate * Time.deltaTime;
  }
  if (Backward) camera.translateZ(-speed * Time.deltaTime);
  if (Forward) camera.translateZ(speed * Time.deltaTime);
  if (FlyUp) camera.translateY(SPEED.flight * Time.deltaTime);
  if (FlyDown) camera.translateY(-SPEED.flight * Time.deltaTime);
}

function SprintFov() {
  camera.fov = Mathf.lerp(camera.fov, MAX_FOV, 6.5 * Time.deltaTime);
}

function WalkFov() {
  camera.fov = Mathf.lerp(camera.fov, MIN_FOV, 6.5 * Time.deltaTime);
}

function Sprint() {
  camera.updateProjectionMatrix();
  if (SPRINTING) {
    speed = SPEED.sprint;
    SprintFov();
    return;
  }
  speed = SPEED.walk;
  WalkFov();
}

const scale = 1;
let mouseX, mouseY = 0;
function mouseMove(e) {
  if (!ENABLE_POINTER) return;
  mouseX =- (e.clientX / renderer.domElement.clientWidth)*2+1;
  mouseY =- (e.clientY / renderer.domElement.clientHeight)*2+1;
  camera.rotation.x = mouseY / scale;
  camera.rotation.y = mouseX / scale;
}

function Jump() {
  playerBody.velocity.set(0, 5, 0);
}