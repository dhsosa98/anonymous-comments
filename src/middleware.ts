// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import nextSession from 'next-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid';


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.headers.get('X-Session')) {
    return NextResponse.next({
      request: request,
    })
  }
  request.headers.set('X-Session', uuidv4())
  return NextResponse.next({
    request: request,
  })
}

export const config = {
  matcher: ['/api/(.*)'],
}