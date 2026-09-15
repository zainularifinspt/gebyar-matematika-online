# Design System: 3D Glassmorphism Pastel Studio & Polychromatic Jewels

<!-- impeccable:design-tokens 1 -->

## Design Philosophy & Anti-AI Slop Mandate

This design elevates **Gebyar Matematika Online** into a state-of-the-art **3D Glassmorphism Pastel Studio** interface, directly aligned with modern 3D claymorphism and acrylic glass aesthetics:

1. **Master 3D Frosted Glass Frame**: Major hero and interactive stages are housed within expansive, floating frosted glass containers (`rounded-[36px] sm:rounded-[44px]`), featuring genuine optical blur (`backdrop-filter: blur(30px)`), crisp top specular rim highlights (`inset 0 2px 0 rgba(255,255,255,0.98)`), and soft ambient color-casted shadows.
2. **Volumetric 3D Clouds & Depth Breakout**: Soft claymorphism 3D clouds float gracefully around and break past the boundaries of the glass frames (top center, bottom-right, and trailing from the 3D rocket), establishing palpable physical depth.
3. **Zero AI Star / Sparkle Symbols**: All cliché AI generator stars and sparkle glyphs are banished. All iconography is functional, crisp, and purposeful (`Zap`, `CheckCircle2`, `ShieldCheck`, `Trophy`, `Globe2`, etc.).
4. **Polychromatic Vibrancy with High Contrast**: Deep royal indigo typography (`#1e1458` and `#1e1b4b`) provides effortless WCAG AAA contrast over translucent glass surfaces. Jenjang levels are distinctly color-coded with vibrant jewel tones (Emerald for SD, Azure Cyan for SMP, Royal Violet for SMA, Solar Amber for Hadiah, Coral Rose for Midtrans).
5. **Tactile 3D Buttons**: Saturated royal purple primary pill buttons with dimensional press states, accompanied by frosted glass outline secondary buttons.

---

## Color Strategy: Committed Multi-Role Jewels

| Token Role | Hex Base | Glass Fill Gradient | Border Tint | Glow / Shadow |
|---|---|---|---|---|
| **Canvas Background** | `#f8fafc` | Multi-caustic mesh (`#e0f2fe`, `#ede9fe`, `#fef3c7`, `#d1fae5`) | N/A | Ambient diffuse |
| **Neutral Glass** | `#ffffff` | `linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.60) 100%)` | `rgba(255,255,255,0.9)` | `0 20px 40px -15px rgba(15,23,42,0.07)` |
| **SD Tier (Emerald Aurora)** | `#10b981` | `linear-gradient(140deg, rgba(236,253,245,0.92) 0%, rgba(209,250,229,0.65) 100%)` | `rgba(110,231,183,0.8)` | `0 14px 30px -6px rgba(16,185,129,0.22)` |
| **SMP Tier (Azure Cyan)** | `#0ea5e9` | `linear-gradient(140deg, rgba(240,249,255,0.92) 0%, rgba(224,242,254,0.65) 100%)` | `rgba(125,211,252,0.8)` | `0 14px 30px -6px rgba(14,165,233,0.22)` |
| **SMA Tier (Cosmic Violet)** | `#8b5cf6` | `linear-gradient(140deg, rgba(245,243,255,0.92) 0%, rgba(237,233,254,0.65) 100%)` | `rgba(196,181,253,0.8)` | `0 14px 30px -6px rgba(139,92,246,0.22)` |
| **Prestige / Gold (Solar Amber)**| `#f59e0b` | `linear-gradient(140deg, rgba(255,251,235,0.95) 0%, rgba(254,243,199,0.70) 100%)` | `rgba(252,211,77,0.8)` | `0 14px 30px -6px rgba(245,158,11,0.25)` |
| **Urgent / Rose (Coral Ruby)** | `#f43f5e` | `linear-gradient(140deg, rgba(255,241,242,0.92) 0%, rgba(255,228,230,0.70) 100%)` | `rgba(253,164,175,0.8)` | `0 14px 30px -6px rgba(244,63,94,0.22)` |

---

## Typography

- **Headings & Display**: `Outfit`, `Plus Jakarta Sans`, sans-serif. Tracking: `-0.025em` to `-0.03em`. Weights: 700 (Bold), 800 (ExtraBold), 900 (Black).
- **Body & Controls**: `DM Sans`, system-ui, sans-serif. Weight: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold).
- **Data & Numbers**: `font-variant-numeric: tabular-nums` for timers, currency values (e.g. `Rp 45.000.000+`), scores, and dates.

---

## 3D Glass Layering Rules

1. **Primary Glass Surface (`.glass-3d-base`)**:
   - Frosted crystal appearance with `backdrop-filter: blur(20px) saturate(190%)`.
   - Subtle top bevel rim highlight (`inset 0 1.5px 0 0 rgba(255, 255, 255, 0.95)`).
   - Bottom subtle occlusion shadow (`0 20px 45px -12px rgba(15, 23, 42, 0.08)`).
2. **Interactive Floating Glass (`.glass-3d-interactive`)**:
   - On hover: `transform: translateY(-4px) scale(1.01) translateZ(10px)`.
   - Enhanced luminous reflection and colored ambient shadow projection.
3. **Tactile 3D Buttons (`.btn-3d-glass`)**:
   - Dimensional elevation with physical pill depth: `box-shadow: 0 6px 0 ...` or layered luminous glow + specular top stroke.
   - Active press state: `transform: translateY(2px)`.

---

## Quality Checklist

- [x] No washed-out low contrast text (all text passes WCAG AA contrast against its glass container).
- [x] No generic single-color layouts (purposeful multi-color coding for SD, SMP, SMA, and Administrative roles).
- [x] Responsive from 320px mobile to 1920px 4K displays.
- [x] Keyboard focusable with high-visibility luminous focus rings.
