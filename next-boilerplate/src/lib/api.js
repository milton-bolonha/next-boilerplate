import matter from "gray-matter";
import { join } from "path";
import fs from "fs";

import { format } from "date-fns";
import { pt } from "date-fns/locale";

const postsDirectory = join(process.cwd(), "content/posts");

export function getPostBySlug(slug) {
  if (!slug) return null;

  try {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Validar dados obrigatórios
    if (!data.title || !data.date) {
      console.warn(`Post ${slug} está faltando dados obrigatórios`);
      return null;
    }

    const date = format(new Date(data.date), "dd 'de' MMMM 'de' yyyy", {
      locale: pt,
    });

    return {
      slug: realSlug,
      date: data.date.toString(),
      frontmatter: {
        ...data,
        date,
        categories: data.categories || [],
        image: data.image || null,
        description: data.description || "",
      },
      content,
    };
  } catch (error) {
    console.error(`Erro ao ler post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Diretório de posts não encontrado: ${postsDirectory}`);
      return [];
    }

    const slugs = fs.readdirSync(postsDirectory);
    const posts = slugs
      .filter(slug => slug.endsWith(".md"))
      .map(slug => getPostBySlug(slug))
      .filter(post => post !== null) // Remover posts com erro
      .sort((post1, post2) =>
        new Date(post1.date) > new Date(post2.date) ? -1 : 1
      );

    return posts;
  } catch (error) {
    console.error("Erro ao listar posts:", error);
    return [];
  }
}

// Nova função para buscar posts por categoria
export function getPostsByCategory(category) {
  const allPosts = getAllPosts();
  return allPosts.filter(post =>
    post.frontmatter.categories?.includes(category)
  );
}

// Nova função para buscar posts por termo de busca
export function searchPosts(searchTerm) {
  if (!searchTerm || searchTerm.length < 2) return [];

  const allPosts = getAllPosts();
  const term = searchTerm.toLowerCase();

  return allPosts.filter(
    post =>
      post.frontmatter.title.toLowerCase().includes(term) ||
      post.frontmatter.description.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term)
  );
}
