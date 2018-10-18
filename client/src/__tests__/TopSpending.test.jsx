import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import TopSpending from "../components/TopSpending.jsx";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<TopSpending {...props} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`);
};

test("should renders with out any error", () => {
  const wrapper = setup();
  const topSpending = findByTestAttr(wrapper, "top-spending");
  expect(topSpending.length).toBe(1);
});

test("should render TopSpendingGraphs component", () => {
  const wrapper = setup();
  const topSpendingGraphs = findByTestAttr(wrapper, "top-spending-graphs");
  expect(topSpendingGraphs.length).toBe(1);
});
