const functions = require('@google-cloud/functions-framework');

// Register a CloudEvent callback with the Functions Framework that will
// be executed when the Pub/Sub trigger topic receives a message.
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const model = require('./User');
const {sequelize, User} = require('./database');

const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || '53952361e705a695f3abbd0a7f7474d9-f68a26c9-cb707263'});
const uuid = require('uuid');

functions.cloudEvent('helloPubSub', async (cloudEvent) => {


  const userData = JSON.parse(Buffer.from(cloudEvent.data.message.data, 'base64').toString());
  const userEmail = userData.username;
  const userId = userData.userId; // Assuming user ID is included in the message data
  const timestamp = Date.now();
  const verificationLink = `https://devikabodducsye6225.me.com/verify-auth??userId=${userId}`;

  
  try {
    const user = await User.findOne({ where: { username: userEmail } });
    if (user) {
        
        await user.updateDatabase({ emailSentTime: new Date() });
        console.log('Email sent to user:', userEmail);
    } else {
        console.log('User not found');
    }
      mg.messages.create('devikaboddu-csye6225.me', {
        from: "nscc@devikaboddu-csye6225.me",
        to: [userEmail],
        subject: "Verify Email",
        text: `Please verify your email address by clicking the following link: ${verificationLink}`,
        html: `<p>Please verify your email address by clicking the following link: <a href="${verificationLink}">${verificationLink}</a></p>`
      })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.log('Error processing message:', err)); // logs any error
    } catch (error) {
      console.error('Error processing message:', error);
  }
});
  




