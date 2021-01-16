import { ErrorCode } from '../constants/errorCode';

// assume incoming data is application/json
export async function fetchGET<T>(
  URL: string,
  options: RequestInit = {}
): Promise<T | { errorCode: ErrorCode; error: Error }> {
  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      ...options,
    });
    return response.json();
  } catch (error) {
    return {
      errorCode: ErrorCode.UnknownError,
      error,
    };
  }
}
