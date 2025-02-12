import { useEffect, useRef } from "react";
import {
  ChunkData,
  make3dArray,
  CHUNKSIZE,
  ChunkViewport,
} from "threejs-chunk-viewport";

export default function TerrainViewport() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const chunkData = useRef<ChunkData | null>(null);
  const view = useRef<ChunkViewport | null>(null);

  if (!chunkData.current) {
    chunkData.current = make3dArray(CHUNKSIZE, CHUNKSIZE, CHUNKSIZE);
    view.current = new ChunkViewport(chunkData.current);
  }

  useEffect(() => {
    view.current!.mount(containerRef.current!);

    return () => view.current!.unmount();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }} ref={containerRef}></div>
  );
}
