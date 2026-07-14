"use client";

import { useContentConfig } from "@/hooks/useRuntimeConfig";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Code2, Settings, HardDrive, Wrench, Shield, FileCode } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  FileCode: <FileCode className="h-5 w-5" />,
  Settings: <Settings className="h-5 w-5" />,
  HardDrive: <HardDrive className="h-5 w-5" />,
  Wrench: <Wrench className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Code2: <Code2 className="h-5 w-5" />,
};

export default function Documentation() {
  const CONTENT = useContentConfig();
  return (
    <section id="docs" className="relative border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
              <span className="text-xs text-text-secondary">Technical overview</span>
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-gradient">Architecture & Documentation</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              A modern Python + Rust application with a sophisticated build pipeline and security-first architecture.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CONTENT.documentation.map((mod, i) => (
            <ScrollReveal key={mod.title} delay={0.1 * i}>
              <div className="group rounded-2xl glass p-6 transition-all duration-300 hover:glass-hover h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {iconMap[mod.icon] || iconMap.FileCode}
                </div>
                <h3 className="text-sm font-semibold text-text-primary">{mod.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-text-secondary">{mod.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-text-primary text-center mb-6">Technology Stack</h3>
            <div className="overflow-hidden rounded-2xl glass">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left font-medium text-text-primary">Technology</th>
                    <th className="px-6 py-4 text-left font-medium text-text-primary">Version</th>
                    <th className="px-6 py-4 text-left font-medium text-text-primary">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTENT.techStack.map((tech, i) => (
                    <tr key={tech.name} className={i < CONTENT.techStack.length - 1 ? "border-b border-border" : ""}>
                      <td className="px-6 py-4 text-text-primary">{tech.name}</td>
                      <td className="px-6 py-4 text-text-secondary">{tech.version}</td>
                      <td className="px-6 py-4 text-text-secondary">{tech.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
