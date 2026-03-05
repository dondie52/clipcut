import { memo } from "react";

/**
 * Botswana flag stripe — decorative bar at the bottom of auth/onboarding screens.
 * Blue | White | Black | White | Blue
 */
const BotswanaStripe = memo(({ height = "6px", style }) => (
  <div
    role="presentation"
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height,
      display: "flex",
      zIndex: 50,
      ...style,
    }}
  >
    <div style={{ flex: 2, background: "#75AADB" }} />
    <div style={{ flex: 0.4, background: "white" }} />
    <div style={{ flex: 1, background: "#000" }} />
    <div style={{ flex: 0.4, background: "white" }} />
    <div style={{ flex: 2, background: "#75AADB" }} />
  </div>
));
BotswanaStripe.displayName = "BotswanaStripe";

export default BotswanaStripe;
