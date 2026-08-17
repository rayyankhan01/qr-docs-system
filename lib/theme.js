import { createTheme, alpha } from '@mui/material/styles'

// ---------------------------------------------------------------------------
// Brand tokens
//
// Your three brand colours, expanded into ramps. The `400`/`500` steps are the
// exact hexes you already picked; the lighter and darker steps exist so that
// hovers, borders and tints stay in the same hue instead of drifting grey.
//
// Rule of thumb: if you are about to type a hex code inside a component, add
// it here instead and read it back off the theme.
// ---------------------------------------------------------------------------

// Dirty golden — your primary.
const gold = {
    50: '#FBF6E8',
    100: '#F4E9C8',
    200: '#E9D79C',
    300: '#DCC377',
    400: '#C9A84C', // brand gold
    500: '#B08F35',
    600: '#8F7228',
    700: '#6E571D', // dark enough to use as *text* on the cream background
    800: '#4C3C14',
    900: '#2E240C',
}

// Maroon — your secondary, and the app bar colour.
const maroon = {
    50: '#FAF2F3',
    100: '#F0DDE0',
    200: '#DFB8BE',
    300: '#C88C96',
    400: '#A2505E',
    500: '#6B1E2A', // brand maroon
    600: '#5A1723',
    700: '#47101A',
    800: '#340A12',
    900: '#21050A',
}

// Warm neutrals built around your light-brown page background. Using these
// instead of MUI's blue-grey greys is what keeps borders and muted text
// looking like they belong on cream.
const sand = {
    0: '#FFFFFF',
    50: '#FDFBF6',
    100: '#F5ECD7', // your page background
    200: '#EADFC5',
    300: '#D8CBAD',
    400: '#B3A88D',
    500: '#877E67',
    600: '#5C554A', // muted text
    700: '#423D34',
    800: '#29251F',
    900: '#1A1714', // body text
}

// The sidebar is a dark surface that deliberately sits outside the light
// palette, so it gets its own named tokens.
const sidebar = {
    bg: '#1A1A1A',
    bgHover: '#333333',
    border: '#333333',
    text: '#FFFFFF',
    textMuted: '#9A9089',
    activeBg: gold[400],
    activeText: '#1A1A1A',
}

// Soft, warm-tinted shadows. MUI's defaults are hard black and read as dirty
// smudges over a cream background.
const shadow = {
    xs: '0 1px 2px rgba(26, 23, 20, 0.06)',
    sm: '0 1px 3px rgba(26, 23, 20, 0.08), 0 1px 2px rgba(26, 23, 20, 0.04)',
    md: '0 4px 12px rgba(26, 23, 20, 0.10), 0 1px 3px rgba(26, 23, 20, 0.05)',
    lg: '0 12px 32px rgba(26, 23, 20, 0.14), 0 2px 8px rgba(26, 23, 20, 0.07)',
}

