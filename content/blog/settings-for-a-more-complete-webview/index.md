---
title: 보다 완벽한 webview를 위한 세팅들
date: '2020-02-04'
tags: ['webview', 'html', 'css']
description: ''
cover: './preview.jpg'
---

> 해당 글은 2019년 3월에 작성된 글 입니다. 🙏

# 보다 완벽한 webview를 위한 세팅들

App에서 webview를 이용해서 앱을 웹으로 대체하는 경우가 꽤 있다.

퍼포먼스 면에서는 아직 웹뷰가 네이티브뷰를 따라가기엔 아직 많이 부족하지만 별도의 업데이트 없이 View를 자유자재로 변경이 가능하고 한번의 작업으로 AND와 IOS 모두 변경이 가능하기 때문에 자주 View가 바뀌어야 하는 상황이거나 퍼포먼스가 크게 중요하지 않은 화면에서는 웹뷰가 훨씬 효율적이다.

웹으로 앱을 만들고 있는 개발자라면 해당 페이지가 앱처럼 보이기를 원할 것이다.

이러한 상황 속에서 단순히 미디어 쿼리를 이용하여 `width` 를 `375px (iphoneX)`, `320px (iphoneSE)` 대응하는 것 외에 추가적으로 대응하면 좋을 것들을 소개하려고 한다.



## 1. pinch to zoom & zoom-in action

<img width="50%" alt="image" src="https://user-images.githubusercontent.com/26288794/54675138-41c68f00-4b41-11e9-8a07-fa49a805be2c.jpg" />

위 이미지의 오른쪽 처럼 webview에서 더블 클릭을 하거나 pinch to zoom을 이용해서 확대를 할 수 있다면 😱
기본적으로 앱에서 zoom을 이용한 커뮤니케이션을 하는 경우가 많이 없기 때문에 당연히 webview에서도 막는 것이 좋다.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1, user-scalable=0">
```

`head` meta tag에 다음과 같이 속성을 추가해주면 된다.

- `maximum-scale=1.0` : 최대 줌인을 1배만큼 한다.
- `minimum-scale=1.0` : 최소 줌아웃을 1배만큼 한다.
- `user-scalable=0` : 유저가 pinch-to-zoom이나 double touch를 통한 zoom action을 못하게 한다.

위 3개를 통해 zoom과 관련된 내용들을 막을 수 있다.

> TMI1. `width=device-width`를 추가해야 제대로된 모바일 페이지를 볼 수 있다.
>
> TMI2. 해당 부분은 web에서도 막을 수 있지만 AND와 IOS 자체적으로 막을 수 있다.



## 2. 버튼 Touch 시 나오는 음영 지우기

<img width="50%" alt="image" src="https://user-images.githubusercontent.com/26288794/54676258-a4b92580-4b43-11e9-9038-1016dda44654.jpg" />

webview에서 버튼을 클릭 했을 때 오른쪽 이미지와 같이 음영이 생긴다. 머터리얼 디자인처럼 각진 모양의 버튼에서는 크게 눈에 띄지 않지만 모서리가 둥근 버튼이나 텍스트로 된 a link의 경우 깔끔하지 않은 화면을 만나볼 수 있다. 🤥

```css
* {
  -webkit-tap-highlight-color:rgba(255,255,255,0);
}
```

위의 속성 때문에 선택 음영이 나오는 것인데 해당 속성에 color 값을 넣으면 자신이 의도한 색상으로 음영을 만들 수도 있다.
위 속성의 `rgba(255, 255, 255, 0)` 에서 중요한 포인트는 투명도를 0으로 하는 것이다.
(transparent를 넣으면 투명하게 처리할 수 있으나 구형의 안드로이드에서는 정상적으로 동작 안할 수 있다.)

> `*` 을 이용해서 현재 모든 Tag들에 일괄 적용 했지만 특정 부분에서만 해당 속성을 추가해서 특정 Tag에서만 동작하지 않게 할 수 있다.



## 3. test select 안되게 하기

<img width="50%" alt="image" src="https://user-images.githubusercontent.com/26288794/54678383-62deae00-4b48-11e9-9881-506737f8ebaa.jpg" />

휴 :smoking:  … 

```css
* {
	user-select: none;
}
```

위의 `user-select` 를 이용한다면 유저가 더블클릭 등을 이용하여 글자를 선택하는 것을 막을 수 있다.

`user-select: auto | all | none | text` 총 4개의 값이 존재하며 아래와 같다.

- `auto` : default 값으로 브라우저 허용 시 텍스트 선택 가능
- `all` : 더블클릭이 아닌 클릭만으로도 선택이 가능
- `none` : 텍스트 선택이 안됨
- `text` : 텍스트 선택이 가능



## 4. link Long touch 막기

<img width="50%" alt="image" src="https://user-images.githubusercontent.com/26288794/54681245-39755080-4b4f-11e9-9b4b-f7993943b746.jpg" />

`a tag` 와 같은 link tag는 long touch(press) 할 경우 위와 같이 나오게 된다.
유저에게 불필요한 정보를 노출하는 것은 유저 경험 뿐만 아니라 보안적인 측면에서도 좋지 않다.

```css
* {
  -webkit-touch-callout: none;
}
```

위 속성을 통해 팝업이나 액션시트를 제어할 수 있다.
아래와 같은 값들을 지정해 줄 수 있다.

```css
/* Keyword values */
-webkit-touch-callout: default;
-webkit-touch-callout: none;

