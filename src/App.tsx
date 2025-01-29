import "./test.scss";
import "./components/AppSidebar/AppSidebar";
import AppSidebar from "./components/AppSidebar/AppSidebar";

import { AudioLines, Hop, SquareFunction, Trees } from "lucide-react";
import PanelsContainer from "./components/PanelsContainer";

export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <AppSidebar
        sidebarMenu={220}
        appIcon={<Hop fill="whitesmoke" size={"25px"} />}
        entries={[
          {
            icon: <Trees stroke="whitesmoke" size={"20px"} />,
            title: "Biomes",
            menu: <div>biomes</div>,
          },
          {
            icon: <SquareFunction stroke="whitesmoke" size={"20px"} />,
            title: "Controllers",
            menu: <div>controllers</div>,
          },
          {
            icon: <AudioLines stroke="whitesmoke" size={"20px"} />,
            title: "Noise Functions",
            menu: <div>noise</div>,
          },
        ]}
      />

      <PanelsContainer style={{ width: "100%", fontFamily: "monospace" }} />
    </div>
  );
}
