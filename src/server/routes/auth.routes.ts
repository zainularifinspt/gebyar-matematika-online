import { 
  generateGoogleOAuthUrl, 
  authenticateWithGoogle,
  type GooglePayload,
  type AuthResult 
} from '../services/googleAuth.service.ts';
import { 
  createSession, 
  validateSession, 
  destroySession, 
  type SessionData 
} from '../services/session.service.ts';

export interface ApiResponse<T = any> {
  statusCode: number;
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthSessionResponse extends AuthResult {
  session: SessionData;
}

/**
 * GET /api/auth/google/url
 * Mendapatkan URL redirect otorisasi Google OAuth2
 */
export function getGoogleAuthUrl(redirectUri: string, state?: string): ApiResponse<{ url: string }> {
  try {
    const url = generateGoogleOAuthUrl(redirectUri, state);
    return {
      statusCode: 200,
      success: true,
      data: { url },
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      success: false,
      error: error.message || 'Gagal menghasilkan URL OAuth Google',
    };
  }
}

/**
 * POST /api/auth/google/callback
 * Menerima payload dari Google, memverifikasi, membuat akun, dan menerbitkan sesi login aktif
 */
export async function handleGoogleCallback(
  payload: GooglePayload, 
  role: 'guru' | 'siswa' | 'panitia' = 'guru'
): Promise<ApiResponse<AuthSessionResponse>> {
  try {
    const authResult = await authenticateWithGoogle(payload);
    
    // Terbitkan sesi login baru
    const session = createSession(
      {
        id: authResult.user.id,
        email: authResult.user.email,
        name: authResult.user.nama_lengkap,
      },
      role
    );

    return {
      statusCode: 200,
      success: true,
      data: {
        ...authResult,
        token: session.sessionId,
        session,
      },
      message: authResult.message,
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      success: false,
      error: error.message || 'Proses otentikasi Google gagal',
    };
  }
}

/**
 * GET /api/auth/me
 * Mengambil data pengguna dari sesi login yang aktif
 */
export function handleGetMe(authHeader?: string): ApiResponse<{ session: SessionData }> {
  if (!authHeader) {
    return {
      statusCode: 401,
      success: false,
      error: 'Header otorisasi tidak ditemukan',
    };
  }

  const check = validateSession(authHeader);
  if (!check.valid || !check.session) {
    return {
      statusCode: 401,
      success: false,
      error: check.reason || 'Sesi login tidak sah',
    };
  }

  return {
    statusCode: 200,
    success: true,
    data: { session: check.session },
    message: 'Sesi aktif valid',
  };
}

/**
 * POST /api/auth/logout
 * Mengakhiri sesi login dan mencabut token otorisasi
 */
export function handleLogout(authHeader?: string): ApiResponse<{ message: string }> {
  if (!authHeader) {
    return {
      statusCode: 400,
      success: false,
      error: 'Token otorisasi diperlukan untuk logout',
    };
  }

  const destroyed = destroySession(authHeader);
  if (destroyed) {
    return {
      statusCode: 200,
      success: true,
      message: 'Sesi login berhasil diakhiri (logout sukses).',
    };
  }

  return {
    statusCode: 404,
    success: false,
    error: 'Sesi tidak ditemukan atau sudah tidak aktif sebelumnya.',
  };
}

/**
 * POST /api/auth/google/mock-login
 * Mempermudah simulasi login Google OAuth di sisi frontend development
 */
export async function handleMockGoogleLogin(
  role: 'siswa' | 'guru' | 'panitia',
  customEmail?: string,
  customName?: string
): Promise<ApiResponse<AuthSessionResponse>> {
  const mockSub = `google-sub-${Date.now()}`;
  const payload: GooglePayload = {
    sub: mockSub,
    email: customEmail || (role === 'guru' ? 'guru@sekolah.sch.id' : 'peserta@gmail.com'),
    name: customName || (role === 'guru' ? 'Guru Pendamping' : 'Peserta Mandiri'),
    email_verified: true,
  };

  return handleGoogleCallback(payload, role);
}
