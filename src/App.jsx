import React from "react";
import ReactDOM from "react-dom";
import Container from "./components/Container";
import FinancialSnapShot from "./components/FinancialSnapShot";

class App extends React.Component {
  render() {
    return (
      <div id="main">
        <FinancialSnapShot />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
