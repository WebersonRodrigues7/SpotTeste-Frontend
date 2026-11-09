import { verifySchema, verifyType } from "@/validations/verifySchema";

export async function POST(req: Request) {
  const body = await req.json();

  const result = verifySchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { message: "Falha ao verificar email" },
      { status: 400 },
    );
  }
  const response = await fetch("http://localhost:3001/auth/verify-email", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });

  const data: verifyType = await response.json();

  return Response.json(data, { status: response.status });
}
