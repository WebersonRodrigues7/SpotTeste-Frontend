import { loginSchema, loginType } from "@/validations/loginSchema";

export async function POST(req: Request) {
  const body = await req.json();

  const result = loginSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        message: "Dados invalidos",
      },
      {
        status: 400,
      },
    );
  }
  const response = await fetch("http://localhost:3001/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result.data),
  });

  const data: loginType = await response.json();

  return Response.json(data, {
    status: response.status,
    headers: response.headers,
  });
}
