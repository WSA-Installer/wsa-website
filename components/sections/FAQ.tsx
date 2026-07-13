"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTENT, MONETIZATION, SITE } from "@/lib/config";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ChevronDown } from "lucide-react";

function FAQItem({
  question,
  answer,
  isOpen,
  toggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-text-primary"
      >
        <span className="text-sm font-medium text-text-primary">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-text-secondary" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-text-secondary">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="relative border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
              <span className="text-xs text-text-secondary">Got questions?</span>
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-gradient">Frequently Asked Questions</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 rounded-2xl glass p-6 sm:p-8">
            {CONTENT.faq.map((item, i) => (
              <FAQItem
                key={i}
                question={item.q}
                answer={item.a}
                isOpen={openIndex === i}
                toggle={() => toggle(i)}
              />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 text-center">
            <p className="text-sm text-text-secondary">
              Still have questions? Watch the{" "}
              <a
                href={SITE.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-hover underline"
              >
                video guide
              </a>{" "}
              or join the{" "}
              <a
                href={SITE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-hover underline"
              >
                GitHub community
              </a>
              .
            </p>
          </div>
        </ScrollReveal>
      </div>

      {MONETIZATION.adPlacements.find(a => a.slot === "after-faq")?.enabled && (
        <div className="mx-auto mt-12 max-w-7xl px-4" id="ad-after-faq" />
      )}
    </section>
  );
}
