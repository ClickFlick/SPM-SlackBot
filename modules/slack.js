const axios = require("axios");
const config = require("../config");

const sendDm = async (userId, message, attachments) => {
  try {
    const converstionResponse = await axios.post(
      "https://slack.com/api/conversations.open",
      {
        users: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${config.botToken}`,
        },
      }
    );

    const postResponse = await axios.post(
        "https://slack.com/api/chat.postMessage",
        {
          channel: converstionResponse.data.channel.id,
          text: message,
          attachments: JSON.stringify(attachments)
        },
        {
          headers: {
            Authorization: `Bearer ${config.botToken}`,
          },
        }
      );
    // console.log(postResponse);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendDm,
};
