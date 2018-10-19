import React from "react";
import styled from "react-emotion";

const ColorSpan = styled("span")`
  color: red;
  margin-left: 15px;
`;

const PayDebtRecurring = props => {
  return (
    <div>
      <h4>
        Be Debt-Free Faster by{" "}
        <ColorSpan>{props.debtFreeFasterBy} months</ColorSpan>{" "}
      </h4>
      <h4>
        Save interest of <ColorSpan>${props.interestSavedAmount}</ColorSpan>
      </h4>
      <h4>
        {`Total You'll Save`} <ColorSpan>${props.totalSavedAmount}</ColorSpan>
      </h4>
      <p>
        {`If you choose to pay down debt with the $${props.purchaseAmount}
            rather than spend it every month, you could save $${
              props.interestSavedAmount
            } in interest payments and reduce the time it would take you to get out
            of debt by ${
              props.debtFreeFasterBy
            } months. So the question you should ask
            yourself is: "Is spending $${props.purchaseAmount} every month worth
            giving up ${props.totalSavedAmount} tomorrow?"`}
      </p>
    </div>
  );
};

export default PayDebtRecurring;
