const rc = new THREE.Raycaster();

let Debug = {
  log: "",
  DLog:
    function DLog(args) {
      let t = new Date();
      let time = `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
      if (args == null) throw new Error("Cannot log Null!");
        Debug.log = `[Log] [${time}] ${args}`;
    }
};

function RayCastFromCamera() {
  rc.setFromCamera(new THREE.Vector2(), camera);
  let Result = rc.intersectObjects(scene.children);
  return Result;
}

function RayCastV(_Position, Dir) {
  rc.set(_Position, Dir);
  let result1 =   rc.intersectObjects(scene.children);
  return result1;
}

function RayCastVWLen(position, dir, length) {
  rc.set(position, dir);
  let r1 = rc.intersectObjects(scene.children);
  let r2 = [];
  for (var i = 0; i < r1; i++) {
    if (r1[i].distance <= Len) r2.push(r1[i]);
  }
  return r2;
}