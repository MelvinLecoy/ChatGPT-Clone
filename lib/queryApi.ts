import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
    const res = await openai.createCompletion({
        model, prompt, max_tokens: 1000,
        temperature: 0.9, top_p: 1,
        frequency_penalty: 0, presence_penalty: 0,
    }).then(response => response.data.choices[0].text)
    .catch(error => `}oXcF~x_M@Ap8PXDP,>)=nxbzH}9Dxo-_Q?${error.response.status}`);
    return res;
};

export default query;