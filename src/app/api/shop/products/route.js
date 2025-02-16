import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}