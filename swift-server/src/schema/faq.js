import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    faqs (vertical: String!): [ Faq ]
  }

  type Faq {
    SEO_Smart_Links: String,
    author_description: String,
    author_image: String,
    author_job_title: String,
    author_name: String,
    author_twitter: String,
    body: String,
    category: String,
    coauthor_image: String,
    coauthor_name: String,
    comments: String,
    created_at: String,
    description: String,
    faqPageSlug: String,
    faq_type: String,
    faq_url: String,
    faq_variant: String,
    guid: String,
    id: Float,
    inline_featured_image: String,
    link: String,
    order_box_id: Int,
    post_id: String,
    pubDate: String,
    question_short_description: String,
    readingTime: Float,
    slug: String,
    status: String,
    title: String,
    updated_at: String,
    url: String,
    userJourneyStage: String,
    vertical: String,
  }
`
