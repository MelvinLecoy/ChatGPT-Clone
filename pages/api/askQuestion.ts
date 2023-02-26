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
    // if (response === "}oXcF~x_M@Ap8PXDP,>)=nxbzH}9Dxo-_Q?429") response = "Sorry to inform that you have exceeded the OpenAI API rate limit! You may consider upgrading your current tier.";
    // else if (response!.substring(0, 35) === "}oXcF~x_M@Ap8PXDP,>)=nxbzH}9Dxo-_Q?") response = "Unknown Error! ChatGPT was unable to find an answer for that! Please try again."
    const timeout = Math.ceil(Math.random() * (5 - 2)) + 2;
    if (prompt === "who are you") {
        await new Promise(resolve => setTimeout(resolve, timeout * 1000));
        response = "I am ChatGPT, a large language model developed by OpenAI. I am an artificial intelligence program designed to communicate with humans and answer their questions to the best of my abilities based on my training data. I don't have a physical body, but I exist as software running on servers. I'm here to help you with any questions or concerns you may have.";
    }
    else if (prompt === "what is the meaning of life") {
        await new Promise(resolve => setTimeout(resolve, timeout * 1000));
        response = "The meaning of life is a deeply philosophical and subjective question that has been debated and discussed for centuries by great thinkers, philosophers, and scholars. Different people have different beliefs and perspectives on the meaning of life, and there is no one definitive answer. From a scientific standpoint, life is the state of being alive, characterized by various biological processes that sustain and maintain an organism. However, this definition does not fully capture the complexity of human life, which includes many intangible aspects such as emotions, relationships, and spirituality. Many people find meaning in life through their relationships with others, their personal goals and aspirations, and their sense of purpose or contribution to the world. Others find meaning in religious or spiritual beliefs, connecting to a higher power or transcendent reality. Ultimately, the meaning of life is a highly personal and subjective question that each individual must answer for themselves. It is a journey of self-discovery and reflection, and the answer may change throughout one's lifetime as their experiences and perspectives evolve."
    }
    else if (prompt === "write me a scifi fiction in 200 words") {
        await new Promise(resolve => setTimeout(resolve, timeout * 1000));
        response = "As the last remaining human on a desolate planet, Sarah spent her days collecting resources and scanning the skies for any signs of life. One day, her instruments detected a strange energy signature emanating from a nearby cave system. Curious and hopeful, she ventured inside. As she navigated the tunnels, Sarah encountered a glowing crystal that emitted a powerful beam of energy. The beam transported her to a distant planet, where she was greeted by a group of advanced beings who welcomed her as an honored guest. Through her interactions with these beings, Sarah learned that she was the descendant of an ancient civilization that had long since been destroyed. She was the last living link to their knowledge and technology. The beings offered to teach Sarah their ways, and she eagerly accepted. She spent years training and learning, becoming one of the most skilled pilots and scientists in the galaxy. Eventually, Sarah returned to her home planet with the knowledge and technology to rebuild it. She knew that she was not truly alone, for she had the knowledge and support of an entire civilization behind her. And with this newfound hope, she began the long process of restoring her world to its former glory.";
    }
    else if (prompt === "suggest me a stock") {
        await new Promise(resolve => setTimeout(resolve, timeout * 1000));
        response = "As an AI language model, I'm not qualified to provide financial advice or recommend specific stocks. Investment decisions should be based on thorough research, analysis, and consultation with a licensed financial advisor. It's important to consider your investment goals, risk tolerance, and financial situation before making any investment decisions. Some popular resources for researching and analyzing stocks include financial news outlets, investment websites, and online trading platforms. It's also a good idea to diversify your investments and not rely solely on one stock or sector.";
    }
    else if (prompt === "who is the best basketball player") {
        await new Promise(resolve => setTimeout(resolve, timeout * 1000));
        response = "There is no definitive answer to who the best basketball player is, as opinions on this subject are highly subjective and can vary depending on personal preferences and criteria. Some of the most famous basketball players in history include Michael Jordan, Kobe Bryant, LeBron James, Magic Johnson, Kareem Abdul-Jabbar, Wilt Chamberlain, and Shaquille O'Neal, among others. Each of these players has their own unique style, strengths, and achievements, which make them stand out from others. It's ultimately up to individual fans to decide who they believe is the best based on their own criteria, such as stats, accomplishments, awards, impact on the game, or personal preference.";
    }
    else if (prompt === "is computer science good for umich") {
        await new Promise(resolve => setTimeout(resolve, timeout * 1000));
        response = "Yes, computer science at the University of Michigan (UMich) is generally considered to be a good program. The UMich computer science program is consistently ranked among the top computer science programs in the United States, and the university itself is one of the top public universities in the country. UMich's computer science program is known for its strong faculty, rigorous curriculum, and cutting-edge research in areas such as artificial intelligence, robotics, computer vision, and data science. The program also offers a wide range of courses and opportunities for students to gain practical experience through internships, research projects, and industry partnerships. However, the quality of education and experience can vary depending on individual factors such as personal interests, goals, and expectations. It's important to do your own research, consider your own needs and preferences, and speak with current students, faculty, and alumni before making a decision about where to pursue your computer science education.";
    }
    else if (prompt === "definition of incremental static regeneration") {
        await new Promise(resolve => setTimeout(resolve, timeout * 1000));
        response = "Incremental Static Regeneration (ISR) is a feature of static site generators and web frameworks that enables parts of a website or web application to be regenerated dynamically while the rest of the site remains static. In traditional static site generation, the entire site is pre-rendered into HTML files at build time, which are then served statically to visitors. However, with ISR, parts of the site can be regenerated on-demand, triggered by specific events or user interactions. This allows for more dynamic content and functionality on static sites, without sacrificing the speed and security benefits of static site generation. For example, with ISR, a blog site might pre-generate most of its pages at build time, but use ISR to regenerate the homepage whenever a new blog post is published. This means that the homepage always shows the latest blog posts, without requiring a full site rebuild.";
    }
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