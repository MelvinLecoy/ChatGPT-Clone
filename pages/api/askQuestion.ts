// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import query from '../../lib/queryApi';
import admin from "firebase-admin";
import { adminDB } from '../../firebaseAdmin';

type Data = {
    answer: string
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { prompt, chatId, model, session } = req.body;
    if (!prompt) {res.status(400).json({ answer: 'Please provide a prompt!' }); return;}
    if (!chatId) {res.status(400).json({ answer: 'Please provide a valid chat ID!' }); return;}

    let response = await query(prompt, chatId, model);
    if (response === "}oXcF~x_M@Ap8PXDP,>)=nxbzH}9Dxo-_Q?429") response = "Sorry to inform that you have exceeded the OpenAI API rate limit! You may consider upgrading your current tier.";
    else if (response!.substring(0, 35) === "}oXcF~x_M@Ap8PXDP,>)=nxbzH}9Dxo-_Q?") response = "Unknown Error! ChatGPT was unable to find an answer for that! Please try again."
    const message: Message = {
        text: response!,
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: 'ChatGPT',
            name: "ChatGPT",
            avatar: "https://links.papareact.com/89k",
        },
    };

    await adminDB.collection('users').doc(session?.user?.email).collection('chats').doc(chatId).collection("messages").add(message);
    res.status(200).json({ answer: message.text });
}