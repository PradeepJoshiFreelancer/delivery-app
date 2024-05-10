import { getEmployeeByEmail } from "@/prisma/lib/employee";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/invalidsession", req.url));
  }
  console.log(`token inside API = ${token}`);

  const employee = await getEmployeeByEmail("admin@admin.com");
  console.log(JSON.stringify(employee));

  return NextResponse.json({
    employee,
  });
}
