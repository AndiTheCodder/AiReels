const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { idea } = req.body;

  if (!idea) {
    return res.status(400).json({ message: "No idea provided" });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Give a catchy Instagram reels caption based on this idea: ${idea}` }],
    });

    const caption = completion.data.choices[0].message.content;
    res.status(200).json({ caption });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
