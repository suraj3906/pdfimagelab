import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// In a real application, this would fetch from a database or local .mdx files
const POSTS = [
  {
    slug: "how-to-merge-pdf-files",
    title: "How to Merge PDF Files Securely in Your Browser",
    description: "Learn how to combine multiple PDF documents into a single file without compromising your privacy or uploading to a third-party server.",
    date: "2023-10-25",
  },
  {
    slug: "best-image-compression-techniques",
    title: "Best Image Compression Techniques for Web",
    description: "Discover how to reduce your image file sizes by up to 80% while maintaining crisp quality for your website.",
    date: "2023-11-02",
  },
  {
    slug: "why-client-side-processing-matters",
    title: "Why Client-Side Processing Matters for Privacy",
    description: "Understand the security benefits of using web tools that process your files directly in your browser rather than the cloud.",
    date: "2023-11-15",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Blog & Resources</h1>
        <p className="text-xl text-muted-foreground">
          Tips, tutorials, and insights on document management and web tools.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-md transition-all hover:border-primary/50 cursor-pointer">
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">{post.date}</div>
                <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                <CardDescription className="mt-2 line-clamp-3">
                  {post.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
