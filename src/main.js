
import './style.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const video = document.querySelector('#monster-video');

// 初始状态
video.pause();

video.addEventListener('loadedmetadata', () => {

  const playhead = { time: 0 };

  // 创建一个统一的滚动时间轴
  const tl = gsap.timeline({
    defaults: {
      ease: 'none'
    },

    scrollTrigger: {
      trigger: '.scroll-section',
      start: 'top top',
      end: '+=4500',
      scrub: true,
      pin: '.scene',
      markers: false
    }
  });

  // 阶段 0：交互提示：一开始就淡出
  tl.to('.scroll-hint', {
  opacity: 0,
  y: -12,
  duration: 0.8
}, 0);

  // 阶段 1：怪物浮现
  tl.to(playhead, {
    time: video.duration,
    duration: 10,
    onUpdate: () => {
      video.currentTime = playhead.time;
    }
  });

  // 阶段 2：渐变成深紫色
  tl.to('.purple-overlay', {
    opacity: 1,
    duration: 2
  });

  // 阶段 3：标题渐入
  tl.fromTo('.end-title',
    {
      opacity: 0,
      scale: 0.95
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1.5
    }
  );

  // 阶段 4：结尾停留
  tl.to({}, {
    duration: 1
  });

}, { once: true });
