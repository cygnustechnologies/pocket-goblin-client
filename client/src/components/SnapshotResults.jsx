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

const HrWithWidth = styled("hr")`
  border: 1px solid rgba(128, 128, 128, 0.1);
  width: 50%;
`;

const PayDebtInvestItOption = styled("button")`
  background-color: rgb(163, 209, 167);
`;

const CashFlowMeterDiv = styled("div")`
  margin: 5%;
  display: flex;
  flex-direction: row;
`;

const CashFlowHeader = styled("h2")`
  margin-right: 30px;
`;

const WhatWouldTheGoblinDo = styled("button")`
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 8px;
  width: 180px;
  height: 40px;
  padding: 4px;
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
        <HrWithWidth />
        <InputAmount
          data-test="input-amount"
          handlePurchaseInput={handlePurchaseInput}
          purchaseAmount={purchaseAmount}
        />
        <HrWithWidth />
        <h2>What if you spend the money...</h2>
        <CashFlowMeterDiv>
          <CashFlowHeader>Cash Flow</CashFlowHeader>
          <CashFlowMeter
            data-test="cash-flow-meter"
            currentCashFlowAmount={currentCashFlowAmount}
            purchaseAmount={purchaseAmount}
          />
        </CashFlowMeterDiv>
        <div>
          <HorizontalBar
            data-test="horizontal-bar"
            data={DebtSavingGraph}
            options={DebtSavingGraphOptions}
          />
        </div>
        <HrWithWidth />
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
            <div>
              <h2>Or, what if you instead...</h2>
              <PayDebtInvestItOption
                value="debt"
                onClick={this.handlePayDebtOrInvestSelection}
              >
                Pay Debt
              </PayDebtInvestItOption>
              <PayDebtInvestItOption
                value="invest"
                onClick={this.handlePayDebtOrInvestSelection}
              >
                Invest it
              </PayDebtInvestItOption>

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
          <WhatWouldTheGoblinDo>What Would the Goblin Do?</WhatWouldTheGoblinDo>
        </Link>
      </Wrapper>
    );
  }
}

export default SnapshotResults;
