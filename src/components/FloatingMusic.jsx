import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Pause } from 'lucide-react';

const FloatingMusic = ({ isPlayingGlobally }) => {
  const [isPlaying, setIsPlaying] = useState(isPlayingGlobally);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlayingGlobally && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, [isPlayingGlobally]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-9999">
      <audio
        ref={audioRef}
        src="/song.mp3"
        loop
      />
      <motion.button
        onClick={togglePlay}
        className="w-12 h-12 bg-[#4a3020]/80 rounded-full flex items-center justify-center text-[#f1d0ca] shadow-lg backdrop-blur-md border border-[#C3A365]/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isPlaying ? { rotate: 360 } : {}}
        transition={isPlaying ? { duration: 4, repeat: Infinity, ease: "linear" } : {}}
      >
        {isPlaying ? <Music size={20} /> : <Pause size={20} />}
      </motion.button>
    </div>
  );
};

export default FloatingMusic;
