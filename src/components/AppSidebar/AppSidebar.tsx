import { ReactElement, useState } from "react";

import "./AppSidebar.scss";
import IconButton from "../IconButton/IconButton";

type MenuEntry = {
  icon: ReactElement;
  title: string;
  menu: ReactElement;
};

type AppSidebarProps = {
  sidebarMenu: number;
  appIcon: ReactElement;
  entries?: MenuEntry[];
};

export default function AppSidebar({
  sidebarMenu,
  appIcon,
  entries,
}: AppSidebarProps) {
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);

  function handleMenuEntryClick(index: number) {
    //deselect on clicking on active again
    if (index == selectedEntry) {
      setSelectedEntry(null);
      return;
    }
    setSelectedEntry(index);
  }

  return (
    <div className="sidebar">
      <div className="sideicons">
        <div className="appicon">{appIcon}</div>
        {entries?.map((entry, i) => (
          <IconButton
            onClick={() => handleMenuEntryClick(i)}
            forceHover={i == selectedEntry}
            tooltip={entry.title}
            icon={entry.icon}
          ></IconButton>
        ))}
      </div>

      <div
        className="sidemenu"
        style={{ width: selectedEntry !== null ? sidebarMenu : 0 }}
      >
        {entries?.find((_, i) => i == selectedEntry)?.menu}
      </div>
    </div>
  );
}
