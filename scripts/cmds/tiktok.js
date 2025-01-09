const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "tiktok",
    version: "1.0",
    author: "xnil6x",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Fetch TikTok video based on category."
    },
    longDescription: {
      en: "Downloads and sends a TikTok video based on the provided category."
    },
    category: "Entertainment",
    guide: {
      en: "{pn} <category>\n\nExample: /tiktok sad"
    }
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;
    const query = args.join(" ");

    if (!query) {
      return api.sendMessage("❌ Usage: {pn} <search text>", threadID, messageID);
    }

    let searchMessageID;

    api.sendMessage("Searching, please wait...", threadID, (err, messageInfo) => {
      searchMessageID = messageInfo.messageID;
    });

    try {
      const apiUrl = `https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl);
      const videos = response.data.data.videos;

      if (!videos || videos.length === 0) {
        return api.sendMessage(
          `❌ No TikTok videos found for category "${query}".`,
          threadID,
          messageID
        );
      }

      const randomIndex = Math.floor(Math.random() * videos.length);
      const videoData = videos[randomIndex];
      const videoUrl = videoData.wmplay;
      const videoTitle = videoData.title;

      api.sendMessage({
        body: `🎥 Title: ${videoTitle}`,
        attachment: await global.utils.getStreamFromURL(videoUrl)
      }, threadID, messageID);

      if (searchMessageID) {
        api.unsendMessage(searchMessageID);
      }

    } catch (error) {
      api.sendMessage("❌ An error occurred while processing the request.", threadID, messageID);

      if (searchMessageID) {
        api.unsendMessage(searchMessageID);
      }
    }
  }
};
