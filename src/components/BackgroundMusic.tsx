import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, ChevronUp, ChevronDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface BackgroundMusicProps {
  audioSrc: string;
  trackName?: string;
  artistName?: string;
  autoPlay?: boolean;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ 
  audioSrc, 
  trackName = "The Matrimony",
  artistName = "Wedding Ensemble",
  autoPlay = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [expanded, setExpanded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isMobile = useIsMobile();

  // Initialize audio context for mobile
  useEffect(() => {
    const initializeAudioContext = () => {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const audioContext = new AudioContext();
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
      }
    };

    const handleUserInteraction = () => {
      initializeAudioContext();
      if (audioRef.current && !isPlaying && isLoaded) {
        handlePlay();
      }
      // Remove listeners after first interaction
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [isLoaded, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const handleError = (e: Event) => {
        console.error('Audio loading error:', e);
        console.error('Audio src:', audioSrc);
        toast.error('Unable to load music. Please try refreshing the page.');
        setIsPlaying(false);
      };

      const handleCanPlay = () => {
        console.log('Audio loaded successfully');
        setIsLoaded(true);
        if (autoPlay && !isMobile) {
          setTimeout(() => {
            handlePlay();
          }, 100);
        }
      };

      const handleLoadedMetadata = () => {
        console.log('Audio metadata loaded');
        audio.volume = volume;
      };

      audio.addEventListener('error', handleError);
      audio.addEventListener('canplaythrough', handleCanPlay);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);

      // Preload audio for mobile
      audio.load();

      return () => {
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('canplaythrough', handleCanPlay);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [autoPlay, volume, isMobile, audioSrc]);

  const handlePlay = async () => {
    if (audioRef.current && isLoaded) {
      try {
        // Don't set currentTime - let it play from the beginning
        await audioRef.current.play();
        setIsPlaying(true);
        console.log('Music started playing');
      } catch (error) {
        console.error('Play error:', error);
        if (isMobile) {
          toast.error('Tap anywhere on the screen to enable music playback');
        } else {
          toast.error('Unable to play music');
        }
        setIsPlaying(false);
      }
    } else {
      console.error('Audio not loaded or ref not available');
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayback = () => {
    if (!isLoaded) {
      toast.error('Please wait for the music to load');
      return;
    }
    
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
    }
  };

  return (
    <div className={`fixed ${isMobile ? 'bottom-20' : 'bottom-4'} right-4 z-50 transition-all duration-300 ${expanded ? 'w-64' : 'w-auto'}`}>
      <div className="bg-black/80 border border-wedding-gold/30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        {expanded && (
          <div className="p-4 border-b border-wedding-gold/20">
            <div className="flex items-center mb-2">
              <Music size={18} className="text-wedding-gold mr-2" />
              <div>
                <h3 className="text-white text-sm font-medium">{trackName}</h3>
                <p className="text-wedding-lilac-light text-xs">{artistName}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-wedding-lilac-light text-xs mb-1">Volume</p>
              <Slider 
                defaultValue={[volume]} 
                max={1} 
                step={0.01}
                onValueChange={handleVolumeChange}
                className="my-2"
              />
            </div>
          </div>
        )}
        <div className="flex p-2 justify-between items-center">
          <Button
            onClick={togglePlayback}
            variant="ghost"
            size="lg"
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              isPlaying ? 'bg-wedding-gold/30' : 'bg-wedding-gold/20'
            } text-wedding-gold hover:bg-wedding-gold/40 transition-all`}
            disabled={!isLoaded}
          >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </Button>
          
          <Button
            onClick={() => setExpanded(!expanded)}
            variant="ghost"
            size="sm"
            className="ml-2 text-wedding-lilac hover:text-wedding-gold transition-colors"
          >
            {expanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </Button>
        </div>
      </div>
      
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        loop 
        preload="auto"
        onError={(e) => console.error('Audio element error:', e)}
      />
    </div>
  );
};

export default BackgroundMusic; 