export default class CubeVerts {
  //prettier-ignore
  static positiveZFace = (x: number, y: number, z: number): number[] => [
    x,   y,   z+1,
    x+1, y,   z+1,
    x,   y+1, z+1,
  
    x,   y+1, z+1, 
    x+1, y,   z+1,
    x+1, y+1, z+1
]

  //prettier-ignore
  static negativeZFace = (x: number, y: number, z: number): number[] =>  [
    x,   y,   z,
    x,   y+1, z,
    x+1, y,   z,
  
    x,   y+1, z, 
    x+1, y+1, z,
    x+1, y,   z
]

  //prettier-ignore
  static positiveYFace = (x: number, y: number, z: number): number[] => [
    x,   y+1, z,
    x,   y+1, z+1,
    x+1, y+1, z,
  
    x+1, y+1, z,
    x,   y+1, z+1,
    x+1, y+1, z+1
]

  //prettier-ignore
  static negativeYFace = (x: number, y: number, z: number): number[] => [
    x,   y, z,
    x+1, y, z,
    x,   y, z+1,
  
    x+1, y, z,
    x+1, y, z+1,
    x,   y, z+1,
]

  //prettier-ignore
  static positiveXFace = (x: number, y: number, z: number): number[] => [
    x+1, y,   z,
    x+1, y+1, z,
    x+1, y,   z+1,
  
    x+1, y,   z+1,
    x+1, y+1, z,
    x+1, y+1, z+1
]

  //prettier-ignore
  static negativeXFace = (x: number, y: number, z: number): number[] => [
    x, y,   z,
    x, y,   z+1,
    x, y+1, z,
  
    x, y,   z+1,
    x, y+1, z+1,
    x, y+1, z,
]
}
