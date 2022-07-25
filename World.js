let block;
const range = 2;

function UpdateBlock() {
  if (RayCastFromCamera() == null) return;
  block = RayCastFromCamera();
}

function BreakBlock() {
  console.log(block[0].distance);
  if (block[0].distance <= range) {
    block[0].object.material.dispose();
    block[0].object.geometry.dispose();
    scene.remove(block[0].object);
  }
}

function PlaceBlock() {
  
}