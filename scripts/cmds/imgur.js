let axios = require("axios");
module.exports = {
  config: {
    name: "imgur",
    aliases: ["imagegur"],
    version: "1.0",
    author: "otiney",
    prefix: false, // Command works without a prefix
    countDown: 0,
    role: 0,
    shortDescription: "Upload any images to the Imgur server.",
    longDescription: "Upload any images to the Imgur server.",
    category: "utility",
    guide: "{pn} [reply to an image or provide an image link]"
  },

  onStart: async function ({ api, event, args }) {
    try {
      // Get the image link from the message or the replied message
      let linkanh = event.messageReply?.attachments?.[0]?.url || args.join(" ");
      if (!linkanh) {
        return api.sendMessage(
          "Please reply to an image or provide an image link!",
          event.threadID,
          event.messageID
        );
      }

      // Call the API to upload the image
      let res = await axios.get(
        `https://API-Web.miraiofficials123.repl.co/imgur?link=${encodeURIComponent(linkanh)}&apikey=18102004`
      );

      // Get the response data
      let img = res.data.data;
      return api.sendMessage(img, event.threadID, event.messageID);
    } catch (err) {
      console.error(err);
      return api.sendMessage(
        "An error occurred while uploading the image. Please try again later.",
        event.threadID,
        event.messageID
      );
    }
  }
};