import React, { useEffect } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { Button } from '../Button';
import { ButtonSecondary } from '../ButtonSecondary';

type QuestionnaireScoreProps = {
  num: number;
  displayScore: boolean;
  handleRetry: () => void;
  handleViewResults: () => void;
  questionnaireTextScore: string;
};

const staggerScoreItems = stagger(0.3, { startDelay: 0.9 });

const useScoreAnimation: any = (displayScore: boolean) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      'div',
      displayScore ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 },
      {
        duration: 0.3,
        delay: displayScore ? staggerScoreItems : 0,
      }
    );
  }, [displayScore]);

  return scope;
};

export const QuestionnaireScore: React.FC<QuestionnaireScoreProps> = ({
  num,
  displayScore,
  handleRetry,
  handleViewResults,
  questionnaireTextScore,
}) => {
  const scope = useScoreAnimation(displayScore);
  const { score } = useSpring({
    from: { score: 0 },
    score: num,
    delay: 400,
    transition: 500,
  });

  return (
    <motion.div
      className="flex flex-wrap items-center justify-between gap-6 overflow-hidden xl:gap-12"
      variants={{
        hide: { opacity: 0, x: 200, display: 'none' },
        show: { opacity: 1, x: 0, display: 'flex' },
      }}
      animate={displayScore ? 'show' : 'hide'}
      transition={{ type: 'spring', mass: 0.5, stiffness: 100, duration: 0.2 }}
    >
      <div className="w-full shrink-0 border-b pb-6 text-2xl font-bold text-highlight-title">
        Your score
      </div>
      <div className="flex w-full shrink-0 items-center justify-center px-8 md:w-auto">
        <div className="relative flex h-[220px] w-[220px] items-center justify-center text-4xl font-bold text-action-reg">
          <motion.div
            className="absolute inset-0 -z-10 rounded-full"
            variants={{
              hide: {
                background:
                  'radial-gradient(closest-side, white 74%, transparent 75% 100%), conic-gradient(#00c890 0%, #e7fedb 0)',
              },
              show: {
                background: `radial-gradient(closest-side, white 74%, transparent 75% 100%), conic-gradient(#00c890 ${num}%, #e7fedb 0)`,
              },
            }}
            initial="hide"
            whileInView="show"
            transition={{ type: 'ease-in-out', delay: 0.4, duration: 0.5 }}
          >
            <progress value={num} max={100} className="sr-only" />
          </motion.div>
          <animated.div>
            {score.to((num: number) => num.toFixed(0))}
          </animated.div>
          <span>%</span>
        </div>
      </div>
      <div
        className="md:shrink-1 flex w-full flex-1 shrink-0 flex-col gap-10 overflow-hidden md:w-auto [&>div]:origin-left"
        ref={scope}
      >
        <div>You scored {questionnaireTextScore}.</div>
        <div className="max-w-prose">
          {num < 100 ? (
            <>
              Click on the solution button to find out the correct answer for
              any of the questions you may have missed.
            </>
          ) : (
            <>
              <p>You got'em all! Nice work!</p>
              <p>Onward and upward 🎉 🎉 🎉 </p>
            </>
          )}
        </div>
        <div className="flex w-full gap-4">
          {num < 100 && (
            <Button type="button" onClick={handleViewResults}>
              Solution
            </Button>
          )}
          <ButtonSecondary
            className="text-sm"
            onClick={handleRetry}
            type="button"
          >
            Retry
          </ButtonSecondary>
        </div>
      </div>
    </motion.div>
  );
};
