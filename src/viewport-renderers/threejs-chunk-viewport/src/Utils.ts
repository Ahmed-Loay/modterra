import * as THREE from "three";

export function make3dArray(x: number, y: number, z: number) {
  var arr: number[][][] = [];

  for (let _x = 0; _x < x; _x++) {
    arr[_x] = new Array(y);

    for (let _y = 0; _y < y; _y++) {
      arr[_x][_y] = new Array(z);
    }
  }

  return Array.from(arr);
}

export function getBox3Verts(box: THREE.Box3): THREE.Vector3[] {
  const min = box.min;
  const max = box.max;

  return [
    new THREE.Vector3(min.x, min.y, min.z),
    new THREE.Vector3(max.x, min.y, min.z),
    new THREE.Vector3(min.x, max.y, min.z),
    new THREE.Vector3(min.x, min.y, max.z),

    new THREE.Vector3(max.x, max.y, min.z),
    new THREE.Vector3(max.x, min.y, max.z),
    new THREE.Vector3(min.x, max.y, max.z),
    new THREE.Vector3(max.x, max.y, max.z),
  ];
}

export function screenToCartesian(
  x: number,
  y: number,
  cartesianWidth: number,
  cartesianHeight: number
): THREE.Vector2 {
  var transformedX = ((x + 1) * cartesianWidth) / 2;
  var transformedY = (-(y - 1) * cartesianHeight) / 2;

  return new THREE.Vector2(transformedX, transformedY);
}
