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

const CashFlowHeader = styled("h2")`
  margin-right: 30px;
`;

const PayInCash = styled("input")`
  margin-left: 30px;
`;

const Hr = styled("hr")`
  border: 1px solid rgba(128, 128, 128, 0.1);
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
        <Hr />
        <h1>Purchase Amount</h1>
        <Hr />
        <InputAmount
          data-test="input-amount"
          handlePurchaseInput={handlePurchaseInput}
          purchaseAmount={purchaseAmount}
        />
        <CashFlowMeterDiv>
          <CashFlowHeader>Cash Flow</CashFlowHeader>
          <CashFlowMeter
            data-test="cash-flow-meter"
            currentCashFlowAmount={currentCashFlowAmount}
            purchaseAmount={purchaseAmount}
          />
        </CashFlowMeterDiv>
        <Hr />
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
        <Hr />
        <CashCreditOption>
          <input
            name="paymentType"
            type="radio"
            value="cash"
            checked={purchasePaymentType === "cash"}
            onChange={handlePaymentTypeChange}
          />
          Pay in Cash
          <PayInCash
            name="paymentType"
            type="radio"
            value="credit"
            checked={purchasePaymentType === "credit"}
            onChange={handlePaymentTypeChange}
          />
          Pay with Credit
        </CashCreditOption>
        <Hr />
        <Link to="/snapshot-results">
          <StartTheGoblin>Start the Goblin!</StartTheGoblin>
        </Link>
      </Wrapper>
    );
  }
}

export default EnterPurchase;
