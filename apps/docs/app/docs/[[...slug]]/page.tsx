import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={mdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

import NextImage from "next/image";
import type { ImageProps } from "next/image";
import { ImgHTMLAttributes } from "react";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Callout } from "fumadocs-ui/components/callout";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

const mdxComponents = {
  ...defaultMdxComponents,
  Callout,
  blockquote: Callout,
  Steps,
  Step,
  Accordion,
  Accordions,
  Tab,
  Tabs,
  img: (props: ImgHTMLAttributes<HTMLImageElement>) => <Image {...props} />,
};

function Image(props: ImgHTMLAttributes<HTMLImageElement>) {
  if (typeof props.src === "string" && props.src.endsWith(".svg")) {
    return (
      <span className="block">
        <img {...props} className="rounded-lg mb-4 w-full" />
        <span className="text-center text-sm text-fd-muted-foreground block">
          {props.alt}
        </span>
      </span>
    );
  }
  return (
    <span className="block">
      <NextImage
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
        {...(props as ImageProps)}
        className="rounded-lg mb-4"
      />
      <span className="text-center text-sm text-fd-muted-foreground block">
        {props.alt}
      </span>
    </span>
  );
}
