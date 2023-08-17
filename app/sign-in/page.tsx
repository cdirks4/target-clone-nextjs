/* eslint-disable react/no-unescaped-entities */
import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className="max-w-xl mx-auto ">
            <div className="flex justify-center">
                <SignIn />
            </div>
        </div>
    );
}
