import React, { useState, useMemo } from "react";
import Post from "../components/Post";

const BlogList = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Memoizar a ordenação para evitar recálculos desnecessários
  const sortedPosts = useMemo(() => {
    return posts.sort((post1, post2) =>
      new Date(post1.date) > new Date(post2.date) ? -1 : 1
    );
  }, [posts]);

  // Calcular posts da página atual
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return sortedPosts.slice(startIndex, endIndex);
  }, [sortedPosts, currentPage, postsPerPage]);

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const handlePageChange = page => {
    setCurrentPage(page);
    // Scroll para o topo da lista
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className='posts-container'>
        {currentPosts.map((post, i) => {
          const x = i + 1;
          return (
            <Post
              key={post.slug}
              slug={post.slug}
              title={post.frontmatter.title}
              timeToRead={post.timeToRead}
              date={post.frontmatter.date}
              description={post.frontmatter.description}
            />
          );
        })}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className='pagination'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='pagination-btn'
          >
            Anterior
          </button>

          <span className='pagination-info'>
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='pagination-btn'
          >
            Próxima
          </button>
        </div>
      )}
    </>
  );
};

export default BlogList;
