import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PersonalBlog from "../containers/HomePage"
import SEO from "../components/seo"

const PersonalBlogPage = (props: any) => {
  const { data } = props

  return (
    <Layout>
      <SEO
        title="블로그 | 땅끝까지 파헤치는 모바일 머신러닝"
        description={data.site.siteMetadata.description}
      />
      <PersonalBlog />
    </Layout>
  )
}

export default PersonalBlogPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
