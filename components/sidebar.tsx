"use client";

import { collection, query, orderBy } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import ChatRow from "./chatrow";
import ModelSelection from "./modelselection";
import NewChat from "./newchat";

function Sidebar() {
    const { data: session } = useSession();
    const [chats, loading, error] = useCollection(session && query(collection(db, "users", session.user?.email!, "chats"), orderBy("createdAt", "asc")));
    return (
      <div className='p-2 flex flex-col h-screen'>
          <div className='flex-1'>
              <div>
                  <NewChat/>
                  <div className="hidden sm:inline"><ModelSelection /></div>
                  <div className="flex flex-col space-y-2 my-2">
                    {loading && <div className="text-center text-white animate-pulse"><p>Loading Chats...</p></div>}
                    {chats?.docs.map(chat => <ChatRow key={chat.id} id={chat.id} />)}
                  </div>
              </div>
              {session && <img src={session.user?.image!} alt="pfp" onClick={() => signOut()}
                              className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50" />}
          </div>
      </div>
    )
}

export default Sidebar;