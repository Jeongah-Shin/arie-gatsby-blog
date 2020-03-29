---
title: 서브도메인(subDomain)과 하위패스(subPath) 중 어떤 것이 SEO에 좋을까?
date: '2020-03-07'
tags: ['seo', 'subDomain', 'subPath', 'web']
description: ''
cover: './preview.jpg'
---



# 서브도메인(subDomain)과 하위경로(subPath) 중 어떤 것이 SEO에 좋을까?

이미 `example.com` 과 같은 최상위 도메인에 메인 서비스를 하는 상황 속에서, 채용(회사 소개 포함)이나 블로그와 같은 다른 용도의 페이지를 만들어 배포해야 하는 상황이었고, 도메인과 관련하여 기술팀과 마케팅팀 간 도메인 선정 과정에서 두 가지 방향으로 나뉘었다.

- **서브도메인 방식** : career.example.com | blog.example.com
- **하위패스 방식** : example.com/career | example.com/blog



> 이런 경우 여러분은 어떤 도메인으로 배포하실 건가요?



먼저, **기술팀**의 경우 **서브도메인 방식**을 제안했다. 
하위 패스의 경우 고려해야 할 것들이 꽤 많다. 사용하고자 하는 하위 경로가 메인 서비스 내 사용되고 있는지 확인을 해야 하고, 사전에 고려가 되어있지 않아 사용되고 있는 경우 꽤 번거로운 과정을 거치게 된다. (기존 path의 내용을 옮기던지, 사용하고자 하는 path들을 다른 이름으로 바꾸던지 등)

그에 비해 **서브도메인**은 서브도메인을 생성하고 해당 도메인에 페이지를 올리기만 하면 되기에 **매우 간단**하다.



하지만 **마케팅팀**의 관점은 달랐다.
기술적인 부분을 고려하여 도메인을 선정했던 것과 달리, **SEO** 측면을 고려하여 **하위 경로** 로 진행하길 바랬다.
서브도메인(career.example.com)의 경우 하위패스(example.com/career)에 비해 "이그젬플 채용"과 같은 검색어를 입력 시, 매칭율이 상대적으로 낮아 커리어를 먼저 인식, SEO 시 후 순위로 내려갈 수 있으며, 실제 그런 레거시가 존재한다 말씀하셨다.



이런 의견 대립 속에서 실제 서브도메인과 하위 경로의 차이가 실제 SEO에 영향이 있는지 궁금하여, 관련 내용을 찾아보았다.



## 진짜 서브도메인보다 하위 경로가 SEO에 유리할까?

해당 내용을 구글에 찾아보았을 때 SEO 쪽에서 꽤 핫한 주제로 대립이 되고 있었다.

그런 과정 속 `Subdomain or subfolder, which is better for SEO?` 이라는 제목의 이름으로 구글에서 공식 답변을 내놨다.




<iframe width="560" height="315" src="https://www.youtube.com/embed/uJGDyAN9g-g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



> 결론 : 똑같다. 🙂🙃🙂🙃

영상의 내용을 보면 Google의 경우 하위 경로와 서브 도메인을 정확히 동일한 방식으로 크롤링하고, 색인을 생성하고, SEO 스코어를 매긴다고 한다. 


단, 위 내용은 Google에 한정된 이야기이고, 한국에서 많이 사용되는 네이버와 다음의 검색 엔진의 경우 명확한 답변이 없다. 



그렇다면 우리는 어떤 기준으로 도메인을 선택하는 것이 좋을까?

## 서브도메인을 선택 시 어떤 점이 좋을까?

개발자로서 우선 **개발이 용이**하다.

그 외에도 메인 서비스의 내용과 상관관계가 있지만, 이를 명확하게 구분 짓고 싶을 때 사용한다고 한다.
예를 들면, 메인 서비스가 있고 해당 서비스에서 다양한 부가 서비스를 제공하는 경우(다만 메인 서비스와 직접적으로 연결되지 않는 경우)에 좋다고 한다.

대표적인 케이스가 디즈니(disney)이다.
한국 디즈니 사이트의 경우 단일 도메인으로 컨텐트를 운영 중이지만, 영문 사이트의 경우 `cars.disney.com`, `disneyparks.disney.com` , `princess.disney.com` 과같이 콘텐츠 및 목적 별로 각각 다르게 도메인을 운영하고 있다.

그리고 **각각 다르게** 마케팅과 페이지를 **운영**하고 있다.

즉, 하위 도메인 스스로 자생할 수 있는 환경이 될 때 서브도메인을 선택하면 좋다고 한다.



## 하위패스를 선택 시 어떤 점이 좋을까?

마케터로서 우선 **관리가 용이**하다.

서브 도메인의 경우 각각 독립적이게 SEO 설정을 해줘야 하고 관리되어야 하기에, 관리 포인트가 많아지고 중복된 요소들, 또는 새로 SEO를 올리기 위한 작업들을 해야 한다.
구글 서치 봇이 서브도메인과 하위 패스를 동일하게 SEO 점수를 매기고 크롤링 한다고 하지만, 우리가 원하는 검색 시 최 상단에 노출되기 위해 쏟는 노력이 서브도메인에 비해 하위 경로가 SEO 측면에서 훨씬 쉽고 용이하다.



## 그렇다면 우리는 어떤 선택을 했을까?

우리는 **서브도메인** 을 택했다. 크게 3가지 이유였는데

1. 하위 패스로 했을 때 생기는 경로들이 어색하고, 사전에 서브도메인으로 배포할 생각을 가지고 준비하였기에 하위 패스들과 겹치는 경우가 생겼다. 이를 핸들링하여 배포하기에는 큰 공수가 들었고, 시간적 여유가 충분치 않았다. (서브도메인으로 배포하고 하위 패스 변경 작업을 후순위로 진행하기로 함)
2. 우리의 채용 페이지와 블로그는 메인 서비스와 다른 성격이었고, 각각 독립적으로 운영이 가능했다.
3. 구글에 비해 네이버나 다음에서 "이그잼플 채용", "이그잼플 블로그" 등의 검색량은 매우 매우 적었기에 큰 영향이 없을 것으로 판단했다.


실제 선택을 한 후, SEO 키워드 작업에 꽤 신경을 많이 썻고. 현재는 의도한 검색어들을 입력 하였을 때 최 상단에 노출되고 있다 🎉🎉🎉 (배포 후 1주일 정도 걸렸던 것 같다.)


다음번에는 SEO 작업과 관련된 이야기를 해보려고 한다. 





### 참고자료

- [subdomains-vs-subfolders-seo](https://www.searchenginejournal.com/subdomains-vs-subfolders-seo/239795/#close)

- [subdomains-vs-subdirectories-best-practices-workers-part](https://blog.cloudflare.com/subdomains-vs-subdirectories-best-practices-workers-part-1/)
