import { NextResponse } from 'next/server'

export function middleware(request) {
  // Debug: Always log to see if middleware is running
  console.log('🚀 MIDDLEWARE ACTIVE - Path:', request.nextUrl.pathname)
  
  const pathname = request.nextUrl.pathname
  
  // Check if this is a protected chat route
  if (pathname === '/chat' || pathname.startsWith('/chat/')) {
    console.log('🔒 Checking authentication for protected route:', pathname)
    
    // Get authentication tokens from cookies
    const accessToken = request.cookies.get('access')?.value
    const refreshToken = request.cookies.get('refresh')?.value
    
    console.log('Access token:', accessToken ? '✅ Present' : '❌ Missing')
    console.log('Refresh token:', refreshToken ? '✅ Present' : '❌ Missing')
    
    // If no tokens present, redirect to home page
    if (!accessToken && !refreshToken) {
      console.log('🚫 No authentication tokens found - REDIRECTING to home page')
      return NextResponse.redirect(new URL('/', request.url))
    }
    
    console.log('✅ Authentication tokens found - Access granted')
  }
  
  // Allow the request to continue
  return NextResponse.next()
}

export const config = {
  matcher: ['/chat/:path*']
}
