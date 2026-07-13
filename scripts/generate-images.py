from PIL import Image, ImageDraw, ImageFont
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(SCRIPT_DIR, "..", "public", "images")
os.makedirs(OUT_DIR, exist_ok=True)

def create_og_image():
    w, h = 1200, 630
    img = Image.new("RGBA", (w, h), (10, 10, 20, 255))
    draw = ImageDraw.Draw(img)

    for i in range(0, w, 4):
        for j in range(0, h, 4):
            dx, dy = i - w // 2, j - h // 2
            dist = (dx * dx + dy * dy) ** 0.5
            r = max(0, min(255, int(10 + 20 * (1 - dist / 800))))
            g = max(0, min(255, int(10 + 10 * (1 - dist / 800))))
            b = max(0, min(255, int(30 + 30 * (1 - dist / 800))))
            draw.point((i, j), (r, g, b, 255))

    accent_x, accent_y = w // 2, h // 2 - 30
    for r in range(200, 100, -2):
        alpha = max(0, min(100, int(40 * (1 - r / 200))))
        draw.ellipse(
            [accent_x - r, accent_y - r, accent_x + r, accent_y + r],
            outline=(0, 120, 212, alpha),
            width=1,
        )

    try:
        font_lg = ImageFont.truetype("C:\\Windows\\Fonts\\segoeuib.ttf", 56)
        font_md = ImageFont.truetype("C:\\Windows\\Fonts\\segoeui.ttf", 24)
        font_sm = ImageFont.truetype("C:\\Windows\\Fonts\\segoeui.ttf", 18)
    except:
        font_lg = ImageFont.load_default()
        font_md = font_lg
        font_sm = font_lg

    draw.text((60, 50), "WSA Installer", fill=(0, 120, 212, 255), font=font_lg)
    draw.text(
        (60, 120),
        "Windows Subsystem for Android — One-Click Install",
        fill=(200, 200, 220, 255),
        font=font_md,
    )
    draw.text(
        (60, 160),
        "with Google Play Store",
        fill=(200, 200, 220, 255),
        font=font_md,
    )

    draw.rounded_rectangle(
        [60, 220, 280, 260], radius=8, fill=(0, 120, 212, 200)
    )
    draw.text(
        (80, 228), "Download Installer (228 MB)", fill=(255, 255, 255, 255), font=font_sm
    )

    draw.text((60, 310), "Features", fill=(0, 188, 212, 255), font=font_md)
    features = [
        "✦ Smart System Scan — 5 detection methods",
        "✦ One-Click Install — 6 automated phases",
        "✦ Play Store Patching — MindTheGapps 13.0",
        "✦ Parallel Downloads — 30 chunks with resume",
    ]
    for i, feat in enumerate(features):
        draw.text((60, 350 + i * 32), feat, fill=(150, 150, 180, 255), font=font_sm)

    badges = ["✓ Windows 10/11", "✓ Free & Open Source", "✓ MIT License"]
    for i, badge in enumerate(badges):
        x = 60 + i * 200
        draw.rounded_rectangle(
            [x, 500, x + 170, 530], radius=6, fill=(0, 120, 212, 40)
        )
        draw.text(
            (x + 12, 507), badge, fill=(0, 188, 212, 255), font=font_sm
        )

    draw.text(
        (60, 570),
        "https://wsa-installer.github.io/wsa-website",
        fill=(100, 100, 130, 255),
        font=font_sm,
    )

    draw.rectangle([w - 200, h - 40, w, h], fill=(0, 120, 212, 30))
    draw.text(
        (w - 190, h - 32),
        "AT Tech Zone",
        fill=(0, 188, 212, 150),
        font=font_sm,
    )

    path = os.path.join(OUT_DIR, "og-image.png")
    img.save(path, "PNG")
    print(f"Created {path} ({w}x{h})")

def create_screenshot(name, w, h, draw_fn):
    img = Image.new("RGBA", (w, h), (10, 10, 25, 255))
    draw = ImageDraw.Draw(img)

    try:
        font_md = ImageFont.truetype("C:\\Windows\\Fonts\\segoeuib.ttf", 22)
        font_sm = ImageFont.truetype("C:\\Windows\\Fonts\\segoeui.ttf", 16)
        font_xs = ImageFont.truetype("C:\\Windows\\Fonts\\segoeui.ttf", 13)
    except:
        font_md = font_sm = font_xs = ImageFont.load_default()

    draw_fn(img, draw, font_md, font_sm, font_xs)

    path = os.path.join(OUT_DIR, f"screenshot-{name}.png")
    img.save(path, "PNG")
    print(f"Created {path} ({w}x{h})")

