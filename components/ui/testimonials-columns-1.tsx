"use client";

import React, { useState } from "react";
import { useReducedMotion } from "motion/react";
import { Quote } from "lucide-react";

export type Testimonial = {
  text: string;
  name: string;
  role: string;

  // पुराने data के साथ compatibility के लिए।
  // ये images render नहीं होंगी।
  image?: string;
  cover?: string;
};

type TestimonialsColumnProps = {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
  paused?: boolean;
};

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "CK"
  );
}

export function TestimonialsColumn({
  className = "",
  testimonials,
  duration = 30,
  paused = false,
}: TestimonialsColumnProps) {
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  if (!testimonials.length) return null;

  const copies = reducedMotion ? [0] : [0, 1];
  const animationPaused = paused || hovered;

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="testimonial-track"
        style={{
          animationDuration: `${Math.max(duration, 10)}s`,
          animationPlayState: animationPaused ? "paused" : "running",
          animationName: reducedMotion ? "none" : undefined,
        }}
      >
        {copies.map((copy) => (
          <React.Fragment key={copy}>
            {testimonials.map(({ text, name, role }, index) => (
              <article
                key={`${copy}-${index}-${name}`}
                aria-hidden={copy === 1 ? true : undefined}
                className="ck-review-card"
              >
                <div className="ck-review-top">
                  <span className="ck-review-quote" aria-hidden="true">
                    <Quote size={22} strokeWidth={1.5} />
                  </span>

                  <span className="ck-review-label">
                    Client perspective
                  </span>
                </div>

                <blockquote className="ck-review-text">
                  {text}
                </blockquote>

                <footer className="ck-review-person">
                  <span className="ck-review-initials" aria-hidden="true">
                    {getInitials(name)}
                  </span>

                  <div className="ck-review-identity">
                    <span className="ck-review-name">{name}</span>
                    {role && (
                      <span className="ck-review-role">{role}</span>
                    )}
                  </div>
                </footer>
              </article>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}