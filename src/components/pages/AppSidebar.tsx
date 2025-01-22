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
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);

  function handleMenuEntryClick(index: number) {
    //deselect on clicking on active again
    if (index == selectedMenu) {
      setSelectedMenu(null);
      return;
    }
    setSelectedMenu(index);
  }

  return (
    <div className="sidebar">
      <div className="sideicons">
        <div className="appicon">{appIcon}</div>
        {entries?.map((entry, i) => (
          <IconButton
            onClick={() => handleMenuEntryClick(i)}
            forceHover={selectedMenu == i}
            tooltip={entry.title}
            icon={entry.icon}
          ></IconButton>
        ))}
      </div>

      <div className="sidemenu" style={{ width: sidebarMenu }}>
        {entries?.find((_, i) => selectedMenu == i)?.menu}
      </div>

      <div className="page"></div>
    </div>
  );
}
