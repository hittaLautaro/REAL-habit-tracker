const HabitCalendar = ({ startDate, endDate, dataValues }) => {
  const startingDate = new Date(startDate);
  const endingDate = new Date(endDate);
  const daysInMonth = Math.ceil(
    (endingDate - startingDate) / (1000 * 60 * 60 * 24) + 1
  );
  const calenderGrid = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(startingDate);
    date.setDate(startingDate.getDate() + i);
    return date.toISOString().slice(0, 10);
  });

  const getColor = (activity, objective) => {
    if (objective === 0) return "#757575"; // grey
    if (activity === 0) return "#ffe890"; // yellow
    if (activity < objective) return "#ffc900"; // yellow
    return "#68d600"; // green / success
  };

  const rows = 7;
  const columns = Math.ceil(daysInMonth / rows);

  return (
    <div
      style={{
        display: "grid",
        gap: "4px",
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridAutoFlow: "column",
        width: "fit-content",
        margin: "4rem",
      }}
    >
      {calenderGrid.map((day, index) => {
        const activityCount =
          dataValues.find((i) => i.date === day)?.count || 0;

        const objective =
          dataValues.find((i) => i.date === day)?.objective || 0;
        return (
          <div
            key={index}
            className="rounded cursor-pointer"
            title={`${activityCount} out of ${objective} completed on ${day}`}
            style={{
              backgroundColor: getColor(activityCount, objective),
              width: "16px",
              height: "16px",
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default HabitCalendar;
