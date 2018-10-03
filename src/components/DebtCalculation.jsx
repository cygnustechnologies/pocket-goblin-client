import React from "react";
import PayOff from "./PayOff";
import InterestPayed from "./InterestPayed";
import TotalCost from "./TotalCost";
import DebtMessage from "./DebtMessage";
import InvestOption from "./InvestOption";

const divStyle = {
  // border: "5px solid yellow",
  padding: "5px",
  marginTop: "5px",
  marginBottom: "15px",
  textAlign: "center"
};

class DebtCalculation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payOffTime: 2,
      totalInterest: 3,
      totalCost: 4
    };
  }

  render() {
    const { payOffTime, totalInterest, totalCost } = this.state;

    return (
      <div style={divStyle}>
        <h3>The real cost of putting it on Credit</h3>
        <PayOff payoff={payOffTime} />
        <InterestPayed interest={totalInterest} />
        <TotalCost cost={totalCost} />
        <DebtMessage
          payoff={payOffTime}
          interest={totalInterest}
          cost={totalCost}
        />
        <InvestOption />
      </div>
    );
  }
}

export default DebtCalculation;
