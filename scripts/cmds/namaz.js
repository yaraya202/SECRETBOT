const axios = require("axios");

module.exports = {
  config: {
    name: "namaz",
    version: "1.0.0",
    author: "xnil6x",
    role: 0,
  },

  onStart: async function ({ api, event, args }) {
    const city = args.join(" ");
    if (!city) {
      return api.sendMessage(
        "⚠️ Please provide a city name to fetch the prayer schedule. Example: namaz Dhaka",
        event.threadID,
        event.messageID
      );
    }
    
    try {
      const response = await axios.get(
        `https://xnilnew404.onrender.com/xnil/namaz?city=${encodeURIComponent(city)}&country=Bangladesh`
      );
      
      const res = response.data;
      
      const message = `
╭─━━❰ 🌙 Prayer Schedule ❱━━─╮
  
📅 Date: ${res.date}
📍 Location: ${res.city}, ${res.country.trim()}

🕌 Fajr:      ${res.timings.Fajr}
🕌 Dhuhr:     ${res.timings.Dhuhr}
🕌 Asr:       ${res.timings.Asr}
🕌 Maghrib:   ${res.timings.Maghrib}
🕌 Isha:      ${res.timings.Isha}

╰─━━━━━━━━━━━━━━━━━━━━━─╯
      `;
      
      api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      api.sendMessage(
        "⚠️ Sorry! There is a problem in fetching the prayer schedule. Please try again with correct information.",
        event.threadID,
        event.messageID
      );
    }
  },
};
