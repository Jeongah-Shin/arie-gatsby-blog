import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import SocialProfile from "../../components/SocialProfile/SocialProfile"
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin, IoLogoGithub,
} from "react-icons/io"
import {
  AboutWrapper,
  AboutImage,
  AboutPageTitle,
  AboutDetails,
  SocialProfiles,
} from "./style"
import { Desciption } from "../HomePage/Intro/style"

const SocialLinks = [
  {
    icon: <IoLogoGithub />,
    url: "https://github.com/eastroots92",
    tooltip: "Github",
  },
  {
    icon: <IoLogoLinkedin />,
    url: "https://www.linkedin.com/in/donggeun-lee-568916160/",
    tooltip: "Linkedin",
  },
  {
    icon: <IoLogoInstagram />,
    url: "https://www.instagram.com/eastroots92/",
    tooltip: "Instagram",
  },
  {
    icon: <IoLogoFacebook />,
    url: "https://www.facebook.com/guregure13",
    tooltip: "Facebook",
  },
]

interface AboutProps {}

const About: React.FunctionComponent<AboutProps> = props => {
  const Data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/about.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1770, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      site {
        siteMetadata {
          author
          about
        }
      }
    }
  `)

  return (
    <AboutWrapper>
      <AboutPageTitle>
        <h2>생각하는 개발자 <b>정아리🐥</b>입니다.</h2>
        <p>
        모바일 머신러닝 기술에 열정을 가지고, 경량화 딥러닝 모델을 개발합니다.하드웨어 친화적인 알고리즘을 설계하기 위해 실제 플랫폼에서의 모델 성능 측정과 지표 트래킹을 생활화 합니다.
        <br />
        AI 기술이 더 다양한 사용자층을 만날 수 있도록 하는 최적화 과정을 즐깁니다 🤳
        </p>
      </AboutPageTitle>
      {/*<AboutImage>*/}
      {/*  <Image fluid={Data.avatar.childImageSharp.fluid} alt="author" />*/}
      {/*</AboutImage>*/}
      <AboutDetails>
        {/* <h2>회사경력</h2>
        <div>
          <h3>
            <a href="https://banksalad.com/">
              뱅크샐러드
            </a>
            {' (2018.11 ~ 현재)'}
          </h3>
          <li>
            Software Engineer (Web)
          </li>
        </div>
        <div style={{ marginTop: '32px' }}>
          <h3>
            <a href="https://shop.ssomee.com/">
              [OPENULL] 소미의 미학
            </a>
            {' (2017.03 ~ 2018.10)'}
          </h3>
          <li>
            Co-Founder
          </li>
          <li>
            Web Developer
          </li>
        </div>
        <h2 style={{ marginTop: '32px' }}>단체경력</h2>
        <div>
          <li>Mashup 개발 동아리 : 단장 (2017 ~ 현재)</li>
          <li>멋쟁이 사자처럼 (2015 ~ 2017)</li>
          <li>한국 장학재단 대학생 홍보대사 (2016)</li>
          <li>문화기획단 아웃테이블 (2015)</li>
        </div> */}
        <SocialProfiles>
          <SocialProfile items={SocialLinks} />
        </SocialProfiles>
      </AboutDetails>
    </AboutWrapper>
  )
}

export default About
