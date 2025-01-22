import { ReactElement, useRef, useState } from "react";

import "./IconButton.scss";
import "./tooltip.scss";

type IconButtonProps = {
  icon: ReactElement;
  tooltip?: string;
  forceHover?: boolean;
  onClick?: () => void;
};

export default function IconButton({
  icon,
  tooltip,
  forceHover,
  onClick,
}: IconButtonProps) {
  const [hover, setHover] = useState(false);

  return (
    <div className="iconbuttoncontainer">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="iconbutton"
      >
        {icon}
      </div>

      <div className="tooltipcontainer">
        <div className={hover ? "tooltip active" : "tooltip"}>
          <p>{tooltip}</p>
        </div>
      </div>
    </div>
  );
}
