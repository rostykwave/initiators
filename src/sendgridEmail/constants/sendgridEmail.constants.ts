export const INVITE_USER_EMAIL_HTML = (
  email: string,
  password: string,
  registrationLink: string,
) =>
  `<div><h1>We are pleased to invite you to our team.</h1><p>Continue registration with yours email: <b>${email}</b> and password: <b>${password}</b>.</p>Follow <a href=${registrationLink}>link to registration</a></div>`;

export const RESET_PASSWORD_HTML = (
  email: string,
  password: string,
  resetPasswordLink: string,
) =>
  `<div><h1>Reset password Incora Booking App</h1><p>Continue resetting your password with yours email: <b>${email}</b> and confirmation code: <b>${password}</b>.</p>Follow <a href=${resetPasswordLink}>link</a></div>`;
