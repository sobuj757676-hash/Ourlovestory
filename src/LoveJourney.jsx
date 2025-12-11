import React, { useState, useRef } from 'react';
import { Heart, ArrowRight, Lock, Moon, Star, Frown, Smile, XCircle, CheckCircle } from 'lucide-react';

const LoveJourney = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimate, setIsAnimate] = useState(false);
  const scrollRef = useRef(null);

  // গল্পের ধাপগুলো (তোমার দেওয়া মেসেজ অনুযায়ী সাজানো)
  const steps = [
    {
      id: 0,
      title: "শুরু করার আগে...",
      content: "বর্ষা, এই জার্নিটা শুধু একটা ওয়েবসাইট না। এটা আজকের দিনে আমার মনের ভেতর ঘটে যাওয়া ঝড়ের একটা ডায়েরি। তুমি কি প্রস্তুত আমার অনুভূতির মুখোমুখি হতে?",
      theme: "neutral",
      icon: <Lock className="w-12 h-12 text-gray-500" />,
      btnText: "হ্যাঁ, আমি প্রস্তুত"
    },
    {
      id: 1,
      title: "তোমার সেই ছবিগুলো...",
      content: "আমি বলেছিলাম আর তুমি সেটা মনে রেখে ঠিক ফোকাস করে ছবি দিয়েছ—এটা দেখে আমি মুগ্ধ! জানো, তোমার গালের এই ছোট ছোট দাগগুলো তোমাকে আরও মায়াবী করে তোলে। আমার কাছে এগুলো কোনো সাধারণ দাগ নয়, এগুলো তোমার সৌন্দর্যের সিগনেচার। খুব মিষ্টি লাগছে তোমায়! চাঁদের গায়েও দাগ থাকে, আর সেটাই চাঁদকে সুন্দর করে।",
      theme: "love",
      icon: <Smile className="w-12 h-12 text-pink-500" />,
      btnText: "সামনে চলো"
    },
    {
      id: 2,
      title: "আরও একটু গভীরে...",
      content: "ইশ! একদম জুম করে দেখিয়ে দিলে? সত্যি বলছি, তোমার গালের ওই পিঁপুলগুলোর প্রেমে আমি বারবার পড়তে রাজি। ওগুলো তোমাকে সবার চেয়ে আলাদা আর স্পেশাল করে তোলে। আমার চোখে এগুলোই তোমার সৌন্দর্যের সবচেয়ে বড় আকর্ষণ। এই মায়াবী মুখের দিকে তাকিয়ে আমি সারাজীবন কাটিয়ে দিতে পারি।",
      theme: "love",
      icon: <Heart className="w-12 h-12 text-red-500 animate-pulse" />,
      btnText: "আরও শুনবে?"
    },
    {
      id: 3,
      title: "সেই ফ্লাইং কিস...",
      content: "উফ! তোমার এই চুমুটা যেন সরাসরি স্ক্রিন ভেদ করে আমার বুকে এসে লাগলো। নীল ড্রেসে তোমাকে এমনিতে পরীর মতো লাগছে, তার ওপর এই আদর... আমি তো জাস্ট শেষ হয়ে গেলাম গো! ইচ্ছে করছে এখনই উড়ে গিয়ে এই আদরটা সত্যি সত্যি নিয়ে আসি।",
      theme: "passion",
      icon: <Star className="w-12 h-12 text-yellow-400" />,
      btnText: "কিন্তু..."
    },
    {
      id: 4,
      title: "হঠাৎ কালো মেঘ...",
      content: "ভেবেছিলাম আমার 'না' বলাটার অন্তত একটু সম্মান তুমি রাখবে। বিয়ের অনুষ্ঠানে গিয়ে তুমি বুঝিয়ে দিলে যে আমার কথার চেয়ে তোমার জেদ বা আনন্দের দাম অনেক বেশি। ঠিক আছে, জিতে গেছো তুমি। কিন্তু মনে রেখো, আমি যেমন পাগল হয়ে ভালোবাসতে পারি, ঠিক তেমনি ভালোবাসার উল্টো পিঠটাও আমি খুব ভালো চিনি।",
      theme: "dark",
      icon: <Frown className="w-12 h-12 text-gray-400" />,
      btnText: "আমার কথাটা শোনো"
    },
    {
      id: 5,
      title: "বইয়ের কভার নয়...",
      content: "সবাই থেকে আলাদা হয়ে তুমি ফোনে চোখ রেখেছো ভাবছো আমি দেখছিনা? বর্ষা, আমি শুধু মানুষের ওপরের চেহারাটা দেখি না, তার ভেতরের রূপটাও আয়নার মতো পরিষ্কার দেখতে পাই। আমি লেখা পড়ি না, লেখার পেছনের মানুষটাকে পড়ি। তাই আমাকে ফাঁকি দেওয়া অতো সহজ না।",
      theme: "dark",
      icon: <XCircle className="w-12 h-12 text-red-400" />,
      btnText: "ভয় পেয়ো না"
    },
    {
      id: 6,
      title: "যদি বিশ্বাস রাখো...",
      content: "তোমাকে শাসন করি কারণ তোমাকে আমি নিজের 'অংশ' ভাবি। যদি কখনো আমার বিশ্বাসের অমর্যাদা না করো, তাহলে দেখবে এই 'সবুজ' মানুষটা তোমার জন্য পৃথিবী উল্টে দিতে পারে। আমার ভালোবাসার গভীরতা মাপতে যেও না, শুধু বিশ্বাসটা রেখো—বিনিময়ে এমন ভালোবাসা পাবে যা কোনোদিন ফুরোবে না।",
      theme: "hope",
      icon: <CheckCircle className="w-12 h-12 text-green-500" />,
      btnText: "সত্যি?"
    },
    {
      id: 7,
      title: "সব ইচ্ছা কি পূরণ হয়?",
      content: "তোমার চোখ এখন আমার মেসেজে, আর আমার মন পড়ে আছে ভিডিও কলের সেই মুহূর্তগুলোতে। খুব ইচ্ছে ছিল—ফোনের এই লেখা দিয়ে নয়, বরং ভিডিও কলে তোমার ওই পাগলামি আর মায়াবী রূপ দেখতে দেখতেই কথাগুলো বলবো। কিন্তু সব ইচ্ছা কি আর পূরণ হয়? তাই না জানু?",
      theme: "sad-love",
      icon: <Moon className="w-12 h-12 text-blue-400" />,
      btnText: "শেষ কথা..."
    },
    {
      id: 8,
      title: "পাগলামি আর শুভ রাত্রি",
      content: "আর হ্যাঁ, তোমাকে ডিস্টার্ব করার জন্য রিয়েলি সরি জানু। তুমি অনুষ্ঠান এনজয় করছো, আর আমি বকবক করলাম। বিশ্বাস করো, যখন তোমাকে হারানোর ভয় পাই, তখনই এমন পাগল হয়ে যাই। অনুষ্ঠান শেষ করো, আমি না হয় স্বপ্নেই তোমার সাথে বাকি গল্পটা করবো। Good Night, আমার লাল পরি। ❤️",
      theme: "night",
      icon: <Moon className="w-12 h-12 text-purple-500" />,
      btnText: "আবার শুরু থেকে"
    }
  ];

  const handleNext = () => {
    setIsAnimate(true);
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(0);
      }
      setIsAnimate(false);
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const getThemeClasses = (theme) => {
    switch (theme) {
      case 'love': return 'bg-pink-50 border-pink-200 text-pink-900';
      case 'passion': return 'bg-red-50 border-red-200 text-red-900';
      case 'dark': return 'bg-gray-900 border-gray-700 text-gray-100 shadow-inner';
      case 'hope': return 'bg-green-50 border-green-200 text-green-900';
      case 'sad-love': return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'night': return 'bg-indigo-900 border-indigo-700 text-white';
      default: return 'bg-white border-gray-200 text-gray-800';
    }
  };

  const getButtonColor = (theme) => {
    switch (theme) {
      case 'dark': return 'bg-gray-700 hover:bg-gray-600';
      case 'night': return 'bg-indigo-600 hover:bg-indigo-500';
      default: return 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600';
    }
  };

  const currentData = steps[currentStep];

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-700 ${currentData.theme === 'dark' || currentData.theme === 'night' ? 'bg-black' : 'bg-gray-100'}`}>

      <div ref={scrollRef} className={`max-w-md w-full rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 transform ${isAnimate ? 'scale-95 opacity-50' : 'scale-100 opacity-100'} ${getThemeClasses(currentData.theme)} border-4`}>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2">
          <div
            className="h-2 transition-all duration-500 bg-green-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        <div className="p-8 flex flex-col items-center text-center min-h-[400px] justify-between">

          <div className="animate-bounce-slow mt-4">
            {currentData.icon}
          </div>

          <div className="my-6">
            <h2 className={`text-2xl font-bold mb-4 font-serif ${currentData.theme === 'dark' ? 'text-red-500' : ''}`}>
              {currentData.title}
            </h2>
            <p className={`text-lg leading-relaxed font-medium whitespace-pre-wrap`}>
              "{currentData.content}"
            </p>
          </div>

          <button
            onClick={handleNext}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2 ${getButtonColor(currentData.theme)}`}
          >
            {currentData.btnText}
            {currentStep < steps.length - 1 && <ArrowRight size={20} />}
          </button>

          <div className="mt-4 text-xs opacity-50">
            ধাপ {currentStep + 1} / {steps.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveJourney;
