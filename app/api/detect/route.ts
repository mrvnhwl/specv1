import { NextResponse } from 'next/server';
import { detectBrowserName, detectOS } from '@/lib/device';

export async function GET(request: Request) {
  const userAgent = request.headers.get('user-agent') || '';
  return NextResponse.json({
    osName: detectOS(userAgent),
    browser: detectBrowserName(userAgent),
    note: 'Full exact local hardware detection is intentionally limited in browsers.'
  });
}
