import { round } from "lodash";
import Skeleton from "../../../../components/Global/Skeleton";

const CompletionCalendarSkeleton = ({ year }) => {
  const startingDate = new Date(year, 0, 1);
  const endingDate = new Date(year, 11, 31);
  const daysInMonth = Math.ceil(
    (endingDate - startingDate) / (1000 * 60 * 60 * 24) + 1
  );

  const rows = 7;
  const columns = Math.ceil(daysInMonth / rows);
  const firstDayOfWeek = startingDate.getDay();

  const totalCells = firstDayOfWeek + daysInMonth;

  return (
    <div
      style={{
        display: "grid",
        gap: "4px",
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns + 1}, 1fr)`,
        gridAutoFlow: "column",
        margin: "1rem 0",
        width: "700px",
      }}
    >
      {Array.from({ length: totalCells }, (_, index) => {
        const isEmpty = index < firstDayOfWeek;

        return (
          <div
            key={index}
            style={{
              width: "10.5px",
              height: "10.5px",
            }}
          >
            {!isEmpty && (
              <Skeleton
                className="w-full h-full"
                style={{ borderRadius: "0" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CompletionCalendarSkeleton;
