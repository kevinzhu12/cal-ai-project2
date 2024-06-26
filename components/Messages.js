// ./components/Messages.tsx
"use client";
import { useVoice } from "@humeai/voice-react";
import { takeNotes, summarizeContent } from "@/utils/openai";
import { useState, useEffect } from "react";

export default function Messages({ notes, newNotes }) {
  const { messages } = useVoice();
  const [summary, setSummary] = useState("");

  const handleTakeNotes = async (userMessage) => {
    console.log(userMessage);
    const processedNotes = await takeNotes(userMessage);
    if (processedNotes !== "") {
      newNotes((prevNotes) => [...prevNotes, processedNotes]);
    }
  };

  const handleSetSummary = async (notes) => {
    const summarizedNotes = await summarizeContent(notes);
    setSummary(summarizedNotes);
  };

  useEffect(() => {
    console.log(messages);
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage.type === "user_message") {
        handleTakeNotes(latestMessage.message.content);
      }

      if (notes.length !== 0 && notes.length % 3 === 0) {
        handleSetSummary(notes);
      }
    }
  }, [messages]);

  return (
    // <div className="flex flex-row">
    //   <div className=" flex flex-col space-y-5">
    //     {messages.map((msg, index) => {
    //       if (msg.type === "user_message" || msg.type === "assistant_message") {
    //         return (
    //           <div key={msg.type + index} className=" ">
    //             <div>{msg.message.role}</div>
    //             <div>{msg.message.content}</div>
    //           </div>
    //         );
    //       }

    //       return null;
    //     })}
    //   </div>
    //   <div>
    //     <h2 className="font-bold">Notes:</h2>
    //     <div className=" space-y-5">
    //       {notes.length > 0 && (
    //         <div className="mt-4 p-4 bg-gray-100">
    //           {notes.map((note, index) => (
    //             <p key={index}>{note}</p>
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    //   <div>
    //     <h2 className="font-bold">Summary:</h2>
    //     <div>{summary}</div>
    //   </div>
    //   {/* <Card>
    //     <CardHeader>
    //       <CardTitle>Card Title</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <p>Card Content</p>
    //     </CardContent>
    //   </Card> */}
    // </div>

    <div className="flex flex-col-reverse flex-nowrap overflow-auto w-80 mt-1/2 p-6">
      {messages
        .slice(-6)
        .toReversed()
        .map((msg, index) => {
          if (msg.type === "user_message" || msg.type === "assistant_message") {
            return (
              <div
                key={msg.type + index}
                className="justify-start items-start my-2 px-4"
              >
                <p
                  className={`${
                    index == 0 ? "text-white" : "text-slate-400"
                  } font-bold`}
                >
                  {msg.type === "user_message" ? "You:" : "Mindy:"}
                </p>
                <p className={index == 0 ? "text-white" : "text-slate-400"}>
                  {msg.message.content}
                </p>
              </div>
            );
          }
        })}
    </div>
  );
}
