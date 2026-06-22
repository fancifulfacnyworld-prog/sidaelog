import { ArticleRenderer, buildArticleMeta } from "@/components/ArticleRenderer";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildArticleMeta(slug, "en");
}

export default async function ArticlePageEn({ params }: Props) {
  const { slug } = await params;
  return <ArticleRenderer slug={slug} lang="en" />;
}
