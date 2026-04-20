import { describe, it, expect, beforeEach } from 'vitest';
import {
  getWorkerUrl,
  setWorkerUrl,
  clearWorkerUrl,
  getWorkerUrlSource,
} from '../workerConfig';

const KEY = 'clipcut.transcriptWorkerUrl';

// `.env` in this repo sets VITE_TRANSCRIPT_WORKER_URL at test time; capture
// the baseline so assertions work regardless of whether the env has a value.
const ENV_URL = (import.meta.env?.VITE_TRANSCRIPT_WORKER_URL || '').replace(/\/+$/, '');
const ENV_SOURCE = ENV_URL ? 'env' : 'none';

describe('workerConfig precedence', () => {
  beforeEach(() => {
    localStorage.removeItem(KEY);
  });

  it('with no runtime override, falls through to env (or "none" when env is also empty)', () => {
    expect(getWorkerUrl()).toBe(ENV_URL);
    expect(getWorkerUrlSource()).toBe(ENV_SOURCE);
  });

  it('persists a runtime override and reports source=runtime', () => {
    setWorkerUrl('https://example.workers.dev/');
    expect(getWorkerUrl()).toBe('https://example.workers.dev');
    expect(getWorkerUrlSource()).toBe('runtime');
  });

  it('clearWorkerUrl reverts to the env layer', () => {
    setWorkerUrl('https://example.workers.dev');
    expect(getWorkerUrlSource()).toBe('runtime');
    clearWorkerUrl();
    expect(getWorkerUrlSource()).toBe(ENV_SOURCE);
    expect(getWorkerUrl()).toBe(ENV_URL);
  });

  it('trims whitespace and normalises trailing slashes on write', () => {
    setWorkerUrl('   https://example.workers.dev//   ');
    expect(getWorkerUrl()).toBe('https://example.workers.dev');
  });

  it('setting an empty string clears the key', () => {
    setWorkerUrl('https://example.workers.dev');
    setWorkerUrl('');
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it('runtime override takes precedence over env', () => {
    // Even if env is set, runtime wins.
    setWorkerUrl('https://runtime-override.example.com');
    expect(getWorkerUrl()).toBe('https://runtime-override.example.com');
    expect(getWorkerUrlSource()).toBe('runtime');
  });
});
