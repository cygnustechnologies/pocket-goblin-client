import React from "react";

class RealCostOfCredit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalRecurringYearlyPaymentAmount: 5664,
      totalRecurringYearlyInterestAmount: 782,
      totalRecurringYearlyCostAmount: 6446,
      monthsToPayOff: 7,
      interestYoullPay: 65.14
    };
  }

  render() {
    const { purchaseFrequency, purchaseAmount, debtFreeFasterBy } = this.props;

    const {
      monthsToPayOff,
      interestYoullPay,
      totalRecurringYearlyPaymentAmount,
      totalRecurringYearlyInterestAmount,
      totalRecurringYearlyCostAmount
    } = this.state;

    const title = <h3>The Real Cost of Putting it on Credit</h3>;

    if (purchaseFrequency === "never") {
      return (
        <div>
          {title}
          <h4>{`Time to Pay Off ${monthsToPayOff} months`}</h4>
          <h4>{`Interest You'll Pay $${interestYoullPay}`}</h4>
          <h4>
            Total Cost after Paying it off ${purchaseAmount + interestYoullPay}
          </h4>
          <p>
            {`Based on your current spending pattern, you should pay this off after ${monthsToPayOff}. 
            You will pay $${interestYoullPay} in interest alone! The total cost of making this purchase 
            for you will be $${purchaseAmount + interestYoullPay}`}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          {title}
          <h4>
            Total Amount of Payments per year $
            {totalRecurringYearlyPaymentAmount}
          </h4>
          <h4>
            {`Interest You'll Pay Per Year $
      ${totalRecurringYearlyInterestAmount}`}
          </h4>
          <h4>
            Total Amount of Payments per year ${totalRecurringYearlyCostAmount}
          </h4>
          <p>
            {`Based on your current spending pattern, it will take you
            ${debtFreeFasterBy} months to pay off every payment you
            put on credit.You will pay $${totalRecurringYearlyPaymentAmount} in interest 
            alone every single year! Thats's a big chunk of change to pay out in interest!`}
          </p>
        </div>
      );
    }
  }
}

export default RealCostOfCredit;
