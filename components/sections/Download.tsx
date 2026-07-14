"use client";

import { motion } from "framer-motion";
import { Download as DownloadIcon, Package, Shield, FileText, Hash, Terminal } from "lucide-react";
import { SITE } from "@/lib/config";
import { useDownloadUrls } from "@/hooks/useRuntimeConfig";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function DownloadSection() {
  const downloads = useDownloadUrls();
  return (
    <section id="download" className="relative border-t border-border py-24 md:pl-16 lg:pl-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="w-full md:max-w-[50%] text-left">
          <ScrollReveal>
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
                <span className="text-xs text-text-secondary">Get started now</span>
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                <span className="text-gradient">Download {SITE.name}</span>
              </h2>
              <p className="mt-4 text-text-secondary">
                Choose the installation method that works best for you.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-16 w-full md:max-w-[50%] grid gap-8 grid-cols-1">
          <ScrollReveal delay={0.1} direction="left">
            <motion.div
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl glass p-8 transition-all duration-300 hover:glass-hover"
            >
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/5 blur-[60px] group-hover:bg-primary/10 transition-all" />
              <div className="relative z-10">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <DownloadIcon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">Standard Installer</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  The all-in-one setup executable. Downloads WSA packages from GitHub during installation.
                  Includes the full 5-step wizard, Play Store patching, and background service.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Package className="h-4 w-4 text-text-tertiary" />
                    <span className="text-text-secondary">{downloads.installer.label}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FileText className="h-4 w-4 text-text-tertiary" />
                    <span className="text-text-secondary">Size: {downloads.installer.size}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-4 w-4 text-text-tertiary" />
                    <span className="text-text-secondary">Windows 10/11, Requires internet</span>
                  </div>
                </div>
                <div className="mt-8">
                  <MagneticButton>
                    <Button variant="primary" size="lg" href={downloads.installer.url} download className="w-full">
                      <DownloadIcon className="h-5 w-5" />
                      Download {downloads.installer.size}
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="left">
            <motion.div
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl glass p-8 transition-all duration-300 hover:glass-hover"
            >
              <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-accent/5 blur-[60px] group-hover:bg-accent/10 transition-all" />
              <div className="relative z-10">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                  <Package className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">WSA Bundle (Offline)</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  Pre-packaged archive with both WSA Basic and WSA + Play Store packages.
                  Ideal for offline installation, air-gapped systems, or reusing across multiple PCs.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Package className="h-4 w-4 text-text-tertiary" />
                    <span className="text-text-secondary">{downloads.bundle.label}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FileText className="h-4 w-4 text-text-tertiary" />
                    <span className="text-text-secondary">Size: {downloads.bundle.size}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Hash className="h-4 w-4 text-text-tertiary" />
                    <span className="text-[10px] text-text-tertiary break-all font-mono">
                      SHA256: {downloads.bundle.sha256}
                    </span>
                  </div>
                </div>
                <div className="mt-8">
                  <MagneticButton>
                    <Button variant="secondary" size="lg" href={downloads.bundle.url} download className="w-full">
                      <Package className="h-5 w-5" />
                      Download Bundle
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 w-full md:max-w-[50%] rounded-2xl glass p-6">
            <div className="flex flex-col items-center gap-4 text-left sm:flex-row">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warning/10">
                <Terminal className="h-6 w-6 text-warning" />
              </div>
              <p className="text-sm text-text-secondary">
                <strong className="text-text-primary">Silent Install:</strong> Run{' '}
                <code className="rounded bg-bg-card px-2 py-0.5 font-mono text-xs text-accent">
                  WSA_Installer_Setup.exe /S
                </code>{' '}
                for fully automated installation — perfect for deployment and enterprise scenarios.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="mt-8 w-full md:max-w-[50%] rounded-2xl glass p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
              <img
                src="/images/qr-download.png"
                alt="Scan to visit WSA Installer"
                className="h-24 w-24 shrink-0 rounded-xl bg-white/5 p-1"
              />
              <div>
                <p className="text-sm font-medium text-text-primary">Scan to Download</p>
                <p className="mt-1 text-xs text-text-secondary">
                  Open on your phone to visit the WSA Installer website and download the setup directly.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
