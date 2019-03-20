import { describe, it, expect } from 'vitest';
import { presets, getPreset, getPresetNames } from '../src/presets';
import { resolveTheme } from '../src/utils';

describe('presets', () => {
  it('contains preset theme definitions', () => {
    expect(Object.keys(presets).length).toBeGreaterThan(0);
  });

  it('each preset has light and dark variants', () => {
    for (const [key, preset] of Object.entries(presets)) {
      expect(preset.name).toBeTruthy();
      expect(preset.light).toBeDefined();
      expect(preset.dark).toBeDefined();
    }
  });

  it('each variant has expected CSS variables', () => {
    const expectedVars = [
      '--bg-primary',
      '--bg-secondary',
      '--text-primary',
      '--text-secondary',
      '--border',
      '--accent',
    ];

    for (const preset of Object.values(presets)) {
      for (const varName of expectedVars) {
        expect(preset.light[varName]).toBeTruthy();
        expect(preset.dark[varName]).toBeTruthy();
      }
    }
  });

  it('includes slate preset', () => {
    expect(presets.slate).toBeDefined();
    expect(presets.slate.name).toBe('Slate');
  });

  it('includes zinc preset', () => {
    expect(presets.zinc).toBeDefined();
    expect(presets.zinc.name).toBe('Zinc');
  });

  it('includes stone preset', () => {
    expect(presets.stone).toBeDefined();
    expect(presets.stone.name).toBe('Stone');
  });
});

describe('getPreset', () => {
  it('returns the preset for a valid name', () => {
    const preset = getPreset('slate');
    expect(preset).toBeDefined();
    expect(preset!.name).toBe('Slate');
  });

  it('returns undefined for an invalid name', () => {
    expect(getPreset('nonexistent')).toBeUndefined();
  });
});

describe('getPresetNames', () => {
  it('returns an array of preset names', () => {
    const names = getPresetNames();
    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain('slate');
    expect(names).toContain('zinc');
    expect(names).toContain('stone');
  });
});

describe('resolveTheme', () => {
  it('returns light when mode is light', () => {
    expect(resolveTheme('light')).toBe('light');
  });

  it('returns dark when mode is dark', () => {
    expect(resolveTheme('dark')).toBe('dark');
  });

  it('returns light for system mode in non-browser environment', () => {
    // In Node.js (vitest), window is undefined, so getSystemTheme returns 'light'
    expect(resolveTheme('system')).toBe('light');
  });
});

describe('resolveTheme - additional', () => {
  it('returns light for mode light', () => {
    expect(resolveTheme('light')).toBe('light');
  });

  it('returns dark for mode dark', () => {
    expect(resolveTheme('dark')).toBe('dark');
  });

  it('returns a theme string for system mode', () => {
    const result = resolveTheme('system');
    expect(['light', 'dark']).toContain(result);
  });
});

describe('presets - additional coverage', () => {
  it('has at least 3 presets', () => {
    expect(Object.keys(presets).length).toBeGreaterThanOrEqual(3);
  });

  it('slate preset light has --bg-primary', () => {
    expect(presets.slate.light['--bg-primary']).toBeTruthy();
  });

  it('slate preset dark has --text-primary', () => {
    expect(presets.slate.dark['--text-primary']).toBeTruthy();
  });

  it('zinc preset has a name', () => {
    expect(presets.zinc.name).toBeTruthy();
  });

  it('stone preset has light and dark', () => {
    expect(presets.stone.light).toBeDefined();
    expect(presets.stone.dark).toBeDefined();
  });

  it('getPresetNames returns array with zinc', () => {
    expect(getPresetNames()).toContain('zinc');
  });

  it('getPreset returns undefined for invalid', () => {
    expect(getPreset('doesnotexist')).toBeUndefined();
  });
});
