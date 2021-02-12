# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.6](https://github.com/mokkapps/changelog-generator-demo/compare/v0.0.5...v0.0.6) (2021-02-12)


### Features

* **feeds:** Feed page styling ([e7091fe](https://github.com/mokkapps/changelog-generator-demo/commits/e7091fe014c59d42bae5366da28215b410e7b62c))
* **theme:** add react-native-paper support with custom theme, fonts and colors ([c3daaed](https://github.com/mokkapps/changelog-generator-demo/commits/c3daaed120d7a1061721f569f9896c9507e02611))


### Bug Fixes

* **albums:** change onEndReachedThreshold to 0.5 (load data early) ([557cab8](https://github.com/mokkapps/changelog-generator-demo/commits/557cab81f62b2ccf93aa607dacb9ede98519e3ea))
* **loadMore:** fetchMore undefined problem ([48093b1](https://github.com/mokkapps/changelog-generator-demo/commits/48093b1c3776deee06a40c884d40a3bf4d91626a))


### Chore

* **eslint:** disable eslint prop-types for ts files ([4a479a0](https://github.com/mokkapps/changelog-generator-demo/commits/4a479a0b2474c1282a7d8ba894ecbcf598ad7b18))
* **font:** add Ubuntu fonts and react-native.config.js for assets ([7ab4f23](https://github.com/mokkapps/changelog-generator-demo/commits/7ab4f23bd6a57f461bba6e3adfbb5bea49e4816e))

### [0.0.5](https://github.com/mokkapps/changelog-generator-demo/compare/v0.0.4...v0.0.5) (2021-02-11)


### Features

* **hooks:** create useLoadMore hook for VirtualizedList ([fd5575b](https://github.com/mokkapps/changelog-generator-demo/commits/fd5575b56b1d1bc0ce7461f703c1adc1ce1ef0e8))

### [0.0.4](https://github.com/mokkapps/changelog-generator-demo/compare/v0.0.3...v0.0.4) (2021-02-11)


### Features

* **albums:** add LoadMore draft functionality for Albums ([0b294dc](https://github.com/mokkapps/changelog-generator-demo/commits/0b294dc88b47505a1567043f3f87acf087f92610))

### [0.0.3](https://github.com/mokkapps/changelog-generator-demo/compare/v0.0.2...v0.0.3) (2021-02-11)


### Features

* **albums:** add Carousel for Album view ([9e4192c](https://github.com/mokkapps/changelog-generator-demo/commits/9e4192ce893401a8df260616cea2bd4a827e9d7e))
* **albums:** show albums with delete swype action ([ca9c6ef](https://github.com/mokkapps/changelog-generator-demo/commits/ca9c6ef5e72f1369c049c3d3d62b962d0ef698d5))
* **comp:** add ListWithSwypes.tsx components with click, close, delete actions ([bf2076d](https://github.com/mokkapps/changelog-generator-demo/commits/bf2076dd83223b62910da65ab443cb6e1925896a))
* **gql:** add authMiddleware stub for apollo \ change uri to HttpLink ([8c57e1c](https://github.com/mokkapps/changelog-generator-demo/commits/8c57e1ca6af6ccc9a7d8748702c4019b2d540e34))


### Refactoring

* **faq:** minor fixes for faq module ([f13a4ff](https://github.com/mokkapps/changelog-generator-demo/commits/f13a4ffe6d6adb753cb714d79a77c4dbd090c7dc))


### Chore

* **eslint:** change rules for comfortable work ([bafc9e3](https://github.com/mokkapps/changelog-generator-demo/commits/bafc9e34561f618fb5937d4372d111d7ab241728))
* **inner:** fixed bug in react-native-web: web crash because ViewPropTypes hasn't been imported ([52717bf](https://github.com/mokkapps/changelog-generator-demo/commits/52717bfa64234133b5ee6db25e3528dde1a734f0))

### [0.0.2](https://github.com/mokkapps/changelog-generator-demo/compare/v0.0.1...v0.0.2) (2021-02-11)


### Chore

* **git:** fix for husky (install 4 version) ([c87c9d3](https://github.com/mokkapps/changelog-generator-demo/commits/c87c9d3e29459c2c1e2147cd6d4227c0d4be1411))
* **git:** release patch version before git push ([5cb02ce](https://github.com/mokkapps/changelog-generator-demo/commits/5cb02ce376ea76731960446a3a88b53ea4927c07))

### 0.0.1 (2021-02-11)


### Features

* **components:** add Loading control e90c684
* **gql:** add apollo (client for graphQL) 6affe26
* **gql, albums, posts:** add gql queries for albums and posts by fixed user \ render this lists 71a45b7
* **navigation:** add navigation for main screens (Feed, FAQ, Profile) 6636e4c
* **style:** add separate file for common colors and styles dd2c1ae


### Refactoring

* **start:** move App.tsx to src 2d31741


### Chore

* **eslint:** add eslint support 5b646ca
* **eslint:** change trailing spaces and max-len for comfortable work 311d87b
* **git:** autoversion hook af5e7f5
