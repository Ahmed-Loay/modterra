import { ReactElement, useRef, useState } from "react";

import "./IconButton.scss";
import "./tooltip.scss";

type IconButtonProps = {
  icon: ReactElement;
  tooltip?: string;
  onClick?: () => void;
};

export default function IconButton({
  icon,
  tooltip,
  onClick,
}: IconButtonProps) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="iconbutton"
    >
      {icon}

      <div className="tooltip">
        <p>{tooltip}</p>
      </div>
    </div>
  );
}
