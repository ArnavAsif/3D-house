import { supabase } from './client';

/**
 * Supabase Auth Service
 * Manages customer authentication, guest sessions, and profiles for the showroom.
 */
export class SupabaseAuthService {
  /**
   * Retrieves or creates an anonymous session identifier for guest carts.
   */
  getOrCreateSessionId(): string {
    if (typeof window === 'undefined') return 'server-session';
    let sessionId = localStorage.getItem('villa_lumina_session_id');
    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('villa_lumina_session_id', sessionId);
    }
    return sessionId;
  }

  /**
   * Returns current authenticated user if logged in.
   */
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  /**
   * Sign in with email OTP or magic link.
   */
  async signInWithOtp(email: string) {
    return await supabase.auth.signInWithOtp({ email });
  }

  /**
   * Sign out current user.
   */
  async signOut() {
    return await supabase.auth.signOut();
  }
}

export const authService = new SupabaseAuthService();
