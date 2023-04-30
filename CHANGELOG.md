# 📦 open-sauced/opengraph.opensauced.pizza changelog

[![conventional commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic versioning](https://img.shields.io/badge/semantic%20versioning-2.0.0-green.svg)](https://semver.org)

> All notable changes to this project will be documented in this file

## [2.1.0-beta.2](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v2.1.0-beta.1...v2.1.0-beta.2) (2023-04-30)


### 🐛 Bug Fixes

* Overflowing language bar fix ([#38](https://github.com/open-sauced/opengraph.opensauced.pizza/issues/38)) ([3dc1a0a](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/3dc1a0add116c1124af6a993e9e843015f3c0d25))

## [2.1.0-beta.1](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v2.0.1...v2.1.0-beta.1) (2023-04-26)


### 🍕 Features

* adding utilities for cards local generation & testing ([#34](https://github.com/open-sauced/opengraph.opensauced.pizza/issues/34)) ([c5a5fec](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/c5a5fecd3689b11fd3325c7f0fd3228bd368e0f5))

### [2.0.1](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v2.0.0...v2.0.1) (2023-04-19)


### 🐛 Bug Fixes

* correct username file system caching issues ([076ace0](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/076ace0b4cc856643de29cb4ef3f4e5df189c510)), closes [#24](https://github.com/open-sauced/opengraph.opensauced.pizza/issues/24)
* correctly lowercase username display in social card ([fc9211c](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/fc9211c46e106db042b87605ee003f6ef6a3cd86))

### [2.0.1-beta.2](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v2.0.1-beta.1...v2.0.1-beta.2) (2023-04-19)


### 🐛 Bug Fixes

* correctly lowercase username display in social card ([fc9211c](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/fc9211c46e106db042b87605ee003f6ef6a3cd86))

### [2.0.1-beta.1](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v2.0.0...v2.0.1-beta.1) (2023-04-19)


### 🐛 Bug Fixes

* correct username file system caching issues ([076ace0](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/076ace0b4cc856643de29cb4ef3f4e5df189c510)), closes [#24](https://github.com/open-sauced/opengraph.opensauced.pizza/issues/24)

## [2.0.0](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.1.2...v2.0.0) (2023-04-11)


### ⚠ BREAKING CHANGES

* id changed to :username in earlier commits, this is catching it up

### 🔁 Continuous Integration

* correct live release url in github actions deployment ([4a434e6](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/4a434e675198be1ee3ec0000a85a02dccf1b080e))


### 🎨 Styles

* add tailwind proof of concept ([8594508](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/8594508a07a103fe6e209b1895c7c803e171eecb))


### 📝 Documentation

* update live environments lins and document local development ([08cead1](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/08cead19189d14ff4d01a23584400c284818a091))


### 🍕 Features

* add boilerplate s3-client sdk code connected to digital ocean spaces ([a4a71e3](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/a4a71e349579e86be65ce201f2ec941177a1e3de))
* add custom cdn endpoint configuration for s3 bucket on digital ocean ([077e473](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/077e473ba9ec01d88d383f202427f06398047652)), closes [#18](https://github.com/open-sauced/opengraph.opensauced.pizza/issues/18)
* implement digital ocean spaces s3 client storage and cache images 3 days ([792992e](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/792992e8ad8849a8e1c10178b84e0caa4d023b1b))
* implement no-content verification strategy ([6efe0e6](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/6efe0e67bb61dc2d0d7aab74744019441b6e777e))
* optimize image loading and return errors ([7c6f199](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/7c6f1995bb2922bfd9cd9e26230afd079e2e6342)), closes [#17](https://github.com/open-sauced/opengraph.opensauced.pizza/issues/17)


### 🐛 Bug Fixes

* correct all tailwind classes except gaps ([fe44711](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/fe447116ea17755e389e5d8942ced0e721ce2145)), closes [#7](https://github.com/open-sauced/opengraph.opensauced.pizza/issues/7)
* correct app spec GET automatic rewrites of HEAD ([3047cec](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/3047cec62aff770abb4fe97d736c18790e406fa8))
* correct dark logo render and make it static ([dc9f3a4](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/dc9f3a4eb8292b7f94108932e469209c67b33405))
* correct languages displaying less than 0.5% ([bee0e6e](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/bee0e6e0cf202296c1b137a499bfc48ed481db1f))
* correct server generation environment ([68d0202](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/68d0202be3575d40a78de2b8bfe90b2bd4339b6c))
* correct user languages sizing issues ([5846c42](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/5846c42fc2531b1e085ce1c6e982ac44e2ffd556))
* correct username display instead of full name ([1454cbb](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/1454cbbd235565a0625c2d051d8c5f2e2115c15a)), closes [#11](https://github.com/open-sauced/opengraph.opensauced.pizza/issues/11)
* correct yoga layout double styling, remove repo icon extrenaous classes ([d84015b](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/d84015bf1264397d9ac6ff18b7c5344f237708ff))
* correct zero contribution top repos language distribution ([7d82c0d](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/7d82c0d0ae279694eb47dd523797f0eea1cb9c9f))


### 🤖 Build System

* update dependencies and ts5 ([715e349](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/715e349e1c398a37d35553e9a907742452b67601))
* update graphql types ([f7db713](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/f7db7134de08b50998ce994f615b151bed35244f))

## [2.0.0-beta.3](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2023-04-11)


### 🤖 Build System

* update graphql types ([f7db713](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/f7db7134de08b50998ce994f615b151bed35244f))

## [2.0.0-beta.2](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2023-04-11)


### 🐛 Bug Fixes

* correct dark logo render and make it static ([dc9f3a4](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/dc9f3a4eb8292b7f94108932e469209c67b33405))

## [2.0.0-beta.1](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.2.0-beta.10...v2.0.0-beta.1) (2023-04-10)


### ⚠ BREAKING CHANGES

* id changed to :username in earlier commits, this is catching it up

### 🐛 Bug Fixes

* correct server generation environment ([68d0202](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/68d0202be3575d40a78de2b8bfe90b2bd4339b6c))

## [1.2.0-beta.10](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.2.0-beta.9...v1.2.0-beta.10) (2023-04-10)


### 🐛 Bug Fixes

* correct app spec GET automatic rewrites of HEAD ([3047cec](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/3047cec62aff770abb4fe97d736c18790e406fa8))

## [1.2.0-beta.9](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.2.0-beta.8...v1.2.0-beta.9) (2023-04-10)


### 🍕 Features

* optimize image loading and return errors ([7c6f199](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/7c6f1995bb2922bfd9cd9e26230afd079e2e6342)), closes [#17](https://github.com/open-sauced/opengraph.opensauced.pizza/issues/17)


### 🤖 Build System

* update dependencies and ts5 ([715e349](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/715e349e1c398a37d35553e9a907742452b67601))

## [1.2.0-beta.8](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.2.0-beta.7...v1.2.0-beta.8) (2023-04-09)


### 🍕 Features

* implement no-content verification strategy ([6efe0e6](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/6efe0e67bb61dc2d0d7aab74744019441b6e777e))


### 🐛 Bug Fixes

* correct languages displaying less than 0.5% ([bee0e6e](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/bee0e6e0cf202296c1b137a499bfc48ed481db1f))
* correct zero contribution top repos language distribution ([7d82c0d](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/7d82c0d0ae279694eb47dd523797f0eea1cb9c9f))

## [1.2.0-beta.7](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.2.0-beta.6...v1.2.0-beta.7) (2023-04-09)


### 📝 Documentation

* update live environments lins and document local development ([08cead1](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/08cead19189d14ff4d01a23584400c284818a091))

## [1.2.0-beta.6](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.2.0-beta.5...v1.2.0-beta.6) (2023-04-09)


### 🐛 Bug Fixes

* correct all tailwind classes except gaps ([fe44711](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/fe447116ea17755e389e5d8942ced0e721ce2145)), closes [#7](https://github.com/open-sauced/opengraph.opensauced.pizza/issues/7)
* correct user languages sizing issues ([5846c42](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/5846c42fc2531b1e085ce1c6e982ac44e2ffd556))
* correct username display instead of full name ([1454cbb](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/1454cbbd235565a0625c2d051d8c5f2e2115c15a)), closes [#11](https://github.com/open-sauced/opengraph.opensauced.pizza/issues/11)

## [1.2.0-beta.5](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.2.0-beta.4...v1.2.0-beta.5) (2023-04-09)


### 🎨 Styles

* add tailwind proof of concept ([8594508](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/8594508a07a103fe6e209b1895c7c803e171eecb))


### 🐛 Bug Fixes

* correct yoga layout double styling, remove repo icon extrenaous classes ([d84015b](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/d84015bf1264397d9ac6ff18b7c5344f237708ff))

## [1.2.0-beta.4](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.2.0-beta.3...v1.2.0-beta.4) (2023-04-08)


### 🍕 Features

* add custom cdn endpoint configuration for s3 bucket on digital ocean ([077e473](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/077e473ba9ec01d88d383f202427f06398047652)), closes [#18](https://github.com/open-sauced/opengraph.opensauced.pizza/issues/18)

## [1.2.0-beta.3](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.2.0-beta.2...v1.2.0-beta.3) (2023-04-05)


### 🍕 Features

* implement digital ocean spaces s3 client storage and cache images 3 days ([792992e](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/792992e8ad8849a8e1c10178b84e0caa4d023b1b))

## [1.2.0-beta.2](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.2.0-beta.1...v1.2.0-beta.2) (2023-04-04)


### 🔁 Continuous Integration

* correct live release url in github actions deployment ([4a434e6](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/4a434e675198be1ee3ec0000a85a02dccf1b080e))

## [1.2.0-beta.1](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.1.2...v1.2.0-beta.1) (2023-04-04)


### 🍕 Features

* add boilerplate s3-client sdk code connected to digital ocean spaces ([a4a71e3](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/a4a71e349579e86be65ce201f2ec941177a1e3de))

### [1.1.2](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.1.1...v1.1.2) (2023-04-04)


### 🐛 Bug Fixes

* correct font usage from roboto to design (inter) ([4748b98](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/4748b98a99b50514c135ff4bf6f1b2de10f8939e))

### [1.1.1](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.1.0...v1.1.1) (2023-04-04)


### 🐛 Bug Fixes

* correct user name being displayed as login ([19043fc](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/19043fc359597bfa31f9e1bdc864c1a18a486fc1))

## [1.1.0](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.0.4...v1.1.0) (2023-04-04)


### 📝 Documentation

* correct readme with new style ([ccc8a96](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/ccc8a96399322265affdaefb65b2e96f557943ab))


### 🤖 Build System

* remove extraneous colors package ([4c7d29a](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/4c7d29aa9ad9a7fe79c30fb79ed3e57b971fa9a5))


### 🍕 Features

* add correct languages calculation and display ([977df75](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/977df7589d67e6987cd9cb4e6528a86f46470541))

### [1.0.4](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.0.3...v1.0.4) (2023-04-04)


### 🐛 Bug Fixes

* correct top repositories distribution and name concatenation ([24bfb15](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/24bfb159bbe9c43e631432c69189f0ffba0c7c11))

### [1.0.3](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.0.2...v1.0.3) (2023-04-04)


### 🐛 Bug Fixes

* remove static assets, get gfonts roboto versions ([dd096ca](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/dd096caba732f9ccdc11d1b280cd18cf442327cb))

### [1.0.2](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.0.1...v1.0.2) (2023-04-03)


### 🐛 Bug Fixes

* correct docker build ([b62c129](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/b62c12930ca927844689c723ca1c33942cb4868b))

### [1.0.1](https://github.com/open-sauced/opengraph.opensauced.pizza/compare/v1.0.0...v1.0.1) (2023-04-03)


### 🔁 Continuous Integration

* fix container deployment path ([a58ec19](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/a58ec197e17f65736f2f7551c881c2da70d90e7a))

## 1.0.0 (2023-04-03)


### 🔁 Continuous Integration

* implement release tooling ([3e35dc9](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/3e35dc9b5a7ae1bfd8a1ac404593d57b83e8aac4))


### 📝 Documentation

* add partial readme ([3b5d838](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/3b5d8381547356c57fc1aab8087fb37fbcc320be))


### 🤖 Build System

* enable local development and transpilation ([6893d90](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/6893d90d4fd9ef0e99bb115a05d31d06bc509398))
* make package able to release ([c2cc28c](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/c2cc28c55652a4ac81e1dc81b8588e74458a8cb9))
* update dependencies and package meta ([8757519](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/875751983dcfb6c0e0c8c6d4675a6a59a97c1372))


### 🧑‍💻 Code Refactoring

* move to nextjs backend architecture static component functions and boilerplate ([d4f854d](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/d4f854d4d5cee998e6495753a44dc006547a32bd))
* rewrite code and correct buffers ([c12099a](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/c12099a219b529250ba6fb8527911c4972d344d4))


### 🍕 Features

* add development tooling and backend configuration ([f1f5947](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/f1f5947c4b97829f8e17e56bd4c8c4aab5bd4c63))
* add dynamic image ([5797c54](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/5797c5447edbe4dd1923fecf3af72c169cc7b781))
* add user not found handler ([b1f870c](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/b1f870ce8ebd40de8a39831c6763ea8742b4084a))
* code splitting & img manual insertion ([8b48513](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/8b48513093e497367fe36bb37e4f8fc1ca35c1a2))
* dynamic user profile card ([18a3e23](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/18a3e23c6b6d42e6e53a4808f3e97738c9740ee1))
* generate images based on route ([e81f5c1](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/e81f5c1d20bcde21d0b8b6fb3df68bd531f3abe2))
* make div flex global ([9790d30](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/9790d30145194b597ee1174c8615abddde8e6483))
* repalce https module with fetch ([3b146a3](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/3b146a332ba019b7a7f94e9b074fd376f2225961))
* switch to graphql and etl octokit ([2e6cb05](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/2e6cb055135be7346e51f3eec44db673f2db2b95))
* use https module instead of axios ([0b6b7fc](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/0b6b7fc6fbfdd4de66e5ad6d35676d80d613e944))
* use node https instead of axios ([12b86a7](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/12b86a7ecbbe53308bc95526f9f72593ea430200))
* User Profile cards ([#5](https://github.com/open-sauced/opengraph.opensauced.pizza/issues/5)) ([64372f4](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/64372f4fb75589cd9c633c79b9e2029c3ac8cab1))


### 🐛 Bug Fixes

* add awaits ([14a5e28](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/14a5e2804c497c9938d5595879e2f9b9d54d6054))
* correct application return type image ([a0e6d3f](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/a0e6d3f55e43e326c8a4bf8a31d027b41040b37d))
* correct node engines required to deploy ([5b088e9](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/5b088e9f493ded5d2a4b94e213c41eeeb3364448))
* downgrade required node version ([5ae3704](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/5ae3704d6845ca13dd155fb1737a0f989ad8b594))
* fix unexisting value handling ([16d3101](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/16d31013f4c11bcb7b55551ae64fdaf287ee5492))
* set moduleResolution to node16 ([52b97ed](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/52b97ed27d40385459d25a3bf6727ab7e1fc272e))


### ✅ Tests

* correct test suite usage ([f761ac8](https://github.com/open-sauced/opengraph.opensauced.pizza/commit/f761ac84c632d3a70720b9fdffe24ba07c075016))
