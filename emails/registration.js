const keys = require('../keys/index');

// email configuration object, need for email transporter
module.exports = function (email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Registration was successful',
        html: `
            <h1> Welcome to our shop </h1>
            <p> Your registration was successful with email ${email}</p>
            <hr />
            <a href="${keys.BASE_URL}"> Courses Shop </a>
        `
    }
}