'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SsoCallbackPage = () => {
    const router = useRouter();

    useEffect(() => {
        const userIsAlreadySignedUp = true;
        if (userIsAlreadySignedUp) {
            const redirectUrl = '/sign-in';
            router.push(redirectUrl);
        }
    });

    return <div>You already have an account redirecting to /sign-in</div>;
};

export default SsoCallbackPage;
