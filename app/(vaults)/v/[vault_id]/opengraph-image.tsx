import { getSupabase } from "@/app/session";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/server";
import { FiLock } from "react-icons/fi";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Font
// const interSemiBold = fetch(
//   new URL("./Inter-SemiBold.ttf", import.meta.url)
// ).then((res) => res.arrayBuffer());

// Image generation
export default async function OGImage({
  params,
}: {
  params: { vault_id: string };
}) {
  const supabase = await getSupabase();
  const isShortId = params.vault_id.length === 10;
  const { data: vault } = await supabase
    .from("vaults")
    .select()
    .eq(isShortId ? "short_id" : "id", params.vault_id)
    .single();

  if (!vault) {
    return notFound();
  }

  if (!vault.public) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 96,
            background: "#111",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            gap: 16,
          }}
        >
          <FiLock size={116} /> <span tw="mt-4">Private vault</span>
        </div>
      ),
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 74,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://serapeum.vercel.app/images/logo.png"
          alt="Serapeum"
          height={100}
          width={100}
        />
        {vault.name}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      //   fonts: [
      //     {
      //       name: "Inter",
      //       data: await interSemiBold,
      //       style: "normal",
      //       weight: 400,
      //     },
      //   ],
    }
  );
}
