import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import TopSpendingGraphs from "../components/TopSpendingGraphs.jsx";

Enzyme.configure({ adapter: new EnzymeAdapter() });
const graphinfo = {
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

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<TopSpendingGraphs {...props} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`);
};

test("should renders with out any error", () => {
  const wrapper = setup(graphinfo);
  const topSpendingGraphs = findByTestAttr(wrapper, "top-spending-graphs");
  expect(topSpendingGraphs.length).toBe(1);
});

test("should render 3 HorizontalBar graphs", () => {
  const wrapper = setup(graphinfo);
  const horizontalBar = findByTestAttr(wrapper, "horizontal-bars");
  expect(horizontalBar).toBeTruthy();
});
