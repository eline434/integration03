/**
 * Media query utilities for responsive JavaScript
 * Gebruik gsap.matchMedia voor responsive animaties volgens copilot-instructions
 */

export const breakpoints = {
    mobile: '(max-width: 47.9375em)', // < 768px
    tablet: '(min-width: 48em)', // >= 768px
    desktop: '(min-width: 64em)' // >= 1024px
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get responsive radius for carousel based on viewport
 * @returns {number} radius in pixels
 */
export const getResponsiveRadius = () => {
    if (window.matchMedia(breakpoints.desktop).matches) {
        return 300;
    } else if (window.matchMedia(breakpoints.tablet).matches) {
        return 200;
    }
    return 100;
};
