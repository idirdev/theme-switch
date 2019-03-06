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
