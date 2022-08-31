let ALLOW_FLY = false;
let Forward, Backward, Left, Right, speed;
const Speed = { WALK: 3, ROTATE: 3, SPRINT: 6 };
const MIN_FOV = 90.0;
const MAX_FOV = 110.0;
const axisX = new CANNON.Vec3(0, 1, 0);
let angleX = 0;
function Move() {
  playerBody.quaternion.setFromAxisAngle(axisX, angleX);
  if (Right) {
    if (ENABLE_POINTER) camera.translateX(speed * Time.deltaTime);
    else angleX -= Speed.ROTATE * Time.deltaTime;
  } if (Left) {
    if (ENABLE_POINTER) camera.translateX(-speed * Time.deltaTime);
    else angleX += Speed.ROTATE * Time.deltaTime;
  } if (Backward) camera.translateZ(-speed * Time.deltaTime);
  if (Forward) camera.translateZ(speed * Time.deltaTime);
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
    speed = Speed.SPRINT;
    SprintFov();
  } else {
    speed = Speed.WALK;
    WalkFov();
  }
}
const JUMP_CHECK = 0.5;
function GroundCheck() {
  let obj = Raycast.vector(
    camera.position, T_Vector3.down
  );
  if (obj[0].distance <= JUMP_CHECK) return true;
  return false;
}
const scale = 1;
let mouseX, mouseY = 0;

function mouseMove(e) {
  if (!ENABLE_POINTER) return;
  mouseX =- (e.clientX / renderer.domElement.clientWidth) * 2 + 1;
  mouseY =- (e.clientY / renderer.domElement.clientHeight) * 2 + 1;
  camera.rotation.x = mouseY / scale;
  camera.rotation.y = mouseX / scale;
}

function Jump() {
  if (ALLOW_FLY) playerBody.velocity.set(0, 6, 0);
  else if (GroundCheck()) playerBody.velocity.set(0, 6, 0);
}