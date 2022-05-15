const { sendDm } = require("../modules/slack");
const config = require("../config");

module.exports = (app) => {
  app.post("/action", async (req, res) => {
    const interractiveMessage = JSON.parse(req.body.payload);
    // console.log(interractiveMessage);
    const requestApproved = interractiveMessage.actions[0].value === "approved";
    const originalMessage = interractiveMessage.original_message.text;

    //Sending feedback to the manager on their decision
    res.json({
      text: originalMessage,
      attachments: [
        {
          text: requestApproved
            ? "You approved this purchase request"
            : "You denied this purchase request",
        },
      ],
    });

    // Send the feedback to the requester on the decision
    const user_id = interractiveMessage.user.id;
    const matches = originalMessage.match(/@(.+)>.+\*(.+)\*/);
    sendDm(
      matches[1],
      `Hi! Your purchase request for ${matches[2]} was ${
        requestApproved ? "approved" : "denided"
      }`
    );
  });
};
