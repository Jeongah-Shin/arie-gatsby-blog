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
          안녕하세요 🙌 <b>{author}</b>입니다.
        </IntroTitle>
        <Desciption>
          기획에 한계를 주지 않는 개발자 이동근입니다. 기획에 세세한 부분을 사용자 관점에서 세세하게 채워나가는 것을 좋아합니다.
          주어진 환경에서 가장 최상의 퍼포먼스와 임팩트를 주기 위해 고하고 있습니다.
          <br />
          지금은 동글동글 잘 굴러가는 웹 프론트 개발을 하고 있습니다. 🌝
        </Desciption>
        <SocialProfile items={SocialLinks} />
      </IntroInfo>
    </IntroWrapper>
  )
}

export default Intro
