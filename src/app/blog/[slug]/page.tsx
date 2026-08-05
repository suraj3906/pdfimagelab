import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

// Mock data
const POSTS = {
  "how-to-merge-pdf-files": {
    title: "How to Merge PDF Files Securely in Your Browser",
    date: "2023-10-25",
    content: `
      <p>Merging PDF files used to require expensive desktop software or uploading your sensitive documents to a third-party server. Not anymore.</p>
      <h2>Client-Side Processing</h2>
      <p>Thanks to modern web technologies like WebAssembly, you can now merge PDF files entirely within your web browser. This means your files never leave your device.</p>
      <h2>Step by Step Guide</h2>
      <p>1. Open our PDF Merge tool.<br>2. Select the files you want to combine.<br>3. Rearrange them in the correct order.<br>4. Click Merge.</p>
    `
  },
  "best-image-compression-techniques": {
    title: "Best Image Compression Techniques for Web",
    date: "2023-11-02",
    content: `
      <p>Images often make up the bulk of a webpage's weight. Optimizing them is crucial for performance.</p>
      <h2>Choosing the Right Format</h2>
      <p>For most web use cases, WebP is the superior format, offering excellent compression for both photographic and graphic images.</p>
    `
  },
  "why-client-side-processing-matters": {
    title: "Why Client-Side Processing Matters for Privacy",
    date: "2023-11-15",
    content: `
      <p>When you use a traditional online tool, you are uploading your personal files to someone else's computer. This poses a massive security risk.</p>
      <p>Our platform uses client-side processing, meaning the code is downloaded to your browser and executed locally. We never see your files.</p>
    `
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = POSTS[resolvedParams.slug as keyof typeof POSTS];
  
  if (!post) {
    return { title: "Post Not Found" };
  }
  
  return {
    title: post.title,
    description: post.title, // In a real app, use a dedicated excerpt or description
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = POSTS[resolvedParams.slug as keyof typeof POSTS];

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-primary hover:underline">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all posts
      </Link>
      
      <article>
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-2">{post.date}</div>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6">
            {post.title}
          </h1>
        </header>
        
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
