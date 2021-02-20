import { GraphQLClient } from "graphql-request";
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
const mailer = require('../../utils/mailer')

const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT);
graphcms.setHeader('authorization', `Bearer ${process.env.BEARER_TOKEN}`)

export default async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(422).json({ msg: "Contact form missing one or more fields" });
    } else if (!isLength(name, { min: 3, max: 20 })) {
        return res.status(422).json({ msg: "Name must be between 3 and 20 characters" });
    } else if (!isEmail(email)) {
        return res.status(422).json({ msg: "The email is not valid" });
    } else if (!isLength(phone, { min: 10, max: 20 })) {
        return res.status(422).json({ msg: "Phone must at least 10 characters" });
    } else if (!isLength(message, { min: 5 })) {
        return res.status(422).json({ msg: "Message must be at least 5 characters" });
    }
    
    await graphcms.request(
        `
        mutation { createContactForm(data: {name: ${name}, email: ${email}, phone: ${phone}, message: ${message} }) {
          name
          email
          phone
          message
          }
        }
        `
      )

    // send some mail
    mailer.sendMail({
        from: 'admin@ohm.solutions',
        to: 'admin@ohm.solutions',
        subject: 'Message',
        text: 'I hope this message gets sent!'
    }, (err, info) => {
        console.log(info.envelope);
        console.log(info.messageId);
    });

    res.status(200).json({ msg: "Thank you for contacting us." })
}