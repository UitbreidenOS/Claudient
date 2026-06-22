import React from 'react';
import { useFeatureFlagStats, useAllFeatureFlags } from '../hooks/useFeatureFlag';
import { FeatureFlag } from '../services/featureFlags';

const STATUS_COLORS: Record<string, string> = {
  'stable': '#22c55e',
  'early-access': '#3b82f6',
  'beta': '#f59e0b',
  'private-beta': '#8b5cf6',
};

const CATEGORY_ICONS: Record<string, string> = {
  'ui': '🎨',
  'performance': '⚡',
  'experimental': '🧪',
  'security': '🔒',
};

export function FeatureFlagStatus() {
  const stats = useFeatureFlagStats();
  const flags = useAllFeatureFlags();

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Feature Flags Configuration</h2>

      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="text-sm text-slate-400 mb-1">Total Flags</div>
          <div className="text-3xl font-bold">{stats.totalFlags}</div>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="text-sm text-slate-400 mb-1">Enabled</div>
          <div className="text-3xl font-bold text-green-400">{stats.enabledFlags}</div>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="text-sm text-slate-400 mb-1">Avg Rollout</div>
          <div className="text-3xl font-bold text-blue-400">{stats.avgRollout}%</div>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="text-sm text-slate-400 mb-1">By Status</div>
          <div className="text-sm space-y-0.5">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <div key={status} className="text-xs text-slate-300">
                {status}: <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Flags List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold mb-3">Enabled Flags</h3>
        {flags.map((flag) => (
          <div
            key={flag.id}
            className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50 hover:border-slate-500 transition"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{CATEGORY_ICONS[flag.category] || '🚀'}</span>
                <div>
                  <h4 className="font-semibold text-white">{flag.name}</h4>
                  <p className="text-xs text-slate-400">{flag.description}</p>
                </div>
              </div>
              <div
                className="px-2 py-1 rounded text-xs font-semibold"
                style={{
                  backgroundColor: STATUS_COLORS[flag.status] + '20',
                  color: STATUS_COLORS[flag.status],
                  border: `1px solid ${STATUS_COLORS[flag.status]}40`,
                }}
              >
                {flag.status.charAt(0).toUpperCase() + flag.status.slice(1)}
              </div>
            </div>

            {/* Rollout Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-400">Rollout Progress</span>
                <span className="text-sm font-semibold" style={{ color: STATUS_COLORS[flag.status] }}>
                  {flag.rolloutPercentage}%
                </span>
              </div>
              <div className="w-full bg-slate-600/30 rounded-full h-2 border border-slate-600/50">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${flag.rolloutPercentage}%`,
                    backgroundColor: STATUS_COLORS[flag.status],
                  }}
                />
              </div>
            </div>

            {/* Meta Information */}
            <div className="mt-2 flex gap-4 text-xs text-slate-400">
              <span>Released: {flag.releaseDate}</span>
              <span>Category: <span className="text-slate-300">{flag.category}</span></span>
              <span>Status: <span className="text-slate-300">{flag.enabled ? '✓ Active' : '✗ Inactive'}</span></span>
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Summary */}
      <div className="mt-6 bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
        <h3 className="text-sm font-semibold mb-2 text-slate-300">Configuration Summary</h3>
        <div className="text-xs text-slate-400 space-y-1">
          <p>✓ <strong>matrix-theme</strong>: 100% rollout (Production)</p>
          <p>✓ <strong>svg-inspector</strong>: 50% rollout (Early Access)</p>
          <p>✓ <strong>swarm-sandbox</strong>: 25% rollout (Beta)</p>
          <p>✓ <strong>dont-stop</strong>: 10% rollout (Private Beta)</p>
        </div>
      </div>
    </div>
  );
}
