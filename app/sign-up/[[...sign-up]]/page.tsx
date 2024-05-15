import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="flex h-screen justify-center items-center align-middle">
            <SignUp />
        </div>
    );
}