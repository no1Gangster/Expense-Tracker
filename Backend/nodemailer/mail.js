const nodemailer = require("nodemailer");
const { google } = require("googleapis");
// const User = require("../model/user.model");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const clientId = process.env.clientId
const clientSec = process.env.clientSec
const refToken = process.env.refToken
const user = process.env.user

const OAuth2_client = new OAuth2(clientId, clientSec);
OAuth2_client.setCredentials({ refresh_token: refToken });

async function sendMail(userEmail, userBudget, totalDebit, startDate, endDate, balance) {
  try {
    const accessToken = await OAuth2_client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: user,
        clientId: clientId,
        clientSecret: clientSec,
        refreshToken: refToken,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "EXPENSE_TRACKER_APP💸<adyashap800@gmail.com>",
      to: userEmail,
      subject: "⚠️Budget Limit Exceeded⚠️",
      text:composeEmailContent(userBudget,totalDebit,startDate,endDate,balance),
    };

    const result = await transport.sendMail(mailOptions);
    console.log("Message Sent", result);
    transport.close();
  } catch (error) {
    console.log(error);
  }
}

async function call(userEmail, userBudget, totalDebit, startDate, endDate, balance) {
  try{
    console.log("called");
    await sendMail(userEmail, userBudget, totalDebit, startDate, endDate, balance);
  }catch(error){
    console.log("Error",error);
  }
}

function composeEmailContent(userBudget,totalDebit,startDate,endDate,balance){
  return `Dear User,
          Your budget limit has exceeded❗❗.Please review your expenses.
          You went over budget by Rs.${totalDebit-userBudget} on budget amount of Rs.${userBudget} set between ${startDate} and ${endDate}.
          Your current balance💲 is Rs.${balance}.
Sincerely,
The Expense Tracker Team`;
}

module.exports = call;