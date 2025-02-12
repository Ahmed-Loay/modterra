import { IJsonModel, Layout, Model } from "flexlayout-react";
import "flexlayout-react/style/dark.scss";
import TerrainViewport from "./viewport-wrappers/TerrainViewport.tsx/TerrainViewport";

type PanelsContainerProps = {
  style?: React.CSSProperties;
};

export default function PanelsContainer({ style }: PanelsContainerProps) {
  const json: IJsonModel = {
    global: { tabSetEnableSingleTabStretch: true },
    borders: [],
    layout: {
      type: "row",
      weight: 100,
      children: [
        {
          type: "tabset",
          weight: 50,
          children: [
            {
              type: "tab",
              name: "One",
              component: "chunkviewport",
            },
          ],
        },
        {
          type: "tabset",
          weight: 50,
          children: [
            {
              type: "tab",
              name: "Two",
              component: "button",
            },
          ],
        },
      ],
    },
  };

  return (
    <div style={style}>
      <Layout
        model={Model.fromJson(json)}
        realtimeResize={true}
        factory={(node) => {
          var component = node.getComponent();

          if (component === "button") {
            return <button>{node.getName()}</button>;
          } else if (component === "chunkviewport") {
            return <TerrainViewport />;
          }
        }}
      />
    </div>
  );
}
