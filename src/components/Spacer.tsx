type SpacerProp = {
  color?: string;
  margin?: number;
  thickness: number;
};

export default function Spacer({
  color = "grey",
  margin = 2,
  thickness = 1,
}: SpacerProp) {
  return (
    <div
      style={{
        width: "100%",
        height: `${thickness}px`,
        backgroundColor: color,
        margin: `${margin}px 0px`,
      }}
    ></div>
  );
}
