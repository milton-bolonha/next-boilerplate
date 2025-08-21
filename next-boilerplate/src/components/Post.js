import React from "react";
import Link from "next/link";

const Post = ({ slug, date, timeToRead, title, description }) => {
  return (
    <Link href={slug} className='post-link'>
      <div className='post-item'>
        <h1 className='post-title'>{title}</h1>
        {description && <p className='post-description'>{description}</p>}
        {date && <span className='post-date'>{date}</span>}
        {timeToRead && (
          <span className='post-time'>{timeToRead} min de leitura</span>
        )}
      </div>
    </Link>
  );
};

export default Post;
