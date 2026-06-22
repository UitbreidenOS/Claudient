import { useState, useEffect } from 'react';
import { featureFlagsService, FeatureFlagId, FeatureFlag } from '../services/featureFlags';

/**
 * Hook to check if a feature flag is enabled
 * Useful for conditional rendering and feature toggles
 */
export function useFeatureFlag(flagId: FeatureFlagId): {
  isEnabled: boolean;
  flag: FeatureFlag | undefined;
  rolloutPercentage: number;
} {
  const [isEnabled, setIsEnabled] = useState(false);
  const flag = featureFlagsService.getFlag(flagId);

  useEffect(() => {
    setIsEnabled(featureFlagsService.isEnabled(flagId));
  }, [flagId]);

  return {
    isEnabled,
    flag,
    rolloutPercentage: flag?.rolloutPercentage || 0,
  };
}

/**
 * Hook to get all feature flags
 */
export function useAllFeatureFlags(): FeatureFlag[] {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);

  useEffect(() => {
    setFlags(featureFlagsService.getAllFlags());
  }, []);

  return flags;
}

/**
 * Hook to get rollout metrics
 */
export function useRolloutMetrics(flagId: FeatureFlagId) {
  const [metrics, setMetrics] = useState(featureFlagsService.getRolloutMetrics(flagId));

  useEffect(() => {
    setMetrics(featureFlagsService.getRolloutMetrics(flagId));
  }, [flagId]);

  return metrics;
}

/**
 * Hook to get feature flag statistics
 */
export function useFeatureFlagStats() {
  const [stats, setStats] = useState(featureFlagsService.getStats());

  useEffect(() => {
    setStats(featureFlagsService.getStats());
  }, []);

  return stats;
}
