import { TextureRenderer, buildTextureMeta } from "@/components/TextureRenderer";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildTextureMeta(slug);
}

export default async function TexturePage({ params }: Props) {
  const { slug } = await params;
  return <TextureRenderer slug={slug} />;
}