const theme = createTheme({
    // The AppBar must sit above the permanent Drawer. Declaring it here means
    // DashboardLayout no longer needs an inline `zIndex: 1201`.
    zIndex: {
        appBar: 1201,
        drawer: 1200,
    },

    shape: {
        borderRadius: 10,
    },

    palette: {
        mode: 'light',

        // Gold stays primary, exactly as you had it.
        primary: {
            light: gold[300],
            main: gold[400],
            dark: gold[600],
            // Gold is a *light* colour. White text on it lands around 2:1 and
            // fails WCAG badly; near-black lands around 9:1. So filled gold
            // buttons get dark labels — same colour you chose, readable.
            contrastText: sand[900],
        },

        // Maroon stays secondary.
        secondary: {
            light: maroon[400],
            main: maroon[500],
            dark: maroon[700],
            contrastText: '#FFFFFF',
        },

        error: { main: '#B3261E', light: '#E2574C', dark: '#7F1810' },
        warning: { main: '#B26A00', light: '#E08C1A', dark: '#7D4A00' },
        success: { main: '#2E6B4F', light: '#4C9070', dark: '#1D4733' },
        info: { main: '#2C5C82', light: '#4E82AC', dark: '#1B3D58' },

        background: {
            default: sand[100], // #F5ECD7, your cream
            paper: sand[0],
        },

        text: {
            primary: sand[900],
            secondary: sand[600],
            disabled: sand[400],
        },

        divider: alpha(sand[900], 0.12),

        // Custom scales, reachable in any `sx` prop as e.g. `bgcolor: 'sand.200'`
        // or `color: 'maroon.500'`.
        gold,
        maroon,
        sand,
        sidebar,
        shadow,
    },

    typography: {
        // The CSS variable is set by next/font in app/layout.js.
        fontFamily: 'var(--font-inter), "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        h1: { fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 },
        h2: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 },
        h3: { fontSize: '1.625rem', fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.25 },
        h4: { fontSize: '1.375rem', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.3 },
        h5: { fontSize: '1.125rem', fontWeight: 600, letterSpacing: '-0.005em', lineHeight: 1.35 },
        h6: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 },
        subtitle1: { fontSize: '0.9375rem', fontWeight: 600, lineHeight: 1.45 },
        subtitle2: { fontSize: '0.8125rem', fontWeight: 600, lineHeight: 1.45 },
        body1: { fontSize: '0.9375rem', lineHeight: 1.6 },
        body2: { fontSize: '0.8125rem', lineHeight: 1.55 },
        button: { fontSize: '0.875rem', fontWeight: 600, letterSpacing: 0 },
        caption: { fontSize: '0.75rem', lineHeight: 1.45, letterSpacing: '0.01em' },
        overline: {
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            lineHeight: 1.4,
        },
    },

    components: {
        // ---------------------------------------------------------------- base
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                },
                '*::-webkit-scrollbar': { width: 10, height: 10 },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: alpha(sand[900], 0.2),
                    borderRadius: 8,
                    border: '2px solid transparent',
                    backgroundClip: 'content-box',
                },
                '*::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: alpha(sand[900], 0.3),
                },
            },
        },

        // ------------------------------------------------------------- buttons
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    // MUI SHOUTS BY DEFAULT. Sentence case reads better.
                    textTransform: 'none',
                    borderRadius: 8,
                    paddingInline: 16,
                    whiteSpace: 'nowrap',
                },
                sizeSmall: { paddingBlock: 4, paddingInline: 12, fontSize: '0.8125rem' },
                sizeLarge: { paddingBlock: 10, paddingInline: 22, fontSize: '0.9375rem' },

                containedPrimary: {
                    '&:hover': { backgroundColor: gold[500] },
                },
                containedSecondary: {
                    '&:hover': { backgroundColor: maroon[600] },
                },

                // Outlined/text buttons draw the brand colour as *text*. Gold
                // at #C9A84C on cream is unreadable, so those variants step
                // down to the dark gold. Filled gold buttons are untouched.
                outlinedPrimary: {
                    color: gold[700],
                    borderColor: alpha(gold[600], 0.5),
                    '&:hover': {
                        borderColor: gold[600],
                        backgroundColor: alpha(gold[400], 0.1),
                    },
                },
                textPrimary: {
                    color: gold[700],
                    '&:hover': { backgroundColor: alpha(gold[400], 0.12) },
                },
                outlinedSecondary: {
                    borderColor: alpha(maroon[500], 0.4),
                    '&:hover': {
                        borderColor: maroon[500],
                        backgroundColor: alpha(maroon[500], 0.06),
                    },
                },
            },
        },

        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    color: sand[600],
                    '&:hover': {
                        color: maroon[500],
                        backgroundColor: alpha(maroon[500], 0.08),
                    },
                },
            },
        },

        // ------------------------------------------------------------ surfaces
        MuiPaper: {
            defaultProps: { elevation: 0 },
            styleOverrides: {
                root: { backgroundImage: 'none' },
                outlined: { borderColor: alpha(sand[900], 0.12) },
            },
        },

        MuiCard: {
            defaultProps: { elevation: 0 },
            styleOverrides: {
                root: {
                    border: `1px solid ${alpha(sand[900], 0.1)}`,
                    borderRadius: 12,
                    boxShadow: shadow.sm,
                    backgroundImage: 'none',
                },
            },
        },

        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: 20,
                    '&:last-child': { paddingBottom: 20 },
                },
            },
        },

        MuiCardHeader: {
            styleOverrides: {
                root: { padding: '18px 20px 0' },
                title: { fontSize: '1rem', fontWeight: 600 },
                subheader: { fontSize: '0.8125rem', color: sand[600] },
            },
        },

        MuiDivider: {
            styleOverrides: {
                root: { borderColor: alpha(sand[900], 0.1) },
            },
        },

        // --------------------------------------------------------------- shell
        MuiAppBar: {
            defaultProps: { elevation: 0 },
            styleOverrides: {
                root: {
                    // Maroon bar with the gold wordmark — the combination you
                    // already built in DashboardLayout, now centralised.
                    backgroundColor: maroon[500],
                    color: '#FFFFFF',
                    backgroundImage: 'none',
                    borderBottom: `1px solid ${alpha('#000000', 0.25)}`,
                    boxShadow: 'none',
                },
            },
        },

        MuiToolbar: {
            styleOverrides: {
                root: { minHeight: 64, '@media (min-width:600px)': { minHeight: 64 } },
            },
        },

        // The app has exactly one Drawer — the dark nav rail — so it is styled
        // here rather than repeating colours inside DashboardLayout.
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: sidebar.bg,
                    color: sidebar.text,
                    borderRight: `1px solid ${sidebar.border}`,
                    backgroundImage: 'none',
                },
            },
        },

        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    marginInline: 8,
                    marginBottom: 2,
                    paddingBlock: 9,
                    color: 'inherit',
                    '&:hover': { backgroundColor: sidebar.bgHover },
                    // Use the `selected` prop and this styles itself — no more
                    // ternaries on bgcolor/color at the call site.
                    '&.Mui-selected': {
                        backgroundColor: sidebar.activeBg,
                        color: sidebar.activeText,
                        '&:hover': { backgroundColor: gold[300] },
                        '& .MuiListItemIcon-root': { color: sidebar.activeText },
                    },
                },
            },
        },

        MuiListItemIcon: {
            styleOverrides: {
                root: { minWidth: 38, color: gold[400] },
            },
        },

        MuiListItemText: {
            styleOverrides: {
                primary: { fontSize: '0.875rem', fontWeight: 500 },
            },
        },

        // -------------------------------------------------------------- inputs
        MuiTextField: {
            defaultProps: { variant: 'outlined', size: 'small' },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    // White fields on the cream page so inputs read as "you can
                    // type here" rather than melting into the background.
                    backgroundColor: sand[0],
                    borderRadius: 8,
                    '& fieldset': { borderColor: alpha(sand[900], 0.18) },
                    '&:hover fieldset': { borderColor: alpha(sand[900], 0.32) },
                    '&.Mui-focused fieldset': { borderWidth: 2, borderColor: maroon[500] },
                },
                input: { '&::placeholder': { color: sand[500], opacity: 1 } },
            },
        },

        MuiInputLabel: {
            styleOverrides: {
                root: { fontSize: '0.875rem', '&.Mui-focused': { color: maroon[500] } },
            },
        },

        MuiFormHelperText: {
            styleOverrides: {
                root: { marginInline: 2, fontSize: '0.75rem' },
            },
        },

        // -------------------------------------------------------------- tables
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: `1px solid ${alpha(sand[900], 0.1)}`,
                    borderRadius: 12,
                    backgroundColor: sand[0],
                    boxShadow: shadow.sm,
                    // The blue focus square MUI draws on every clicked cell is
                    // pure noise in a read-only grid.
                    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
                        outline: 'none',
                    },
                },
                columnHeaders: { borderBottom: `1px solid ${alpha(sand[900], 0.1)}` },
                columnHeader: { backgroundColor: sand[50] },
                columnHeaderTitle: {
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: sand[600],
                },
                cell: { fontSize: '0.875rem', borderColor: alpha(sand[900], 0.08) },
                row: {
                    '&:hover': { backgroundColor: alpha(gold[400], 0.09) },
                    '&.Mui-selected': {
                        backgroundColor: alpha(gold[400], 0.16),
                        '&:hover': { backgroundColor: alpha(gold[400], 0.22) },
                    },
                },
                footerContainer: { borderTop: `1px solid ${alpha(sand[900], 0.1)}` },
            },
        },

        MuiTableCell: {
            styleOverrides: {
                root: { borderColor: alpha(sand[900], 0.09), fontSize: '0.875rem' },
                head: {
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: sand[600],
                    backgroundColor: sand[50],
                },
            },
        },

        // ------------------------------------------------------------ overlays
        MuiDialog: {
            defaultProps: { maxWidth: 'sm', fullWidth: true },
            styleOverrides: {
                paper: {
                    borderRadius: 14,
                    boxShadow: shadow.lg,
                    backgroundImage: 'none',
                },
            },
        },

        MuiDialogTitle: {
            styleOverrides: {
                root: { fontSize: '1.125rem', fontWeight: 600, padding: '20px 24px 4px' },
            },
        },

        MuiDialogContent: {
            styleOverrides: { root: { padding: '12px 24px' } },
        },

        MuiDialogActions: {
            styleOverrides: { root: { padding: '12px 20px 20px', gap: 8 } },
        },

        MuiTooltip: {
            defaultProps: { arrow: true },
            styleOverrides: {
                tooltip: {
                    backgroundColor: sand[800],
                    fontSize: '0.75rem',
                    borderRadius: 6,
                    padding: '6px 10px',
                },
                arrow: { color: sand[800] },
            },
        },

        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: 10,
                    boxShadow: shadow.md,
                    border: `1px solid ${alpha(sand[900], 0.1)}`,
                },
            },
        },

        MuiMenuItem: {
            styleOverrides: {
                root: { fontSize: '0.875rem', borderRadius: 6, marginInline: 6 },
            },
        },

        // ------------------------------------------------------------ feedback
        MuiChip: {
            styleOverrides: {
                root: { borderRadius: 7, fontWeight: 600, fontSize: '0.75rem' },
                sizeSmall: { height: 22 },
                label: { paddingInline: 9 },
            },
        },

        MuiAlert: {
            styleOverrides: {
                root: { borderRadius: 10, fontSize: '0.875rem', alignItems: 'center' },
            },
        },

        MuiLinearProgress: {
            styleOverrides: { root: { borderRadius: 999, height: 6 } },
        },

        MuiSkeleton: {
            defaultProps: { animation: 'wave' },
            styleOverrides: { root: { backgroundColor: alpha(sand[900], 0.08) } },
        },

        // ---------------------------------------------------------------- misc
        MuiTabs: {
            styleOverrides: {
                root: { minHeight: 42, borderBottom: `1px solid ${alpha(sand[900], 0.1)}` },
                indicator: { height: 2.5, borderRadius: 2, backgroundColor: maroon[500] },
            },
        },

        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    minHeight: 42,
                    paddingInline: 14,
                    '&.Mui-selected': { color: maroon[500] },
                },
            },
        },

        MuiLink: {
            defaultProps: { underline: 'hover' },
            styleOverrides: {
                root: { color: maroon[500], fontWeight: 500 },
            },
        },

        MuiBreadcrumbs: {
            styleOverrides: {
                root: { fontSize: '0.8125rem' },
                separator: { color: sand[400] },
            },
        },
    },
})

export default theme
