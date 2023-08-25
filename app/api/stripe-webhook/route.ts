import { Stripe } from 'stripe';
import { NextResponse, NextRequest } from 'next/server';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
        apiVersion: '2023-08-16',
    });

    const response = new Response(request.body);
    const rawBody = await response.text();
    let event: Stripe.Event | null = null;

    if (endpointSecret) {
        const signature = request.headers.get('stripe-signature');
        try {
            event = stripe.webhooks.constructEvent(
                rawBody,
                signature!,
                endpointSecret
            );
        } catch (err: unknown) {
            if (typeof err === 'string') {
                err.toUpperCase();
            } else if (err instanceof Error) {
                console.error(
                    `⚠️ Webhook signature verification failed.`,
                    err.message
                );
            }
            return null;
        }
    }
    switch (event?.type) {
        case 'account.updated':
            // eslint-disable-next-line no-case-declarations
            console.log(event.data.object);
            break;
        default:
            break;
    }
    return new Response();
}
