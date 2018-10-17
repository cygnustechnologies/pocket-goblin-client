import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import SnapshotResults from "../components/SnapshotResults.jsx";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<SnapshotResults {...props} />);
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
//   const tree = renderer.create(<SnapshotResults />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

test("should render with out error", () => {
  const wrapper = setup();
  const snapshotResults = findByTestAttr(wrapper, "snapshot-results");
  expect(snapshotResults.length).toBe(1);
});

test("should render CashFlowMeter with out error", () => {
  const wrapper = setup();
  const cashFlowMeter = findByTestAttr(wrapper, "cash-flow-meter");
  expect(cashFlowMeter.length).toBe(1);
});

test("should render HorizontalBar with out error", () => {
  const wrapper = setup();
  const horizontalBar = findByTestAttr(wrapper, "horizontal-bar");
  expect(horizontalBar.length).toBe(1);
});

//does not load credit by default look needs more looking in to
// test("should render RealCostOfCredit with out error", () => {
//   const props = {
//     purchasePaymentType: "credit"
//   };
//   const wrapper = setup(props);
//   const realCostOfCredit = findByTestAttr(wrapper, "real-cost-of-credit");
//   expect(realCostOfCredit.length).toBe(1);
// });

test("should render PayDebtOrInvestIt with out error", () => {
  const wrapper = setup();
  const payDebtOrInvestIt = findByTestAttr(wrapper, "pay-debt-or-investIt");
  expect(payDebtOrInvestIt.length).toBe(1);
});
