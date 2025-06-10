const HabitCalendar = ({ completions, year, habitId }) => {
  const startingDate = new Date(year, 0, 1);
  const endingDate = new Date(year, 11, 31);
  const daysInMonth = Math.ceil(
    (endingDate - startingDate) / (1000 * 60 * 60 * 24) + 1
  );

  const rows = 7;
  const columns = Math.ceil(daysInMonth / rows);

  const gridCells = [];

  const firstDayOfWeek = startingDate.getDay();

  for (let i = 0; i < firstDayOfWeek; i++) {
    gridCells.push({
      isEmpty: true,
      day: null,
    });
  }

  // Add actual date cells
  const calenderGrid = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(startingDate);
    date.setDate(startingDate.getDate() + i);
    return {
      isEmpty: false,
      day: date.toISOString().slice(0, 10),
      dayOfWeek: date.getDay(),
    };
  });

  gridCells.push(...calenderGrid);

  const getColor = (cell) => {
    const completion =
      completions && completions.find((i) => i.localDate === cell.day);

    if (!completion) return "#757575";

    const completed = completion?.completed ?? false;

    if (completed === true) return "#68d600";
    if (completed === false) return "#ffe890";

    return "#757575";
  };

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
      {gridCells.map((cell, index) => {
        if (cell.isEmpty) {
          return (
            <div
              key={`empty-${index}`}
              style={{
                width: "10px",
                height: "10px",
              }}
            ></div>
          );
        }

        return (
          <div
            key={index}
            className="rounded-sm cursor-pointer"
            title={`${cell.day}`}
            style={{
              backgroundColor: getColor(cell),
              width: "10px",
              height: "10px",
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default HabitCalendar;
