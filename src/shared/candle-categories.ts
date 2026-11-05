export const candleCategories = ['All candles', 'Floral', 'Jar candles', 'Festive', 'Decorative'] as const;
export type CandleCategory = typeof candleCategories[number];
const floral = new Set(['mini-bouquet', 'sunflower-garden', 'rose-candle', 'rose-design-2', 'tulip-candle', 'peony-bloom', 'daisy-love', 'sunflower', 'heartofroses']);
const jars = new Set(['ocean', 'magic', 'trio-jar', 'heart-candle', 'watermelon', 'cloud', 'berry-bliss', 'latte-coffee', 'vanilla-chocolate', 'icedmacha', 'sunflower-garden']);
export function matchesCandleCategory(id: string, category: CandleCategory): boolean {
 if (category === 'All candles') return true;
 if (category === 'Floral') return floral.has(id);
 if (category === 'Jar candles') return jars.has(id);
 if (category === 'Festive') return /christmas|reindeer|baby-jesus/.test(id);
 return !jars.has(id) && !/christmas|reindeer|baby-jesus/.test(id);
}
