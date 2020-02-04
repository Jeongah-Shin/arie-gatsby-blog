---
title: Shell Script를 이용한 Rails 서버 배포
date: '2020-02-04'
tags: ['shell', 'rails', 'deploy']
description: ''
cover: ''
---

## 0. AWS에서 서버 생성

AWS EC2나 Lightsail을 이용한 서버를 생성한다.

pem key를 가지고 서버에 접속한다.



## 1. 프로젝트 가져오기

서버에 설치한 프로젝트를 해당 Instance로 가져온다.
(여기서는 테스트로 만들었던 [URL Short 프로젝트](https://github.com/eastroots92/rails_url_shortcut)를 Clone 한다.)

```shell
$ cd ~
$ git clone https://github.com/eastroots92/rails_url_shortcut.git
```

프로젝트를 가져온 후, 개발을 하면서 사용했던 `master.key` 파일의 내용을 복사해서 `master.key` 파일을 config 폴더 안에 생성하고 붙여 넣는다.

> 이 부분은 Rails 5.2 이후에 새로 생긴 작업으로 기존에 Private한 파일들을 figaro gem 을 이용해 secret 파일을 복사해서 넣어주면 된다.



## 2. Auto Server Setup Script 가져오기

해당 Repository 이 폴더 위치에 있는 `scripts` 폴더를 다운받는다.
(추후에 github에 별도의 파일로 정리하여 올려 Clone을 통해 사용 할 수 있게 할 예정.)

- 위 과정을 통하면 제일 상단에 2개의 폴더가 있어야 한다.

  ```shell
  # /rails_url_shortcut
  # /scripts
  ```



## 3. Shell Script 실행

### 3.1 rbenv.sh 실행

서버 설정을 편하게 하기 위한 Script. 위 스크립트를 설치하면 자동으로 설정이 된다.

```shell
$ sh ./scripts/rbenv.sh
```

### 3.2  shell 새로고침

`rbenv.sh` 를 통해 많은 것들을 설치했는데, 이것들을 사용하기 위해 shell을 refresh 해야한다.
( 혹시모를 꼬임을 방지하기 위해! )

```shell
$ exec $SHELL
```

### 3.3 ruby_rails_nginx.sh 실행

`ruby_rails_nginx.sh` 를 실행하여 나머지 부분의 설정을 지속적으로 한다.

`ruby_rails_nginx.sh` 에서는 세팅할 프로젝트의 이름을 설정해줘야 한다.

> 프로젝트 이름은 git clone 했을 때 받아지는 github repository의 이름이다. `ls` 명령어로 확인이 가능하다.

`rails_ruby_nginx.sh` 를 실행하기 전에 gem 설치에 필요한 프로그램들을 반드시 설치한 후, 스크립트를 실행한다.

```shell
$ sh ./scripts/2_ruby_rails_nginx.sh PROJECT-FOLDER-NAME
```

#### 3.3  Gem 설치 도중 error 발생 시

만약 설치 도중 에러가 발생했다면, 에러를 수정한 후에 `ruby_rails_nginx.sh` 스크립트 파일을 다시 실행해서 deploy과정을 마무리한다.





## 4. 서버 업데이트

```shell
# git에서 프로젝트 풀
$ cd ~/PROJECT-FOLDER-NAME
$ git pull origin master --rebase

# Rails bundle install & asset precompile & restart rails App
$ bundle install
$ bundle exec rake assets:precompile RAILS_ENV=production
$ touch tmp/restart.txt
```





## 5. Shell Script 코드 설명

위 Shell Script들은 위 순서로 실행된다.

### 5.1 rbenv.sh

- `sudo apt-get update`
  패키지 인덱스, 인덱스 정보를 업데이트

  > apt-get은 인덱스를 가지고 있는데 이 인덱스는 `/etc/apt/sources.list`에 있다. 이곳에 저장된 저장소에서 사용할 패키지의 정보를 얻어온다.

- `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`

  [Node.js 설치하기](https://nodejs.org/ko/download/package-manager/)

- Yarn 설치

  ```shell
  $ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  $ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  ```

- Rails 설치 시 필요한 라이브러리들 설치

  ```shell
  $ sudo apt-get update
  $ sudo apt-get -y install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev nodejs yarn imagemagick
  ```

- ruby 설치를 위한 rbenv 설치

  ```shell
  $ echo '>> Install rbenv and ruby-build plugins'
  $ cd ~
  $ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
  $ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
  $ echo 'eval "$(rbenv init -)"' >> ~/.bashrc
  
  $ git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
  $ echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
  ```

  

### 5.2 ruby_rails_nginx.sh

- Ruby 설치

  ```shell
  $ echo '>> Install ruby'
  $ if [ -e ~/$1/.ruby-version ]; then
  $   rv="$(cat ~/$1/.ruby-version)"
  $ else
  $   rv="2.3.6"
  $ fi
  
  $ if hash ruby 2>/dev/null; then
  $   echo 'Ruby already installed'
  $ else
  $   rbenv install -v $rv
  $   rbenv global $rv
  $   ruby -v
  $ fi
  ```

  > 별도로 ruby를 설정하지 않는다면 2.3.6 버전이 설치된다.

- Bundler 설치 & Bundle install (Production 모드로 배포)

  ```shell
  $ gem install bundler
  $ cd ~/$1 && bundle install --without development test
  ```

- Passenger & nginx 설치

  ```shell
  $ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
  $ sudo apt-get install -y apt-transport-https ca-certificates
  $ sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger xenial main > /etc/apt/sources.list.d/passenger.list'
  $ sudo apt-get update && sudo apt-get install -y nginx-extras passenger
  $ sudo service nginx start
  ```

  > 보다 쉽게 rails용 nginx 설치를 위해 passenger를 이용한다.

- Passenger & Nginx 구성

  ```shell
  $ sudo sed -i -e '/passenger_ruby/c\passenger_ruby /home/ubuntu/.rbenv/shims/ruby;' /etc/nginx/passenger.conf
  $ sudo sed -i -e 's/\# include \/etc\/nginx\/passenger/include \/etc\/nginx\/passenger/g' /etc/nginx/nginx.conf
  $ sudo sed -i -e "s/root \/var\/www\/html;/root \/home\/ubuntu\/$1\/public; passenger_enabled on; rails_env production;/g" -e '/index.nginx-debian.html/d' -e '/try_files/d' -e '/server_name _;/a\        error_page  500 502 503 504  \/50x.html; location = \/50x.html { root html; }' /etc/nginx/sites-enabled/default
  $ sudo service nginx restart
  ```

- Assets precompile & rails app 재시작

  ```shell
  $ cd ~/$1 && bundle exec rake db:migrate RAILS_ENV=production && bundle exec rake db:seed RAILS_ENV=production && bundle exec rake assets:precompile RAILS_ENV=production && touch tmp/restart.txt
  ```
