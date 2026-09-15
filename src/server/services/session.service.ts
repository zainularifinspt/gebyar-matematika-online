/**
 * Session Management Service
 * Mengelola pembuatan, validasi, perpanjangan, dan pencabutan sesi login
 */

export interface SessionData {
  sessionId: string;
  userId: string;
  email: string;
  name: string;
  role: 'guru' | 'siswa' | 'panitia';
  createdAt: string;
  expiresAt: string;
  userAgent?: string;
  ipAddress?: string;
  isValid: boolean;
}

// In-memory store untuk sesi aktif
const ACTIVE_SESSIONS: Map<string, SessionData> = new Map();

// Default masa aktif sesi: 7 hari dalam milidetik
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Buat sesi login baru dan terbitkan session token
 */
export function createSession(
  user: { id: string; email: string; name: string },
  role: 'guru' | 'siswa' | 'panitia',
  metadata?: { userAgent?: string; ipAddress?: string }
): SessionData {
  const sessionId = `gm26_sess_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DURATION_MS);

  const session: SessionData = {
    sessionId,
    userId: user.id,
    email: user.email,
    name: user.name,
    role,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    userAgent: metadata?.userAgent,
    ipAddress: metadata?.ipAddress,
    isValid: true,
  };

  ACTIVE_SESSIONS.set(sessionId, session);
  return session;
}

/**
 * Validasi session token
 */
export function validateSession(token: string): {
  valid: boolean;
  session?: SessionData;
  reason?: string;
} {
  if (!token) {
    return { valid: false, reason: 'Token otentikasi tidak disediakan' };
  }

  // Handle prefix "Bearer " jika ada
  const cleanedToken = token.startsWith('Bearer ') ? token.slice(7).trim() : token.trim();

  const session = ACTIVE_SESSIONS.get(cleanedToken);
  if (!session) {
    return { valid: false, reason: 'Sesi tidak ditemukan atau telah kedaluwarsa' };
  }

  if (!session.isValid) {
    return { valid: false, reason: 'Sesi telah dicabut (logged out)' };
  }

  const now = new Date().getTime();
  const expiryTime = new Date(session.expiresAt).getTime();

  if (now > expiryTime) {
    session.isValid = false;
    ACTIVE_SESSIONS.delete(cleanedToken);
    return { valid: false, reason: 'Masa aktif sesi telah berakhir, silakan login kembali' };
  }

  return { valid: true, session };
}

/**
 * Invalidate / Hapus sesi saat logout
 */
export function destroySession(token: string): boolean {
  if (!token) return false;

  const cleanedToken = token.startsWith('Bearer ') ? token.slice(7).trim() : token.trim();
  const session = ACTIVE_SESSIONS.get(cleanedToken);

  if (session) {
    session.isValid = false;
    ACTIVE_SESSIONS.delete(cleanedToken);
    return true;
  }

  return false;
}

/**
 * Invalidate seluruh sesi untuk user tertentu
 */
export function destroyAllUserSessions(userId: string): number {
  let count = 0;
  for (const [key, session] of ACTIVE_SESSIONS.entries()) {
    if (session.userId === userId) {
      session.isValid = false;
      ACTIVE_SESSIONS.delete(key);
      count++;
    }
  }
  return count;
}

/**
 * Pembersihan otomatis sesi kedaluwarsa
 */
export function cleanExpiredSessions(): number {
  const now = Date.now();
  let deletedCount = 0;

  for (const [key, session] of ACTIVE_SESSIONS.entries()) {
    if (!session.isValid || now > new Date(session.expiresAt).getTime()) {
      ACTIVE_SESSIONS.delete(key);
      deletedCount++;
    }
  }

  return deletedCount;
}
