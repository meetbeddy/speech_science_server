require("dotenv").config();
module.exports = () => {
  const emailConfig = {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.DOMAIN,
  };
  return emailConfig;
};
