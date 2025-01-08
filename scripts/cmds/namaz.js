const axios = require("axios");

module.exports = {
  config: {
    name: "namaz",
    version: "1.0.0",
    author: "xnil6x",
    role: 0,
  },

  onStart: async function({ api, event, args }) {
    const city = args.join(" ");

    try {
      const response = await axios.get(
        `https://xnilnew404.onrender.com/xnil/namaz?city=${encodeURIComponent(city)}&country=Bangladesh`
      );

      const res = response.data;

      const message = `
╭─━━━━━❰ 🌙 নামাজের সময়সূচী ❱━━━━━─╮
  
📅 তারিখ: ${res.date}
📍 স্থান: ${res.city}, ${res.country.trim()}

🕌 ফজর:      ${res.timings.Fajr}
🕌 যোহর:     ${res.timings.Dhuhr}
🕌 আসর:      ${res.timings.Asr}
🕌 মাগরিব:   ${res.timings.Maghrib}
🕌 এশা:      ${res.timings.Isha}

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
