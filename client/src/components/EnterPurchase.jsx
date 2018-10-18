import React from "react";
import { Link } from "react-router-dom";
import styled from "react-emotion";
import InputAmount from "./InputAmount.jsx";
import CashFlowMeter from "./CashFlowMeter.jsx";

//Styled Components
const Wrapper = styled("div")`
  display: flex;
  max-width: 750px;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CashCreditOption = styled("div")`
  display: flex;
  margin: 2%;
  margin-bottom: 5%;
`;

const RepeatPurchaseFrequencySelecterDiv = styled("div")`
  margin: 5%;
  margin-left: 2%;
`;

const RepeatPurchaseFrequencySelecterOption = styled("select")`
  margin-left: 30px;
`;

const StartTheGoblin = styled("button")`
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 8px;
  width: 150px;
  height: 40px;
`;

const CashFlowMeterDiv = styled("div")`
  margin: 5%;
  display: flex;
  flex-direction: row;
`;

const PayInCashSpacing = styled("input")`
  margin-left: 30px;
`;

const HorizontalLine = styled("hr")`
  border: 2px solid rgba(178, 181, 186, 0.3);
  width: 70%;
`;

class EnterPurchase extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handlePurchaseInput,
      currentCashFlowAmount,
      purchaseFrequency,
      handlePurchaseFrequencyChange,
      purchasePaymentType,
      purchaseAmount,
      handlePaymentTypeChange
    } = this.props;

    return (
      <Wrapper data-test="enter-purchase">
        <HorizontalLine />
        <h1>Purchase Amount</h1>
        <HorizontalLine />
        <InputAmount
          data-test="input-amount"
          handlePurchaseInput={handlePurchaseInput}
          purchaseAmount={purchaseAmount}
        />
        <CashFlowMeterDiv>
          <h2 style={{ marginRight: "30px" }}>Cash Flow</h2>
          <CashFlowMeter
            data-test="cash-flow-meter"
            currentCashFlowAmount={currentCashFlowAmount}
            purchaseAmount={purchaseAmount}
          />
        </CashFlowMeterDiv>
        <HorizontalLine />
        <RepeatPurchaseFrequencySelecterDiv>
          Repeat:
          <RepeatPurchaseFrequencySelecterOption
            value={purchaseFrequency}
            onBlur={handlePurchaseFrequencyChange}
            onChange={handlePurchaseFrequencyChange}
          >
            <option value="never">Never</option>
            <option value="monthly">Monthly</option>
          </RepeatPurchaseFrequencySelecterOption>
        </RepeatPurchaseFrequencySelecterDiv>
        <HorizontalLine />
        <CashCreditOption>
          <input
            name="paymentType"
            type="radio"
            value="cash"
            checked={purchasePaymentType === "cash"}
            onChange={handlePaymentTypeChange}
          />
          Pay in Cash
          <PayInCashSpacing
            name="paymentType"
            type="radio"
            value="credit"
            checked={purchasePaymentType === "credit"}
            onChange={handlePaymentTypeChange}
          />
          Pay with Credit
        </CashCreditOption>
        <HorizontalLine />
        <Link to="/snapshot-results">
          <StartTheGoblin>Start the Goblin!</StartTheGoblin>
        </Link>
      </Wrapper>
    );
  }
}

export default EnterPurchase;
