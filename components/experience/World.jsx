'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useAnimationControls,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, ArrowDown, Pause, Play } from 'lucide-react';

export default function World({ hero }) {
  const root = useRef(null);
  const heroSection = useRef(null);

  const [paused, setPaused] = useState(false);
  const [mobile, setMobile] = useState(true);
  const reducedMotion = useReducedMotion();
  const pulse = useAnimationControls();

  const rotateX = useSpring(0, { stiffness: 110, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 110, damping: 22 });

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start start', 'end end'],
  });

  // Logo moves beside the text in the following two sections.
  const scrollX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.48, 0.62, 1],
    ['0vw', '0vw', '25vw', '25vw', '-25vw']
  );

  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.82, 0.82]
  );

  const motionEnabled = !paused && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia('(max-width: 800px)');
    const update = () => setMobile(media.matches);

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!motionEnabled) {
      rotateX.set(0);
      rotateY.set(0);
      pulse.stop();
      pulse.set({ scale: 1 });
    }
  }, [motionEnabled, rotateX, rotateY, pulse]);

  function handlePointerMove(event) {
    if (!motionEnabled || mobile || event.pointerType !== 'mouse') {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateX.set(-y * 14);
    rotateY.set(x * 18);
  }

  function resetPointer() {
    rotateX.set(0);
    rotateY.set(0);
  }

  function handlePulse(event) {
    if (
      !motionEnabled ||
      event.pointerType !== 'mouse' ||
      event.button !== 0 ||
      event.target.closest('a, button, input, textarea, select')
    ) {
      return;
    }

    pulse.start({
      scale: [1, 1.045, 1],
      transition: {
        duration: 0.55,
        ease: 'easeInOut',
      },
    });
  }

  return (
    <div className="labs-world ck-logo-world" ref={root}>
      <div className="world-visual" aria-hidden="true">
        <div className="world-halo" />

        {hero?.url && (
          <img
            className="world-admin-image"
            src={hero.url}
            alt=""
          />
        )}

        <div className="ck-hero-logo-position">
          <motion.div
            className="ck-hero-logo-scroll"
            style={{
              x: mobile || reducedMotion ? 0 : scrollX,
              scale: mobile || reducedMotion ? 1 : scrollScale,
            }}
          >
            <motion.div
              className="ck-hero-logo-tilt"
              style={{ rotateX, rotateY }}
            >
              <motion.div animate={pulse}>
                <img
                  src="/assets/clickkart-hero-3d.png"
                  className="ck-hero-logo-image"
                  style={{
                    animationPlayState: motionEnabled
                      ? 'running'
                      : 'paused',
                  }}
                  width={1254}
                  height={1254}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  draggable={false}
                  alt=""
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <section
        className="labs-hero"
        ref={heroSection}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        onPointerDown={handlePulse}
      >
        <div className="hero-coordinates">
          <span>INDEPENDENT DIGITAL AGENCY</span>
          <span>PATNA, INDIA ↗ EVERYWHERE</span>
        </div>

        <h1 className="labs-wordmark">
          BEYOND
          <br />
          <span>THE CLICK.</span>
        </h1>

        <div className="hero-side-note">
          STRATEGY
          <br />
          DESIGN
          <br />
          GROWTH
          <span>↘</span>

          {motionEnabled && (
            <small>
              MOVE YOUR CURSOR
              <br />
              CLICK TO PULSE
            </small>
          )}
        </div>

        <div className="hero-caption">
          <p>
            We turn ambitious brands into
            <br />
            digital experiences that
            <br />
            <b>connect, convert and grow.</b>
          </p>

          <Link href="/contact-us" className="orbit-cta">
            <span>
              LET’S MAKE
              <br />
              SOMETHING MOVE
            </span>
            <ArrowUpRight />
          </Link>
        </div>

        <div className="hero-foot">
          <a href="#discovery" className="scroll-invite">
            <ArrowDown size={16} />
            SCROLL TO DISCOVER
          </a>

          {!reducedMotion && (
            <button
              type="button"
              className="ck-logo-motion-button"
              onClick={() => setPaused((value) => !value)}
              aria-pressed={paused}
              aria-label={
                paused ? 'Resume logo animation' : 'Pause logo animation'
              }
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
              <span>{paused ? 'RESUME MOTION' : 'PAUSE MOTION'}</span>
            </button>
          )}
        </div>
      </section>

      <section
        id="discovery"
        className="world-chapter chapter-one"
      >
        <div className="chapter-copy">
          <span className="lab-label">
            01 / A DIFFERENT PERSPECTIVE
          </span>

          <h2>
            GOOD IDEAS.
            <br />
            NO LIMITS.
          </h2>

          <p>
            From your first website to your next campaign, we bring
            technology and marketing together. Thoughtful design.
            Useful digital solutions. A team that understands where
            you want to go.
          </p>

          <Link href="/about-us" className="bracket-link">
            [ MEET CLICKKART <ArrowUpRight size={16} /> ]
          </Link>
        </div>

        <span className="chapter-background" aria-hidden="true">
          CREATE
        </span>
      </section>

      <section className="world-chapter chapter-two">
        <div className="chapter-copy">
          <span className="lab-label">
            02 / BUILT FOR WHAT’S NEXT
          </span>

          <h2>
            MAKE YOUR
            <br />
            PRESENCE
            <br />
            <em>FELT.</em>
          </h2>

          <p>
            Design that gets noticed. Websites that work harder.
            Campaigns that connect you with the right people.
          </p>

          <Link href="/solutions" className="bracket-link">
            [ EXPLORE OUR SOLUTIONS <ArrowUpRight size={16} /> ]
          </Link>
        </div>

        <span className="chapter-background" aria-hidden="true">
          CONNECT
        </span>
      </section>
    </div>
  );
}