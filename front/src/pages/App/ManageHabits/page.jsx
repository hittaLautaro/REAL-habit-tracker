import Header from "../../../components/Global/Header.jsx";
import CompletionHeatmap from "./CompletionHeatmap/CompletionHeatmap.jsx";
import Stats from "./Stats.jsx";
import ManageHabits from "./ManageHabits.jsx";
import HabitHeatmap from "./HabitHeatmap/HabitHeatmap.jsx";

const AllHabitsPage = () => {
  return (
    <div>
      <Header />

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col mt-3 justify-content-center items-end pr-4">
          <ManageHabits />
        </div>

        <div className="flex flex-col items-start mt-3">
          <div className="w-[830px]">
            <CompletionHeatmap />
          </div>
          <div className="w-[830px]">
            <HabitHeatmap />
          </div>
          <div className="w-[830px]">
            <Stats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllHabitsPage;
