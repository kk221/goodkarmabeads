import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import prisma from '@/lib/db/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const data = await request.json()
    const session = await stripe.checkout.sessions.create({
      line_items: data.items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}