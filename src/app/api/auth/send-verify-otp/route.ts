import { sendotpSchema, sendotpType } from "@/validations/sendotpSchema";

export async function POST(req: Request) {
  const body = await req.json();

  const result = sendotpSchema.safeParse(body);

  const response = await fetch("http://localhost:3001/auth/send-verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!result.success) {
    return Response.json(
      { message: "Erro ao enviar código!" },
      { status: 400 },
    );
  }

  const data: sendotpType = await response.json();

  return Response.json(data, { status: 200 });
}
