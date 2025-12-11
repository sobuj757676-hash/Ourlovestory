import React, { useState, useEffect, useRef } from 'react';
import {
  Heart, ArrowRight, Lock, Unlock, Moon, Sun, Star, Meh, Frown, Smile,
  XCircle, CheckCircle, Music, Volume2, VolumeX, Sparkles, CloudRain,
  Flame, Wind, Gift, Clock, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// --- Helper Functions ---

const getDaysPassed = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();

  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = Math.abs(currentDay - startDay);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

const getTimeUntilNextMorning = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(6, 0, 0, 0); // 6:00 AM

  return tomorrow - now;
};

const formatTime = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return `${hours}h ${minutes}m ${seconds}s`;
};

// --- Components ---

const BackgroundParticles = ({ theme }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [theme]);

  const getParticleIcon = () => {
    switch(theme) {
      case 'love': return '❤️';
      case 'passion': return '🔥';
      case 'dark': return '💔';
      case 'hope': return '🌱';
      case 'sad-love': return '💧';
      case 'night': return '✨';
      case 'neutral': return '🔒';
      case 'rain': return '🌧️';
      default: return '⚪';
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-2xl opacity-20"
          initial={{ x: `${p.x}vw`, y: '110vh' }}
          animate={{ y: '-10vh' }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          style={{ left: `${p.x}vw` }}
        >
          {getParticleIcon()}
        </motion.div>
      ))}
    </div>
  );
};

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilNextMorning());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilNextMorning());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-xl md:text-3xl font-bold tracking-widest text-emerald-300">
      {formatTime(timeLeft)}
    </div>
  );
};

