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
		const authorName = " ⩸ᗷᗩᎩᒍᏆᗞ⩸ ";
		const ownAge = "『 ⩸__17__⩸ 』";
		const messenger = "https://m.me/100065506668822";
		const authorFB = "https://www.facebook.com/profile.php?id=BAYJID.500k";
		const authorNumber = "_01638007072";
		const Status = "⩸__🆂🅸🅽🅶🅻🅴__⩸";
		const urls = [
"https://i.imgur.com/I8JSUWI.jpeg",
"https://i.imgur.com/I8JSUWI.jpeg",
"https://i.imgur.com/I8JSUWI.jpeg",
"https://i.imgur.com/I8JSUWI.jpeg"
];
		const link = urls[Math.floor(Math.random() * urls.length)];
		const now = moment().tz('Asia/Jakarta');
		const date = now.format('MMMM Do YYYY');
		const time = now.format('h:mm:ss A');
		const uptime = process.uptime();
		const seconds = Math.floor(uptime % 60);
		const minutes = Math.floor((uptime / 60) % 60);
		const hours = Math.floor((uptime / (60 * 60)) % 24);
		const days = Math.floor(uptime / (60 * 60 * 24));
		const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

		message.reply({
			body: `💫《 ⩸__𝐁𝐨𝐭 𝐀𝐧𝐝 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧__⩸ 》💫
\🤖BOT NAME : ⩸__${global.GoatBot.config.nickNameBot}__⩸
\👾BOT SYSTEM PREFIX : ${global.GoatBot.config.prefix}
\💙 OWNER NAME: ${authorName}
\📝AGE  : ${ownAge}
\💕RELATIONSHIP: ${Status}
\🌐WP : ${authorNumber}
\🌍 FACEBOOK LINK : ${authorFB}
\🗓DATE : ${date}
\⏰NOW TIME : ${time}
\🔰ANY HELP CONTACT :⩸__${messenger}__⩸
\📛BOT I'S RUNNING FOR : ${uptimeString}
    𝑻𝒈: https://t.me/MOHAMMADBAYJID
    𝑰𝒏𝒔𝒕𝒂: https://www.instagram.com/mr_bayjid120?
    𝑪𝒂𝒑𝑪𝒖𝒕: copy_bayjid
    𝑻𝒊𝒌𝑻𝒐𝒌: https://www.tiktok.com/@copy_bayjid?
    𝒀𝒐𝒖𝑻𝒖𝒃𝒆: https://youtube.com/@Bayjid Editz?
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
