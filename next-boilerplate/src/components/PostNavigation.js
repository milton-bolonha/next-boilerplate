import React from "react";
import Link from "next/link";

const PostNavigation = ({ prevPost, nextPost }) => {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <nav className='post-navigation'>
      <div className='nav-container'>
        {prevPost && (
          <Link href={prevPost.slug} className='nav-link prev-post'>
            <div className='nav-content'>
              <span className='nav-label'>← Post Anterior</span>
              <h3 className='nav-title'>{prevPost.frontmatter.title}</h3>
            </div>
          </Link>
        )}

        {nextPost && (
          <Link href={nextPost.slug} className='nav-link next-post'>
            <div className='nav-content'>
              <span className='nav-label'>Próximo Post →</span>
              <h3 className='nav-title'>{nextPost.frontmatter.title}</h3>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default PostNavigation;
