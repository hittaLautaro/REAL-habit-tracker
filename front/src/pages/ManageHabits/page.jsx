import Header from "../../components/global/Header.jsx";
import ActivityHeatmap from "../../components/global/ActivityHeatmap.jsx";
import Stats from "../../components/global/Stats.jsx";
import ManageHabits from "./ManageHabits.jsx";

const AllHabitsPage = () => {
  return (
    <div>
      <Header />

      <div className="grid grid-cols-2 mt-0">
        {/* Left column */}
        <div className="flex flex-col items-center justify-content-center">
          <ManageHabits />
        </div>

        {/* Right column */}
        <div className="w-[830px] flex flex-col p-2 mt-3">
          <div>
            <ActivityHeatmap />
          </div>
          <div>
            {/* TODO - Going to be the heatmap for singular habits */}
            <ActivityHeatmap />
          </div>
          <div>
            <Stats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllHabitsPage;
