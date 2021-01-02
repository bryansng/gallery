import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function DisabledHoverTooltipper({
  actionMsg,
  enableTooltip,
  children,
}) {
  const actualActionMsg = actionMsg ? actionMsg : "do this";
  return enableTooltip ? (
    <OverlayTrigger
      overlay={
        <Tooltip id="tooltip-disabled">{`Sign in to ${actualActionMsg}.`}</Tooltip>
      }
    >
      <span>{children}</span>
    </OverlayTrigger>
  ) : (
    <OverlayTrigger
      show={false}
      overlay={
        <Tooltip id="tooltip-disabled">{`Sign in to ${actualActionMsg}.`}</Tooltip>
      }
    >
      <span>{children}</span>
    </OverlayTrigger>
  );
}
