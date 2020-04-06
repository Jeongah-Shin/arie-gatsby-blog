import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import SocialProfile from "../../../components/SocialProfile/SocialProfile"
import {
  IntroWrapper,
  IntroImage,
  IntroTitle,
  Desciption,
  IntroInfo,
} from "./style"
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoGithub,
  IoLogoLinkedin,
} from "react-icons/io"

type IntroProps = {}

const SocialLinks = [
  {
    icon: <IoLogoGithub />,
    url: "https://github.com/Jeongah-Shin",
    tooltip: "Github",
  },
  {
    icon: <IoLogoLinkedin />,
    url: "/",
    tooltip: "Linkedin",
  },
  {
    icon: <IoLogoInstagram />,
    url: "https://www.instagram.com/jeong._.arieee/",
    tooltip: "Instagram",
  },
  {
    icon: <IoLogoFacebook />,
    url: "https://www.facebook.com/jeongah.shin.58",
    tooltip: "Facebook",
  },
]

const Intro: React.FunctionComponent<IntroProps> = () => {
  const Data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/author.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 210, maxHeight: 210, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
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

  const { author } = Data.site.siteMetadata
  const AuthorImage = Data.avatar.childImageSharp.fluid

  return (
    <IntroWrapper>
      <IntroImage>
        <Image fluid={AuthorImage} alt="author" />
      </IntroImage>
      <IntroInfo>
        <IntroTitle>
          생각하는 개발자 <b>{author}🐥</b>입니다.
        </IntroTitle>
        <Desciption>
        모바일 머신러닝 기술에 열정을 가지고, 경량화 딥러닝 모델을 개발합니다.하드웨어 친화적인 알고리즘을 설계하기 위해 실제 플랫폼에서의 모델 성능 측정과 지표 트래킹을 생활화 합니다.
        <br />
        AI 기술이 더 다양한 사용자층을 만날 수 있도록 하는 최적화 과정을 즐깁니다 🤳
        </Desciption>
        <SocialProfile items={SocialLinks} />
      </IntroInfo>
    </IntroWrapper>
  )
}

export default Intro
