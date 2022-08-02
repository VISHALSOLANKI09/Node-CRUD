require("dotenv").config();
const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.EMAIL_API_KEY);

const sendMail = (to: any, from: any, subject: any, text: any) => {
    const msg = {
        to,
        from,
        subject,
        html: text
    }
    
    mail.send(msg, (err: any, result: any)=>{
        if(err) {
            console.log(err);
        } else {
            console.log("Email is sent");
        }
    })
}


module.exports = sendMail;