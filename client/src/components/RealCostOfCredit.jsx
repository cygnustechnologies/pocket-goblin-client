import React from "react";
import styled from "react-emotion";

const ColorSpan = styled("span")`
  color: red;
  margin-left: 15px;
`;

class RealCostOfCredit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      monthsToPayOff: 6,
      APR: 0.1671
    };
  }

  calculateNonRecurringInterest = () => {
    const monthlyInterest = this.state.APR / 12;
    const interest =
      monthlyInterest * this.props.purchaseAmount * this.state.monthsToPayOff;

    return Number(interest.toFixed(2));
  };

  render() {
    const { purchaseFrequency, purchaseAmount } = this.props;

    const { monthsToPayOff } = this.state;

    //Non-Recurring Amounts Calculations
    const nonRecurringInterest = this.calculateNonRecurringInterest();
    const totalCostOfDebt = Number(
      (purchaseAmount + nonRecurringInterest).toFixed(2)
    );

    //Recurring Amounts Calculations
    const totalYearlyPayments = purchaseAmount * 12;
    const totalYearlyInterest = purchaseAmount * this.state.APR * 12;
    const totalYearlyCost = totalYearlyPayments + totalYearlyInterest;

    const title = <h3>The Real Cost of Putting it on Credit</h3>;

    if (purchaseFrequency === "never") {
      return (
        <div>
          {title}
          <h4>
            Time to Pay Off: <ColorSpan>{monthsToPayOff} months</ColorSpan>
          </h4>
          <h4>
            {`Interest You'll Pay`}:{" "}
            <ColorSpan>${nonRecurringInterest}</ColorSpan>
          </h4>
          <h4>
            Total Cost after Paying it off:{" "}
            <ColorSpan>${totalCostOfDebt}</ColorSpan>
          </h4>
          <p>
            {`Based on your current spending pattern, you should pay this off after ${monthsToPayOff} months. 
            You will pay $${nonRecurringInterest} in interest alone! The total cost of making this purchase 
            for you will be $${totalCostOfDebt}. Are you sure you want to pay an extra $${nonRecurringInterest} to purchase now rather than waiting ${monthsToPayOff} more months?`}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          {title}
          <h4>
            Total Amount of Payments per year{" "}
            <ColorSpan>${totalYearlyPayments}</ColorSpan>
          </h4>
          <h4>
            {`Interest You'll Pay Per Year:`}{" "}
            <ColorSpan>${totalYearlyInterest}</ColorSpan>
          </h4>
          <h4>
            Total Amount you will pay per year:{" "}
            <ColorSpan>${totalYearlyCost}</ColorSpan>
          </h4>
          <p>
            {`Based on your current spending pattern, it will take you
            ${monthsToPayOff} months to pay off every payment you
            put on credit. You will pay $${totalYearlyInterest} in interest 
            alone every single year! That's a lot of hard-earned money!`}
          </p>
        </div>
      );
    }
  }
}

export default RealCostOfCredit;
