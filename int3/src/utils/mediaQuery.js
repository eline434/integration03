export const breakpoints = {
    mobile: '(max-width: 47.9375em)',
    tablet: '(min-width: 48em)',
    desktop: '(min-width: 64em)'
};

export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getResponsiveRadius = () => {
    if (window.matchMedia(breakpoints.desktop).matches) {
        return 300;
    } else if (window.matchMedia(breakpoints.tablet).matches) {
        return 200;
    }
    return 100;
};
