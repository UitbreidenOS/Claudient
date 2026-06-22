/**
 * Feature Flag Configuration Export
 * This is the single source of truth for feature flag settings
 */

export const FEATURE_FLAG_CONFIG = {
  'matrix-theme': {
    percentage: 100,
    status: 'stable',
    description: 'The Matrix Theme Pack - Premium aesthetic UX',
  },
  'svg-inspector': {
    percentage: 50,
    status: 'early-access',
    description: 'SVG Interactive Map Inspector - Early Access Program',
  },
  'swarm-sandbox': {
    percentage: 25,
    status: 'beta',
    description: 'Swarm Sandbox Simulator - Beta Testing',
  },
  'dont-stop': {
    percentage: 10,
    status: 'private-beta',
    description: 'Dont Stop - Private Beta Program',
  },
} as const;

export type FeatureFlagName = keyof typeof FEATURE_FLAG_CONFIG;

/**
 * Verify that a feature flag is enabled for current user
 * Uses a deterministic algorithm based on URL hash
 */
export function isFeatureEnabled(flagName: FeatureFlagName): boolean {
  if (typeof window === 'undefined') return false;

  const config = FEATURE_FLAG_CONFIG[flagName];
  if (!config) return false;

  // Get deterministic user seed from browser (same across sessions for same user)
  const userFingerprint = navigator.userAgent + navigator.language;
  let hash = 0;
  for (let i = 0; i < userFingerprint.length; i++) {
    hash = ((hash << 5) - hash) + userFingerprint.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  const userSeed = Math.abs(hash % 100);

  return userSeed < config.percentage;
}

/**
 * Get all feature flags and their current status
 */
export function getAllFeatureFlags() {
  return Object.entries(FEATURE_FLAG_CONFIG).map(([name, config]) => ({
    name,
    enabled: isFeatureEnabled(name as FeatureFlagName),
    ...config,
  }));
}

/**
 * Get feature flag statistics
 */
export function getFeatureFlagStats() {
  const flags = getAllFeatureFlags();
  const enabledCount = flags.filter(f => f.enabled).length;
  const avgPercentage = Math.round(
    flags.reduce((sum, f) => sum + f.percentage, 0) / flags.length
  );

  const byStatus = {} as Record<string, number>;
  flags.forEach(f => {
    byStatus[f.status] = (byStatus[f.status] || 0) + 1;
  });

  return {
    total: flags.length,
    enabled: enabledCount,
    avgRollout: avgPercentage,
    byStatus,
  };
}
