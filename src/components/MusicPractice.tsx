"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Music2,
} from "lucide-react";

type Track = {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  color: string;
};

const TRACKS: Track[] = [
  {
    id: "t1",
    title: "Lo-fi Focus",
    subtitle: "Soft beats for deep work",
    url: "/mp3/Carefree(chosic.com).mp3",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "t2",
    title: "Rainy Cafe",
    subtitle: "Cozy ambience with rain",
    url: "/mp3/Lovely-Long-Version-chosic.com_.mp3",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "t3",
    title: "Gentle Piano",
    subtitle: "Minimal piano for calm",
    url: "/mp3/Warm-Memories-Emotional-Inspiring-Piano(chosic.com).mp3",
    color: "from-rose-500 to-orange-500",
  },
  {
    id: "t4",
    title: "Ocean Waves",
    subtitle: "Nature white-noise focus",
    url: "/mp3/Wildflowers-chosic.com_.mp3",
    color: "from-emerald-500 to-teal-500",
  },
];

export default function MusicPractice() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const currentTrack = useMemo(() => TRACKS[currentIndex], [currentIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    // Reset time when track changes
    setCurrentTime(0);
    setDuration(0);
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrack?.url]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const prevTrack = () =>
    setCurrentIndex((i) => (i - 1 + TRACKS.length) % TRACKS.length);
  const nextTrack = () => setCurrentIndex((i) => (i + 1) % TRACKS.length);

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime || 0);
  };

  const onLoadedMeta = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || 0);
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!audioRef.current) return;
    audioRef.current.currentTime = val;
    setCurrentTime(val);
  };

  const fmt = (sec: number) => {
    if (!isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Music2 className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Listening Practice
          </h3>
        </div>
        <div className="text-xs text-gray-500">4 curated tracks</div>
      </div>

      {/* Now Playing Card */}
      <div
        className={`rounded-xl p-4 mb-4 bg-gradient-to-r ${currentTrack.color} text-white`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm uppercase tracking-wide opacity-90">
              Now Playing
            </div>
            <div className="text-xl font-bold leading-tight">
              {currentTrack.title}
            </div>
            <div className="text-sm opacity-90">{currentTrack.subtitle}</div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevTrack}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-white text-indigo-700 hover:opacity-90 transition"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={nextTrack}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <input
            type="range"
            min={0}
            max={Math.max(duration, 0)}
            value={Math.min(currentTime, duration || 0)}
            onChange={onSeek}
            className="w-full accent-white"
          />
          <div className="flex justify-between text-xs mt-1 opacity-90">
            <span>{fmt(currentTime)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TRACKS.map((t, idx) => {
          const active = idx === currentIndex;
          return (
            <button
              key={t.id}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPlaying(true);
                setTimeout(
                  () =>
                    audioRef.current?.play().catch(() => setIsPlaying(false)),
                  0
                );
              }}
              className={`group flex items-center justify-between rounded-lg border p-3 text-left hover:shadow-sm transition ${
                active
                  ? "border-indigo-300 bg-indigo-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {t.title}
                </div>
                <div className="text-xs text-gray-500">{t.subtitle}</div>
              </div>
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-r ${t.color} opacity-90 group-hover:opacity-100`}
              />
            </button>
          );
        })}
      </div>

      {/* Volume */}
      <div className="mt-4 flex items-center space-x-2">
        <Volume2 className="h-4 w-4 text-gray-500" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMeta}
        onEnded={nextTrack}
      />
    </div>
  );
}
