import React from "react";
import BlogPost from "../templates/blog-post";
import { getPostBySlug, getAllPosts } from "../lib/api";
import markdownToHtml from "../lib/markdownToHtml";

const Post = ({ post, content, nextPost, prevPost }) => {
  if (!post || !content) {
    return (
      <div className='error-container'>
        <h1>Post não encontrado</h1>
        <p>O post que você está procurando não existe ou foi removido.</p>
      </div>
    );
  }

  return (
    <BlogPost
      post={{ ...post, content }}
      nextPost={nextPost}
      prevPost={prevPost}
    />
  );
};

export default Post;

export const getStaticProps = async context => {
  try {
    if (!context?.params?.slug) {
      return {
        notFound: true,
      };
    }

    const slug = context.params.slug;
    const post = getPostBySlug(slug);

    if (!post) {
      return {
        notFound: true,
      };
    }

    const content = await markdownToHtml(post.content || "");

    if (!content) {
      return {
        notFound: true,
      };
    }

    // Buscar posts anterior e próximo
    const allPosts = getAllPosts();
    const currentAllPostIndex = allPosts.filter(
      p => p?.frontmatter?.layout === "post"
    );
    const currentPostIndex = currentAllPostIndex.findIndex(
      p => p?.slug === slug
    );

    const nextPost =
      currentPostIndex > 0 ? currentAllPostIndex[currentPostIndex - 1] : null;
    const prevPost =
      currentPostIndex < currentAllPostIndex.length - 1
        ? currentAllPostIndex[currentPostIndex + 1]
        : null;

    return {
      props: {
        ...post,
        content,
        nextPost,
        prevPost,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths = async () => {
  try {
    const posts = getAllPosts();
    const paths = posts.map(({ slug }) => ({ params: { slug } }));

    return {
      paths,
      fallback: false, // Mudando para false para compatibilidade com output: export
    };
  } catch (error) {
    console.error("Erro ao gerar paths:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};
