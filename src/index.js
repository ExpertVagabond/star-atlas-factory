// =============================================================================
// Security Hardening — Input Validation, Error Sanitization, Security Constants
// =============================================================================

/** Security constants */
const MAX_INPUT_LENGTH = 10_000;
const MAX_PUBKEY_LENGTH = 44;
const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];
const SENSITIVE_PATTERNS = /(?:api[_-]?key|secret|password|token|auth|credential|private[_-]?key)/i;

/** Validate and sanitize string input */
export function sanitizeString(input) {
  if (typeof input !== 'string') {
    throw new SecurityError('Input must be a string');
  }
  if (input.length > MAX_INPUT_LENGTH) {
    throw new SecurityError(`Input exceeds maximum length of ${MAX_INPUT_LENGTH}`);
  }
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

/** Validate Solana public key format */
export function validatePublicKey(key) {
  const sanitized = sanitizeString(key).trim();
  if (sanitized.length > MAX_PUBKEY_LENGTH || !/^[1-9A-HJ-NP-Za-km-z]+$/.test(sanitized)) {
    throw new SecurityError('Invalid public key format');
  }
  return sanitized;
}

/** Validate generic input */
export function validateInput(input, validator, label = 'input') {
  if (input === null || input === undefined) {
    throw new SecurityError(`${label} is required`);
  }
  if (!validator(input)) {
    throw new SecurityError(`${label} failed validation`);
  }
  return input;
}

/** Sanitize error objects to prevent information leakage */
export function sanitizeError(error) {
  if (error instanceof SecurityError) {
    return { message: error.message, code: 'SECURITY_VIOLATION' };
  }
  const msg = error instanceof Error ? error.message : String(error);
  const sanitized = msg
    .replace(/\/[^\s:]+/g, '[path]')
    .replace(/at\s+.+\(.*\)/g, '[internal]')
    .replace(SENSITIVE_PATTERNS, '[redacted]');
  return { message: sanitized, code: 'INTERNAL_ERROR' };
}

/** Security-specific error class */
export class SecurityError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SecurityError';
  }
}

/** Rate limiter stub */
export function createRateLimiter(opts) {
  const hits = new Map();
  return {
    check(key) {
      const now = Date.now();
      const entry = hits.get(key);
      if (!entry || now > entry.resetAt) {
        hits.set(key, { count: 1, resetAt: now + opts.windowMs });
        return true;
      }
      if (entry.count >= opts.maxRequests) return false;
      entry.count++;
      return true;
    },
    reset(key) { hits.delete(key); },
  };
}

// =============================================================================
// Module Exports
// =============================================================================

export * from './atlas-staking';
export * from './factions';
export * from './marketplace';
export * from './score';
export * from './types';
export * from './util/scoreHelpers';
export * from './util/gmHelper';
export * from './util';
