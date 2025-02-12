import * as THREE from "three";
import { Chunk, ChunkData } from "./Chunk";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { getBox3Verts, screenToCartesian } from "./Utils";

export default class ChunkViewport {
  private _container!: HTMLElement;
  mounted: boolean = false;

  private _scene!: THREE.Scene;
  private _camera!: THREE.OrthographicCamera;
  private _renderer!: THREE.WebGLRenderer;

  chunkData?: ChunkData;
  private _chunkGeo?: THREE.BufferGeometry;
  private _chunkMesh?: THREE.Mesh;

  //private debugBox: THREE.BoxHelper;

  constructor(chunkData?: ChunkData) {
    this._scene = new THREE.Scene();
    this._scene.background = new THREE.Color(0x0202020);

    //this.debugBox = new THREE.BoxHelper(new THREE.Object3D());
    //this._scene.add(this.debugBox);

    //Setup Renderer
    this._renderer = new THREE.WebGLRenderer({ antialias: true });

    this._renderer.setSize(window.innerWidth, window.innerHeight);

    this._camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      1,
      9999
    );

    this._camera.position.set(800, 500, 800);

    if (chunkData) {
      this.chunkData = chunkData;
      this.updateChunk();
    }
  }

  private _updateViewportSize = (width: number, height: number) => {
    this._camera.left = width / -2;
    this._camera.right = width / 2;
    this._camera.top = height / 2;
    this._camera.bottom = height / -2;

    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  };

  resizeObserverCallback = () => {
    if (typeof this._container === "undefined") return;

    this._updateViewportSize(
      this._container.clientWidth,
      this._container.clientHeight
    );
  };

  private _containerObserver = new ResizeObserver(this.resizeObserverCallback);
  //private _containerObserver = new ResizeObserver(() => {});

  mount(container: HTMLElement) {
    if (!this._renderer || !this._camera || !this._scene) {
      throw new Error("Viewport hasn't been properly initialized yet");
    }

    this._container = container;
    container.appendChild(this._renderer.domElement);

    /*this._containerObserver.observe(
      this._container.parentElement!.parentElement!
    );*/

    this._containerObserver.observe(this._container);
    console.log("new version");

    //Add controls and render loop on mount and remove on unmount (why render and add controls when you can't see anything?)
    const controls = new OrbitControls(this._camera, container);
    controls.enableDamping = true;
    controls.target = new THREE.Vector3(50, 0, 50);

    const _animate = () => {
      this._renderer.render(this._scene, this._camera);
      controls.update();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.maxPolarAngle = controls.minPolarAngle = Math.PI / 3;
    };

    this._renderer.setAnimationLoop(_animate);

    this.mounted = true;
  }

  unmount() {
    this._renderer.setAnimationLoop(() => {});

    //this._container.removeEventListener("resize", this._containerResizeHandler);
    this._containerObserver.unobserve(this._container);

    this._container.removeChild(this._renderer.domElement);
    this.mounted = false;
  }

  zoomOnChunk() {
    if (!this._chunkMesh) {
      throw new Error("No chunk to zoom on.");
    }

    const prevPos = this._camera.position.clone();
    const prevRot = this._camera.rotation.clone();

    this._camera.position.set(50, 100, 50);
    this._camera.lookAt(50, 0, 50);

    //this.debugBox.setFromObject(this._chunkMesh);
    this._camera.lookAt(this._chunkMesh!.position);

    //this._chunkGeo!.boundingBox!.expandByScalar(10);
    const boundingBoxVerts = getBox3Verts(this._chunkGeo!.boundingBox!);

    // Project all corners onto the camera's view plane
    const projected = boundingBoxVerts.map((corner) => {
      corner.applyMatrix4(this._chunkMesh!.matrixWorld); // Transform to world space
      corner.project(this._camera); // Project onto the camera
      return corner;
    });

    // Calculate the min/max extents of the projected corners
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    // projected.forEach((p) => {
    //   minX = Math.min(minX, p.x);
    //   maxX = Math.max(maxX, p.x);
    //   minY = Math.min(minY, p.y);
    //   maxY = Math.max(maxY, p.y);
    // });

    // minX = clamp(minX, -1, 1);
    // maxX = clamp(maxX, -1, 1);

    // minY = clamp(minY, -1, 1);
    // maxY = clamp(maxY, -1, 1);
    var maxPoint = new THREE.Vector3();
    for (const point of projected) {
      if (point.x > maxPoint.x && point.y > maxPoint.y) {
        maxPoint = point;
      }
    }

    var minPoint = new THREE.Vector3();
    for (const point of projected) {
      if (point.x < minPoint.x && point.y < minPoint.y) {
        minPoint = point;
      }
    }

    maxX = maxPoint.x;
    maxY = maxPoint.y;

    minX = minPoint.x;
    minY = minPoint.y;

    const projectedMax = screenToCartesian(
      maxX,
      maxY,
      this._renderer.domElement.width,
      this._renderer.domElement.height
    );

    document.getElementById("max")!.style.left = projectedMax.x + "px";
    document.getElementById("max")!.style.bottom = projectedMax.y + "px";

    const projectedMin = screenToCartesian(
      minX,
      minY,
      this._renderer.domElement.width,
      this._renderer.domElement.height
    );

    document.getElementById("min")!.style.left = projectedMin.x + "px";
    document.getElementById("min")!.style.bottom = projectedMin.y + "px";

    if (this._renderer.domElement.height >= this._renderer.domElement.width) {
      this._camera.left = (projectedMax.x - projectedMin.x) / -2;
      this._camera.right = (projectedMax.x - projectedMin.x) / 2;

      const newHeight =
        (this._renderer.domElement.height / this._renderer.domElement.width) *
        (projectedMax.x - projectedMin.x);

      this._camera.top = newHeight / 2;
      this._camera.bottom = newHeight / -2;
    } else {
      this._camera.bottom = Math.abs(projectedMax.y - projectedMin.y) / -2;
      this._camera.top = Math.abs(projectedMax.y - projectedMin.y) / 2;

      const newWidth =
        (this._renderer.domElement.width / this._renderer.domElement.height) *
        Math.abs(projectedMax.y - projectedMin.y);

      this._camera.right = newWidth / 2;
      this._camera.left = newWidth / -2;
    }

    this._camera.position.copy(prevPos);
    this._camera.rotation.copy(prevRot);

    this._camera.updateProjectionMatrix();
  }

  //TODO: dont add objects to scene
  updateChunk() {
    this._chunkGeo = Chunk.buildGeometry(this.chunkData!);
    this._chunkGeo.computeVertexNormals();
    this._chunkGeo.computeBoundingBox();

    const mat = new THREE.MeshPhongMaterial({ color: 0xffffff });
    this._chunkMesh = new THREE.Mesh(this._chunkGeo, mat);
    this._scene.add(this._chunkMesh);

    this._camera.lookAt(this._chunkMesh.position);

    const targetObject = new THREE.Object3D();
    this._scene.add(targetObject);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.target = targetObject;
    this._scene.add(light);
  }
}
