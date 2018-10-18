import React from "react";
import { Link } from "react-router-dom";
import styled from "react-emotion";

//Styled Components
const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PWrapper = styled("p")`
  width: 75%;
`;

const FindWaysToSave = styled("button")`
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 8px;
  width: 150px;
  height: 40px;
`;

const HorizontalLine = styled("hr")`
  border: 2px solid rgba(178, 181, 186, 0.3);
  width: 75%;
`;

class GoblinAdvice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper data-test="goblin-advice">
        <HorizontalLine />
        <img src="../images/goblin.png" alt="goblinPicture" height="150" />
        <h2>Careful! Think twice about making this purchase</h2>
        <HorizontalLine />
        <PWrapper>
          Your cash flow is tight and your Debt to saving is right on the edge.
          You should aim to have at least $1.50 of savings and investment for
          every dollar of debt, if you can. I hate parting with money as it is,
          so think very carefully of how important this purchase is to you
          before making it!
        </PWrapper>
        <p>{`I have a better idea! Lets's...`} </p>
        <Link to="/top-spending">
          <FindWaysToSave>Find Ways to save!</FindWaysToSave>
        </Link>
      </Wrapper>
    );
  }
}

export default GoblinAdvice;
