jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  getAllKeys: jest.fn(),
}));

import { getStringMap, getLanguageDirection } from '../src/i18n';

describe('language helpers', () => {
  it('returns Arabic strings for the Arabic locale', () => {
    expect(getStringMap('ar').changeLanguage).toBe('تغيير اللغة');
  });

  it('returns rtl direction for Arabic', () => {
    expect(getLanguageDirection('ar')).toBe('rtl');
  });
});
