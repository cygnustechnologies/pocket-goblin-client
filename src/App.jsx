import React from "react";
import ReactDOM from "react-dom";

import DashBoardContainer from "./components/DashBoardContainer/DashBoardContainer";
import FinancialSnapShotContainer from "./components/FinancialSnapShotContainer/FinancialSnapShotContainer";

class App extends React.Component {
  render() {
    return (
      <div id="main">
        <DashBoardContainer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
