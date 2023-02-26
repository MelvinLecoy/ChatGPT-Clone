import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
    const res = await openai.createCompletion({
        model, prompt, max_tokens: 1000,
        temperature: 0.9, top_p: 1,
        frequency_penalty: 0, presence_penalty: 0,
    }).then(response => response.data.choices[0].text)
    .catch(error => `ChatGPT was unable to find an answer for that! (Error: ${error.message})`);
    return res;
};

export default query;