def draw_welcome(img, draw, font_md, font_sm, font_xs):
    w, h = img.size
    draw.rounded_rectangle([20, 20, w - 20, 70], radius=8, fill=(20, 20, 45, 255))
    draw.text((40, 33), "WSA Installer v1.2.0", fill=(0, 120, 212, 255), font=font_md)

    draw.rounded_rectangle([20, 90, w - 20, h - 20], radius=12, fill=(15, 15, 35, 255))
    draw.text((w // 2 - 120, 120), "Welcome to WSA Installer", fill=(255, 255, 255, 255), font=font_md)
    draw.text((w // 2 - 170, 160), "Windows Subsystem for Android — One-Click Setup", fill=(180, 180, 200, 255), font=font_sm)

    draw.rounded_rectangle([w // 2 - 100, 200, w // 2 + 100, 240], radius=6, fill=(0, 120, 212, 200))
    draw.text((w // 2 - 75, 210), "Install WSA + Play Store", fill=(255, 255, 255, 255), font=font_xs)
    draw.rounded_rectangle([w // 2 - 100, 260, w // 2 + 100, 300], radius=6, fill=(30, 30, 60, 200))
    draw.text((w // 2 - 60, 270), "Install WSA Basic", fill=(180, 180, 200, 255), font=font_xs)

    stats = ["System Check", "Download", "Install", "Play Store", "Complete"]
    for i, s in enumerate(stats):
        x = 60 + i * 140
        draw.rounded_rectangle([x, 350, x + 110, 370], radius=4, fill=(0, 120, 212, 60) if i < 2 else (30, 30, 60, 200))
        draw.text((x + 5, 354), s, fill=(200, 200, 220, 255), font=font_xs)
        if i < len(stats) - 1:
            draw.line([x + 115, 360, x + 130, 360], fill=(0, 120, 212, 60), width=1)

def draw_system_check(img, draw, font_md, font_sm, font_xs):
    w, h = img.size
    draw.rounded_rectangle([20, 20, w - 20, 70], radius=8, fill=(20, 20, 45, 255))
    draw.text((40, 33), "Step 1: System Check", fill=(0, 120, 212, 255), font=font_md)

    draw.rounded_rectangle([20, 90, w - 20, h - 20], radius=12, fill=(15, 15, 35, 255))
    checks = [
        ("✓ Virtualization (VT-x/AMD-V)", "Enabled", (0, 188, 100)),
        ("✓ Hyper-V", "Enabled", (0, 188, 100)),
        ("✓ Virtual Machine Platform", "Enabled", (0, 188, 100)),
        ("✓ Windows Subsystem for Linux", "Enabled", (0, 188, 100)),
        ("✓ RAM (16 GB)", "OK", (0, 188, 100)),
        ("✓ Disk Space (120 GB free)", "OK", (0, 188, 100)),
    ]
    draw.text((60, 120), "System Readiness Check", fill=(255, 255, 255, 255), font=font_sm)
    for i, (check, status, color) in enumerate(checks):
        y = 170 + i * 40
        draw.rounded_rectangle([60, y, w - 60, y + 30], radius=6, fill=(20, 20, 50, 255))
        draw.text((80, y + 6), check, fill=(200, 200, 220, 255) if i < 4 else (150, 150, 170, 255), font=font_xs)
        draw.text((w - 150, y + 6), status, fill=color + (255,), font=font_xs)

    draw.rounded_rectangle([w // 2 - 80, h - 80, w // 2 + 80, h - 50], radius=6, fill=(0, 120, 212, 200))
    draw.text((w // 2 - 50, h - 70), "Continue →", fill=(255, 255, 255, 255), font=font_sm)

    y = 170 + 4 * 40
    draw.line([60, y + 35, w - 60, y + 35], fill=(0, 120, 212, 40), width=1)
    draw.text((60, y + 42), "ℹ All systems ready. Proceeding to installation...", fill=(0, 188, 212, 200), font=font_xs)


def draw_install_progress(img, draw, font_md, font_sm, font_xs):
    w, h = img.size
    draw.rounded_rectangle([20, 20, w - 20, 70], radius=8, fill=(20, 20, 45, 255))
    draw.text((40, 33), "Step 2: Installing WSA", fill=(0, 120, 212, 255), font=font_md)

    draw.rounded_rectangle([20, 90, w - 20, h - 20], radius=12, fill=(15, 15, 35, 255))

    draw.text((60, 115), "Download Progress", fill=(255, 255, 255, 255), font=font_sm)
    draw.rounded_rectangle([60, 145, w - 60, 160], radius=4, fill=(30, 30, 60, 255))
    bar_w = (w - 120) * 70 // 100
    draw.rounded_rectangle([60, 145, 60 + bar_w, 160], radius=4, fill=(0, 188, 100, 200))
    draw.text((w // 2 - 30, 165), "70% — 12.4 MB/s", fill=(0, 188, 212, 255), font=font_xs)
    draw.text((w // 2 - 50, 185), "Downloading WSA_2407.40000.4.0_Release-Stable...", fill=(180, 180, 200, 255), font=font_xs)

    phases = [
        ("Phase 1/6", "Downloading WSA package", "●"),
        ("Phase 2/6", "Verifying archive integrity", "○"),
        ("Phase 3/6", "Extracting WSA files", "○"),
        ("Phase 4/6", "Applying Developer Mode", "○"),
        ("Phase 5/6", "Patching WsaClient (Win10)", "○"),
        ("Phase 6/6", "Registering subsystem", "○"),
    ]
    for i, (phase, desc, status) in enumerate(phases):
        y = 230 + i * 38
        c = (0, 188, 100) if i == 0 else (100, 100, 130)
        draw.text((60, y), f"{status} {desc}", fill=c + (255,), font=font_xs)
        draw.text((w - 200, y), phase if i == 0 else "", fill=c + (180,), font=font_xs)

    draw.text((60, h - 70), "ℹ This may take 5-15 minutes depending on your internet speed.", fill=(100, 100, 130, 255), font=font_xs)


def draw_play_store(img, draw, font_md, font_sm, font_xs):
    w, h = img.size
    draw.rounded_rectangle([20, 20, w - 20, 70], radius=8, fill=(20, 20, 45, 255))
    draw.text((40, 33), "Step 3: Play Store Integration", fill=(0, 120, 212, 255), font=font_md)

    draw.rounded_rectangle([20, 90, w - 20, h - 20], radius=12, fill=(15, 15, 35, 255))
    draw.text((60, 115), "Patching Google Apps (MindTheGapps 13.0)", fill=(255, 255, 255, 255), font=font_sm)

    draw.rounded_rectangle([60, 145, w - 60, 160], radius=4, fill=(30, 30, 60, 255))
    bar_w = (w - 120) * 45 // 100
    draw.rounded_rectangle([60, 145, 60 + bar_w, 160], radius=4, fill=(255, 159, 10, 200))
    draw.text((w // 2 - 30, 165), "45% — Patching...", fill=(255, 159, 10, 255), font=font_xs)

    sub_phases = [
        ("1/7", "Locating WSA installation", "✓"),
        ("2/7", "Downloading MindTheGapps", "✓"),
        ("3/7", "Verifying GApps package", "✓"),
        ("4/7", "Patching with MagiskOnWSALocal", "◉"),
        ("5/7", "Setting up ADB connection", "○"),
        ("6/7", "Pushing GApps to WSA", "○"),
        ("7/7", "Finalizing installation", "○"),
    ]
    for i, (phase, desc, status) in enumerate(sub_phases):
        y = 200 + i * 35
        if i < 3:
            c = (0, 188, 100)
        elif i == 3:
            c = (255, 159, 10)
        else:
            c = (100, 100, 130)
        draw.text((80, y), f"{status} {desc}", fill=c + (255,), font=font_xs)
        draw.text((w - 150, y), phase, fill=(150, 150, 170, 200), font=font_xs)

    draw.text((60, h - 70), "ℹ ADB authorization is automated — no manual intervention needed.", fill=(100, 100, 130, 255), font=font_xs)


def draw_complete(img, draw, font_md, font_sm, font_xs):
    w, h = img.size
    draw.rounded_rectangle([20, 20, w - 20, 70], radius=8, fill=(20, 20, 45, 255))
    draw.text((40, 33), "Installation Complete", fill=(0, 188, 100, 255), font=font_md)

    draw.rounded_rectangle([20, 90, w - 20, h - 20], radius=12, fill=(15, 15, 35, 255))

    draw.text((w // 2 - 80, 120), "✓ Installation Successful!", fill=(0, 188, 100, 255), font=font_md)

    items = [
        "✓ Windows Subsystem for Android installed",
        "✓ Google Play Store patched with MindTheGapps",
        "✓ Start Menu shortcuts created",
        "✓ WSABackgroundService installed",
        "✓ File sharing (WebDAV) configured",
    ]
    for i, item in enumerate(items):
        y = 180 + i * 35
        draw.text((80, y), item, fill=(200, 200, 220, 255), font=font_xs)

    draw.rounded_rectangle([w // 2 - 120, 380, w // 2 + 120, 420], radius=6, fill=(0, 120, 212, 200))
    draw.text((w // 2 - 70, 392), "Launch WSA →", fill=(255, 255, 255, 255), font=font_sm)

    draw.rounded_rectangle([w // 2 - 120, 440, w // 2 + 120, 480], radius=6, fill=(30, 30, 60, 200))
    draw.text((w // 2 - 60, 452), "Close Installer", fill=(180, 180, 200, 255), font=font_sm)

    draw.text((60, h - 70), "ℹ WSA is now ready. Launch from Start Menu or click above.", fill=(100, 100, 130, 255), font=font_xs)


if __name__ == "__main__":
    create_og_image()

    create_screenshot("welcome", 600, 420, draw_welcome)
    create_screenshot("system-check", 600, 420, draw_system_check)
    create_screenshot("install-progress", 600, 420, draw_install_progress)
    create_screenshot("play-store", 600, 420, draw_play_store)
    create_screenshot("complete", 600, 420, draw_complete)

    print("\nAll images generated successfully!")
