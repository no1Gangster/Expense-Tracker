const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();
const User = require("../model/user.model")
const fs = require('fs')

const clientId = process.env.clientId
const clientSec = process.env.clientSec
const refToken = process.env.refToken
const user = process.env.user


const OAuth2_client = new OAuth2(clientId, clientSec);
OAuth2_client.setCredentials({ refresh_token: refToken });

//Generates a random 6 digit otp
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
}

async function sendOtpMail(userEmail){
    try{
        const otp = generateOtp()
        saveOTP(userEmail, otp)

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

        const otpEmailContent = `Your OTP for email verification is ${otp}`;
        const otpEmailOptions = {
            from: "EXPENSE_TRACKER_APP💸<adyashap800@gmail.com>",
            to: userEmail,
            subject: "OTP based Email Verification",
            text: otpEmailContent,
        };

        const otpResult = await transport.sendMail(otpEmailOptions)
        console.log("OTP message sent",otpResult);

        transport.close()

        return otp
    }
    catch(error){
        console.log(error);
    }
}

//saves the otp generated in a text file format-email:otp
function saveOTP(userEmail, otp){
    const data = `${userEmail}:${otp}`
    fs.writeFileSync('otp.txt',data)
}

//Obtains stored otp from otp.txt for comparison 
function getOTP(userEmail){
    const data = fs.readFileSync('otp.txt','utf8')
    const lines = data.split('\n')
    for(let line in lines){
        const storedEmail = lines[0].split(':')[0];
        const storedOTP = lines[0].split(':')[1].trim()
        if(userEmail === storedEmail){
            return storedOTP
        }
    }
    return null
}

module.exports = {
    sendOtpMail,
    getOTP
}