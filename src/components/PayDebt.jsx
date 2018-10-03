import React from "react";

class DebtFreeBy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { debtFree } = this.props;
    return (
      <div style={{ paddingTop: "10px" }}>
        Be Debt-Free Faster by {debtFree} months
      </div>
    );
  }
}

export default DebtFreeBy;
