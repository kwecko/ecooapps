import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const cycleId = url.searchParams.get("cycle_id");

  if (!cycleId) {
    return NextResponse.json(
      { error: "Missing cycle_id parameter" },
      { status: 400 }
    );
  }

  const token = cookies().get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Missing authentication token" },
      { status: 401 }
    );
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/deliveries/report?cycle_id=${cycleId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const buffer = await response.arrayBuffer();
    return new NextResponse(Buffer.from(buffer), {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/octet-stream",
        "Content-Disposition": 'attachment; filename="report.pdf"',
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as { message: string }).message },
      { status: 500 }
    );
  }
}
