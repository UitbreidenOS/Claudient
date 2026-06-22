# Feature Flags Configuration

Feature flags control the rollout and availability of features across environments. Configure flags via the config system to enable/disable features dynamically without redeployment.

---

## Flag Registry

### matrix-theme
- **Status**: 100% On (General Availability)
- **Description**: Matrix-style theme with digital rain effects and neon aesthetics
- **Rollout**: Full production rollout
- **Target Users**: All users
- **Config Key**: `features.matrix-theme.enabled`

**Config Entry:**
```json
{
  "features": {
    "matrix-theme": {
      "enabled": true,
      "rollout": 100,
      "environments": ["production", "staging", "development"]
    }
  }
}
```

---

### svg-inspector
- **Status**: 50% Early Access
- **Description**: SVG analysis and inspection tool with real-time visualization
- **Rollout**: Early access phase - 50% of users
- **Target Users**: Beta testers, designers, early adopters
- **Config Key**: `features.svg-inspector.enabled`

**Config Entry:**
```json
{
  "features": {
    "svg-inspector": {
      "enabled": true,
      "rollout": 50,
      "environments": ["production", "staging", "development"],
      "beta_access": true,
      "user_segment": "early_access"
    }
  }
}
```

---

### swarm-sandbox
- **Status**: 10% Beta
- **Description**: Multi-agent sandbox environment for collaborative AI testing
- **Rollout**: Closed beta - 10% of users
- **Target Users**: Selected partners, enterprises, research teams
- **Config Key**: `features.swarm-sandbox.enabled`

**Config Entry:**
```json
{
  "features": {
    "swarm-sandbox": {
      "enabled": true,
      "rollout": 10,
      "environments": ["staging", "development"],
      "beta_access": true,
      "user_segment": "closed_beta",
      "requires_approval": true
    }
  }
}
```

---

### dont-stop
- **Status**: 0% Private Beta
- **Description**: Advanced workflow continuation and multi-session persistence (private development)
- **Rollout**: Private beta - 0% public availability
- **Target Users**: Internal team only
- **Config Key**: `features.dont-stop.enabled`

**Config Entry:**
```json
{
  "features": {
    "dont-stop": {
      "enabled": false,
      "rollout": 0,
      "environments": ["development"],
      "beta_access": false,
      "user_segment": "internal_only",
      "requires_approval": true,
      "internal_only": true
    }
  }
}
```

---

## Master Configuration

Complete feature flag configuration matrix:

```json
{
  "features": {
    "matrix-theme": {
      "enabled": true,
      "rollout": 100,
      "environments": ["production", "staging", "development"],
      "description": "Matrix-style theme with digital rain effects"
    },
    "svg-inspector": {
      "enabled": true,
      "rollout": 50,
      "environments": ["production", "staging", "development"],
      "beta_access": true,
      "user_segment": "early_access",
      "description": "SVG analysis and inspection tool"
    },
    "swarm-sandbox": {
      "enabled": true,
      "rollout": 10,
      "environments": ["staging", "development"],
      "beta_access": true,
      "user_segment": "closed_beta",
      "requires_approval": true,
      "description": "Multi-agent sandbox environment"
    },
    "dont-stop": {
      "enabled": false,
      "rollout": 0,
      "environments": ["development"],
      "beta_access": false,
      "user_segment": "internal_only",
      "requires_approval": true,
      "internal_only": true,
      "description": "Advanced workflow continuation (private beta)"
    }
  },
  "feature_flag_version": "1.0.0",
  "last_updated": "2026-06-22",
  "override_rules": {
    "production": {
      "allowed_rollout_max": 100,
      "requires_approval": true,
      "min_testing_duration": "7 days"
    },
    "staging": {
      "allowed_rollout_max": 100,
      "requires_approval": false,
      "min_testing_duration": "1 day"
    },
    "development": {
      "allowed_rollout_max": 100,
      "requires_approval": false,
      "min_testing_duration": "0 days"
    }
  }
}
```

---

## Environment-Specific Overrides

### Production
```json
{
  "features": {
    "matrix-theme": { "enabled": true, "rollout": 100 },
    "svg-inspector": { "enabled": true, "rollout": 50 },
    "swarm-sandbox": { "enabled": false, "rollout": 0 },
    "dont-stop": { "enabled": false, "rollout": 0 }
  }
}
```

### Staging
```json
{
  "features": {
    "matrix-theme": { "enabled": true, "rollout": 100 },
    "svg-inspector": { "enabled": true, "rollout": 100 },
    "swarm-sandbox": { "enabled": true, "rollout": 100 },
    "dont-stop": { "enabled": false, "rollout": 0 }
  }
}
```

### Development
```json
{
  "features": {
    "matrix-theme": { "enabled": true, "rollout": 100 },
    "svg-inspector": { "enabled": true, "rollout": 100 },
    "swarm-sandbox": { "enabled": true, "rollout": 100 },
    "dont-stop": { "enabled": true, "rollout": 100 }
  }
}
```

---

## Implementation Guide

### Checking Feature Flags in Code

```javascript
// Using a feature flag utility
import { isFeatureEnabled } from './utils/featureFlags';

if (isFeatureEnabled('matrix-theme')) {
  // Load matrix theme assets
  loadMatrixTheme();
}

// With rollout percentage check
if (isFeatureEnabledForUser('svg-inspector', userId)) {
  // Show SVG inspector UI
  showSvgInspector();
}
```

### Server-Side Configuration

Load configuration from environment or config service:

```javascript
const config = loadConfig(process.env.ENVIRONMENT);
const featureFlags = config.features;

const isMatrixThemeEnabled = featureFlags['matrix-theme'].enabled;
```

### Client-Side Feature Detection

```javascript
const featureFlags = window.__FEATURE_FLAGS__ || {};

const Features = {
  matrixTheme: featureFlags.matrix_theme?.enabled ?? false,
  svgInspector: featureFlags.svg_inspector?.enabled ?? false,
  swarmSandbox: featureFlags.swarm_sandbox?.enabled ?? false,
  dontStop: featureFlags.dont_stop?.enabled ?? false
};
```

---

## Rollout Policy

### Phases
1. **Private Beta (0%)**: Internal testing only
2. **Closed Beta (1-20%)**: Selected users, requires approval
3. **Early Access (21-80%)**: Broader rollout, monitoring active
4. **General Availability (100%)**: Full production deployment

### Monitoring Requirements
- Error rates per feature flag
- Performance impact metrics
- User adoption rates
- Feedback collection channels

### Rollback Strategy
- Monitor error threshold: rollback if >0.5% error increase
- Performance threshold: rollback if p95 latency increases >10%
- Manual rollback available 24/7 for any feature flag

---

## Updating Feature Flags

### Adding a New Feature Flag

1. Define in `FEATURE_FLAGS.md` with all metadata
2. Add to master configuration JSON
3. Deploy config change (no code restart required)
4. Monitor metrics in first 24 hours
5. Gradually increase rollout percentage as confidence grows

### Disabling a Feature Flag

1. Set `enabled: false` in config
2. Deploy config change
3. Monitor error rates decrease
4. Remove feature flag code in next major release

### Rollout Schedule Example

```json
{
  "feature": "svg-inspector",
  "timeline": {
    "day_1": { "rollout": 1 },
    "day_3": { "rollout": 10 },
    "day_7": { "rollout": 50 },
    "day_14": { "rollout": 100 }
  }
}
```

---

## Related Documentation

- Configuration Management: `config.md`
- Deployment Pipeline: `DEPLOYMENT.md`
- Monitoring & Alerting: `MONITORING.md`
