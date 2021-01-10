const keys = require('../keys/index');

module.exports = function (email, token) {

    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Restoring password',
        html: `
            <h1> You forgot password </h1>
            <p> If no, please ignore this message </p>
            <p> Else follow this link: </p>
            <p><a href="${keys.BASE_URL}/auth/password/${token}"> Reset password </a></p>
            <hr />
        `
    }
}