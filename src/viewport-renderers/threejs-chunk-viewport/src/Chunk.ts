import * as THREE from "three";
import CubeVerts from "./CubeVerts";

export type ChunkData = number[][][];

export class Chunk {
  static CHUNKSIZE = 100;

  static buildGeometry(chunkData: number[][][]): THREE.BufferGeometry {
    const geo = new THREE.BufferGeometry();

    var finalVerts: number[] = [];

    //figure out what faces to push here
    //finalVerts.push(...);

    for (let x = 0; x < Chunk.CHUNKSIZE; x++) {
      for (let y = 0; y < Chunk.CHUNKSIZE; y++) {
        for (let z = 0; z < Chunk.CHUNKSIZE; z++) {
          if (chunkData[x][y][z] == 0) continue;

          /*if (y + 1 >= Chunk.CHUNKSIZE) {
            finalVerts.push(...CubeVerts.positiveYFace(x, y, z));
            continue;
          }*/

          if (y + 1 >= Chunk.CHUNKSIZE || chunkData[x][y + 1][z] == 0) {
            finalVerts.push(...CubeVerts.positiveYFace(x, y, z));
          }

          if (y - 1 < 0 || chunkData[x][y - 1][z] == 0) {
            finalVerts.push(...CubeVerts.negativeYFace(x, y, z));
          }

          if (x + 1 >= Chunk.CHUNKSIZE || chunkData[x + 1][y][z] == 0) {
            finalVerts.push(...CubeVerts.positiveXFace(x, y, z));
          }

          if (x - 1 < 0 || chunkData[x - 1][y][z] == 0) {
            finalVerts.push(...CubeVerts.negativeXFace(x, y, z));
          }

          if (z + 1 >= Chunk.CHUNKSIZE || chunkData[x][y][z + 1] == 0) {
            finalVerts.push(...CubeVerts.positiveZFace(x, y, z));
          }

          if (z - 1 < 0 || chunkData[x][y][z - 1] == 0) {
            finalVerts.push(...CubeVerts.negativeZFace(x, y, z));
          }
        }
      }
    }

    const vertices = new Float32Array(finalVerts);
    geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    return geo;
  }
}

export const CHUNKSIZE = Chunk.CHUNKSIZE;
