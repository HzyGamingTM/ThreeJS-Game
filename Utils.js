const rc = new THREE.Raycaster();

let Debug = {
  log: "",
  DLog:
    function DLog(args) {
      if (args == null) return;
      let t = new Date();
      let time = `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
      Debug.log = `[Log] [${time}] ${args}`;
    }
};

let Raycast = {
  camera:
  function RayCastFromCamera() {
    rc.setFromCamera(new THREE.Vector2(), camera);
    let Result = rc.intersectObjects(scene.children);
    return Result;
  },
  vector:
  function RayCastV(pos, dir) {
    rc.set(pos, dir);
    let result = rc.intersectObjects(scene.children);
    return result;
  }
};

const Mathf = {
  clamp:
    function clamp(num, min, max) { 
      Math.min(Math.max(num, min), max) 
    },
  lerp:
    function lerp (start, end, amt) {
      return (1-amt)*start+amt*end;
    }
}