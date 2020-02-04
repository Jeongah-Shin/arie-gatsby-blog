---
title: 객체와 변경불가성(Immutability)
date: '2020-02-04'
tags: ['javascript', 'es6', 'immutable']
description: ''
cover: './preview.jpg'
---

> 해당 글은 2018년 10월에 작성된 글 입니다. 🙏

# 객체와 변경불가성(Immutability)

Immutability(변경 불가능), mutable(변경 가능)

Immutability는 객체가 생성된 이후 그 상태를 변경할 수 없는 디자인 패턴을 말한다.
이러한 특성은 함수형 프로그래밍의 핵심 원리이다.

Javascript의 객체는 참조(reference)형태로 전달하고 전달 받는다.
객체가 참조를 통해 공유되어 있다면 그 상태가 언제든지 변경될 수 있기 때문에 문제가 될 가능성도 커지게 된다.

ES6에서 불변 데이터 패턴(immutable data pattern)을 쉽게 구현할 수 있다.

## immutable value vs. mutable value

Javascript의 원시 타입은 변경 불가능한 값이다.

- Boolean
- null
- undefined
- Number
- String
- Symbol

원시 타입 이외의 모든 값은 객체 타입이며 객체 타입은 변경가능한 값(mutable value)이다.
즉, 객체는 새로운 값을 다시 만들 필요없이 직접 변경이 가능하다.

JS의 문자열은 변경 불가능한 값(immutable value)이다. 이러한 값들은 메모리 영역에서 변경이 불가능하다는 뜻이다.

```javascript
var str = 'Hello';
str = 'world';
```

1번라인이 실행되면 문자열 `Hello`가 생성되고 str은 메모리에 문자열 메모리 주소를 가리킨다.

2번라인이 실행되면 문자열 `world`가 생성되고 str은 메모리에 해당 문자열 주소를 가리킨다.

> 즉, Hello 문자열이 변경되는 것이 아니라 world, Hello 각각 메모리에 할당된다.

```javascript
var statement = 'I am an immutable value'; // string은 immutable value
var otherStr = statement.slice(8, 17);

console.log(otherStr);   // 'immutable'
console.log(statement);  // 'I am an immutable value'
```

위 코드의 `otherStr` 의 값은 `statement` 가 가리키는 문자열을 변형한 것이 아니래 해당 문자열을 가지고 새로운 문자열을 만들어 메모리에 할당한 것이다.

> 배열은 객체이기 때문에 배열객체의 메소드`push()` 는 직접 대상 배열을 변경한다.

```javascript
var user = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

var myName = user.name; // 변수 myName은 string 타입이다.

user.name = 'Kim';
console.log(myName); // Lee

myName = user.name;  // 재할당
console.log(myName); // Kim
```

위의 `user.name` 의 값을 변경 했지만 `myName`이 자동으로 변경되지 않았다. 이러한 이유는 myName에 user.name에 해당 문자열 주소를 공유한 것이 아니라 새롭게 메모리에 데이터를 생성하고 해당 데이터 주소를 참조하기 때문이다.

```javascript
var user1 = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

var user2 = user1; // 변수 user2는 객체 타입이다.

user2.name = 'Kim';

console.log(user1.name); // Kim
console.log(user2.name); // Kim

```

하지만 객체는 다르다!!!

객체는 값이 변경이 가능하기 때문에 user1과 user2가 모두 같은 객체를 가리킨다. 그렇기 때문에 user1을 변경하면 user2도 자연스레 변경된다.



## 불변 데이터 패턴(immutable data pattern)

의도하지 않은 객체의 변경이 발생하는 원인의 대다수는 “레퍼런스를 참조한 다른 객체에서 객체를 변경”하기 때문이다. 이 문제의 해결 방법은 비용은 조금 들지만 객체를 불변객체로 만들어 프로퍼티의 변경을 방지하며 객체의 변경이 필요한 경우에는 참조가 아닌 객체의 방어적 복사(defensive copy)를 통해 새로운 객체를 생성한 후 변경한다.

이를 정리하면 아래와 같다.

- 객체의 방어적 복사(defensive copy)

  Object.assign

- 불변객체화를 통한 객체 변경 방지

  Object.freeze



### Object.assign

Object.assign은 타킷 객체로 소스 객체의 프로퍼티를 복사한다. 이때 소스 객체의 프로퍼티와 동일한 프로퍼티를 가진 타켓 객체의 프로퍼티들은 소스 객체의 프로퍼티로 덮어쓰기된다. 리턴값으로 타킷 객체를 반환한다. ES6에서 추가된 메소드이며 Internet Explorer는 지원하지 않는다.

```javascript
Object.assign(target, ...sources)
```

```javascript
// Copy
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
console.log(obj == copy); // false

// Merge
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const merge1 = Object.assign(o1, o2, o3);

console.log(merge1); // { a: 1, b: 2, c: 3 }
console.log(o1);     // { a: 1, b: 2, c: 3 }, 타겟 객체가 변경된다!

// Merge
const o4 = { a: 1 };
const o5 = { b: 2 };
const o6 = { c: 3 };

const merge2 = Object.assign({}, o4, o5, o6);

console.log(merge2); // { a: 1, b: 2, c: 3 }
console.log(o4);     // { a: 1 }
```



### Object.freeze

`Object.freeze()` 를 사용하면 불변객체로 만들 수 있다.

```javascript
const user1 = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

// Shallow copy
const user2 = Object.assign({}, user1, {name: 'Kim'});

console.log(user1.name); // Lee
console.log(user2.name); // Kim

Object.freeze(user1);

user1.name = 'Kim'; // 무시된다!

console.log(user1); // { name: 'Lee', address: { city: 'Seoul' } }

console.log(Object.isFrozen(user1)); // true

```

하지만 이런 방식은 내부 객체 (Nested Object)는 변경 가능하다.

```javascript
const user = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

Object.freeze(user);

user.address.city = 'Busan'; // 변경된다!
console.log(user); // { name: 'Lee', address: { city: 'Busan' } }
```

내부 객체까지 변경 불가능하게 하려면 Depp freeze를 하여야 한다.

```javascript
function deepFreeze(obj) {
  const props = Object.getOwnPropertyNames(obj);

  props.forEach((name) => {
    const prop = obj[name];
    if(typeof prop === 'object' && prop !== null) {
      deepFreeze(prop);
    }
  });
  return Object.freeze(obj);
}

const user = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

deepFreeze(user);

user.name = 'Kim';           // 무시된다
user.address.city = 'Busan'; // 무시된다
```

### immutable.js

Object.assign과 Object.freeze을 사용하여 불변 객체를 만드는 방법은 번거러울 뿐더러 성능상 이슈가 있어서 큰 객체에는 사용하지 않는 것이 좋다.

또 다른 대안으로 Facebook이 제공하는 [Immutable.js](https://facebook.github.io/immutable-js/)를 사용하는 방법이 있다.

Immutable.js는 List, Stack, Map, OrderedMap, Set, OrderedSet, Record와 같은 영구 불변 (Permit Immutable) 데이터 구조를 제공한다.

npm을 사용하여 Immutable.js를 설치한다.

```shell
$ npm install immutable
```

```javascript
const { Map } = require('immutable')
const map1 = Map({ a: 1, b: 2, c: 3 })
const map2 = map1.set('b', 50)
map1.get('b') // 2
map2.get('b') // 50
```

