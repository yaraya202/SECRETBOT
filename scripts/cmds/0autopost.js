const fs = require("fs-extra");
const axios = require("axios");

// স্ট্যাটিক লেখা (এগুলো আপনি প্রয়োজন অনুযায়ী পরিবর্তন করতে পারেন)
const posts = [
  "🌟 Stay positive, work hard, make it happen!",
  "💡 Success is the sum of small efforts, repeated day in and day out.",
  "🚀 Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
  "🎯 The harder you work for something, the greater you'll feel when you achieve it.",
  "💪 Don't watch the clock; do what it does. Keep going."
];

module.exports = {
  config: {
    name: "autopost",
    version: "1.0",
    author: "jfhigtfdv",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Create a new post on Facebook."
    },
    longDescription: {
      en: "Create a new post on Facebook with text, images, and video."
    },
    category: "Social",
    guide: {
      en: "{pn}: post"
    }
  },

  onStart: async function ({ event, api, commandName }) {
    // কোড চালানোর সময় এক ঘণ্টার পর পর রেনডম পোস্ট করার জন্য কলব্যাক ফাংশন
    const interval = setInterval(async () => {
      await postRandomContent(api);
    }, 3600000);  // প্রতি এক ঘণ্টায় পোস্ট হবে (3600000 মিলিসেকেন্ড)

    // কোডে যদি আপনি ম্যানুয়ালি পোস্ট করতে চান, এখানে কিছু লজিক দিতে পারেন।
    // Example: await postRandomContent(api);
  },
};

// রেনডম পোস্ট ফাংশন
async function postRandomContent(api) {
  try {
    // রেনডম লেখার জন্য
    const randomPost = posts[Math.floor(Math.random() * posts.length)];

    const formData = {
      "input": {
        "composer_entry_point": "inline_composer",
        "composer_source_surface": "timeline",
        "message": {
          "text": randomPost,
        },
        "actor_id": api.getCurrentUserID(),
        "client_mutation_id": Math.floor(Math.random() * 17),
      },
    };

    const form = {
      av: api.getCurrentUserID(),
      fb_api_req_friendly_name: "ComposerStoryCreateMutation",
      fb_api_caller_class: "RelayModern",
      doc_id: "7711610262190099",
      variables: JSON.stringify(formData),
    };

    api.httpPost('https://www.facebook.com/api/graphql/', form, (e, info) => {
      if (e) throw e;
      if (typeof info == "string") info = JSON.parse(info.replace("for (;;);", ""));
      const postID = info.data.story_create.story.legacy_story_hideable_id;
      const urlPost = info.data.story_create.story.url;
      if (!postID) throw info.errors;
      return api.sendMessage(`» Post created successfully\n» postID: ${postID}\n» urlPost: ${urlPost}`, event.threadID, event.messageID);
    });
  } catch (error) {
    return api.sendMessage(`Post creation failed, please try again later`, event.threadID, event.messageID);
  }
}
