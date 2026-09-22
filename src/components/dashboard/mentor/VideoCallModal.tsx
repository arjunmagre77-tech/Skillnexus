"use client";

import React, { useEffect, useRef, useState } from "react";
import { 
  Video, VideoOff, Mic, MicOff, Monitor, PhoneOff, 
  MessageSquare, ShieldCheck, Clock, Users, X, Send, Sparkles
} from "lucide-react";

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionDetails: {
    sessionId: string;
    studentName: string;
    mentorName: string;
    topic: string;
    scheduledTime?: string;
  };
}

export default function VideoCallModal({ isOpen, onClose, sessionDetails }: VideoCallModalProps) {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [notes, setNotes] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: sessionDetails.mentorName, text: "Hello! Ready to review your architecture diagram.", time: "10:30 AM" },
    { sender: sessionDetails.studentName, text: "Thanks! Joining with screen ready.", time: "10:31 AM" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "ended">("connecting");

  useEffect(() => {
    if (!isOpen) return;

    // Start timer
    setConnectionStatus("connecting");
    const connectTimer = setTimeout(() => {
      setConnectionStatus("connected");
    }, 1200);

    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    // Initialize Media Stream (WebRTC)
    async function initMedia() {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(userStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = userStream;
        }
      } catch (err) {
        console.warn("Camera/Mic access unavailable or denied. Operating in WebRTC fallback preview mode.", err);
      }
    }

    initMedia();

    return () => {
      clearTimeout(connectTimer);
      clearInterval(timer);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
      }
    }
    setIsVideoOn(!isVideoOn);
  };

  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicOn;
      }
    }
    setIsMicOn(!isMicOn);
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = displayStream;
        }
        setIsScreenSharing(true);
      } catch (err) {
        console.warn("Screen share cancelled or not supported", err);
      }
    } else {
      if (localVideoRef.current && stream) {
        localVideoRef.current.srcObject = stream;
      }
      setIsScreenSharing(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { sender: "You", text: newMessage.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setNewMessage("");
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setConnectionStatus("ended");
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-5xl h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative animate-in fade-in">
        
        {/* Top Video Header Bar */}
        <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
              SL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">{sessionDetails.topic}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  ID: {sessionDetails.sessionId}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Session between <strong className="text-slate-200">{sessionDetails.mentorName}</strong> & <strong className="text-slate-200">{sessionDetails.studentName}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDuration(callDuration)}</span>
            </div>

            <button
              onClick={() => setShowNotesDrawer(!showNotesDrawer)}
              className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                showNotesDrawer ? "bg-cyan-500/20 text-cyan-300 border-cyan-400" : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Notes & Chat</span>
            </button>
          </div>
        </div>

        {/* Video Call Stage Container */}
        <div className="flex-1 flex min-h-0 relative bg-slate-950">
          {/* Main Remote / Stream View (Big) */}
          <div className="flex-1 relative flex items-center justify-center bg-slate-950 p-4">
            {/* Connection Overlay */}
            {connectionStatus === "connecting" && (
              <div className="absolute inset-0 z-20 bg-slate-950/90 flex flex-col items-center justify-center space-y-3">
                <Sparkles className="w-8 h-8 text-cyan-400 animate-spin" />
                <p className="text-sm font-bold text-white">Connecting Secure WebRTC Peer Room...</p>
                <span className="text-xs text-slate-400">Establishing E2E Encrypted Audio/Video Channel</span>
              </div>
            )}

            {/* Remote Peer Screen Graphic */}
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-cyan-500/30 mb-3 animate-pulse">
                {sessionDetails.studentName.substring(0, 2).toUpperCase()}
              </div>
              <h4 className="text-base font-bold text-white">{sessionDetails.studentName}</h4>
              <p className="text-xs text-cyan-400 flex items-center gap-1 mt-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> WebRTC Encrypted Stream Active
              </p>

              {/* Status overlay badge */}
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{sessionDetails.mentorName} (Mentor)</span>
              </div>
            </div>

            {/* PIP Self Camera Stream View (Small bottom right) */}
            <div className="absolute bottom-6 right-6 w-48 h-36 rounded-xl border-2 border-cyan-500/60 bg-slate-900 overflow-hidden shadow-2xl z-20">
              {isVideoOn ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
              ) : (
                <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center text-slate-400">
                  <VideoOff className="w-6 h-6 mb-1 text-slate-600" />
                  <span className="text-[10px] font-bold">Camera Off</span>
                </div>
              )}
              <div className="absolute bottom-1 left-2 text-[9px] font-bold text-white bg-slate-950/80 px-1.5 py-0.5 rounded">
                You ({isMicOn ? "Mic On" : "Muted"})
              </div>
            </div>
          </div>

          {/* Notes & Chat Sidebar Drawer */}
          {showNotesDrawer && (
            <div className="w-80 border-l border-slate-800 bg-slate-900 flex flex-col justify-between shrink-0 animate-in slide-in-from-right duration-200">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">Session Notes & Chat</h4>
                <button onClick={() => setShowNotesDrawer(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <strong className="text-cyan-400">{msg.sender}</strong>
                      <span className="text-slate-500">{msg.time}</span>
                    </div>
                    <p className="text-slate-200">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Notes Textarea */}
              <div className="p-3 border-t border-slate-800 bg-slate-950 space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Mentorship Action Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record key action items for mentee..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              {/* Chat Form Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Type message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <button type="submit" className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Call Controls Bar */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-center gap-4 shrink-0">
          {/* Mic Toggle */}
          <button
            onClick={toggleMic}
            className={`p-3.5 rounded-2xl border transition cursor-pointer ${
              isMicOn 
                ? "bg-slate-900 border-slate-700 text-white hover:bg-slate-800" 
                : "bg-rose-500/20 border-rose-500/40 text-rose-400"
            }`}
            title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
          >
            {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          {/* Video Toggle */}
          <button
            onClick={toggleVideo}
            className={`p-3.5 rounded-2xl border transition cursor-pointer ${
              isVideoOn 
                ? "bg-slate-900 border-slate-700 text-white hover:bg-slate-800" 
                : "bg-rose-500/20 border-rose-500/40 text-rose-400"
            }`}
            title={isVideoOn ? "Turn Off Camera" : "Turn On Camera"}
          >
            {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          {/* Screen Share Toggle */}
          <button
            onClick={toggleScreenShare}
            className={`p-3.5 rounded-2xl border transition cursor-pointer ${
              isScreenSharing 
                ? "bg-cyan-500/20 border-cyan-400 text-cyan-300" 
                : "bg-slate-900 border-slate-700 text-white hover:bg-slate-800"
            }`}
            title="Share Screen"
          >
            <Monitor className="w-5 h-5" />
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-rose-600/30 cursor-pointer"
          >
            <PhoneOff className="w-5 h-5" />
            <span>End Session</span>
          </button>
        </div>

      </div>
    </div>
  );
}
