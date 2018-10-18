import React from "react";
import { Link } from "react-router-dom";
// import goblin from "../images/goblin.png";
import styled from "react-emotion";

//Styled Components
const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PWrapper = styled("p")`
  width: 45%;
`;

class GoblinAdvice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper data-test="goblin-advice">
        <img src="../images/goblin.png" alt="goblinPicture" height="150" />
        <h2>Careful! Think twice about making this purchase</h2>
        <PWrapper>
          Your cash flow is tight and your Debt to saving is right on the edge.
          You should aim to have at least $1.50 of savings and investment for
          every dollar of debt, if you can. I hate parting with money as it is,
          so think very carefully of how important this purchase is to you
          before making it!
        </PWrapper>
        <p>{`I have a better idea! Lets's...`} </p>
        <Link to="/top-spending">
          <button>Find Ways to save!</button>
        </Link>
      </Wrapper>
    );
  }
}

export default GoblinAdvice;
