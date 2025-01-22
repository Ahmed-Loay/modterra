import { ReactElement } from "react";

import "./AppSidebar.scss";
import IconButton from "../IconButton/IconButton";

type MenuEntry = {
  icon: ReactElement;
  title: string;
  page: ReactElement;
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
  return (
    <div className="sidebar">
      <div className="sideicons">
        <div className="appicon">{appIcon}</div>
        {entries?.map((entry) => (
          <IconButton tooltip={entry.title} icon={entry.icon}></IconButton>
        ))}
      </div>

      <div className="sidemenu" style={{ width: sidebarMenu }}></div>

      <div className="page"></div>
    </div>
  );
}
