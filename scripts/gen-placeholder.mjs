// Generates a short, soft, royalty-free ambient tone as a 16-bit PCM WAV.
// Output: public/audio/placeholder.wav — used as the fallback when a real
// /audio/<slug>.mp3 is missing, so clicking any song always plays something.
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "public", "audio", "placeholder.wav");

const sampleRate = 44100;
const seconds = 12;
const n = sampleRate * seconds;

// A gentle, slowly-evolving chord (root + fifth + octave) with vibrato.
const partials = [
  { f: 196.0, a: 0.5 }, // G3
  { f: 293.66, a: 0.32 }, // D4
  { f: 392.0, a: 0.22 }, // G4
];

const bytesPerSample = 2;
const dataSize = n * bytesPerSample;
const buffer = Buffer.alloc(44 + dataSize);

// --- WAV header ---
buffer.write("RIFF", 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write("WAVE", 8);
buffer.write("fmt ", 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20); // PCM
buffer.writeUInt16LE(1, 22); // mono
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * bytesPerSample, 28);
buffer.writeUInt16LE(bytesPerSample, 32);
buffer.writeUInt16LE(16, 34);
buffer.write("data", 36);
buffer.writeUInt32LE(dataSize, 40);

for (let i = 0; i < n; i++) {
  const t = i / sampleRate;
  // 2s fade in, 3s fade out
  const fadeIn = Math.min(1, t / 2);
  const fadeOut = Math.min(1, (seconds - t) / 3);
  const env = Math.max(0, Math.min(fadeIn, fadeOut)) * 0.28;
  const vibrato = 1 + 0.0025 * Math.sin(2 * Math.PI * 0.2 * t);

  let s = 0;
  for (const p of partials) {
    s += p.a * Math.sin(2 * Math.PI * p.f * vibrato * t);
  }
  s *= env;
  const v = Math.max(-1, Math.min(1, s));
  buffer.writeInt16LE((v * 32767) | 0, 44 + i * bytesPerSample);
}

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, buffer);
console.log(`wrote ${out} (${(dataSize / 1024).toFixed(0)} KB)`);
