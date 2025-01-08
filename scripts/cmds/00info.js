const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
	config: {
		name: "info",
		version: "1.0",
		author: "NTKhang",
		countDown: 20,
		role: 0,
		shortDescription: { vi: "", en: "" },
		longDescription: { vi: "", en: "" },
		category: "owner",
		guide: { en: "" },
		envConfig: {}
	},
	onStart: async function ({ message }) {
		const authorName = " ⩸𝚇 𝙽 𝙸 𝙻⩸ ";
		const ownAge = "『 ⩸__21+__⩸ 』";
		const messenger = "https://m.me/100078794143432";
		const authorFB = "https://www.facebook.com/xnil6x404";
		const authorNumber = "_01818512416";
		const Status = "⩸__🆂🅸🅽🅶🅻🅴__⩸";
		const TG = "https://t.me/xnil6x";
		const insta = "https://www.instagram.com/xnil6x";
		const urls = [
"https://i.imgur.com/I8JSUWI.jpeg",
"https://i.imgur.com/I8JSUWI.jpeg",
"https://i.imgur.com/I8JSUWI.jpeg",
"https://i.imgur.com/I8JSUWI.jpeg"
];
		const link = urls[Math.floor(Math.random() * urls.length)];
		const now = moment().tz('Asia/Dhaka');
		const date = now.format('MMMM Do YYYY');
		const time = now.format('h:mm:ss A');
		const uptime = process.uptime();
		const seconds = Math.floor(uptime % 60);
		const minutes = Math.floor((uptime / 60) % 60);
		const hours = Math.floor((uptime / (60 * 60)) % 24);
		const days = Math.floor(uptime / (60 * 60 * 24));
		const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

		message.reply({
			body: `💫《 ⩸__𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧__⩸ 》💫\n
\💙 OWNER NAME: ${authorName}
\💥 Telegram: ${TG}
\✅ Instagram: ${insta}
\📝 AGE  : ${ownAge}
\💕 RELATIONSHIP: ${Status}
\🌐 WP : ${authorNumber}
\🌍 FACEBOOK LINK : ${authorFB}
\🔰 ANY HELP CONTACT :⩸__${messenger}__⩸\n

💫《 ⩸__𝐁𝐨𝐭 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧__⩸ 》💫\n
\🤖BOT NAME : ⩸__${global.GoatBot.config.nickNameBot}__⩸
\👾BOT SYSTEM PREFIX : ${global.GoatBot.config.prefix}
\🗓 DATE : ${date}
\⏰ NOW TIME : ${time}
\📛 BOT I'S RUNNING FOR : ${uptimeString}

\===============`,
			attachment: await global.utils.getStreamFromURL(link)
		});
	},
	onChat: async function ({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "info") {
			this.onStart({ message });
		}
	}
};
