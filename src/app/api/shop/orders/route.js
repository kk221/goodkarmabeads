import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/db/prisma'


export async function POST(request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        items: data.items,
        total: data.total,
        status: 'pending'
      }
    })

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}