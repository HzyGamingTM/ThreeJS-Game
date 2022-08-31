const rc = new THREE.Raycaster();
let Debug = {
  logText: "",
  log:
    function DLog(args) {
      if (args == null) return;
      let t = new Date();
      let time = `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
      Debug.logText = `[Log] [${time}] ${args}`;
    }
}
const Raycast = {
  camera: function RayCastFromCamera() {
    rc.setFromCamera(T_Vector2.zero, camera);
    let Result = rc.intersectObjects(scene.children);
    return Result;
  },
  vector: function RayCastV(pos, dir) {
    rc.set(pos, dir);
    let result = rc.intersectObjects(scene.children);
    return result;
  }
}
const Mathf = {
  clamp: function clamp(num, min, max) { 
    Math.min(Math.max(num, min), max) 
  },
  lerp: function lerp(a,b,x) {
    return (1-x)*a+x*b;
  }
}
const T_Vector3 = {
  down: new THREE.Vector3(0, -1, 0),
  zero: new THREE.Vector3(),
  one: new THREE.Vector3(1, 1, 1),
}
const T_Vector2 = {
  zero: new THREE.Vector2(),
}