import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, FileText, CheckCircle2 } from 'lucide-react';
import { speechAudioService, AudioPlayerState } from '../utils/audioSpeech';

interface AudioPlayerProps {
  textToSpeak: string;
  speakerLabel?: string;
  onTranscriptToggle?: () => void;
  showTranscript?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  textToSpeak,
  speakerLabel = "Audio Dialogue",
  onTranscriptToggle,
  showTranscript = false
}) => {
  const [audioState, setAudioState] = useState<AudioPlayerState>(speechAudioService.getState());

  useEffect(() => {
    const unsubscribe = speechAudioService.subscribe(setAudioState);
    return () => {
      speechAudioService.stop();
      unsubscribe();
    };
  }, []);

  // Stop audio when textToSpeak changes (e.g. moving to next question)
  useEffect(() => {
    speechAudioService.stop();
  }, [textToSpeak]);

  const handlePlayToggle = () => {
    if (audioState.isPlaying && !audioState.isPaused) {
      speechAudioService.pause();
    } else if (audioState.isPaused) {
      speechAudioService.resume();
    } else {
      speechAudioService.play(textToSpeak);
    }
  };

  const handleReplay = () => {
    speechAudioService.stop();
    speechAudioService.play(textToSpeak);
  };

  const handleSpeedChange = (speed: number) => {
    speechAudioService.setSpeed(speed);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 md:p-5 shadow-sm mb-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left side: Status & Speaker */}
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
            audioState.isPlaying && !audioState.isPaused ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-white text-blue-600 border border-blue-200'
          }`}>
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
                {speakerLabel}
              </span>
              {audioState.isPlaying && !audioState.isPaused && (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Playing Audio...
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Dengarkan rekaman percakapan / narasi sebelum menjawab
            </p>
          </div>
        </div>

        {/* Middle: Waveform Animation */}
        {audioState.isPlaying && !audioState.isPaused && (
          <div className="flex items-center gap-1 h-7 px-3 bg-white/70 rounded-full border border-blue-100 self-center">
            <span className="w-1 bg-blue-500 rounded-full animate-wave-1"></span>
            <span className="w-1 bg-blue-600 rounded-full animate-wave-2"></span>
            <span className="w-1 bg-indigo-500 rounded-full animate-wave-3"></span>
            <span className="w-1 bg-blue-600 rounded-full animate-wave-4"></span>
            <span className="w-1 bg-blue-500 rounded-full animate-wave-5"></span>
          </div>
        )}

        {/* Right side: Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Speed Selector */}
          <div className="flex items-center bg-white rounded-xl border border-slate-200 p-0.5 text-xs font-medium text-slate-600">
            {[0.85, 1.0, 1.15].map(spd => (
              <button
                key={spd}
                type="button"
                onClick={() => handleSpeedChange(spd)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  audioState.speed === spd
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
                title={`Kecepatan ${spd}x`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Replay */}
          <button
            type="button"
            onClick={handleReplay}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors shadow-xs active:scale-95"
            title="Ulangi dari Awal"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Play / Pause Primary Button */}
          <button
            type="button"
            onClick={handlePlayToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-sm ${
              audioState.isPlaying && !audioState.isPaused
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
            }`}
          >
            {audioState.isPlaying && !audioState.isPaused ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{audioState.isPaused ? 'Lanjutkan' : 'Putar Audio'}</span>
              </>
            )}
          </button>

          {/* Transcript toggle */}
          {onTranscriptToggle && (
            <button
              type="button"
              onClick={onTranscriptToggle}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                showTranscript
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Lihat teks naskah audio"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showTranscript ? 'Sembunyikan Naskah' : 'Lihat Naskah'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Transcript collapsible box */}
      {showTranscript && (
        <div className="mt-4 pt-4 border-t border-blue-200/60 text-slate-700 text-sm bg-white/80 p-4 rounded-xl font-mono leading-relaxed border shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
              Transkrip Percakapan / Audio
            </span>
            <span className="text-xs text-blue-600 font-sans flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Aksara Asli
            </span>
          </div>
          <div className="whitespace-pre-line text-slate-800 font-sans text-sm">
            {textToSpeak}
          </div>
        </div>
      )}
    </div>
  );
};

