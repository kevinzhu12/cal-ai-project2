"use client";
import { useState } from "react";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import CategoryPage from "./CategoryPage";

export default function ClientComponent({ accessToken }) {
  const [notes, setNotes] = useState([]);

  const newNotes = (noteList) => {
    setNotes(noteList);
  };

  return (
    <div className="max-h-screen min-w-full flex bg-slate-800">
      <div className="flex-1">
        <CategoryPage title="MindMap" notes={notes} />
      </div>
      <div className="w-80 bg-slate-700 flex flex-col justify-end items-center">
        <VoiceProvider
          auth={{
            type: "accessToken",
            value: accessToken,
          }}
          configId={process.env.NEXT_PUBLIC_HUME_CONFIG_ID}
        >
          <Messages notes={notes} newNotes={newNotes} />
          <Controls />
        </VoiceProvider>
      </div>
    </div>
  );
}
