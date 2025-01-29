import React, { useRef } from "react";

import DockLayout, { LayoutData } from "rc-dock";
import "rc-dock/dist/rc-dock-dark.css";

const defaultLayout: LayoutData = {
  dockbox: {
    mode: "horizontal",
    children: [
      {
        tabs: [{ id: "tab1", title: "tab1", content: <div>Hello World</div> }],
      },
      {
        tabs: [{ id: "tab2", title: "tab2", content: <div>2</div> }],
      },
    ],
  },
};

type PanelsContainerProps = {
  style?: React.CSSProperties;
};

export default function PanelsContainer({ style }: PanelsContainerProps) {
  return (
    <div style={style}>
      <DockLayout
        defaultLayout={defaultLayout}
        style={{
          height: "100%",
        }}
      />
    </div>
  );
}
