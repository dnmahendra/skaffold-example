import gql from 'graphql-tag'

export default gql`
  query articles ($vertical: String!, $article_type: String!) {
    articles (vertical: $vertical, article_type: $article_type) {
      post_id
      slug
      url
      title
      thumbnail_image_url
      article_vertical
      created_at
    }
  }
`
