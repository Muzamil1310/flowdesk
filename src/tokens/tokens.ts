/**
 * FlowDesk Design Tokens
 * Centralized configuration for visual constants, typography, spacing, and colors.
 * Adheres strictly to the premium modern B2B SaaS aesthetic (Linear/Stripe style).
 */

export const tokens = {
  colors: {
    // 60% Dominant Canvas
    canvas: {
      default: '#FAFAFA', // zinc-50
      subtle: '#F4F4F5',  // zinc-100
      hover: '#E4E4E7',   // zinc-200
    },
    // 30% Structural Surfaces & Typography
    surface: {
      default: '#FFFFFF',
      elevated: '#FFFFFF',
      border: '#E4E4E7',   // zinc-200 (hairline border)
      borderFocus: '#09090B',
    },
    text: {
      primary: '#09090B',   // zinc-950 near-black
      secondary: '#52525B', // zinc-600 muted neutral
      tertiary: '#71717A',  // zinc-500
      subtle: '#A1A1AA',    // zinc-400
      inverse: '#FFFFFF',
    },
    // 10% Restrained Accent Budget (Cobalt reserved for focus & status tags)
    accent: {
      primary: '#2563EB',    // blue-600 restrained cobalt
      hover: '#1D4ED8',      // blue-700
      subtle: '#EFF6FF',     // blue-50
      border: '#BFDBFE',     // blue-200
    },
    // Semantic States (Colorblind accessible, paired with text/icons)
    semantic: {
      success: {
        text: '#15803D',
        bg: '#F0FDF4',
        border: '#BBF7D0',
      },
      warning: {
        text: '#B45309',
        bg: '#FFFBEB',
        border: '#FDE68A',
      },
      error: {
        text: '#B91C1C',
        bg: '#FEF2F2',
        border: '#FECACA',
      },
      neutral: {
        text: '#3F3F46',
        bg: '#F4F4F5',
        border: '#E4E4E7',
      },
    },
  },

  typography: {
    fontFamilies: {
      sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    scale: {
      display: 'text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950',
      h1: 'text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950',
      h2: 'text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950',
      h3: 'text-lg font-medium text-zinc-900',
      body: 'text-sm sm:text-base text-zinc-600 leading-relaxed',
      bodySmall: 'text-xs sm:text-sm text-zinc-500 leading-normal',
      caption: 'text-xs text-zinc-500',
      label: 'text-xs font-medium text-zinc-700 tracking-wide uppercase',
      code: 'font-mono text-xs tabular-nums',
    },
  },

  radius: {
    none: 'rounded-none',
    sm: 'rounded',       // 4px
    md: 'rounded-md',    // 6px
    lg: 'rounded-lg',    // 8px
    xl: 'rounded-xl',    // 12px
    full: 'rounded-full', // only for avatars or radio indicators
  },

  shadows: {
    none: 'shadow-none',
    sm: 'shadow-xs',
    subtle: 'shadow-sm',
    dropdown: 'shadow-md shadow-zinc-950/5',
    modal: 'shadow-xl shadow-zinc-950/10',
  },

  spacing: {
    touchTargetMin: '40px',
    containerMaxWidth: 'max-w-6xl',
  },
} as const;
