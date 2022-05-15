const { sendDm } = require("../modules/slack");
const config = require("../config");

module.exports = (app) => {
  app.post("/purchase", async (req, res) => {
    const { text, user_id } = req.body;
    // Message builder from slack API
    res.json({
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "Request Received!",
            emoji: true,
          },
        },

        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Thank you for your purchase request of *${text}*. We will let the manager know for the authorization process!`,
          },
        },
      ],
    });

    sendDm(
      config.ceoId,
      `Hi!, <@${user_id}> has requested a purchase of *${text}*`,
      [
        {
          text: "Do you authorize this purchase request?",
          callback_id: 'purchase_request',
          actions: [
            {
              name: "auth_button",
              text: "Yes, I approve!",
              type: "button",
              value: "approved",
              style: "primary",
            },
            {
              name: "auth_button",
              text: "No!",
              type: "button",
              value: "declined",
              style: "danger",
            },
          ],
        },
      ]
    );
  });
};
