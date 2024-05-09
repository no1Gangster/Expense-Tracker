const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const clientId = process.env.clientId
const clientSec = process.env.clientSec
const refToken = process.env.refToken
const user = process.env.user

const OAuth2_client = new OAuth2(clientId, clientSec);
OAuth2_client.setCredentials({ refresh_token: refToken });

async function sendMail(userEmail, userBudget, totalDebit, startDate, endDate, balance, budgetStatus) {
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
      }
    });

    const {subject, text} = composeEmailContent(userBudget, totalDebit, startDate, endDate, balance, budgetStatus);
    const mailOptions = {
      from: "EXPENSE_TRACKER_APP💸<adyashap800@gmail.com>",
      to: userEmail,
      subject: subject,
      text:text,
    };

    const result = await transport.sendMail(mailOptions);
    console.log("Message Sent", result);
    transport.close();
  } catch (error) {
    console.log(error);
  }
}

async function call(userEmail, userBudget, totalDebit, startDate, endDate, balance,budgetStatus) {
  try{
    console.log("called");
    await sendMail(userEmail, userBudget, totalDebit, startDate, endDate, balance,budgetStatus);
  }catch(error){
    console.log("Error",error);
  }
}

function composeEmailContent(userBudget,totalDebit,startDate,endDate,balance,budgetStatus){

  let subject =""
  let text=""

  if (budgetStatus.includes("50%")) {
    subject = "⚠️ 50% Budget Limit Reached ⚠️";
    text = `Dear User,
      You have reached over 50% of your budget limit❗. Please review your expenses.
      You have spent Rs.${totalDebit} out of budget amount of Rs.${userBudget} set between ${startDate} and ${endDate}.
      You are Rs.${userBudget-totalDebit} away from over spending.
      Your current balance💲 is Rs.${balance}.
Sincerely,
The Expense Tracker Team`;
  }
  else if (budgetStatus.includes("90%")) {
    subject = "⚠️ 90% Budget Limit Reached ⚠️";
    text = `Dear User,
      You have spent over 90% of your budget amount❗. Please review your expenses.
      You have spent Rs.${totalDebit} out of budget amount of Rs.${userBudget} set between ${startDate} and ${endDate}.
      You are Rs.${userBudget-totalDebit} away from over spending.
      Your current balance💲 is Rs.${balance}.
Sincerely,
The Expense Tracker Team`;
  }
  else if(budgetStatus.includes("Exceeded")){
    subject = "⚠️ Budget Limit Exceeded ⚠️";
    text = `Dear User,
      Your budget limit has exceeded❗❗.Please review your expenses.
      You went over budget by Rs.${totalDebit - userBudget} on a budget amount of Rs.${userBudget} set between ${startDate} and ${endDate}.
      Your current balance💲 is Rs.${balance}.
Sincerely,
The Expense Tracker Team`;
  }

  return {subject, text}
}

module.exports = call;