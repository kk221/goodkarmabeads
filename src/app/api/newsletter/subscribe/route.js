import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function POST(request) {
  try {
    const { email, interests } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if subscriber already exists
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email }
    })

    if (existingSubscriber) {
      // Update existing subscriber
      await prisma.subscriber.update({
        where: { email },
        data: {
          interests,
          status: 'active'
        }
      })
    } else {
      // Create new subscriber
      await prisma.subscriber.create({
        data: {
          email,
          interests,
          status: 'active'
        }
      })

      // Add to SendGrid
      await sgMail.request({
        method: 'PUT',
        url: '/v3/marketing/contacts',
        body: {
          contacts: [{
            email,
            custom_fields: {
              interests: interests.join(', ')
            }
          }]
        }
      })

      // Send welcome email
      await sgMail.send({
        to: email,
        from: {
          email: 'hello@goodkarmabeads.com',
          name: 'Good Karma Beads'
        },
        templateId: process.env.SENDGRID_WELCOME_TEMPLATE_ID,
        dynamicTemplateData: {
          firstName: email.split('@')[0],
          interests
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter'
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}

// Handle unsubscribe requests
export async function DELETE(request) {
  try {
    const { email } = await request.json()

    await prisma.subscriber.update({
      where: { email },
      data: { status: 'unsubscribed' }
    })

    // Remove from SendGrid
    await sgMail.request({
      method: 'DELETE',
      url: `/v3/marketing/contacts`,
      qs: {
        emails: [email]
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed'
    })

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
}