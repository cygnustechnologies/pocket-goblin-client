import React from "react";
import { Link } from "react-router-dom";
import styled from "react-emotion";
import TopSpendingGraphs from "./TopSpendingGraphs.jsx";

//Styled Components
const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StartTheGoblin = styled("button")`
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 8px;
  width: 175px;
  height: 50px;
  padding: 2px;
`;

const HorizontalLine = styled("hr")`
  border: 2px solid rgba(178, 181, 186, 0.3);
  width: 75%;
`;

class TopSpending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recurring: {
        labels: ["Gym Membership", "Wine Culb", "Cool Magazing", "Netflix"],
        data: [58, 42, 29, 20]
      },
      categories: {
        labels: ["Rent", "Car Payment", "Groceries", "Dining Out"],
        data: [300, 263, 164, 75]
      },
      shop: {
        labels: ["Amazon", "Starbucks", "My Dive Bar", "McDonalds"],
        data: [58, 42, 29, 20]
      }
    };
  }

  render() {
    const { recurring, categories, shop } = this.state;

    return (
      <Wrapper data-test="top-spending">
        <HorizontalLine />
        <h1>Spending Breakdown</h1>
        <HorizontalLine />
        <TopSpendingGraphs
          data-test="top-spending-graphs"
          recurring={recurring}
          categories={categories}
          shop={shop}
        />
        <Link to="/enter-purchase">
          <StartTheGoblin>Start the Goblin without selection</StartTheGoblin>
        </Link>
      </Wrapper>
    );
  }
}

export default TopSpending;
