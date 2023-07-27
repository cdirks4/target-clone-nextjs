/* eslint-disable react/no-unescaped-entities */
import { SignUp } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className="max-w-xl mx-auto ">
            <h1 className="text-center text-md font-bold ">
                To avoid unneccesarry friction I have removed email verification
            </h1>
            <p className="text-center text-sm mb-2">
                The only requirements are it must include an @ and a domain.
            </p>
            <div className="flex justify-center">
                <SignUp />
            </div>
        </div>
    );
}
