const INVITE_USER_REGISTRATION_LINK =
  'https://initiators-ua.herokuapp.com/accounts';

export const INVITE_USER_EMAIL_HTML = (email: string, password: string) =>
  `<div><h1>We are pleased to invite you to our team.</h1><p>Continue registration with yours email: <b>${email}</b> and password: <b>${password}</b>.</p>Follow <a href=${INVITE_USER_REGISTRATION_LINK}>link to registration</a></div>`;
