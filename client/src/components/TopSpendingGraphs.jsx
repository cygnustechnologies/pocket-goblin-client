import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import styled from "react-emotion";

//Styled Components
const Titles = styled("h1")`
  text-align: center;
`;

const GraphWrapper = styled("div")`
  height: 75%;
  width: 75%;
`;

const HorizontalLine = styled("hr")`
  border: 2px solid rgba(178, 181, 186, 0.3);
  width: 100%;
`;

const TitleOptionMenu = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const OptionMenu = styled("select")`
  height: 20px;
  margin-top: 30px;
`;

const TopSpendingGraphs = ({ recurring, categories, shop }) => {
  const barGraphColors = [
    "rgb(146, 66, 244)",
    "rgb(65, 86, 244)",
    "rgb(235, 244, 65)",
    "rgb(244, 65, 184)"
  ];

  const options = {
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  const recurringGraph = {
    labels: recurring.labels,
    datasets: [
      {
        label: "Top Recurring",
        backgroundColor: barGraphColors,
        data: recurring.data
      }
    ]
  };

  const categoriesGraph = {
    labels: categories.labels,
    datasets: [
      {
        label: "Top Categories",
        backgroundColor: barGraphColors,
        data: categories.data
      }
    ]
  };

  const shopGraph = {
    labels: shop.labels,
    datasets: [
      {
        label: "Top Shop",
        backgroundColor: barGraphColors,
        data: shop.data
      }
    ]
  };

  return (
    <GraphWrapper data-test="top-spending-graphs">
      <TitleOptionMenu>
        <Titles>Top Recurring </Titles>
        <OptionMenu>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </OptionMenu>
      </TitleOptionMenu>
      <HorizontalBar
        data={recurringGraph}
        options={options}
        data-type="horizontal-bars"
      />
      <p>
        Recurring expenses add up! Click on one to analyze how reducting it
        would help imporve your financial health.
      </p>
      <HorizontalLine />
      <TitleOptionMenu>
        <Titles>Top Categories </Titles>
        <OptionMenu>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </OptionMenu>
      </TitleOptionMenu>

      <HorizontalBar
        data={categoriesGraph}
        options={options}
        data-type="horizontal-bars"
      />
      <p>
        Category spending shows you genral trends. Most people can save tons of
        money be reducing the amount of money they spend at bars and
        restaurants.
      </p>
      <HorizontalLine />
      <TitleOptionMenu>
        <Titles>Top Shop </Titles>
        <OptionMenu>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </OptionMenu>
      </TitleOptionMenu>
      <HorizontalBar
        data={shopGraph}
        options={options}
        data-type="horizontal-bars"
      />
      <p>
        {`Watch out! That daily latte or impulsive Amazon purchase adds up! If you
        used that money to pay down debt or top up savings, you will be in far
        better shape! And let's be honest, I'll bet you wouldnt miss that shiny
        new gadget after a few months.`}
      </p>
    </GraphWrapper>
  );
};

export default TopSpendingGraphs;
