const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const dotenv = require("dotenv");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
const request = require("request");
const models = require("../models/index");
const prettyPrintResponse = require("./helpers");
const client = require("./plaid"); //Plaid Client
const appRoutes = require("./routes/pocketgoblin.routes.js");
const ctrl = require("./controllers/pocketgoblin.controller.js");

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const APP_PORT = process.env.APP_PORT;
// TODO: Remove these 4 envars?
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
const PLAID_ENV = process.env.PLAID_ENV;
const AUTH0_API_TOKEN = process.env.AUTH0_API_TOKEN;

// PLAID API
// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;

// GRAPHQL API
// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    getUserInfo(userId: String!): String
    createItem(publicToken: String!, userId: String!): String
    cashFlow: Float
    totalDebt: Float
    totalSavings: Float
  }
`);

// RESOLVER FUNCTIONS
const asyncGetUserInfo = userId => {
  return new Promise((resolve, reject) => {
    asyncGetAuth0AccessToken().then(accessToken => {
      var options = {
        method: "GET",
        url: `https://pocketgoblin.auth0.com/api/v2/users/${userId}`,
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      };

      request(options, function(error, response, body) {
        if (error) {
          prettyPrintResponse(error);
          reject(error);
        }

        const parsedUserData = JSON.parse(body);

        models.User.findOrCreate({
          where: { sub: userId },
          defaults: { email: parsedUserData.email, name: parsedUserData.name }
        })
          .spread((user, created) => {
            const userData = JSON.stringify({
              id: user.dataValues.id,
              name: user.dataValues.name,
              email: user.dataValues.email,
              wasCreated: created
            });
            resolve(userData);
          })
          .catch(error => {
            prettyPrintResponse(error);
            reject(error);
          });
      });
    });
  });
};

const asyncGetAuth0AccessToken = () => {
  return new Promise((resolve, reject) => {
    var options = {
      method: "POST",
      url: "https://pocketgoblin.auth0.com/oauth/token",
      headers: { "content-type": "application/json" },
      body:
        '{"client_id":"yXXVi3Qx1AM7AmAyJbyG1FX1cZ0ZMkwA","client_secret":"a1hH-2BGwlDA6dIuricf5wIBNnpT_2_3O590co7GYKPSOR55G1Urct_W-V-cF4th","audience":"https://pocketgoblin.auth0.com/api/v2/","grant_type":"client_credentials"}'
    };

    request(options, function(error, response, body) {
      if (error) {
        prettyPrintResponse(error);
        reject(error);
      }
      console.log(
        "This is the Auth0 access token: ",
        JSON.parse(body).access_token
      );
      resolve(JSON.parse(body).access_token);
    });
  });
};

// Create Item
const asyncCreateItem = (publicToken, userId) => {
  return new Promise((resolve, reject) => {
    client.exchangePublicToken(publicToken, function(error, tokenResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        reject(error);
      }
      // TODO: Persist ACCESS_TOKEN and ITEM_ID in db
      ACCESS_TOKEN = tokenResponse.access_token;
      ITEM_ID = tokenResponse.item_id;
      prettyPrintResponse(tokenResponse);
      resolve(ctrl.saveItemData(ACCESS_TOKEN, ITEM_ID, userId));
    });
  });
};
// Cash Flow
const asyncGetCashFlow = () => {
  return new Promise((resolve, reject) => {
    models.Cashflow.findAll({
      attributes: ["user_id", "account_type", "year", "month", "sum"],
      where: {
        $and: [
          {
            user_id: {
              $ne: null
            }
          },
          {
            account_type: {
              $ne: null
            }
          }
        ]
      }
    })
      .then(cashFlowData => resolve(calculateCashFlow(cashFlowData)))
      .catch(error => reject(error));
  });
};

const calculateCashFlow = cashFlowData => {
  let depositoryTotal;
  let creditTotal;

  for (let elem of cashFlowData) {
    let isTotalData = elem.year === null;
    let isDepository = elem.account_type === "depository";
    let isCredit = elem.account_type === "credit";

    if (isTotalData && isDepository) {
      depositoryTotal = elem.sum;
    } else if (isTotalData && isCredit) {
      creditTotal = elem.sum;
    }
  }

  let cashFlow = depositoryTotal - creditTotal;

  return cashFlow;
};

// Total Debt
const asyncGetTotalDebt = () => {
  return new Promise((resolve, reject) => {
    models.Snapshot.findAll({
      attributes: ["users_id", "total_debt", "total_savings"]
    })
      .then(snapshotData => resolve(snapshotData[0].total_debt))
      .catch(error => reject(error));
  });
};

// Total Savings
const asyncGetTotalSavings = () => {
  return new Promise((resolve, reject) => {
    models.Snapshot.findAll({
      attributes: ["users_id", "total_debt", "total_savings"]
    })
      .then(snapshotData => resolve(snapshotData[0].total_savings))
      .catch(error => reject(error));
  });
};

// The root provides a resolver function for each API endpoint
let root = {
  getUserInfo: ({ userId }) => {
    return asyncGetUserInfo(userId);
  },
  createItem: ({ publicToken, userId }) => {
    return asyncCreateItem(publicToken);
  },
  cashFlow: () => {
    return asyncGetCashFlow();
  },
  totalDebt: () => {
    return asyncGetTotalDebt();
  },
  totalSavings: () => {
    return asyncGetTotalSavings();
  }
};
//END RESOLVER FUNCTIONS

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

//Pass in the app to our routes to mount.
appRoutes(app);

// //PLAID EXPRESS SERVER ENDPOINTS
// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
app.post("/get_access_token", function(request, response) {
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    // TODO: Persist ACCESS_TOKEN and ITEM_ID in db
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    prettyPrintResponse(tokenResponse);
    response.json(
      "Item successfully created: access_token and item_id have been received by the server"
    );
  });
});

// Create server
app.listen(APP_PORT, function() {
  console.log("PocketGoblin server listening on port " + APP_PORT);
});
