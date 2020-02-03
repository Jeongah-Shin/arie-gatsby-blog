import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import About from "../containers/About"

type AboutPageProps = {}

const AboutPage: React.FunctionComponent<AboutPageProps> = props => {
  return (
    <Layout>
      <SEO
        title="About"
        description="기획에 한계를 주지 않는 개발자 입니다. 현재는 동글동글 잘 굴러가는 웹 프론트를 만들고 있습니다."
      />
      <About />
    </Layout>
  )
}

export default AboutPage
