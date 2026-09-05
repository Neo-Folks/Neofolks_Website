import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  fadeIn?: boolean;
  delay?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className,
  fadeIn = true,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!fadeIn) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [fadeIn]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-500',
        fadeIn && !isVisible ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0',
        className
      )}
      style={{
        transitionDelay: `${Math.min(delay, 300)}ms`,
        transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;
