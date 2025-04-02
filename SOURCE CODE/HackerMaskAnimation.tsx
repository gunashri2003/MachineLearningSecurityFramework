import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './hackerMaskAnimation.css';

interface HackerMaskAnimationProps {
  onAnimationComplete: () => void;
}

const HackerMaskAnimation: React.FC<HackerMaskAnimationProps> = ({ onAnimationComplete }) => {
  const props = useSpring({
    from: { height: '0%' },
    to: { height: '100%' },
    onRest: onAnimationComplete,
  });

  useEffect(() => {
    // Trigger the animation when the component mounts
  }, []);

  return <animated.div className="hacker-mask" style={props}></animated.div>;
};

export default HackerMaskAnimation;
