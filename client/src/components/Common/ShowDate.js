import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

dayjs.extend(relativeTime);

export function ShowDate({ creationDateTime }) {
  return (
    <OverlayTrigger
      key="top"
      placement="top"
      overlay={
        <Tooltip id="tooltip-top">{dayjs(creationDateTime).toString()}</Tooltip>
      }
    >
      <span>{dayjs(creationDateTime).fromNow()}</span>
    </OverlayTrigger>
  );
}
