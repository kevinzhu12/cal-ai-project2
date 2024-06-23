"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { useState } from "react";
export default function Controls() {
  const { connect, disconnect, readyState } = useVoice();
  const [connecting, setConnecting] = useState(false);

  return (
    <div className="m-8">
      {readyState === VoiceReadyState.OPEN ? (
        <button
          className="w-48 h-16 border-2 rounded-lg bg-red-400"
          onClick={() => {
            disconnect();
          }}
        >
          End Session
        </button>
      ) : (
        <button
          className={`w-48 h-16 border-2 rounded-lg ${
            connecting ? "bg-yellow-200" : "bg-green-300"
          }`}
          onClick={() => {
            setConnecting(true);
            connect()
              .then(() => {
                setConnecting(false);
              })
              .catch(() => {
                /* handle error */
              });
          }}
        >
          {connecting ? "Loading" : "Start Session"}
        </button>
      )}
    </div>
  );
}
