import React from "react";
import BlogPost from "../templates/blog-post";
import { getPostBySlug, getAllPosts } from "../lib/api";
import markdownToHtml from "../lib/markdownToHtml";

const Post = ({ post, nextPost, prevPost }) => {
  console.log("🎭 Componente Post renderizado");
  console.log("📄 Props recebidas:", { post, nextPost, prevPost });

  if (!post || !post.content) {
    console.log("❌ Post ou post.content não encontrado no componente");
    console.log("❌ post:", !!post, "post.content:", !!post?.content);
    return (
      <div className='error-container'>
        <h1>Post não encontrado</h1>
        <p>O post que você está procurando não existe ou foi removido.</p>
      </div>
    );
  }

  console.log("✅ Renderizando BlogPost");
  return <BlogPost post={post} nextPost={nextPost} prevPost={prevPost} />;
};

export default Post;

export const getStaticProps = async context => {
  try {
    console.log("🔍 getStaticProps iniciado");
    console.log("📋 Context params:", context?.params);

    if (!context?.params?.slug) {
      console.log("❌ Sem slug nos params");
      return {
        notFound: true,
      };
    }

    const slug = context.params.slug;
    console.log("🎯 Slug recebido:", slug);

    const post = getPostBySlug(slug);
    console.log("📄 Post encontrado:", post ? "SIM" : "NÃO");
    console.log("📄 Post data:", post);

    if (!post) {
      console.log("❌ Post não encontrado para slug:", slug);
      return {
        notFound: true,
      };
    }

    const content = await markdownToHtml(post.content || "");
    console.log("📝 Content processado:", content ? "SIM" : "NÃO");

    if (!content) {
      console.log("❌ Conteúdo não pôde ser processado");
      return {
        notFound: true,
      };
    }

    // Buscar posts anterior e próximo
    const allPosts = getAllPosts();
    console.log("📚 Total de posts encontrados:", allPosts.length);

    const currentAllPostIndex = allPosts.filter(
      p => p?.frontmatter?.layout === "post"
    );
    console.log("✅ Posts com layout 'post':", currentAllPostIndex.length);

    const currentPostIndex = currentAllPostIndex.findIndex(
      p => p?.slug === slug
    );
    console.log("🎯 Índice do post atual:", currentPostIndex);

    const nextPost =
      currentPostIndex > 0 ? currentAllPostIndex[currentPostIndex - 1] : null;
    const prevPost =
      currentPostIndex < currentAllPostIndex.length - 1
        ? currentAllPostIndex[currentPostIndex + 1]
        : null;

    console.log("🔄 Props sendo retornadas:", {
      post: { ...post, content },
      nextPost: nextPost?.slug,
      prevPost: prevPost?.slug,
    });

    return {
      props: {
        post: {
          ...post,
          content, // Substituir o content original pelo HTML processado
        },
        nextPost,
        prevPost,
      },
    };
  } catch (error) {
    console.error("💥 Erro ao buscar post:", error);
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
      fallback: false,
    };
  } catch (error) {
    console.error("Erro ao gerar paths:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};
