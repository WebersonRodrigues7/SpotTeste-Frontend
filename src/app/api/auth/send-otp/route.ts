import { sendotpSchema, sendotpType } from "@/validations/sendotpSchema";

export async function POST(req: Request) {
  const body = await req.json();

  const result = sendotpSchema.safeParse(body);

  if (!result.success) {
    return Response.json({ message: "Erro ao enviar código" }, { status: 400 });
  }

  const response = await fetch("http://localhost:3001/auth/send-otp", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });

  const data: sendotpType = await response.json();

  return Response.json(data, { status: response.status });
}
