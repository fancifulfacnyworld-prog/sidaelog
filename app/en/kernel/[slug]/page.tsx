import { KernelRenderer, buildKernelMeta } from "@/components/KernelRenderer";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildKernelMeta(slug, "en");
}

export default async function KernelArticlePageEn({ params }: Props) {
  const { slug } = await params;
  return <KernelRenderer slug={slug} lang="en" />;
}
