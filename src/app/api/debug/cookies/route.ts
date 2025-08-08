import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cookies = request.cookies.getAll()
  const authToken = request.cookies.get('auth-token')?.value
  
  return NextResponse.json({
    allCookies: cookies,
    authToken,
    headers: {
      cookie: request.headers.get('cookie'),
      authorization: request.headers.get('authorization'),
    }
  })
}