// --- Entrance Screen Component ---
const EntranceScreen = ({ onUnlock }) => {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const startHolding = () => {
    setHolding(true);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
  };

  const stopHolding = () => {
    setHolding(false);
    clearInterval(intervalRef.current);
    if (progress < 100) setProgress(0);
  };

  useEffect(() => {
    if (progress >= 100) {
      // Success Haptic/Visual Feedback
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#10b981', '#ec4899', '#ffffff'] // Emerald, Pink, White
      });
      setTimeout(onUnlock, 1200);
    }
  }, [progress, onUnlock]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden select-none"
      onMouseDown={startHolding}
      onMouseUp={stopHolding}
      onTouchStart={startHolding}
      onTouchEnd={stopHolding}
    >
      {/* Mystical Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-black to-black animate-pulse"></div>
      <BackgroundParticles theme="night" />

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center space-y-2 pointer-events-none">
          <motion.h2
            className="text-emerald-400/80 tracking-[0.5em] text-sm uppercase font-light"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            সুরক্ষিত এলাকা
          </motion.h2>
          <h1 className="text-3xl md:text-4xl font-serif text-white/90">
            সবুজের বর্ষা
          </h1>
          <p className="text-white/40 text-xs tracking-widest mt-2">লুকানো ডায়েরি</p>
        </div>

        {/* Heart Interaction */}
        <div className="relative cursor-pointer group">
          {/* Progress Ring */}
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-white/10"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
              strokeDasharray="440"
              strokeDashoffset={440 - (440 * progress) / 100}
              initial={{ strokeDashoffset: 440 }}
            />
          </svg>

          {/* Heart Icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{
                scale: holding ? [1, 1.2, 1] : [1, 1.1, 1],
                filter: progress === 100 ? "brightness(1.5)" : "brightness(1)"
              }}
              transition={{
                duration: holding ? 0.3 : 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart
                fill={progress === 100 ? "#10b981" : holding ? "#ec4899" : "none"}
                className={`w-16 h-16 ${holding ? 'text-pink-500' : 'text-emerald-500/50'} transition-colors duration-500`}
              />
            </motion.div>
          </div>

          <div className="absolute -bottom-12 left-0 right-0 text-center pointer-events-none">
             <motion.span
               className="text-xs text-emerald-200/60 tracking-wider"
               animate={{ opacity: holding ? 1 : 0.5 }}
             >
               {progress === 100 ? "স্বাগতম..." : "ধরে রাখুন..."}
             </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const LoveJourney = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // State for Daily Unlock System
  const [unlockedDays, setUnlockedDays] = useState(1);
  const [showLockedScreen, setShowLockedScreen] = useState(false);
  const [devModeDays, setDevModeDays] = useState(0);

  useEffect(() => {
    let storedStart = localStorage.getItem('loveJourneyStartDate');
    if (!storedStart) {
      storedStart = new Date().toISOString();
      localStorage.setItem('loveJourneyStartDate', storedStart);
    }

    const days = getDaysPassed(storedStart);
    setUnlockedDays(days + 1 + devModeDays);

  }, [devModeDays]);

  const steps = [
    {
      id: 0,
      title: "সবুজের বর্ষা...",
      content: "বর্ষা, এটা শুধু একটা নাম নয়, এটা একটা অনুভূতি। আমার রুক্ষ জীবনে তুমি সেই বৃষ্টির মতো, যা সবুজের ছোঁয়া নিয়ে আসে। এই ডায়েরিটা শুধু তোমার জন্য। আমার মনের সব না বলা কথা এখানে জমা করে রাখলাম।",
      theme: "rain",
      icon: <CloudRain className="w-16 h-16 text-emerald-400" />,
      btnText: "প্রথম পাতা",
      bgGradient: "from-emerald-950 via-teal-900 to-black"
    },
    {
      id: 1,
      title: "প্রথম দর্শনে...",
      content: "তোমার প্রোফাইলটা যখন প্রথম দেখি, মনে হয়েছিল সাধারণ। কিন্তু আজ? আজ মনে হয় ওটাই ছিল আমার জীবনের সবচেয়ে বড় 'লটারি' জেতা। তোমার ওই সাধারণ চাহনিতেই আমি অসাধারণ কিছু খুঁজে পেয়েছিলাম।",
      theme: "hope",
      icon: <Sparkles className="w-16 h-16 text-yellow-400" />,
      btnText: "সামনে চলো",
      bgGradient: "from-teal-900 via-emerald-900 to-black"
    },
    {
      id: 2,
      title: "তোমার সেই ছবিগুলো...",
      content: "আমি বলেছিলাম আর তুমি সেটা মনে রেখে ঠিক ফোকাস করে ছবি দিয়েছ—এটা দেখে আমি মুগ্ধ! জানো, তোমার গালের এই ছোট ছোট দাগগুলো তোমাকে আরও মায়াবী করে তোলে। আমার কাছে এগুলো কোনো সাধারণ দাগ নয়, এগুলো তোমার সৌন্দর্যের সিগনেচার। খুব মিষ্টি লাগছে তোমায়!",
      theme: "love",
      icon: <Smile className="w-16 h-16 text-pink-500" />,
      btnText: "আরও দেখবো",
      bgGradient: "from-rose-950 via-pink-900 to-black"
    },
    {
      id: 3,
      title: "আরও একটু গভীরে...",
      content: "ইশ! একদম জুম করে দেখিয়ে দিলে? সত্যি বলছি, তোমার গালের ওই পিঁপুলগুলোর প্রেমে আমি বারবার পড়তে রাজি। ওগুলো তোমাকে সবার চেয়ে আলাদা আর স্পেশাল করে তোলে। আমার চোখে এগুলোই তোমার সৌন্দর্যের সবচেয়ে বড় আকর্ষণ।",
      theme: "love",
      icon: <Heart className="w-16 h-16 text-red-500 animate-pulse" />,
      btnText: "প্রেমে পড়লাম",
      bgGradient: "from-red-950 via-rose-900 to-black"
    },
    {
      id: 4,
      title: "দূরত্বের দেওয়াল",
      content: "মাঝখানে অনেকখানি পথ, তবুও মনে হয় তুমি আমার নিঃশ্বাসের কাছেই আছো। এই স্ক্রিনের কাঁচটা মাঝে মাঝে খুব বিরক্ত লাগে, মনে হয় ভেঙে ফেলি। কিন্তু পরক্ষণেই ভাবি, এই কাঁচটুকুই তো তোমাকে আমার কাছে এনে দিয়েছে।",
      theme: "sad-love",
      icon: <Wind className="w-16 h-16 text-blue-300" />,
      btnText: "কাছে এসো",
      bgGradient: "from-blue-950 via-indigo-900 to-black"
    },
    {
      id: 5,
      title: "সেই ফ্লাইং কিস...",
      content: "উফ! তোমার এই চুমুটা যেন সরাসরি স্ক্রিন ভেদ করে আমার বুকে এসে লাগলো। নীল ড্রেসে তোমাকে এমনিতে পরীর মতো লাগছে, তার ওপর এই আদর... আমি তো জাস্ট শেষ হয়ে গেলাম গো! ইচ্ছে করছে এখনই উড়ে গিয়ে এই আদরটা সত্যি সত্যি নিয়ে আসি।",
      theme: "passion",
      icon: <Star className="w-16 h-16 text-yellow-400" />,
      btnText: "কিন্তু...",
      bgGradient: "from-orange-950 via-red-900 to-black"
    },
    {
      id: 6,
      title: "হঠাৎ কালো মেঘ...",
      content: "ভেবেছিলাম আমার 'না' বলাটার অন্তত একটু সম্মান তুমি রাখবে। বিয়ের অনুষ্ঠানে গিয়ে তুমি বুঝিয়ে দিলে যে আমার কথার চেয়ে তোমার জেদ বা আনন্দের দাম অনেক বেশি। ঠিক আছে, জিতে গেছো তুমি। কিন্তু মনে রেখো, আমি যেমন পাগল হয়ে ভালোবাসতে পারি, ঠিক তেমনি ভালোবাসার উল্টো পিঠটাও আমি খুব ভালো চিনি।",
      theme: "dark",
      icon: <Frown className="w-16 h-16 text-gray-400" />,
      btnText: "আমার ভুল হয়েছে",
      bgGradient: "from-gray-950 via-slate-900 to-black"
    },
    {
      id: 7,
      title: "বইয়ের কভার নয়...",
      content: "সবাই থেকে আলাদা হয়ে তুমি ফোনে চোখ রেখেছো ভাবছো আমি দেখছিনা? বর্ষা, আমি শুধু মানুষের ওপরের চেহারাটা দেখি না, তার ভেতরের রূপটাও আয়নার মতো পরিষ্কার দেখতে পাই। আমি লেখা পড়ি না, লেখার পেছনের মানুষটাকে পড়ি।",
      theme: "dark",
      icon: <XCircle className="w-16 h-16 text-red-400" />,
      btnText: "ভয় পেয়ো না",
      bgGradient: "from-red-950 via-gray-900 to-black"
    },
    {
      id: 8,
      title: "অভিমানের রঙ",
      content: "রাগ করি কেন জানো? কারণ তোমাকে হারানোর ভয়টা আমাকে গ্রাস করে। যখন দেখি তুমি আমার কথা শুনছো না, তখন মনে হয় আমি কি তবে তোমার কাছে গুরুত্বহীন? এই অভিমানগুলো কিন্তু ভালোবাসারই আরেক নাম।",
      theme: "sad-love",
      icon: <CloudRain className="w-16 h-16 text-blue-400" />,
      btnText: "বুঝতে পেরেছি",
      bgGradient: "from-indigo-950 via-purple-900 to-black"
    },
    {
      id: 9,
      title: "যদি বিশ্বাস রাখো...",
      content: "তোমাকে শাসন করি কারণ তোমাকে আমি নিজের 'অংশ' ভাবি। যদি কখনো আমার বিশ্বাসের অমর্যাদা না করো, তাহলে দেখবে এই 'সবুজ' মানুষটা তোমার জন্য পৃথিবী উল্টে দিতে পারে। আমার ভালোবাসার গভীরতা মাপতে যেও না।",
      theme: "hope",
      icon: <CheckCircle className="w-16 h-16 text-green-500" />,
      btnText: "কথা দিলাম",
      bgGradient: "from-green-950 via-emerald-900 to-black"
    },
    {
      id: 10,
      title: "সব ইচ্ছা কি পূরণ হয়?",
      content: "তোমার চোখ এখন আমার মেসেজে, আর আমার মন পড়ে আছে ভিডিও কলের সেই মুহূর্তগুলোতে। খুব ইচ্ছে ছিল—ফোনের এই লেখা দিয়ে নয়, বরং ভিডিও কলে তোমার ওই পাগলামি আর মায়াবী রূপ দেখতে দেখতেই কথাগুলো বলবো। কিন্তু সব ইচ্ছা কি আর পূরণ হয়? তাই না জানু?",
      theme: "sad-love",
      icon: <Moon className="w-16 h-16 text-blue-400" />,
      btnText: "হয়তো হবে...",
      bgGradient: "from-blue-950 via-indigo-950 to-black"
    },
    {
      id: 11,
      title: "একটি প্রতিজ্ঞা",
      content: "আজ রাতে আকাশটা দেখো। ওই ধ্রুবতারাটার মতোই আমার ভালোবাসা তোমার জন্য স্থির থাকবে। ঝড় আসুক, বৃষ্টি আসুক, আমি তোমার ছাতা হয়ে থাকবো। তুমি শুধু আমার হাতটা শক্ত করে ধরে রেখো।",
      theme: "night",
      icon: <Star className="w-16 h-16 text-purple-400 animate-spin-slow" />,
      btnText: "ধরে রাখবো",
      bgGradient: "from-violet-950 via-purple-950 to-black"
    },
    {
      id: 12,
      title: "পাগলামি আর শুভ রাত্রি",
      content: "আর হ্যাঁ, তোমাকে ডিস্টার্ব করার জন্য রিয়েলি সরি জানু। তুমি অনুষ্ঠান এনজয় করছো, আর আমি বকবক করলাম। বিশ্বাস করো, যখন তোমাকে হারানোর ভয় পাই, তখনই এমন পাগল হয়ে যাই। অনুষ্ঠান শেষ করো, আমি না হয় স্বপ্নেই তোমার সাথে বাকি গল্পটা করবো। Good Night, আমার লাল পরি। ❤️",
      theme: "night",
      icon: <Gift className="w-16 h-16 text-pink-500" />,
      btnText: "আবার শুরু থেকে",
      bgGradient: "from-indigo-900 via-purple-900 to-pink-900"
    }
  ];

  const handleNext = () => {
    const nextStepIndex = currentStep + 1;

    if (nextStepIndex > unlockedDays) {
      setShowLockedScreen(true);
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);

      const happyThemes = ['love', 'passion', 'hope', 'rain'];
      if (happyThemes.includes(steps[nextStepIndex].theme)) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      setCurrentStep(0);
    }
  };

  const handleDevTimeTravel = () => {
    setDevModeDays(prev => prev + 1);
    confetti({ particleCount: 50, spread: 40, origin: { y: 0.9 } });
  };

  const currentData = steps[currentStep];

  // --- Show Entrance Screen First ---
  if (!hasEntered) {
    return <EntranceScreen onUnlock={() => setHasEntered(true)} />;
  }

  // --- Locked Screen Render ---
  if (showLockedScreen) {
    const nextEpisode = steps[currentStep + 1];
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black text-white relative overflow-hidden">
        <BackgroundParticles theme="rain" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-8 z-10"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Lock className="w-24 h-24 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            </div>
            <div className="blur-xl opacity-30 pointer-events-none grayscale">
              {nextEpisode?.icon}
            </div>
          </div>

          <div>
            <h2 className="text-xl text-emerald-200/80 font-serif mb-2">পরবর্তী এপিসোড লোড হচ্ছে...</h2>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
              {nextEpisode?.title || "???"}
            </h1>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl ring-1 ring-emerald-500/20">
            <p className="text-emerald-400/60 mb-4 text-sm uppercase tracking-widest">খুলতে বাকি</p>
            <CountdownTimer />
          </div>

          <div className="space-y-2">
             <p className="text-lg text-gray-300 italic font-medium">
               "অপেক্ষা করো বর্ষা, ভালোবাসার গল্পে তাড়াহুড়ো করতে নেই..."
             </p>
             <p className="text-sm text-gray-500">
               কাল সকাল ৬টায় আবার দেখা হবে
             </p>
          </div>

          <button
            onClick={() => setShowLockedScreen(false)}
            className="mt-8 text-sm text-emerald-500/80 hover:text-emerald-400 transition-colors underline"
          >
            আগের পাতায় ফিরে যাও
          </button>

          <button
             onClick={handleDevTimeTravel}
             className="fixed bottom-2 right-2 text-[10px] text-gray-800 hover:text-gray-600 bg-white/10 px-2 py-1 rounded"
          >
             Dev: +1 Day
          </button>

        </motion.div>
      </div>
    );
  }

  // --- Main Screen Render ---
  return (
    <div className={`relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br ${currentData.bgGradient} transition-all duration-1000`}>

      <BackgroundParticles theme={currentData.theme} />

      {/* Music Toggle */}
      <div
        className="absolute top-6 right-6 z-20 p-3 bg-white/10 backdrop-blur-md rounded-full cursor-pointer hover:bg-white/20 transition-all border border-white/10"
        onClick={() => setIsMusicPlaying(!isMusicPlaying)}
      >
        {isMusicPlaying ? <Volume2 className="text-white w-6 h-6" /> : <VolumeX className="text-white/50 w-6 h-6" />}
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-lg"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden text-white relative">

            {/* Day Badge */}
            <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono border border-white/10 text-white/70">
              {currentStep === 0 ? 'SOBUJER BORSHA' : `EPISODE ${currentStep}`}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 h-1.5 absolute top-0 left-0">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                initial={{ width: `${((currentStep) / steps.length) * 100}%` }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="p-8 md:p-12 flex flex-col items-center text-center min-h-[500px] justify-between">

              <div className="relative mt-6">
                <motion.div
                  className="bg-white/10 p-6 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-6 ring-1 ring-white/20"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {currentData.icon}
                </motion.div>
                <div className="absolute inset-0 bg-white/20 blur-3xl -z-10 rounded-full"></div>
              </div>

              <div className="space-y-6">
                <motion.h2
                  className="text-3xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-emerald-100 to-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentData.title}
                </motion.h2>

                <div className="text-lg md:text-xl font-medium leading-relaxed text-white/90 min-h-[150px] flex items-center justify-center">
                  <TypewriterText text={currentData.content} />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className={`group relative mt-8 w-full py-4 rounded-xl font-bold text-lg shadow-xl overflow-hidden transition-all duration-300
                  ${currentData.theme === 'dark'
                    ? 'bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800'
                    : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700'
                  }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                  {/* Logic for Button Text: If next step is locked, show "See Tomorrow" */}
                  {(currentStep + 1) > unlockedDays ? (
                    <>
                      পরের এপিসোড <Lock className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      {currentData.btnText}
                      {currentStep < steps.length - 1 ? <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> : <Sparkles className="w-5 h-5 animate-spin" />}
                    </>
                  )}
                </span>

                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </motion.button>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoveJourney;
