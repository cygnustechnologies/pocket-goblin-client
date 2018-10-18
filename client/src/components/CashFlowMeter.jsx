import React from "react";
import styled from "react-emotion";

//Styled Components
const StopLightBottonSpacing = styled("div")`
  marginbottom: 2%;
`;

const CashFlowMeter = props => {
  let redCircle = {
    height: "50px",
    width: "50px",
    backgroundColor: "rgba(255, 0, 0, 0.3)",
    borderRadius: "50%",
    display: "inline-block"
  };

  let yellowCircle = {
    height: "50px",
    width: "50px",
    backgroundColor: "rgba(255, 255, 0, 0.3)",
    borderRadius: "50%",
    display: "inline-block"
  };

  let greenCircle = {
    height: "50px",
    width: "50px",
    backgroundColor: "rgba(0, 255, 0, 0.3)",
    borderRadius: "50%",
    display: "inline-block"
  };

  const lights = (
    <div>
      <span style={redCircle} />
      <span style={yellowCircle} />
      <span style={greenCircle} />
    </div>
  );

  const stopLight = amount => {
    if (amount < 100) {
      redCircle.backgroundColor = "rgba(255, 0,0, 1)";
      return lights;
    } else if (amount < 300) {
      yellowCircle.backgroundColor = "rgba(255, 255, 0, 1)";
      return lights;
    } else {
      greenCircle.backgroundColor = "rgba(0, 255, 0, 1)";
      return lights;
    }
  };

  return (
    <StopLightBottonSpacing>
      {stopLight(props.currentCashFlowAmount - props.purchaseAmount)}
    </StopLightBottonSpacing>
  );
};

export default CashFlowMeter;
