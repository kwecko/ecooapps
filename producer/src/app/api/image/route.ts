import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
  const queryParam = request.nextUrl.searchParams;
  const fileParam = queryParam.get("file");
  const filePath = fileParam?.split("___/")[1];
  const rootPath = process.env.REST_API_PATH;

  if (!filePath || !rootPath) {
    return new NextResponse("Invalid file path", { status: 400 });
  }

  const imagePath = path.join(rootPath, filePath);

  try {
    const imageBuffer = await fs.readFile(imagePath);

    const ext = path.extname(imagePath).toLowerCase();
    let contentType = "application/octet-stream";
    switch (ext) {
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        break;
      case ".gif":
        contentType = "image/gif";
        break;
      case ".webp":
        contentType = "image/webp";
        break;
    }

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Image not found", { status: 404 });
  }
}
