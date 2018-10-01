import React from "react";
import ReactDOM from "react-dom";
import Container from "./components/Container";
class App extends React.Component {
  render() {
    return (
      <div id="main">
        <Container />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
