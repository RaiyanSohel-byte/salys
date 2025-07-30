import { NextResponse } from 'next/server'

// This middleware should work with Next.js 15
export default function middleware(request) {
  console.log('🔥 MIDDLEWARE IS WORKING! Path:', request.nextUrl.pathname)
  
  const { pathname } = request.nextUrl
  
  // Only protect chat routes
  if (pathname === '/chat' || pathname.startsWith('/chat/')) {
    console.log('🛡️ PROTECTING:', pathname)
    
    const accessToken = request.cookies.get('access')?.value
    const refreshToken = request.cookies.get('refresh')?.value
    
    if (!accessToken && !refreshToken) {
      console.log('🚫 REDIRECTING - NO AUTH')
      return NextResponse.redirect(new URL('/', request.url))
    }
    
    console.log('✅ AUTH FOUND - ALLOWING')
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/chat/:path*']
}
