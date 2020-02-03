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
        <h2>🙌, 동그래입니다.</h2>
        <p>
          기획에 한계를 주지 않는 개발자 이동근입니다. 기획에 세세한 부분을 사용자 관점에서 세세하게 채워나가는 것을 좋아합니다. 주어진 환경에서 가장 최상의 퍼포먼스와 임팩트를 주기 위해 고하고 있습니다.
          <br />
          지금은 동글동글 잘 굴러가는 웹 프론트 개발을 하고 있습니다. 🌝
        </p>
      </AboutPageTitle>
      {/*<AboutImage>*/}
      {/*  <Image fluid={Data.avatar.childImageSharp.fluid} alt="author" />*/}
      {/*</AboutImage>*/}
      <AboutDetails>
        <h2>회사경력</h2>
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
        </div>
        <SocialProfiles>
          <SocialProfile items={SocialLinks} />
        </SocialProfiles>
      </AboutDetails>
    </AboutWrapper>
  )
}

export default About
