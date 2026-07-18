export type BlogBlock =
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "code"; lang?: string; code: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; tone?: "info" | "warning" | "tip"; text: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "img"; alt: string; caption?: string };

export interface BlogSeriesPost {
  slug: string;
  title: string;
}

export interface BlogSeries {
  name: string;
  part: number;
  total: number;
  posts: BlogSeriesPost[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  author?: string;
  gradient?: string;
  series?: BlogSeries;
  body: BlogBlock[];
}

function slugId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const GRAD = [
  "from-blue-500/20 to-cyan-500/20",
  "from-purple-500/20 to-pink-500/20",
  "from-yellow-500/20 to-orange-500/20",
  "from-green-500/20 to-emerald-500/20",
  "from-red-500/20 to-rose-500/20",
  "from-teal-500/20 to-cyan-500/20",
  "from-sky-500/20 to-blue-500/20",
  "from-amber-500/20 to-yellow-500/20",
  "from-violet-500/20 to-purple-500/20",
  "from-lime-500/20 to-green-500/20",
  "from-rose-500/20 to-pink-500/20",
  "from-indigo-500/20 to-blue-500/20",
];

function h2(text: string): BlogBlock {
  return { type: "h2", text, id: slugId(text) };
}

export const BLOG_POSTS: BlogPost[] = [
  /* ============================ A. FUNDAMENTALS ============================ */
  {
    slug: "what-is-wsa",
    title: "What Is Windows Subsystem for Android (WSA)?",
    date: "2026-03-12",
    excerpt:
      "A plain-language introduction to WSA: what it is, why Microsoft built it, and how it lets you run Android apps on Windows 11.",
    tags: ["wsa", "android", "windows", "basics"],
    readTime: "5 min read",
    gradient: GRAD[0],
    body: [
      h2("The Short Answer"),
      {
        type: "p",
        text: "Windows Subsystem for Android (WSA) is a compatibility layer from Microsoft that lets you run Android apps on Windows 11. It bundles a real Android Open Source Project (AOSP) environment, an Intel/ARM translation layer, and deep Windows integration so Android apps appear as native Windows windows in the Start Menu and taskbar.",
      },
      {
        type: "p",
        text: "Think of it as the Android cousin of WSL (Windows Subsystem for Linux). Where WSL runs Linux binaries, WSA runs Android APKs — without an emulator window, without BlueStacks-style overhead, and without leaving Windows.",
      },
      h2("Why Did Microsoft Build It?"),
      {
        type: "p",
        text: "Microsoft announced WSA at its October 2021 Surface event alongside the Amazon Appstore partnership. The goal was simple: bring the massive Android app catalog to Windows PCs, especially touch-enabled and ARM devices, in a way that felt first-class rather than emulated.",
      },
      {
        type: "quote",
        text: "WSA was Microsoft's answer to 'why can't I just run my phone apps on my laptop?'",
        author: "WSA Installer Team",
      },
      h2("What You Get Out of the Box"),
      {
        type: "list",
        items: [
          "Android 13 (AOSP) runtime integrated into Windows 11",
          "Start Menu and taskbar entries for each installed Android app",
          "Shared clipboard, file sharing, and notifications with Windows",
          "Subsystem-level networking so Android apps use your PC connection",
          "An 'Android Settings' app for app management and permissions",
        ],
      },
      h2("What It Is Not"),
      {
        type: "callout",
        tone: "info",
        text: "WSA is not a full Android desktop, not a phone emulator with a skin, and not Google-certified. It ships without the Google Play Store by default — that's where tools like WSA Installer come in.",
      },
      h2("How People Use It Today"),
      {
        type: "p",
        text: "Even after Microsoft announced deprecation, WSA remains popular for side-loading apps not available on the Microsoft Store, running messaging clients, games, and utility apps, and for developers testing Android builds on their PC. Community-maintained installers keep it alive on both Windows 10 and 11.",
      },
      {
        type: "p",
        text: "Ready to try it? The WSA Installer project automates the entire setup — including Play Store — in a single click. Continue to the architecture deep-dive to see how it all works under the hood.",
      },
    ],
  },
  {
    slug: "wsa-architecture-explained",
    title: "How Windows Subsystem for Android Actually Works",
    date: "2026-03-15",
    excerpt:
      "A technical walkthrough of the WSA stack: the AOSP runtime, the libhoudini/llvmpipe translation layer, init, and how Android apps become Windows windows.",
    tags: ["wsa", "architecture", "android", "deep-dive"],
    readTime: "8 min read",
    gradient: GRAD[3],
    body: [
      h2("The Big Picture"),
      {
        type: "p",
        text: "WSA is not an emulator in the traditional sense. It is a lightweight virtual machine based on the same Hyper-V-backed plumbing as WSL2, running a trimmed AOSP image. Android apps execute as real Linux processes inside that VM, and their windows are remoted to the Windows desktop.",
      },
      h2("The Core Components"),
      {
        type: "list",
        items: [
          "A small Linux kernel (derived from WSL2's) booting the AOSP userland",
          "Android Runtime (ART) executing Dalvik/ART bytecode",
          "libhoudini / libndk_translation for ARM-on-x86 and x86-on-ARM translation",
          "A 'VirtWifi' bridged network interface to your host connection",
          "The Windows-side broker that turns Android windows into native windows",
        ],
      },
      h2("Instruction Translation"),
      {
        type: "p",
        text: "Most Android apps are built for ARM. On an x86 PC, WSA uses libhoudini (for ARMv7) and libndk_translation (for ARM64 native libraries) to translate instructions at runtime. On ARM Windows devices (like Snapdragon PCs), the reverse path handles x86 apps. This is why some heavy 3D games misbehave — translation has a cost.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "If an app crashes on launch with a translation error, it usually means a native library that libhoudini cannot handle. Prefer ARM-builds of apps on ARM PCs and x86 builds on Intel/AMD PCs.",
      },
      h2("Graphics and the Render Pipeline"),
      {
        type: "p",
        text: "WSA renders via ANGLE on top of your host GPU (Direct3D). When GPU acceleration is unavailable it falls back to llvmpipe software rendering — functional but slow. The graphics stack is the most common source of 'black screen' and 'laggy UI' complaints.",
      },
      h2("How an App Becomes a Window"),
      {
        type: "p",
        text: "When you launch an Android app, the subsystem starts its activity, and the Windows broker creates a native window that mirrors the app's surface. Clipboard, file picks, and notifications are bridged through the Windows App SDK so the experience feels local. This is nearly identical in spirit to how WSLg remotes Linux GUI apps via RDP.",
      },
      h2("Where WSA Installer Fits"),
      {
        type: "p",
        text: "Microsoft's official path only delivered Amazon Appstore apps. WSA Installer extends the platform by patching Google Play Services and the Play Store onto the subsystem, enabling the full Android app catalog — all while keeping the same underlying architecture described here.",
      },
    ],
  },
  {
    slug: "wsa-vs-wsl",
    title: "WSA vs WSL: What's the Difference?",
    date: "2026-03-18",
    excerpt:
      "Both are 'Windows Subsystem for…' projects, but they serve very different runtimes. Here's how WSA and WSL compare.",
    tags: ["wsa", "wsl", "comparison", "windows"],
    readTime: "4 min read",
    gradient: GRAD[6],
    body: [
      h2("Same Family, Different Guest"),
      {
        type: "p",
        text: "WSL runs Linux userlands; WSA runs an Android (AOSP) userland. Both rely on a Hyper-V-backed VM and the same kernel technology, but the workloads are completely different: command-line and servers vs touch-first mobile apps.",
      },
      h2("Side-by-Side"),
      {
        type: "list",
        items: [
          "Guest OS: WSL = Linux distros (Ubuntu, Debian…) · WSA = Android 13 (AOSP)",
          "Primary use: WSL = dev/CLI/servers · WSA = mobile apps & games",
          "Windowing: WSLg remotes X11/Wayland · WSA remotes Android activities",
          "App source: WSL = package managers · WSA = APK / Appstore / Play Store",
          "Translation: WSL = none needed · WSA = libhoudini/libndk for ARM",
        ],
      },
      h2("Do They Conflict?"),
      {
        type: "p",
        text: "No. WSA actually depends on the Virtual Machine Platform that WSL also uses. Enabling one makes enabling the other easier. WSA Installer automatically enables VirtualMachinePlatform and Hyper-V prerequisites for you.",
      },
      {
        type: "callout",
        tone: "info",
        text: "You can run WSL and WSA side by side on the same Windows 11 machine without performance penalties beyond shared RAM.",
      },
      h2("Which Should You Learn?"),
      {
        type: "p",
        text: "If you write code, learn WSL. If you want to run Android apps on your PC, you want WSA. Many developers run both: Linux tooling in WSL, Android testing in WSA.",
      },
    ],
  },
  {
    slug: "wsa-system-requirements",
    title: "WSA System Requirements, Explained",
    date: "2026-03-20",
    excerpt:
      "CPU virtualization, RAM, the Virtual Machine Platform, and why Administrator rights matter — a deep dive into what WSA really needs.",
    tags: ["wsa", "requirements", "windows", "setup"],
    readTime: "6 min read",
    gradient: GRAD[11],
    body: [
      h2("The Minimum Bar"),
      {
        type: "list",
        items: [
          "Windows 11 (build 22000+) for official support; Windows 10 (19041+) with WSAPatch",
          "An x86-64 or ARM64 CPU with hardware virtualization",
          "Intel VT-x or AMD-V enabled in BIOS/UEFI",
          "8 GB RAM minimum (16 GB recommended)",
          "About 10 GB free disk (20 GB on SSD recommended)",
          "Administrator privileges for enabling Windows features",
        ],
      },
      h2("Virtualization Is Non-Negotiable"),
      {
        type: "p",
        text: "WSA's VM cannot start without hardware-assisted virtualization. If your BIOS has VT-x/AMD-V disabled, the subsystem fails to launch. WSA Installer detects this with five independent methods (CPUID, wmic, systeminfo, PowerShell, registry) before attempting install.",
      },
      {
        type: "code",
        lang: "powershell",
        code: "(Get-CimInstance Win32_Processor).VirtualizationFirmwareEnabled",
      },
      {
        type: "callout",
        tone: "warning",
        text: "Some laptops ship with virtualization disabled by default. Reboot into BIOS and enable 'Intel Virtualization Technology' or 'SVM Mode' before installing.",
      },
      h2("The Windows Features"),
      {
        type: "p",
        text: "WSA requires Virtual Machine Platform and (recommended) Hyper-V. WSA Installer enables these automatically with administrator rights — no manual 'Windows Features' dialog hunting required.",
      },
      {
        type: "code",
        lang: "powershell",
        code: "dism /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart",
      },
      h2("RAM and Disk Reality"),
      {
        type: "p",
        text: "The AOSP VM reserves a chunk of RAM at boot. On 8 GB machines you'll feel the pinch when running a game alongside Chrome. A solid-state drive also dramatically improves app launch times because the VM image is large.",
      },
    ],
  },

  /* ============================ B. HISTORY / TIMELINE ============================ */
  {
    slug: "wsa-history-timeline",
    title: "The Complete WSA Timeline: 2021 to Deprecation",
    date: "2026-02-28",
    excerpt:
      "Every major WSA milestone — from the 2021 announcement through each monthly build to the 2024 deprecation and 2025 shutdown.",
    tags: ["wsa", "history", "timeline", "microsoft"],
    readTime: "9 min read",
    gradient: GRAD[2],
    body: [
      h2("2021 — The Announcement"),
      {
        type: "p",
        text: "Microsoft revealed WSA at the October 2021 Surface event, demoing Android apps running on Windows 11 with the Amazon Appstore as the default catalog. A preview launched to Windows Insiders the same month.",
      },
      h2("2022 — Public Release & Monthly Builds"),
      {
        type: "list",
        items: [
          "Jan 2022: First stable WSA release with Amazon Appstore in Microsoft Store",
          "Feb 2022: Build 2203 — early stability fixes",
          "May 2022: Build 2204 — improved networking",
          "Jul 2022: Build 2206/2207 — better app compatibility",
          "Sep 2022: Build 2208/2209 — camera and clipboard improvements",
          "Nov 2022: Build 2211 — jump to Android 13",
        ],
      },
      h2("2023 — Android 13 Maturity"),
      {
        type: "list",
        items: [
          "Jan 2023: Build 2301",
          "Mar 2023: Build 2303",
          "May 2023: Build 2305",
          "Aug 2023: Build 2308 — major compatibility bump",
          "Oct 2023: Build 2310/2311 — final Android 13 line",
        ],
      },
      h2("2024 — The Last Builds"),
      {
        type: "list",
        items: [
          "Mar 2024: Build 2404",
          "Jul 2024: Build 2407.40000.4.0 — the final WSA release",
          "May 2024: Microsoft announces WSA deprecation (March 5, 2025 cutoff)",
        ],
      },
      h2("2025 — Shutdown"),
      {
        type: "p",
        text: "On March 5, 2025, Microsoft ended support for WSA. The Amazon Appstore on Windows stopped functioning. WSA Installer and community builds (WSABuilds) became the primary way to keep WSA alive.",
      },
      {
        type: "callout",
        tone: "warning",
        text: "After the cutoff, the official Amazon Appstore path no longer works. Use WSA Installer with the Play Store patch to keep installing apps.",
      },
      h2("Why It Mattered"),
      {
        type: "p",
        text: "For three years WSA was the cleanest way to run Android on a PC. Its death left a gap that open-source tooling — and projects like WSA Installer — now fill.",
      },
    ],
  },
  {
    slug: "wsa-deprecation-what-it-means",
    title: "WSA Deprecation: What It Means for You",
    date: "2026-02-25",
    excerpt:
      "Microsoft ended WSA support in 2025. Here's exactly what breaks, what still works, and how to keep running Android apps on Windows.",
    tags: ["wsa", "deprecation", "microsoft", "faq"],
    readTime: "5 min read",
    gradient: GRAD[4],
    body: [
      h2("What Actually Changed"),
      {
        type: "p",
        text: "On March 5, 2025 Microsoft stopped supporting WSA and disabled the Amazon Appstore on Windows. Existing installations kept working, but you could no longer install WSA through the official Microsoft path or download apps from Amazon.",
      },
      h2("What Still Works"),
      {
        type: "list",
        items: [
          "Already-installed WSA subsystems still boot and run apps",
          "Sideloading APKs via ADB continues to function",
          "Community builds (WSABuilds) remain downloadable",
          "Play Store patching via MagiskOnWSALocal still works",
        ],
      },
      h2("What Broke"),
      {
        type: "list",
        items: [
          "The Amazon Appstore on Windows no longer serves apps",
          "Microsoft's 'install WSA' button in the Store is gone",
          "No further security or compatibility updates from Microsoft",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        text: "WSA Installer does not rely on Microsoft's store. It downloads community WSA builds and patches Play Store directly, so it works fully after deprecation.",
      },
      h2("Should You Keep Using WSA?"),
      {
        type: "p",
        text: "If WSA meets your needs, there's no rush to leave. The final build (2407.40000.4.0) is stable for most apps. Just keep a backup of your installed WSA and the bundle.wsa for offline reinstalls.",
      },
    ],
  },
  {
    slug: "wsa-builds-explained",
    title: "Understanding WSA Build Numbers",
    date: "2026-02-22",
    excerpt:
      "What does 2407.40000.4.0 mean? Decoding WSA version strings and why the build number matters for compatibility.",
    tags: ["wsa", "builds", "reference"],
    readTime: "3 min read",
    gradient: GRAD[7],
    body: [
      h2("Anatomy of a Build String"),
      {
        type: "p",
        text: "Take the final build: 2407.40000.4.0. The first part (2407) is the year/month it was compiled (2024-07). The middle (40000.4.0) is the Android platform/framework version it maps to. WSA Installer defaults to 2407.40000.4.0 because it is the last and most compatible release.",
      },
      h2("Why the Build Matters"),
      {
        type: "list",
        items: [
          "Newer builds = better app compatibility and security fixes",
          "The final 2407 build supports the widest range of modern APKs",
          "Older builds may fail to launch newer apps or Play Services",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "WSA Installer auto-selects the 2407.40000.4.0 build so you don't have to track version strings yourself.",
      },
      h2("Community Builds"),
      {
        type: "p",
        text: "Projects like WSABuilds republish Microsoft's builds with optional GApps/NoGApps variants. WSA Installer can consume these directly, including the offline bundle.wsa for air-gapped installs.",
      },
    ],
  },

  /* ============================ C. INSTALLING ============================ */
  {
    slug: "install-wsa-official",
    title: "How to Install WSA the Official Way (When It Worked)",
    date: "2026-03-01",
    excerpt:
      "A look back at Microsoft's original Amazon Appstore install path — useful context for understanding why community installers exist.",
    tags: ["wsa", "install", "microsoft", "history"],
    readTime: "4 min read",
    gradient: GRAD[1],
    body: [
      h2("The Original Path"),
      {
        type: "p",
        text: "Officially, WSA was installed by opening the Amazon Appstore in the Microsoft Store, signing in, and letting Windows download the subsystem. This pulled the AOSP image and registered it with the system.",
      },
      h2("Step Outline"),
      {
        type: "list",
        items: [
          "Open Microsoft Store and search 'Amazon Appstore'",
          "Click Install — Windows fetches and registers WSA",
          "Launch Amazon Appstore and sign in",
          "Browse and install Android apps",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "As of March 2025 this path is dead. The Amazon Appstore on Windows no longer serves apps. Use WSA Installer instead.",
      },
      h2("The Limitations"),
      {
        type: "p",
        text: "The official path only exposed Amazon's curated catalog — no Google Play Store, no sideloading convenience, and no Windows 10 support. Those gaps are exactly what WSA Installer was built to close.",
      },
    ],
  },
  {
    slug: "install-wsa-manual",
    title: "Manual WSA Install via PowerShell",
    date: "2026-03-04",
    excerpt:
      "The classic run.ps1 method: enable developer mode, sideload the MSIX bundle, and register WSA by hand.",
    tags: ["wsa", "install", "powershell", "manual"],
    readTime: "7 min read",
    gradient: GRAD[5],
    body: [
      h2("When to Go Manual"),
      {
        type: "p",
        text: "Manual install is the foundation every GUI tool builds on. It's useful for offline PCs, automation, and understanding what WSA Installer automates for you.",
      },
      h2("Prerequisites"),
      {
        type: "list",
        items: [
          "Virtual Machine Platform enabled",
          "Developer Mode turned on in Windows Settings",
          "The WSA MSIX bundle downloaded (e.g. from WSABuilds)",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "Developer Mode is required to sideload the unsigned bundle. WSA Installer enables it automatically.",
      },
      h2("The Commands"),
      {
        type: "code",
        lang: "powershell",
        code: "Add-AppxPackage -Register .\\AppxManifest.xml -ForceApplicationShutdown",
      },
      {
        type: "p",
        text: "After registering, launch 'Windows Subsystem for Android' from the Start Menu, open Developer Mode inside the subsystem, and note the IP shown for ADB connections.",
      },
      {
        type: "code",
        lang: "powershell",
        code: "adb connect 127.0.0.1:58526\nadb install your-app.apk",
      },
      h2("Why Most People Don't"),
      {
        type: "p",
        text: "Manual install is fiddly: you must pick the right build, enable features, sideload, configure ADB, and separately patch Play Store. WSA Installer collapses all of this into one administrator-run wizard.",
      },
    ],
  },
  {
    slug: "wsa-installer-how-it-works",
    title: "Inside WSA Installer: The 6 Automated Phases",
    date: "2026-04-02",
    excerpt:
      "A tour of how WSA Installer turns a 228 MB setup file into a running Android subsystem with Play Store — in one click.",
    tags: ["wsa-installer", "how-it-works", "architecture", "play-store"],
    readTime: "8 min read",
    gradient: GRAD[8],
    series: {
      name: "Inside WSA Installer",
      part: 1,
      total: 1,
      posts: [{ slug: "wsa-installer-how-it-works", title: "Inside WSA Installer: The 6 Automated Phases" }],
    },
    body: [
      h2("Why a Tool at All?"),
      {
        type: "p",
        text: "Installing WSA correctly means enabling Windows features, downloading the right build, extracting a 7z archive, patching binaries, registering the subsystem, and integrating Play Store. WSA Installer automates every step through a 5-step frameless wizard.",
      },
      h2("Phase 1 — Smart System Scan"),
      {
        type: "p",
        text: "The installer detects VT-x, Hyper-V, VirtualMachinePlatform, HypervisorPlatform, and WSL using five methods (CPUID, wmic, systeminfo, PowerShell, registry). If anything is missing it offers to enable it automatically with admin rights.",
      },
      h2("Phase 2 — Auto Configuration"),
      {
        type: "p",
        text: "Required Windows features are turned on via DISM and the system may prompt for a restart. No BIOS hunting, no manual feature dialogs.",
      },
      h2("Phase 3 — Parallel Chunked Download"),
      {
        type: "p",
        text: "The WSA archive is fetched in 30 parallel chunks with resume support, live speed, and ETA. The same engine powers the self-update system.",
      },
      h2("Phase 4 — Extract & Patch"),
      {
        type: "p",
        text: "The 7z archive is extracted with tar.exe, WsaClient.exe is binary-patched for Windows 10 (WSAPatch), and the package is verified against filelist.txt before registration.",
      },
      h2("Phase 5 — Play Store Patching"),
      {
        type: "p",
        text: "MindTheGapps 13.0 is merged via MagiskOnWSALocal. ADB authorization is automated through pywinauto GUI scripting, so Play Store appears in the Start Menu without manual commands.",
      },
      h2("Phase 6 — Complete & Background Service"),
      {
        type: "p",
        text: "Shortcuts are created, WSABackgroundService is registered as a Windows service, and the subsystem launches. The background service keeps ADB and file shares alive and auto-restarts on failure.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Prefer a quiet machine? Run WSA_Installer_Setup.exe /S for a fully silent install.",
      },
    ],
  },
  {
    slug: "wsa-on-windows-10",
    title: "Running WSA on Windows 10 with WSAPatch",
    date: "2026-03-22",
    excerpt:
      "Windows 10 isn't officially supported — but WSA Installer's WSAPatch fix makes it work by binary-patching WsaClient.exe.",
    tags: ["wsa", "windows-10", "wsapatch", "fix"],
    readTime: "6 min read",
    gradient: GRAD[4],
    body: [
      h2("The Windows 10 Problem"),
      {
        type: "p",
        text: "WSA was built for Windows 11. On Windows 10 (build 19041+) it crashes on launch because WsaClient.exe calls APIs that don't exist on the older OS. The error is a stack buffer overrun in the client binary.",
      },
      h2("What WSAPatch Does"),
      {
        type: "p",
        text: "WSAPatch binary-patches WsaClient.exe to replace the unsupported calls with compatible equivalents. After patching, the subsystem starts normally on Windows 10 and behaves like its Windows 11 counterpart.",
      },
      {
        type: "callout",
        tone: "info",
        text: "WSA Installer applies WSAPatch automatically when it detects Windows 10 — you don't run anything extra.",
      },
      h2("Requirements on Windows 10"),
      {
        type: "list",
        items: [
          "Windows 10 build 19041 or later",
          "Virtualization enabled (VT-x / AMD-V)",
          "Administrator rights for the patch and feature enablement",
          "About 10 GB free disk for the subsystem + GApps",
        ],
      },
      h2("Known Caveats"),
      {
        type: "p",
        text: "Some features (like certain graphics paths) are less polished on Windows 10. For the smoothest experience Windows 11 22H2+ is still recommended, but Windows 10 users are fully supported via WSAPatch.",
      },
    ],
  },
  {
    slug: "wsa-offline-bundle",
    title: "Offline & Air-Gapped WSA Installs with bundle.wsa",
    date: "2026-03-25",
    excerpt:
      "How to install WSA on machines with no internet using the 1.21 GB bundle.wsa — perfect for labs, VMs, and multiple PCs.",
    tags: ["wsa", "offline", "bundle", "enterprise"],
    readTime: "5 min read",
    gradient: GRAD[10],
    body: [
      h2("What Is bundle.wsa?"),
      {
        type: "p",
        text: "bundle.wsa is a 1.21 GB pre-packaged archive containing both the WSA Basic and WSA+Play Store packages. It removes the need to download anything at install time, making it ideal for offline, air-gapped, or repeated deployments.",
      },
      h2("When to Use It"),
      {
        type: "list",
        items: [
          "Machines without internet access",
          "Air-gapped lab or test environments",
          "Installing WSA on many PCs without re-downloading",
          "Environments where download ports are blocked",
        ],
      },
      h2("How WSA Installer Uses It"),
      {
        type: "p",
        text: "Point the installer at bundle.wsa (or place it next to the setup file) and it extracts the matching package locally, skipping the parallel download phase entirely. The Play Store patch still runs normally.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Keep a copy of bundle.wsa on a USB drive — after Microsoft's deprecation it's the most reliable way to reinstall WSA from scratch.",
      },
      h2("Integrity"),
      {
        type: "p",
        text: "The installer verifies the bundle against a known SHA-256 before use, so a corrupted download fails fast instead of producing a broken subsystem.",
      },
    ],
  },

  /* ============================ D. PLAY STORE / CUSTOMIZATION ============================ */
  {
    slug: "play-store-on-wsa",
    title: "Patching Google Play Store onto WSA",
    date: "2026-03-08",
    excerpt:
      "MindTheGapps 13 + MagiskOnWSALocal: how WSA Installer brings the full Play Store catalog to your subsystem.",
    tags: ["wsa", "play-store", "gapps", "magisk"],
    readTime: "7 min read",
    gradient: GRAD[3],
    body: [
      h2("Why Patch at All?"),
      {
        type: "p",
        text: "Stock WSA ships without Google Mobile Services. That means no Play Store, no Gmail sign-in, no push notifications. Patching GApps is what unlocks the real Android experience.",
      },
      h2("The Two Ingredients"),
      {
        type: "list",
        items: [
          "MindTheGapps 13.0 — the Google apps package (Play Services, Play Store, Framework)",
          "MagiskOnWSALocal — the patcher that injects GApps into the WSA image",
        ],
      },
      h2("The Patching Flow"),
      {
        type: "p",
        text: "WSA Installer runs MagiskOnWSALocal with MindTheGapps selected. It locates the extracted WSA folder, verifies the GApps archive, extracts and patches the system image, then re-signs it so Android accepts the modified packages.",
      },
      h2("Automating ADB Authorization"),
      {
        type: "p",
        text: "Play Store needs ADB debugging authorized once. WSA Installer drives the ADB dialog with pywinauto GUI automation, clicking 'Allow' so you never touch a command prompt.",
      },
      {
        type: "callout",
        tone: "warning",
        text: "Some Windows Updates (e.g. KB5062553) have broken GApps builds. If Play Store misbehaves after an update, use the repair dialog or switch to a NoGApps + Aurora Store setup.",
      },
      h2("Result"),
      {
        type: "p",
        text: "After patching, the Google Play Store appears in the Start Menu. Sign in with any Google account and install apps exactly as you would on a phone.",
      },
    ],
  },
  {
    slug: "wsa-without-play-store",
    title: "WSA Without Play Store: NoGApps + Aurora Store",
    date: "2026-03-11",
    excerpt:
      "When GApps breaks after a Windows update, the NoGApps + Aurora Store path keeps your apps installing cleanly.",
    tags: ["wsa", "play-store", "aurora", "troubleshooting"],
    readTime: "5 min read",
    gradient: GRAD[9],
    body: [
      h2("The GApps Fragility"),
      {
        type: "p",
        text: "Patched Google apps can break after certain Windows updates because the subsystem's signature checks shift. When Play Store won't open, a GApps-free setup is the stable alternative.",
      },
      h2("NoGApps Builds"),
      {
        type: "p",
        text: "WSABuilds offers 'NoGApps' variants — clean WSA with no Google services. They're lighter and immune to the GApps-break class of bugs. You lose Google sign-in, but gain stability.",
      },
      h2("Aurora Store"),
      {
        type: "p",
        text: "Aurora Store is an open-source Google Play client that installs apps without a Google account. Sideload its APK and you get a near-complete app catalog over the NoGApps base.",
      },
      {
        type: "code",
        lang: "powershell",
        code: "adb install AuroraStore.apk",
      },
      {
        type: "callout",
        tone: "tip",
        text: "WSA Installer lets you choose 'Install WSA Basic' (NoGApps) up front, then add Aurora Store manually for a Google-free workflow.",
      },
      h2("Which Should You Pick?"),
      {
        type: "list",
        items: [
          "Want Gmail, Play Games, paid apps → patch Play Store (GApps)",
          "Want maximum stability / privacy → NoGApps + Aurora Store",
          "Hit a GApps break after update → repair or switch to NoGApps",
        ],
      },
    ],
  },
  {
    slug: "customize-wsa",
    title: "Customizing Your WSA Installation",
    date: "2026-03-14",
    excerpt:
      "GApps variants, Magisk vs KernelSU, and per-install tweaks — how deep you can go customizing the subsystem.",
    tags: ["wsa", "customize", "magisk", "kernelsu"],
    readTime: "6 min read",
    gradient: GRAD[12],
    body: [
      h2("How Customizable Is WSA?"),
      {
        type: "p",
        text: "Quite. Because the subsystem is a normal AOSP image, you can swap GApps packages, add root solutions, and change properties the same way you would on a phone.",
      },
      h2("GApps Variants"),
      {
        type: "list",
        items: [
          "MindTheGapps 13 — full Google stack (default in WSA Installer)",
          "NoGApps — no Google services, lightest option",
          "NikGApps / BitGApps — alternative GApps builds with different app sets",
        ],
      },
      h2("Root: Magisk vs KernelSU"),
      {
        type: "p",
        text: "MagiskOnWSALocal is the standard root path WSA Installer uses for Play Store patching. Advanced users can swap to KernelSU for a kernel-level root manager with different module support.",
      },
      h2("Useful Properties"),
      {
        type: "code",
        lang: "bash",
        code: "setprop persist.wsa.rooted 1\nsetprop debug.wsa.gpu 1",
      },
      {
        type: "callout",
        tone: "warning",
        text: "Rooting changes the security model. Only root if you understand the implications; WSA Installer's default patched build is sufficient for most users.",
      },
      h2("Themes & Launchers"),
      {
        type: "p",
        text: "Install any Android launcher from the Play Store to reskin the subsystem. WSA itself has no theme engine, but your launcher controls the look entirely.",
      },
    ],
  },
  {
    slug: "sideload-apk-wsa",
    title: "Sideloading APKs onto WSA via ADB",
    date: "2026-03-17",
    excerpt:
      "The universal install method: enable developer mode, connect ADB, and push any APK to your subsystem.",
    tags: ["wsa", "sideload", "adb", "apk"],
    readTime: "4 min read",
    gradient: GRAD[0],
    body: [
      h2("Enable Developer Mode"),
      {
        type: "p",
        text: "Open the WSA settings app from the Start Menu and toggle 'Developer mode'. Note the IP and port shown (usually 127.0.0.1:58526).",
      },
      h2("Connect ADB"),
      {
        type: "code",
        lang: "powershell",
        code: "adb connect 127.0.0.1:58526",
      },
      h2("Install the APK"),
      {
        type: "code",
        lang: "powershell",
        code: "adb install path\\to\\app.apk",
      },
      {
        type: "callout",
        tone: "tip",
        text: "WSA Installer automates ADB authorization during Play Store patching, so you rarely need these commands — but they're the fallback for any APK.",
      },
      h2("When Sideloading Is Best"),
      {
        type: "list",
        items: [
          "Apps not on the Play Store or Amazon",
          "Beta/test APKs from developers",
          "Region-locked apps you sideload from a different source",
          "After a GApps break, to install Aurora Store itself",
        ],
      },
    ],
  },

  /* ============================ E. USAGE / TROUBLESHOOTING ============================ */
  {
    slug: "fix-wsa-not-working",
    title: "Troubleshooting WSA: Crashes, KB Updates & Repair",
    date: "2026-03-28",
    excerpt:
      "The most common WSA failures — apps closing on launch, black screens, post-update breakage — and how to fix each one.",
    tags: ["wsa", "troubleshooting", "fix", "windows-update"],
    readTime: "9 min read",
    gradient: GRAD[4],
    body: [
      h2("Symptom: Apps Close Immediately"),
      {
        type: "p",
        text: "Often caused by a Windows Update that shifted the subsystem's expected environment, or a GApps build incompatibility. First try the WSA Installer repair dialog (detect → stop → backup → reinstall).",
      },
      h2("Symptom: WSA Won't Start After a KB Update"),
      {
        type: "list",
        items: [
          "Updates like KB5062553 have broken GApps builds",
          "Fix: repair WSA, or switch to a NoGApps + Aurora Store setup",
          "Fix: re-run WSA Installer's Play Store patch",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "If WsaClient.exe shows a stack buffer overrun, you're likely on Windows 10 without WSAPatch, or a build mismatch. Re-run the installer to re-apply the correct patch.",
      },
      h2("Symptom: Black Screen / No Display"),
      {
        type: "p",
        text: "Usually a GPU/driver issue. Update your NVIDIA/AMD/Intel drivers, then restart WSA. If it persists, force software rendering as a test.",
      },
      h2("Symptom: Play Store Crashes Installing Apps"),
      {
        type: "p",
        text: "Clear Play Store / Play Services data from Android Settings, or switch to NoGApps + Aurora Store. WSA Installer's repair flow resets these cleanly.",
      },
      h2("The 4-Step Repair Dialog"),
      {
        type: "list",
        items: [
          "1) Detect the installed WSA",
          "2) Stop all WSA processes",
          "3) Backup user data",
          "4) Uninstall and reinstall WSA",
        ],
      },
      h2("Prevention"),
      {
        type: "p",
        text: "Keep bundle.wsa handy, pause major Windows Updates on critical machines, and snapshot the working subsystem before updating GPU drivers.",
      },
    ],
  },
  {
    slug: "wsa-file-sharing-webdav",
    title: "Sharing Files Between Windows and WSA via WebDAV",
    date: "2026-03-31",
    excerpt:
      "WSA Installer mounts your Android filesystem as X:/ and R:/ drives — here's how the WebDAV bridge works and how to use it.",
    tags: ["wsa", "file-sharing", "webdav", "tips"],
    readTime: "5 min read",
    gradient: GRAD[5],
    body: [
      h2("The Problem"),
      {
        type: "p",
        text: "Android apps store files inside the subsystem, invisible to Windows Explorer by default. Moving a photo or APK meant ADB pulls and pushes — clunky.",
      },
      h2("The WebDAV Solution"),
      {
        type: "p",
        text: "WSA Installer's WSABackgroundService starts a WebDAV server inside the subsystem and mounts it over ADB as Windows drive letters — X:/ for the Android internal storage and R:/ for a shared root.",
      },
      h2("Using the Drives"),
      {
        type: "list",
        items: [
          "Open File Explorer and go to X:/ to browse Android files",
          "Drag and drop between Windows and Android like any folder",
          "Edit files directly; changes appear inside the subsystem instantly",
          "R:/ acts as a neutral exchange area for both sides",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        text: "The background service keeps the WebDAV mount alive and remounts it automatically after a subsystem restart.",
      },
      h2("Troubleshooting the Mount"),
      {
        type: "p",
        text: "If the drives disappear, restart WSABackgroundService from Services.msc or re-run the installer's file-sharing step. A firewall blocking localhost WebDAV is the usual culprit.",
      },
    ],
  },
  {
    slug: "wsa-gpu-graphics",
    title: "WSA Graphics & GPU Acceleration",
    date: "2026-04-04",
    excerpt:
      "How WSA renders Android UI on your GPU, why some apps are slow, and how to fix graphics glitches.",
    tags: ["wsa", "gpu", "graphics", "performance"],
    readTime: "5 min read",
    gradient: GRAD[11],
    body: [
      h2("The Render Path"),
      {
        type: "p",
        text: "WSA routes Android's OpenGL/Vulkan through ANGLE to your host GPU via Direct3D. When the GPU is unavailable it falls back to llvmpipe software rendering — usable for simple apps, painful for games.",
      },
      h2("Check GPU Acceleration"),
      {
        type: "code",
        lang: "bash",
        code: "dumpsys | grep -i 'GLES'",
      },
      h2("Fixing Glitches"),
      {
        type: "list",
        items: [
          "Update GPU drivers (NVIDIA / AMD / Intel)",
          "Restart WSA after a driver change",
          "Enable 'Force GPU' properties if your build supports them",
          "On black screen, test with software rendering to isolate the cause",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Heavy 3D games may never be smooth under translation. For those, a native emulator or cloud streaming is a better fit than WSA.",
      },
      h2("ARM Translation Note"),
      {
        type: "p",
        text: "Graphics calls from translated ARM libraries add overhead. On ARM Windows PCs this is less of an issue; on x86 it's the main source of lag in GPU-heavy apps.",
      },
    ],
  },
  {
    slug: "wsa-perf-tips",
    title: "WSA Performance & Battery Tips",
    date: "2026-04-07",
    excerpt:
      "Keep WSA snappy and your laptop cool: RAM limits, background behavior, and when to actually shut the subsystem down.",
    tags: ["wsa", "performance", "tips", "battery"],
    readTime: "4 min read",
    gradient: GRAD[7],
    body: [
      h2("Cap the RAM"),
      {
        type: "p",
        text: "The subsystem reserves memory at boot. On 8 GB machines, limit it so Chrome and WSA don't fight. WSA Installer's config lets you tune the allocation per machine.",
      },
      h2("Don't Leave It Running Idle"),
      {
        type: "list",
        items: [
          "Stop WSA when you're done (Settings → Stop)",
          "WSABackgroundService keeps ADB/file shares alive — fine, but it uses RAM",
          "Disable 'continuous mode' if apps keep closing on launch",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        text: "If Android apps close a few seconds after opening, you likely have 'continuous mode' misconfigured. Toggle it off in Android Settings.",
      },
      h2("Battery"),
      {
        type: "p",
        text: "On laptops, WSA's VM draws steady power. For max battery, stop the subsystem before unplugging. The translation layer (libhoudini) also costs CPU, so prefer native-architecture APKs.",
      },
    ],
  },

  /* ============================ F. COMMUNITY / PROJECT ============================ */
  {
    slug: "wsabuilds-guide",
    title: "A Guide to WSABuilds & Community WSA Sources",
    date: "2026-02-19",
    excerpt:
      "Where the community gets WSA builds after Microsoft's deprecation — WSABuilds, GApps/NoGApps variants, and safe download practices.",
    tags: ["wsa", "wsabuilds", "community", "download"],
    readTime: "6 min read",
    gradient: GRAD[6],
    body: [
      h2("Why Community Builds Exist"),
      {
        type: "p",
        text: "After Microsoft stopped shipping WSA, the community stepped in to mirror and republish the final builds with optional Google apps. WSABuilds is the best-known source.",
      },
      h2("What WSABuilds Offers"),
      {
        type: "list",
        items: [
          "The final Microsoft WSA builds, re-hosted",
          "GApps variants (with Play Store) and NoGApps variants",
          "Root and non-root options",
          "Checksums for integrity verification",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "Only download from trusted mirrors. WSA Installer fetches from the official WSA-Installer GitHub releases and verifies SHA-256 before use.",
      },
      h2("How WSA Installer Uses Them"),
      {
        type: "p",
        text: "WSA Installer points at the WSA-Installer releases for both the setup EXE and bundle.wsa, and can consume WSABuilds-format archives. You never hand-edit URLs — the installer resolves the right build (2407.40000.4.0) for you.",
      },
      h2("Staying Safe"),
      {
        type: "list",
        items: [
          "Verify checksums before installing",
          "Prefer signed releases from the project's GitHub",
          "Keep bundle.wsa backed up for offline reinstall",
        ],
      },
    ],
  },
  {
    slug: "building-wsa-installer",
    title: "Building WSA Installer: Python, Rust & Flet",
    date: "2026-04-10",
    excerpt:
      "A behind-the-scenes look at how WSA Installer is built — the Flet GUI, the Rust security gateway, and the NSIS packaging pipeline.",
    tags: ["wsa-installer", "architecture", "python", "rust"],
    readTime: "7 min read",
    gradient: GRAD[8],
    body: [
      h2("The Stack"),
      {
        type: "p",
        text: "WSA Installer is a Windows desktop app built around a Python core with a Flet (Flutter) GUI, protected by native Rust modules, and packaged with NSIS. The result is a ~228 MB setup that runs completely offline after install.",
      },
      h2("Flet GUI (app.py)"),
      {
        type: "p",
        text: "Around 11,000 lines of Python drive the 5-step frameless wizard, real-time progress UI, glassmorphism design, and all sub-dialogs (repair, update, uninstall, file sharing). Flet lets the same code render a native-feeling window without writing Flutter by hand.",
      },
      h2("InstallerLogic Engine"),
      {
        type: "p",
        text: "The engine handles parallel chunked downloads with resume, 7z extraction via tar.exe, WSA package verification (filelist.txt), registry patching, and ADB automation for Play Store. It's the 'brain' behind the 6 automated phases.",
      },
      h2("Rust Security Gateway"),
      {
        type: "p",
        text: "widget_ui.pyd provides a zero-trust gateway: signature verification, encrypted config parsing, and anti-tamper protection. playstore_patcher_mem.pyd is the in-memory Play Store patcher SDK. Compiling to native Rust keeps the logic fast and hard to reverse.",
      },
      h2("Build Pipeline"),
      {
        type: "list",
        items: [
          "Nuitka compiles app.py → app.pyd (source protection)",
          "PyInstaller bundles into onedir",
          "Flet.exe patched with custom icon and version",
          "NSIS creates the final setup EXE with silent (/S) support",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "The embedded Python 3.14 runtime (emb_py/) means no external Python is needed after installation — the Play Store patcher runs fully offline.",
      },
      h2("Why This Matters to Users"),
      {
        type: "p",
        text: "All of this engineering exists so that end users get one administrator-run wizard that 'just works' — no manual DISM, no ADB commands, no hunting for builds. That's the whole point of WSA Installer.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  BLOG_POSTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t))
  )
    .sort((a, b) => {
      const aCommon = a.tags.filter((t) => post.tags.includes(t)).length;
      const bCommon = b.tags.filter((t) => post.tags.includes(t)).length;
      return bCommon - aCommon;
    })
    .slice(0, limit);
}
