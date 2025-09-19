import { auth } from "@/lib/auth";
import { getPhotoUrl } from "@/lib/utils";
import { headers } from "next/headers";

export const POST = async (req: Request) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { user } = session;

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const habitId = formData.get("habitId") as string;
  const ext = file.name.split(".").pop(); // "png", "jpg", etc.
  const url = await getPhotoUrl(
    file,
    `habits/${user.id}/${habitId}/check-ins/${file.name}-${Date.now()}.${ext}`,
  );

  return new Response(JSON.stringify({ url }), { status: 200 });
};
