"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Iconfy from '../../public/icon.svg';
import MainImg from '../../public/android_better_iphone.svg';
import Scroll from '../../public/scroll.svg';
import { motion, useInView } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.7,
    },
  },
};

const hoverEffect = {
  whileHover: {
    scale: 1.05,
    rotate: 4,
    transition: { type: 'spring', stiffness: 300 },
  },
};

// API URL 상수
const API_BASE_URL = 'https://ala-api.injun.dev';
// 방문 카운트 제한 시간 (24시간 = 86400000 밀리초)
const VISIT_COOLDOWN = 86400000; 

export default function Home() {
  const mainSectionRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const featureSection1Ref = useRef(null);
  const featureSection2Ref = useRef(null);
  const ctaButtonRef = useRef(null);
  
  // 방문자 수와 다운로드 수를 저장할 상태
  const [trafficStats, setTrafficStats] = useState({ visitCount: 0, downloadCount: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [showVisitWarning, setShowVisitWarning] = useState(false);
  
  const isMainSectionInView = useInView(mainSectionRef, { once: false, amount: 0.3 });
  const isScrollIndicatorInView = useInView(scrollIndicatorRef, { once: false });
  const isFeatureSection1InView = useInView(featureSection1Ref, { once: false, amount: 0.2 });
  const isFeatureSection2InView = useInView(featureSection2Ref, { once: false, amount: 0.2 });
  const isCtaButtonInView = useInView(ctaButtonRef, { once: false });

  // 페이지 로드 시 방문 수 증가 API 호출
  useEffect(() => {
    const registerVisit = async () => {
      try {
        // 로컬 스토리지에서 마지막 방문 시간 확인
        const lastVisit = localStorage.getItem('lastVisit');
        const currentTime = Date.now();
        
        if (lastVisit && (currentTime - parseInt(lastVisit) < VISIT_COOLDOWN)) {
          // 24시간 내 이미 방문한 경우
          setShowVisitWarning(true);
          // 3초 후 경고창 숨기기
          setTimeout(() => setShowVisitWarning(false), 3000);
          
          // 방문 수는 증가시키지 않고 기존 통계만 가져오기
          fetchTrafficStats();
          return;
        }
        
        // 새로운 방문으로 처리
        localStorage.setItem('lastVisit', currentTime.toString());
        
        // 방문 수 증가 API 호출
        await fetch(`${API_BASE_URL}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        // 방문 및 다운로드 수 조회 API 호출
        fetchTrafficStats();
      } catch (error) {
        console.error('방문 등록 중 오류 발생:', error);
      }
    };
    
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      registerVisit();
    }
  }, []);
  
  // 트래픽 통계 가져오기
  const fetchTrafficStats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/check`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('통계 가져오기 실패');
      }
      
      const data = await response.json();
      if (data && data.length > 0) {
        setTrafficStats(data[0]);
      }
    } catch (error) {
      console.error('트래픽 통계 가져오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 다운로드 버튼 클릭 핸들러
  const handleDownloadClick = async () => {
    try {
      // 다운로드 수 증가 API 호출
      await fetch(`${API_BASE_URL}/download`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // 최신 통계 다시 가져오기
      fetchTrafficStats();
      
      // 실제 앱 다운로드 로직이 필요하다면 여기에 추가
      alert('다운로드가 시작됩니다. 감사합니다!');
    } catch (error) {
      console.error('다운로드 등록 중 오류 발생:', error);
    }
  };

  return (
    <main className="flex flex-col items-center w-full min-h-screen overflow-x-hidden font-sans text-black bg-white select-none">
      {/* 중복 방문에 대한 경고창 */}
      {showVisitWarning && (
        <div className="fixed z-50 max-w-md p-4 text-yellow-700 transition-opacity duration-300 transform -translate-x-1/2 bg-yellow-100 border-l-4 border-yellow-500 rounded shadow-md top-4 left-1/2">
          <div className="flex">
            <div className="py-1">
              <svg className="w-6 h-6 mr-4 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">알림</p>
              <p className="text-sm">24시간 이내에 이미 방문하셨습니다. 방문 수가 중복으로 카운트되지 않습니다.</p>
            </div>
          </div>
        </div>
      )}
      
      <motion.div 
        className="flex justify-between w-full px-4 py-4 text-sm font-semibold sm:px-6"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div className='flex items-center p-0 m-0' variants={fadeInUp} {...hoverEffect}>
          <Image src={Iconfy} alt="로고" width={35} />
          <span className='flex mt-1 ml-1'>ALA</span>
        </motion.div>
        
        {/* 방문자 & 다운로드 카운터 표시 */}
        <motion.div className="flex gap-2 text-xs sm:gap-4" variants={fadeInUp}>
          <div className="flex flex-col items-center">
            <span className="font-bold">방문자</span>
            <span>{isLoading ? '로딩 중...' : trafficStats.visitCount}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">다운로드</span>
            <span>{isLoading ? '로딩 중...' : trafficStats.downloadCount}</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.section 
        ref={mainSectionRef}
        className="flex flex-col items-start w-full px-4 py-10 sm:py-20"
        initial="initial"
        animate={isMainSectionInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <motion.div className='flex flex-col items-center justify-center mx-auto text-center cursor-pointer md:ml-20 md:text-left' variants={fadeInUp} {...hoverEffect}>
          <motion.div className='flex flex-col max-w-3xl' variants={fadeInUp} {...hoverEffect}>
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              아이폰 유저는 알람소리를 커스텀 할 수 없다?
            </h1>
            <p className="mt-4 text-lg text-gray-500 sm:mt-5 sm:text-xl md:text-2xl">
              갤럭시는 마음대로 알람 커스텀 가능한데...?<br />
              이참에 갤럭시로 갈아탈까???
            </p>
          </motion.div>
        </motion.div>
        <motion.div 
          className="relative flex items-end justify-center w-full h-auto mt-8 md:justify-end sm:mt-10 animate-bounce"
          variants={fadeInUp}
          {...hoverEffect}
        >
          <Image
            src={MainImg}
            alt="메인 이미지"
            className='w-[300px] sm:w-[400px] md:w-[500px] mx-auto md:mr-[60px]'
          />
        </motion.div>
      </motion.section>

      <motion.div 
        ref={scrollIndicatorRef}
        className="py-4 relative top-[-40px] sm:top-[-80px]"
        initial={{ opacity: 0 }}
        animate={isScrollIndicatorInView ? { opacity: 1, y: [0, -10, 0] } : { opacity: 0 }}
        transition={{ 
          opacity: { delay: 0.5, duration: 1 },
          y: { repeat: Infinity, duration: 1.5 }
        }}
      >
        <Image src={Scroll} alt='scroll' className='cursor-grab' />
      </motion.div>

      <motion.section 
        ref={featureSection1Ref}
        className="w-full max-w-5xl px-4 py-10 text-center sm:py-16"
        initial="initial"
        animate={isFeatureSection1InView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <motion.h2 className="mb-10 text-2xl font-semibold cursor-pointer sm:mb-20 sm:text-3xl" variants={fadeInUp} {...hoverEffect}>
          아이폰 효과음을 커스텀 할 수는 없을까?? 😥
        </motion.h2>
        <div className="grid grid-cols-1 gap-4 cursor-pointer sm:grid-cols-2 md:grid-cols-3 sm:gap-8">
          <motion.div 
            className="p-4 text-white bg-black sm:p-6 md:p-10 rounded-xl" 
            variants={fadeInUp}
            custom={0}
            {...hoverEffect}
          >
            <div className="mb-2 text-3xl sm:text-4xl">👻</div>
            <p className="mb-4 sm:mb-10">한결같은 벨소리</p>
            <audio controls className="w-full">
              <source src="/sounds/iphonebell.mp3" type="audio/mp3" />
            </audio>
          </motion.div>
          
          <motion.div 
            className="p-4 text-white bg-black sm:p-6 md:p-10 rounded-xl" 
            variants={fadeInUp}
            custom={1}
            {...hoverEffect}
          >
            <div className="mb-2 text-3xl sm:text-4xl">👻</div>
            <p className="mb-4 sm:mb-10">지루한 알림음</p>
            <audio controls className="w-full">
              <source src="/sounds/iphonenoti.mp3" type="audio/mp3" />
            </audio>
          </motion.div>
          
          <motion.div 
            className="p-4 text-white bg-black sm:p-6 md:p-10 rounded-xl sm:col-span-2 md:col-span-1" 
            variants={fadeInUp}
            custom={2}
            {...hoverEffect}
          >
            <div className="mb-2 text-3xl sm:text-4xl">👻</div>
            <p className="mb-4 sm:mb-10">아이폰만의 구시대적인 단점</p>
            <audio controls className="w-full">
              <source src="/sounds/failed.mp3" type="audio/mp3" />
            </audio>
          </motion.div>
        </div>
      </motion.section>

      <div className='mt-20 mb-20 sm:mt-40 sm:mb-40'>
        <span className='text-4xl'>.</span><br />
        <span className='text-4xl'>.</span><br />
        <span className='text-4xl'>.</span><br />
      </div>

      <motion.section 
        ref={featureSection2Ref}
        className="w-full max-w-5xl px-4 py-10 text-center sm:py-16"
        initial="initial"
        animate={isFeatureSection2InView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <motion.h2 className="mb-10 text-2xl font-semibold cursor-pointer sm:mb-20 sm:text-3xl" variants={fadeInUp} {...hoverEffect}>
          ALA가 있다면 !? 🤔
        </motion.h2>
        <div className="grid grid-cols-1 gap-4 mb-20 cursor-pointer sm:grid-cols-2 md:grid-cols-3 sm:gap-8 sm:mb-40">
          <motion.div 
            className="p-4 text-white bg-black sm:p-6 md:p-10 rounded-xl" 
            variants={fadeInUp}
            custom={0}
            {...hoverEffect}
          >
            <div className="mb-2 text-2xl sm:text-3xl">✅</div>
            <p className="mb-4 sm:mb-10">늘 짜릿한 벨소리</p>
            <audio controls className="w-full">
              <source src="/sounds/gongsup.mp3" type="audio/mp3" />
            </audio>
          </motion.div>
          
          <motion.div 
            className="p-4 text-white bg-black sm:p-6 md:p-10 rounded-xl" 
            variants={fadeInUp}
            custom={1}
            {...hoverEffect}
          >
            <div className="mb-2 text-2xl sm:text-3xl">✅</div>
            <p className="mb-4 sm:mb-10">아이유의 모닝콜</p>
            <audio controls className="w-full">
              <source src="/sounds/iubell.mp3" type="audio/mp3" />
            </audio>
          </motion.div>
          
          <motion.div 
            className="p-4 text-white bg-black sm:p-6 md:p-10 rounded-xl sm:col-span-2 md:col-span-1" 
            variants={fadeInUp}
            custom={2}
            {...hoverEffect}
          >
            <div className="mb-2 text-2xl sm:text-3xl">✅</div>
            <p className="mb-4 sm:mb-10">아이폰을 재정의해주는 신규 기능</p>
            <audio controls className="w-full">
              <source src="/sounds/sucess.mp3" type="audio/mp3" />
            </audio>
          </motion.div>
        </div>
      </motion.section>

      <motion.h2 className="px-4 mb-10 text-3xl font-semibold text-center cursor-pointer sm:text-4xl md:text-5xl sm:mb-20">
          아이폰 효과음을 커스텀 하다.
      </motion.h2>

      <motion.div 
        ref={ctaButtonRef}
        className="flex justify-center w-full px-4 py-6 mb-20 sm:py-10 sm:mb-40"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isCtaButtonInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.1 }}
      >
        <button 
          className="flex items-start justify-center w-full px-6 py-4 text-base font-medium text-center border-2 border-black cursor-pointer sm:py-6 md:py-10 sm:text-lg md:text-xl sm:px-20 md:px-40 lg:px-80 rounded-2xl sm:w-auto"
          onClick={handleDownloadClick}
        >
          DownLoad ALA From Now ON
        </button>
      </motion.div>
    </main>
  );
}