"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { FALLBACK_SRC, tracks, type Track } from "@/data/tracks";
import { openInSpotify } from "@/lib/utils";

type PlayerContextValue = {
  currentTrack: Track | null;
  isPlaying: boolean;
  external: boolean; // true when the current track is playing in Spotify
  progress: number; // seconds
  duration: number; // seconds
  volume: number; // 0..1
  toast: string | null;
  play: (track: Track) => void;
  playOnSpotify: (track: Track) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (seconds: number) => void;
  setVolume: (v: number) => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within <PlayerProvider>");
  return ctx;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [external, setExternal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flashToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  // Attach all the <audio> listeners once.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = volume;

    const onTime = () => setProgress(el.currentTime);
    const onMeta = () => setDuration(el.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      // The chosen src failed; fall back to the bundled clip once.
      if (!el.src.endsWith(FALLBACK_SRC)) {
        flashToast("Preview unavailable — playing placeholder");
        el.src = FALLBACK_SRC;
        el.load();
        void el.play().catch(() => setIsPlaying(false));
      } else {
        flashToast("Preview unavailable");
        setIsPlaying(false);
      }
    };

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flashToast]);

  const play = useCallback((track: Track) => {
    const el = audioRef.current;
    if (!el) return;
    setExternal(false);
    setCurrentTrack(track);
    setProgress(0);
    setDuration(0);
    el.src = track.src;
    el.load();
    void el.play().catch(() => {
      // error handler will deal with a missing/blocked source
    });
  }, []);

  /**
   * Hand a track off to Spotify (real playback). We pause any local preview,
   * mark the track active for the now-playing bar + ambient glow, then open
   * the Spotify app/web. There's no progress feedback from Spotify, so the bar
   * shows a dedicated "Playing on Spotify" state instead of a scrubber.
   */
  const playOnSpotify = useCallback((track: Track) => {
    const el = audioRef.current;
    if (el) el.pause();
    setExternal(true);
    setCurrentTrack(track);
    setProgress(0);
    setDuration(0);
    setIsPlaying(true);
    openInSpotify(track);
  }, []);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el || !currentTrack) return;
    if (el.paused) {
      void el.play().catch(() => setIsPlaying(false));
    } else {
      el.pause();
    }
  }, [currentTrack]);

  const playIndexOffset = useCallback(
    (offset: number) => {
      if (!currentTrack) return;
      const idx = tracks.findIndex((t) => t.slug === currentTrack.slug);
      if (idx === -1) return;
      const nextIdx = (idx + offset + tracks.length) % tracks.length;
      play(tracks[nextIdx]);
    },
    [currentTrack, play],
  );

  const next = useCallback(() => playIndexOffset(1), [playIndexOffset]);
  const prev = useCallback(() => playIndexOffset(-1), [playIndexOffset]);

  // Advance when the current track ends. Its own effect so it always sees the
  // latest next() without mutating a ref inside an effect.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => next();
    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, [next]);

  const seek = useCallback((seconds: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = seconds;
    setProgress(seconds);
  }, []);

  const setVolume = useCallback((v: number) => {
    const el = audioRef.current;
    const clamped = Math.min(1, Math.max(0, v));
    setVolumeState(clamped);
    if (el) el.volume = clamped;
  }, []);

  const value = useMemo<PlayerContextValue>(
    () => ({
      currentTrack,
      isPlaying,
      external,
      progress,
      duration,
      volume,
      toast,
      play,
      playOnSpotify,
      toggle,
      next,
      prev,
      seek,
      setVolume,
    }),
    [
      currentTrack,
      isPlaying,
      external,
      progress,
      duration,
      volume,
      toast,
      play,
      playOnSpotify,
      toggle,
      next,
      prev,
      seek,
      setVolume,
    ],
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {/* Single source of truth for all audio. */}
      <audio ref={audioRef} preload="metadata" />
    </PlayerContext.Provider>
  );
}
