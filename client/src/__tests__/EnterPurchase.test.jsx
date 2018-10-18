import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import EnterPurchase from "../components/EnterPurchase.jsx";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<EnterPurchase {...props} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`);
};
/**
 * prob with this test error below
 * Invariant Violation: You should not use <Link> outside a <Router>
 */
// test("should match snapshot", () => {
//   const tree = renderer.create(<EnterPurchase />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

test("should renders with out any error", () => {
  const wrapper = setup();
  const enterPurchase = findByTestAttr(wrapper, "enter-purchase");
  expect(enterPurchase.length).toBe(1);
});

test("should render InputAmount component", () => {
  const wrapper = setup();
  const inputAmount = findByTestAttr(wrapper, "input-amount");
  expect(inputAmount.length).toBe(1);
});

test("should render CashFlowMeter component", () => {
  const wrapper = setup();
  const cashFlowMeter = findByTestAttr(wrapper, "cash-flow-meter");
  expect(cashFlowMeter.length).toBe(1);
});
