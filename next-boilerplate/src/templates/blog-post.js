import React from "react";
import Row from "../containers/RowContainer";
import { timeToRead, slugPrefix } from "../lib/utils";
import SeoContainer from "../containers/SeoContainer";
import SinglePostBlock from "../components/SinglePostBlock";
import PostNavigation from "../components/PostNavigation";
import mainConfigs from "../configs/main-infos.json";
import MainWrapperContainer from "../containers/MainWrapperContainer";

const BlogPost = ({ post, nextPost, prevPost }) => {
  // Calcular tempo de leitura
  const readingTime = timeToRead(post.content);

  // Formatar data de publicação
  const publishedDate =
    post.frontmatter.date || new Date().toISOString().split("T")[0];

  return (
    <MainWrapperContainer rowWidth={960}>
      <SeoContainer
        killSeo={false}
        data={{
          slug: post.slug,
          title: `${post.frontmatter.title} - ${mainConfigs.business.brandName}`,
          author: mainConfigs.website.author,
          siteUrl: mainConfigs.website.siteUrl,
          brandName: mainConfigs.business.brandName,
          brandEmail: mainConfigs.business.brandEmail,
          brandLogo: mainConfigs.business.brandLogo,
          brandPhone: mainConfigs.business.brandPhone,
          brandDescription: mainConfigs.business.brandDescription,
          brandCardImage: mainConfigs.business.brandCardImage,
          featuredImage: `${mainConfigs.website.siteUrl}${slugPrefix}/favicon-32x32.png`,
          dateCreated: publishedDate,
          dateNow: new Date().toISOString(),
          articleBody: post.content,
          datePublished: publishedDate,
          i18n: mainConfigs.website.i18n,
          keywords: post.frontmatter.categories || mainConfigs.website.keywords,
          questions: mainConfigs.website.questions,
          topology: "pages",
          articleUrl: `${mainConfigs.website.siteUrl}/${post.slug}`,
          description: post.frontmatter.description,
          themeColor: mainConfigs.website.themeColor,
          fbAppID: null,
          sameAs: mainConfigs.business.sameAs,
          twitter: mainConfigs.business.twitterCard,
        }}
      />
      <h2>
        Postagem sobre: {post.frontmatter.categories?.join("; ") || "Geral"}.
      </h2>
      <div className='wrapper-box post'>
        <Row opt={{ isBoxed: true, classes: "post-container" }}>
          <SinglePostBlock
            highlightImage={post.frontmatter.image}
            authorImg={"imgHolder"}
            date={post.frontmatter.date}
            author={mainConfigs.business.brandName}
            html={post.content}
            title={post.frontmatter.title}
            categories={post.frontmatter.categories || []}
            timeToRead={readingTime}
            wordCount={post.content.split(" ").length}
          />
        </Row>
      </div>

      {/* Navegação entre posts */}
      <PostNavigation prevPost={prevPost} nextPost={nextPost} />
    </MainWrapperContainer>
  );
};

export default BlogPost;
