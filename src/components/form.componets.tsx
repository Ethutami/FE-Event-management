'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FormComponentProps {
    params: string;
}

export default function FormComponent({ params }: FormComponentProps) {
    const [buttonText, setButtonText] = useState('Sign up');
    const [titleText, setTitleText] = useState('Get started now');
    const [showCheckbox, setShowCheckbox] = useState(true);

    useEffect(() => {
        if (params === 'sign in') {
            setButtonText('Sign in');
            setTitleText('Welcome Back!');
            setShowCheckbox(false);
        } else {
            setButtonText('Sign up');
            setTitleText('Get started now');
            setShowCheckbox(true);
        }
    }, [params]);

    return (
        <form className="bg-[#F9F7F7] p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-[#112D4E]">{titleText}</h1>

            <div className="mb-4">
                <input
                    type="email"
                    placeholder="Email address"
                    className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DBE2EF] placeholder-[#DBE2EF]"
                    required
                />
            </div>

            <div className="mb-4">
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DBE2EF] placeholder-[#DBE2EF]"
                    required
                />
            </div>

            {showCheckbox && (
                <div className="mb-6 flex items-center">
                    <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 text-[#DBE2EF] border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-[#112D4E]">
                        I agree to the <a href="#" className="text-[#3F72AF] underline">terms and conditions</a>
                    </label>
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-[#112D4E] hover:bg-[#DBE2EF] text-[#F9F7F7] py-4 rounded-lg font-semibold disabled:opacity-50"
            >
                {buttonText}
            </button>

            <div className="my-4 flex items-center">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-[#112D4E]">Or</span>
                <hr className="flex-grow border-gray-300" />
            </div>

            <div className="flex gap-4 mb-4">
                <button className="flex-1 flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-[#DBE2EF] text-[#112D4E]">
                    <Image src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-2" width={100} height={100} />
                    {buttonText} with Google
                </button>
            </div>

            <p className="text-center text-[#112D4E]">
                {params === 'sign in'
                    ? <>{`Don't have an account?`} <Link href="/signup" className="text-[#3F72AF] underline">Sign up</Link></>
                    : <>Have an account? <Link href="/signin" className="text-[#3F72AF] underline">Sign in</Link></>}
            </p>
        </form>
    );
}
