import Header from "../../../components/Global/Header.jsx";
import _ from "lodash";
import "../../../components/Global/styles.css";
import Todo from "./Todo.jsx";

const HabitPage = () => {
  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center mt-4">
        <div className="row w-4/6 ">
          <div
            className="col-sm !border !border-neutral-800 mt-4 rounded"
            style={{ backgroundColor: "#151515" }}
          >
            <Todo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitPage;
