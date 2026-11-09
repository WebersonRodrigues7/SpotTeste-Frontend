import { signupSchema, signupType } from "@/validations/signupSchema";

export async function POST(req: Request) {
  const body = await req.json();

  const result = signupSchema.safeParse(body);

  if (!result.success) {
    return Response.json({ message: "Erro ao criar conta" }, { status: 400 });
  }

  const response = await fetch("http://localhost:3001/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result.data),
  });

  const data: signupType = await response.json();

  return Response.json(data, {
    status: response.status,
  });
}
