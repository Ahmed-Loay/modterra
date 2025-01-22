import "./test.scss";
import "./components/pages/AppSidebar";
import AppSidebar from "./components/pages/AppSidebar";

import { AudioLines, Hop, SquareFunction, Trees } from "lucide-react";

export default function App() {
  return (
    <AppSidebar
      sidebarMenu={300}
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
          menu: <div>n o i s e</div>,
        },
      ]}
    />
  );
}
