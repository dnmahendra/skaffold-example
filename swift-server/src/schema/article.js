import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    articles (
      vertical: String,
      article_type: String
    ): [ Article ]
  }

  type Article {
    post_id: Int
    slug: String
    url: String
    author_name: String
    short_description: String
    title: String
    link: String
    comments: String
    pubDate: String
    description: String
    meta_title: String
    meta_keywords: String
    meta_description: String
    article_vertical: String
    the_article_type: String
    header_image_url: String
    thumbnail_image_url: String
    uses_markdown: String
    exclusive_to_partner: String
    _yoast_wpseo_focuskw_text_input: String
    _yoast_wpseo_focuskw: String
    _yoast_wpseo_title: String
    _yoast_wpseo_metadesc: String
    partner_name: String
    has_video: String
    supplier_reference: String
    publish_until: String
    article_type: String
    page_header: String
    page_subheader: String
    result_name: String
    _yoast_wpseo_linkdex: String
    attachments: String
    article_template: String
    media_release: String
    coauthor_name: String
    coauthor_image: String
    status: String
    author_twitter: String
    author_description: String
    author_job_title: String
    author_image: String
    created_at: String
    updated_at: String
    body: String
    readingTime: Int
    supplierReference: String
    pubDateTimestramp: String
  }
`
