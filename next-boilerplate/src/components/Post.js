import React from "react";
import Link from "next/link";

const Post = ({ slug, date, timeToRead, title, description }) => {
  return (
    <div className='post-item'>
      <Link href={slug} className='post-link'>
        <h1 className='post-title'>{title}</h1>
      </Link>
      {description && <p className='post-description'>{description}</p>}
      <div className='post-meta'>
        {date && <span className='post-date'>{date}</span>}
        {timeToRead && (
          <span className='post-time'>{timeToRead} min de leitura</span>
        )}
      </div>
    </div>
  );
};

export default Post;
