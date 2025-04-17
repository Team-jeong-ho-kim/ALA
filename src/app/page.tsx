"use client";

import { useRef } from 'react';
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

export default function Home() {
  const mainSectionRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const featureSection1Ref = useRef(null);
  const featureSection2Ref = useRef(null);
  const ctaButtonRef = useRef(null);
  
  const isMainSectionInView = useInView(mainSectionRef, { once: false, amount: 0.3 });
  const isScrollIndicatorInView = useInView(scrollIndicatorRef, { once: false });
  const isFeatureSection1InView = useInView(featureSection1Ref, { once: false, amount: 0.2 });
  const isFeatureSection2InView = useInView(featureSection2Ref, { once: false, amount: 0.2 });
  const isCtaButtonInView = useInView(ctaButtonRef, { once: false });

  return (
    <main className="flex flex-col items-center w-full min-h-screen overflow-x-hidden font-sans text-black bg-white select-none">
      <motion.div 
        className="flex justify-between w-full px-6 py-4 text-sm font-semibold"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div className='flex items-center p-0 m-0' variants={fadeInUp} {...hoverEffect}>
          <Image src={Iconfy} alt="로고" width={35} />
          <span className='flex mt-1 ml-1'>ALA</span>
        </motion.div>
      </motion.div>

      <motion.section 
        ref={mainSectionRef}
        className="flex flex-col items-start w-full px-4 py-20"
        initial="initial"
        animate={isMainSectionInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <motion.div className='flex flex-col items-center justify-center ml-20 cursor-pointer' variants={fadeInUp} {...hoverEffect}>
          <motion.div className='flex flex-col' variants={fadeInUp} {...hoverEffect}>
            <h1 className="text-5xl font-bold md:text-1xl">
              아이폰 유저는 알람소리를 커스텀 할 수 없다?
            </h1>
            <p className="mt-5 text-2xl text-gray-500">
              갤럭시는 마음대로 알람 커스텀 가능한데...?<br />
              이참에 갤럭시로 갈아탈까???
            </p>
          </motion.div>
        </motion.div>
        <motion.div 
          className="relative flex items-end justify-end w-full h-auto mt-10 animate-bounce"
          variants={fadeInUp}
          {...hoverEffect}
        >
          <Image
            src={MainImg}
            alt="메인 이미지"
            className='w-[500px] flex items-end mr-[60px]'
          />
        </motion.div>
      </motion.section>

      <motion.div 
        ref={scrollIndicatorRef}
        className="py-4 relative top-[-80px]"
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
        className="w-full max-w-5xl px-4 py-16 text-center"
        initial="initial"
        animate={isFeatureSection1InView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <motion.h2 className="mb-20 text-3xl font-semibold cursor-pointer" variants={fadeInUp} {...hoverEffect}>
          아이폰 효과음을 커스텀 할 수는 없을까?? 😥
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 cursor-pointer md:grid-cols-3">
          <motion.div 
            className="p-10 text-white bg-black rounded-xl" 
            variants={fadeInUp}
            custom={0}
            {...hoverEffect}
          >
            <div className="mb-2 text-4xl">👻</div>
            <p className="mb-10">한결같은 벨소리</p>
            <audio controls className="w-full">
              <source src="/sounds/iphonebell" type="audio/mp3" />
            </audio>
          </motion.div>
          
          <motion.div 
            className="p-10 text-white bg-black rounded-xl" 
            variants={fadeInUp}
            custom={1}
            {...hoverEffect}
          >
            <div className="mb-2 text-4xl">👻</div>
            <p className="mb-10">지루한 알림음</p>
            <audio controls className="w-full">
              <source src="/sounds/iphonenoti" type="audio/mp3" />
            </audio>
          </motion.div>
          
          <motion.div 
            className="p-10 text-white bg-black rounded-xl" 
            variants={fadeInUp}
            custom={2}
            {...hoverEffect}
          >
            <div className="mb-2 text-4xl">👻</div>
            <p className="mb-10">아이폰만의 구시대적인 단점</p>
            <audio controls className="w-full">
              <source src="/sounds/failed.mp3" type="audio/mp3" />
            </audio>
          </motion.div>
        </div>
      </motion.section>

      <div className='mt-40 mb-40'>
        <span className='text-4xl'>.</span><br />
        <span className='text-4xl'>.</span><br />
        <span className='text-4xl'>.</span><br />
      </div>

      <motion.section 
        ref={featureSection2Ref}
        className="w-full max-w-5xl px-4 py-16 text-center"
        initial="initial"
        animate={isFeatureSection2InView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <motion.h2 className="mb-20 text-3xl font-semibold cursor-pointer" variants={fadeInUp} {...hoverEffect}>
          ALA가 있다면 !? 🤔
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 cursor-pointer mb-100 md:grid-cols-3">
          <motion.div 
            className="p-10 text-white bg-black rounded-xl" 
            variants={fadeInUp}
            custom={0}
            {...hoverEffect}
          >
            <div className="mb-2 text-3xl">✅</div>
            <p className="mb-10">늘 짜릿한 벨소리</p>
            <audio controls className="w-full">
              <source src="/sounds/gongsup.mp3" type="audio/mp3" />
            </audio>
          </motion.div>
          
          <motion.div 
            className="p-10 text-white bg-black rounded-xl" 
            variants={fadeInUp}
            custom={1}
            {...hoverEffect}
          >
            <div className="mb-2 text-3xl">✅</div>
            <p className="mb-10">아이유의 모닝콜</p>
            <audio controls className="w-full">
              <source src="/sounds/iubell.mp3" type="audio/mp3" />
            </audio>
          </motion.div>
          
          <motion.div 
            className="p-10 text-white bg-black rounded-xl" 
            variants={fadeInUp}
            custom={2}
            {...hoverEffect}
          >
            <div className="mb-2 text-3xl">✅</div>
            <p className="mb-10">아이폰을 재정의해주는 신규 기능</p>
            <audio controls className="w-full">
              <source src="/sounds/sucess.mp3" type="audio/mp3" />
            </audio>
          </motion.div>
        </div>
      </motion.section>

      <motion.h2 className="text-5xl font-semibold cursor-pointer mb-100">
          아이폰 효과음을 커스텀 하다.
      </motion.h2>

      <motion.div 
        ref={ctaButtonRef}
        className="flex justify-center w-full py-10 mb-50"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isCtaButtonInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.1 }}
      >
        <button className="flex items-start py-10 text-xl font-medium border-2 border-black cursor-pointer px-80 rounded-2xl ">
          DownLoad ALA From Now ON
        </button>
      </motion.div>
    </main>
  );
}