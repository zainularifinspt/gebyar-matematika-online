/**
 * Dynamic Midtrans Snap Script Loader
 * Prevents Midtrans Snap SDK from loading on initial homepage load,
 * loading it strictly on-demand when the user initiates payment.
 */

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        callbacks?: {
          onSuccess?: (result: any) => void;
          onPending?: (result: any) => void;
          onError?: (result: any) => void;
          onClose?: () => void;
        }
      ) => void;
      embed?: (token: string, options: any) => void;
    };
  }
}

let loadPromise: Promise<void> | null = null;

export const loadMidtransSnap = (): Promise<void> => {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  // If already loaded and available on window
  if (window.snap) {
    return Promise.resolve();
  }

  // If already in-flight, reuse promise
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise<void>((resolve, reject) => {
    // Check if script element already exists in DOM
    const existingScript = document.querySelector<HTMLScriptElement>('script[src*="snap/snap.js"]');
    if (existingScript) {
      if (window.snap) {
        resolve();
        return;
      }
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Gagal memuat script Midtrans')), { once: true });
      return;
    }

    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-sample';
    const isProd = import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === 'true';
    const scriptUrl = isProd
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptUrl;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      loadPromise = null; // allow retry on network failure
      script.remove();
      reject(new Error('Gagal memuat Midtrans Snap SDK. Pastikan koneksi internet stabil.'));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};
