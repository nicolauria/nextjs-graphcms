let nodemailer = require('nodemailer');
let AWS = require('aws-sdk');

// configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'us-west-2',
});

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
SES: new AWS.SES({
  apiVersion: '2010-12-01'
})
});

module.exports = transporter;