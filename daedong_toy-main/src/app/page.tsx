"use client";

import Image from 'next/image';
import Iconfy from '../../public/icon.svg';
import MainImg from '../../public/android_better_iphone.svg';
import Scroll from '../../public/scroll.svg';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 1,
    },
  },
};

const hoverEffect = {
  whileHover: {
    scale: 1.05,
    rotate: 2,
    transition: { type: 'spring', stiffness: 300 },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white text-black font-sans flex flex-col items-center overflow-x-hidden overflow-y-hidden">
      <motion.div 
        className="w-full flex justify-between px-6 py-4 text-sm font-semibold"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div className='flex m-0 p-0 items-end' variants={fadeInUp} {...hoverEffect}>
          <Image src={Iconfy} alt="로고" />
          ALA
        </motion.div>
        <motion.a href="#" className="text-black/50 hover:underline" variants={fadeInUp} {...hoverEffect}>
          문의하기
        </motion.a>
      </motion.div>

      <motion.section 
        className="w-full flex flex-col items-start py-20 px-4"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div className='flex flex-col justify-center items-center m-auto' variants={fadeInUp} {...hoverEffect}>
          <motion.div className='flex flex-col' variants={fadeInUp} {...hoverEffect}>
            <h1 className="text-3xl md:text-1xl font-bold">
              아이폰 유저는 알람소리를 커스텀 할 수 없다?
            </h1>
            <p className="mt-10 text-gray-500">
              갤럭시는 마음대로 알람 커스텀 가능한데...?<br />
              이참에 갤럭시로 갈아탈까???
            </p>
          </motion.div>
        </motion.div>
        <motion.div 
          className="mt-10 h-auto flex items-end w-full justify-end relative animate-bounce"
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
        className="py-4 relative top-[-80px] animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        {...hoverEffect}
      >
        <Image src={Scroll} alt='scroll' className='cursor-grab' />
      </motion.div>

      <motion.section 
        className="py-16 px-4 w-full max-w-5xl text-center"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.h2 className="text-xl md:text-2xl font-semibold mb-12" variants={fadeInUp} {...hoverEffect}>
          아이폰 효과음을 커스텀 할 수는 없을까??
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["관절같은 벨소리", "지루한 알림음", "아이폰만의 구식적인 단점"].map((text, idx) => (
            <motion.div 
              key={idx} 
              className="bg-black text-white p-6 rounded-xl" 
              variants={fadeInUp}
              {...hoverEffect}
            >
              <div className="text-4xl mb-2">👻</div>
              <p className="mb-4">{text}</p>
              <audio controls className="w-full">
                <source src="#" type="audio/mp3" />
              </audio>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        className="py-16 px-4 w-full max-w-5xl text-center"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div className='flex items-center mb-10' variants={fadeInUp} {...hoverEffect}>
          <Image src={Iconfy} alt='' className='flex items-center'/>
          <h2 className="text-xl md:text-2xl font-semibold">ALA가 있다면? </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["늘 새로운 벨소리", "편안한 알림음", "아이폰을 재정의해주는 새로운 기능"].map((text, idx) => (
            <motion.div 
              key={idx} 
              className="bg-black text-white p-6 rounded-xl" 
              variants={fadeInUp}
              {...hoverEffect}
            >
              <div className="text-3xl mb-2">✅</div>
              <p className="mb-4">{text}</p>
              <audio controls className="w-full">
                <source src="#" type="audio/mp3" />
              </audio>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.div 
        className="w-full flex justify-center py-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.1 }}
      >
        <button className="px-6 py-4 border border-black rounded-full text-lg font-medium">
          DownLoad ALA🐞 From Now ON
        </button>
      </motion.div>
    </main>
  );
}