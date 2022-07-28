let ALLOW_MOVEMENT;
let SPRINTING = false;
let ENABLE_POINTER = false;

function onKeyUp(e) {
  if (!ALLOW_MOVEMENT) return;
  switch (e.keyCode) {
    case 83:
      Forward = false;
      break;
     case 87:
      Backward = false;
      break;
    case 65:
      Left = false;
      break;
    case 68:
      Right = false;
      break;
    case 16:
      SPRINTING = false;
      break;
  }  
}

function onKeyDown(e) {
  if (!ALLOW_MOVEMENT) return;
  switch (e.keyCode) {
    case 83:
      Forward = true;
      break;
    case 87:
      Backward = true;
      break;
    case 65:
      Left = true;
      break;
    case 68:
      Right = true;
      break;
    case 80:
      ENABLE_POINTER = !ENABLE_POINTER;
      break;
    case 16:
      SPRINTING = true;
      break;
    case 82:
      RegenTerrain();
      break;
    case 72:
      ENABLE_HUD = !ENABLE_HUD;
      break;
    case 74:
      BreakBlock();
      break;
    case 77:
      Music.turi_ip.play();
      break;
    case 32:
      Jump();
      break;
  }
}

