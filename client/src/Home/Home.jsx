import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "react-emotion";
import LinkItems from "../components/LinkItems.jsx";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

class Home extends Component {
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Wrapper className="container">
        {isAuthenticated() && (
          <Wrapper>
            <LinkItems />
            <Link to="/enter-purchase">
              <button>Enter a Purchase</button>
            </Link>
          </Wrapper>
        )}
        {!isAuthenticated() && (
          <h4>
            You are not logged in! Please{" "}
            <a style={{ cursor: "pointer" }} onClick={this.login.bind(this)}>
              Log In
            </a>{" "}
            to continue.
          </h4>
        )}
      </Wrapper>
    );
  }
}

export default Home;
