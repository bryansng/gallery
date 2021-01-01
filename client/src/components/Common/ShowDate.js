import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

dayjs.extend(relativeTime);

export function ShowDate({ creationDateTime, placement }) {
  return (
    <OverlayTrigger
      key={placement}
      placement={placement}
      overlay={
        <Tooltip id="Actual date time">
          {dayjs(creationDateTime).toString()}
        </Tooltip>
      }
    >
      <span>{dayjs(creationDateTime).fromNow()}</span>
    </OverlayTrigger>
  );
}
