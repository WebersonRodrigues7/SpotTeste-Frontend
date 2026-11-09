import { signinotpSchema, signinotpType } from "@/validations/signinotpSchema";

export async function POST(req: Request) {
  const body = await req.json();

  const result = signinotpSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      {
        message: "Erro ao logar",
      },
      {
        status: 400,
      },
    );
  }
  const response = await fetch("http://localhost:3001/auth/signin-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data: signinotpType = await response.json();

  return Response.json(data, {
    status: response.status,
    headers: response.headers,
  });
}