/* Global values */
-webkit-touch-callout: initial;
-webkit-touch-callout: inherit;
-webkit-touch-callout: unset;
```

> TMI. 해당 부분도 AND와 IOS 자체 설정으로 막을 수 있다.



## 5. over scroll시 흰 영역이나 background가 나오는 경우

<img width="50%" alt="image" src="https://user-images.githubusercontent.com/26288794/54681911-ddabc700-4b50-11e9-8276-0562dfb09d21.jpg" />

PC와 다르게 모바일의 경우 시작과 끝 시점에서 스크롤을 하더라도 스크롤이 되었다가 원상복구 되는 Spring(?) 과 같은 유저 경험을 제공하고 있다. 유저 경험 상 Spring과 같은 Action은 매우 좋으나 별도의 대응이 없다면 왼쪽 위와 같이 흰 화면을 맛보게 되고 이는 이질감을 줄 수 있다. (근데 정작 개발자들만 이런 것을 캐치하지 유저는 걍 그렇구나 하고 지나가는 것 같다 🤣)

```html
<body style='background: gray;'>
</body>
```

위와 같이 body에  background color를 지정해주면 오버 스크롤링 되는 상황에서 지정한 배경 색상이 나오게 된다.

만약 제일 상단과 제일 하단이 보여줘야할 background가 다르다면 아래와 같이 설정하면 좋다.

```html
<style>
  .backgroundTop {
		position: fixed;
  	width: 100%;
  	height: 50%;
  	background: gray;
  	z-index: -10;
  	top: 0;    
  }
  .backgroundBottom {
		position: fixed;
  	width: 100%;
  	height: 50%;
  	background: yellow;
  	z-index: -10;
  	bottom: 0;
  }
</style>
<body>
  <div class='backgroundTop'></div>
  <div class='backgroundBottom'></div>
</body>
```

`position: fixed` 를 통해 위 아래를 고정한 후에 background color를 각각 지정해주면 보다 자연스러운 화면을 접할 수 있다.



## 6. iphoneX와 같이 화면이 Web 영역을 침범할 경우

<img width="50%" alt="image" src="https://user-images.githubusercontent.com/26288794/54681678-55c5bd00-4b50-11e9-9355-1f681aa1d6b8.jpg" />

아이폰 X의 경우 하단 저 검은 길다란 바와 겹치는 issue가 생길 수 있다. 또한 상하단에 생기는 브라우저 버튼들에 가려지는 상황도 생길 수 있는데 이를 대응하는 방법이 있다.

```html
<meta name="viewport" content="viewport-fit=cover">
<style>
  .floating-button {
    padding-top: env(safe-area-inset-bottom);
  }
</style>
```

먼저 뷰포트에 전체 화면을 사용한다는 속성을 추가하면 브라우저 상 하단의 영역도 사용하게 된다.
이런 상황에서 `safe-area-inset` 속성들을 추가하면 된다.

주의할 점은 ios 버전마다 각기 다른 속성을 사용해야 한다.

```
env(safe-area-inset-bottom); // IOS 11.0 이상 (신)
constant(safe-area-inset-bottom); // IOS 11.0 버전 (구)
```

safe-area-inset의 기본값이 있어 값을 수정을 해야한다면 calc를 이용하여 조절해주면 된다.

```
padding-bottom: calc(env(safe-area-inset-bottom) - 5px);
padding-bottom: calc(constant(safe-area-inset-button) - 5px);
```

> Constant & env 둘다 추가해야 ios 구, 신버전 대응이 가능하다.



## 마무리

위의 내용들이 사실 유저가 서비스를 이용하는데 큰 문제가 될 것이라 생각하진 않는다.
다만 위의 내용들을 넣는다면 비용대비 좀 더 유저의 경험이 좋아지지 않을까 생각한다.

끗



### 참고자료

- [env(safe-area-inset-top) / constant(safe-area-inset-top) reporting 0 on iPhone X](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/49)
