/* eslint-disable react/no-unescaped-entities */
import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className="max-w-xl mx-auto ">
            <h1 className="text-center text-md font-bold ">
                To avoid unneccesarry friction I have removed email verification
            </h1>
            <p className="text-center text-sm mb-2">
                Any email with the `+clerk_test` subaddress is a test email
                address. No emails will be sent, and they can be verified with
                the code "424242".
            </p>
            <div className="text-center mb-2">
                <h2 className="text-md font-bold">
                    Example test email addresses:
                </h2>
                <ul className=" text-sm ">
                    <li>jane+clerk_test@example.com</li>
                    <li>doe+clerk_test@example.com</li>
                </ul>
            </div>
            <div className="flex justify-center">
                <SignIn />
            </div>
        </div>
    );
}
