"use client";

import VerificationPage from "@/components/VerificationPage/Verification";

export default function Verification() {
  return (
    <>
      <VerificationPage hide={true} endpoint="signin-otp" navigation="dashboard" />
    </>
  );
}
