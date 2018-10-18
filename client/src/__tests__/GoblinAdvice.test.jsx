import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import GoblinAdvice from "../components/GoblinAdvice.jsx";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<GoblinAdvice {...props} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`);
};

test("should renders GoblinAdvice with out any error", () => {
  const wrapper = setup();
  const goblinAdvice = findByTestAttr(wrapper, "goblin-advice");
  expect(goblinAdvice.length).toBe(1);
});
