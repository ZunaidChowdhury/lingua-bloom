"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, Mail, X, ExternalLink } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.63 1.63 0 0 0-1.63 1.63 1.63 1.63 0 0 0 1.63 1.63 1.63 1.63 0 0 0 1.63-1.63 1.63 1.63 0 0 0-1.63-1.63z" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    href: "https://programmer-zunaid.vercel.app/",
    label: "Portfolio",
    icon: Globe,
    hoverClass:
      "hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10",
  },
  {
    href: "https://github.com/ZunaidChowdhury",
    label: "GitHub",
    icon: GithubIcon,
    hoverClass: "hover:text-white hover:border-gray-500 hover:bg-white/10",
  },
  {
    href: "https://www.linkedin.com/in/zunaid-chowdhury-784735237/",
    label: "LinkedIn",
    icon: LinkedinIcon,
    hoverClass:
      "hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-500/10",
  },
  {
    href: "mailto:programmer.zunaid@gmail.com",
    label: "Email",
    icon: Mail,
    hoverClass: "hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10",
  },
];

const DeveloperBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // Animate in smoothly from top after 1 second of loading the site
    const timer = setTimeout(() => {
      setIsRendered(true);
      requestAnimationFrame(() => setIsVisible(true));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsRendered(false), 500);
  };

  if (!isRendered) return null;

  return (
    <aside
      aria-label="Developer information"
      className={`w-full overflow-hidden bg-black text-white border-b border-gray-800 relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? "max-h-24 opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-4"
      }`}
    >
      {/* Subtle high-tech ambient gradient accent hairline */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 via-purple-500/30 to-transparent" />

      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-2 px-4 py-2 sm:py-2.5">
        {/* Left Side: Developer Info */}
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="hidden sm:inline text-xs sm:text-sm font-medium text-gray-400">
            Developed by
          </span>

          <Link
            href="https://programmer-zunaid.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 sm:gap-2 !no-underline"
          >
            <span className="font-bold text-xs sm:text-sm md:text-base bg-gradient-to-r from-blue-400 via-purple-500 to-red-500 bg-clip-text text-transparent transition-opacity group-hover:opacity-90 whitespace-nowrap">
              Programmer Zunaid
            </span>

            <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full overflow-hidden border border-gray-700 bg-gray-900 shadow-sm shrink-0 transition-transform duration-200 group-hover:scale-105 group-hover:border-purple-500/60">
              <Image
                src="/assets/programmer-zunaid.png"
                alt="Programmer Zunaid"
                fill
                sizes="(max-width: 640px) 24px, 32px"
                className="object-cover"
                priority={false}
              />
            </div>
          </Link>
        </div>

        {/* Right Side: Modern Social Platform Icons, Links & 'X' Close Button */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 text-gray-400 shrink-0">
          {/* Social Icons */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.label}
                  aria-label={item.label}
                  className={`flex h-6.5 w-6.5 sm:h-7 sm:w-7 md:h-8 md:w-8 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/80 text-gray-400 transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs ${item.hoverClass}`}
                >
                  <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                </Link>
              );
            })}
          </div>

          {/* Quick Portfolio link on tablet & desktop */}
          <Link
            href="https://programmer-zunaid.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-gray-800 bg-gray-900/90 px-3 py-1 text-xs font-semibold text-gray-300 transition-all duration-200 hover:border-gray-700 hover:text-white hover:bg-gray-800 hover:scale-105 active:scale-95 !no-underline"
          >
            <span>Portfolio</span>
            <ExternalLink className="h-3 w-3 text-gray-400" />
          </Link>

          {/* Subtle divider */}
          <div className="h-3.5 sm:h-4 w-[1px] bg-gray-800 shrink-0" />

          {/* Close 'X' Button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close developer bar"
            title="Close"
            className="flex h-6.5 w-6.5 sm:h-7 sm:w-7 md:h-8 md:w-8 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/60 text-gray-400 transition-all duration-200 hover:border-gray-700 hover:bg-gray-800 hover:text-white active:scale-95 cursor-pointer shrink-0"
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DeveloperBar;
