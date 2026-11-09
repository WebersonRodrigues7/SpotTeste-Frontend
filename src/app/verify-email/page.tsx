import VerificationPage from "@/components/VerificationPage/Verification";


export default function VerifyEmail() {
  return (
    <>
      <VerificationPage hide={false} endpoint="/verify-email" navigation="/" />
    </>
  );
}
