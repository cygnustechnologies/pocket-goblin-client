import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import styled from "react-emotion";
import CashFlowMeter from "./CashFlowMeter.jsx";
import InputAmount from "./InputAmount.jsx";
import RealCostOfCredit from "./RealCostOfCredit.jsx";
import PayDebtOrInvestIt from "./PayDebtOrInvestIt.jsx";

//Styled Components
const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const WhatIfContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 90%;
  @media (min-width: 750px) {
    width: 60%;
  }
`;

const Hr = styled("hr")`
  border: 1px solid rgba(128, 128, 128, 0.1);
  width: ${props => (props.width ? props.width : "100%")};
`;

class SnapshotResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payDebtOrInvestItSelection: "invest",
      debtFreeFasterBy: 5,
      interestSavedAmount: 876,
      totalSavedAmount: 3276,
      rateOfReturn: 0.1,
      investmentTimeline: 20
    };
  }

  handlePayDebtOrInvestSelection = event => {
    this.setState({ payDebtOrInvestItSelection: event.target.value });
  };

  DebtGraphColorPicker(num) {
    if (num > 0.6) {
      return "red";
    } else if (num > 0.4) {
      return "yellow";
    }
    return "green";
  }

  savingGraphColorPicker(num) {
    if (num < 100) {
      return "red";
    } else if (num < 300) {
      return "yellow";
    }
    return "green";
  }

  render() {
    const {
      handlePurchaseInput,
      currentCashFlowAmount,
      totalSavingAmount,
      totalDebtAmount,
      purchaseFrequency,
      purchaseAmount,
      purchasePaymentType
    } = this.props;

    const DebtSavingGraph = {
      labels: ["Total Debt", "Total Savings"],
      datasets: [
        {
          data: [totalDebtAmount, totalSavingAmount],
          backgroundColor: [
            this.DebtGraphColorPicker(totalDebtAmount / totalSavingAmount),
            this.savingGraphColorPicker(totalSavingAmount)
          ]
        }
      ]
    };

    const DebtSavingGraphOptions = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            display: false,
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };

    return (
      <Wrapper data-test="snapshot-results">
        <h1>Tap to Modify</h1>
        <Hr width="50%" />
        <InputAmount
          data-test="input-amount"
          handlePurchaseInput={handlePurchaseInput}
          purchaseAmount={purchaseAmount}
        />
        <Hr width="50%" />
        <h2>What if you spend the money...</h2>
        <div style={{ margin: "0" }}>
          <h3>Cash Flow</h3>
          <CashFlowMeter
            data-test="cash-flow-meter"
            currentCashFlowAmount={currentCashFlowAmount}
            purchaseAmount={purchaseAmount}
          />
        </div>
        <div style={{ margin: "10px 0" }}>
          <HorizontalBar
            data-test="horizontal-bar"
            data={DebtSavingGraph}
            options={DebtSavingGraphOptions}
            style={{ width: "60%", height: "100%" }}
          />
        </div>
        <Hr width="50%" />
        <WhatIfContainer>
          <div>
            {purchasePaymentType === "credit" ? (
              <RealCostOfCredit
                data-type="real-cost-of-credit"
                purchaseFrequency={purchaseFrequency}
                purchaseAmount={purchaseAmount}
              />
            ) : null}
            <Hr />
            <div style={{ textAlign: "center" }}>
              <h2>Or, what if you instead...</h2>
              <button
                value="debt"
                onClick={this.handlePayDebtOrInvestSelection}
              >
                Pay Debt
              </button>
              <button
                value="invest"
                onClick={this.handlePayDebtOrInvestSelection}
              >
                Invest it
              </button>

              <PayDebtOrInvestIt
                data-test="pay-debt-or-investIt"
                debtFreeFasterBy={this.state.debtFreeFasterBy}
                interestSavedAmount={this.state.interestSavedAmount}
                totalSavedAmount={this.state.totalSavedAmount}
                purchaseAmount={this.props.purchaseAmount}
                purchaseFrequency={this.props.purchaseFrequency}
                payDebtOrInvestItSelection={
                  this.state.payDebtOrInvestItSelection
                }
                investmentTimeline={this.state.investmentTimeline}
                rateOfReturn={this.state.rateOfReturn}
              />
            </div>
          </div>
        </WhatIfContainer>
        <Link to="/goblin-advice">
          <button>What Would the Goblin Do?</button>
        </Link>
      </Wrapper>
    );
  }
}

export default SnapshotResults;
