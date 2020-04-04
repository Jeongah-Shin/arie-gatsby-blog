import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import About from "../containers/About"

type AboutPageProps = {}

const AboutPage: React.FunctionComponent<AboutPageProps> = props => {
  return (
    <Layout>
      <SEO
        title="정아리 소개 | 땅끝까지 파헤치는 모바일 머신러닝"
        description="모바일 머신러닝 기술에 열정을 가지고, 경량화 딥러닝 모델을 개발합니다.하드웨어 친화적인 알고리즘을 설계하기 위해 실제 플랫폼에서의 모델 성능 측정과 지표 트래킹을 생활화 합니다."
      />
      <About />
    </Layout>
  )
}

export default AboutPage
