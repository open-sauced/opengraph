'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@open-sauced/opengraph.opensauced.pizza documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GithubModule.html" data-type="entity-link" >GithubModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-GithubModule-eabd044d176c150c2a0d86fa693ea7b87c912b41a43816e58b50eb70f03a833fe8c2f1962a7dda7c0cdc620ca9cb8bd9e40be926adc77f52d7fd0197edee2245"' : 'data-target="#xs-injectables-links-module-GithubModule-eabd044d176c150c2a0d86fa693ea7b87c912b41a43816e58b50eb70f03a833fe8c2f1962a7dda7c0cdc620ca9cb8bd9e40be926adc77f52d7fd0197edee2245"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GithubModule-eabd044d176c150c2a0d86fa693ea7b87c912b41a43816e58b50eb70f03a833fe8c2f1962a7dda7c0cdc620ca9cb8bd9e40be926adc77f52d7fd0197edee2245"' :
                                        'id="xs-injectables-links-module-GithubModule-eabd044d176c150c2a0d86fa693ea7b87c912b41a43816e58b50eb70f03a833fe8c2f1962a7dda7c0cdc620ca9cb8bd9e40be926adc77f52d7fd0197edee2245"' }>
                                        <li class="link">
                                            <a href="injectables/GithubService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GithubService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-HealthModule-4b73503c69517ba43047a9d63e39bb6a5e944bcce5b8c68be3994aa1abb0bb078c90f82c671a5c155cc031f1a010ff51450da078e646904377016677e4d35f74"' : 'data-target="#xs-controllers-links-module-HealthModule-4b73503c69517ba43047a9d63e39bb6a5e944bcce5b8c68be3994aa1abb0bb078c90f82c671a5c155cc031f1a010ff51450da078e646904377016677e4d35f74"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-4b73503c69517ba43047a9d63e39bb6a5e944bcce5b8c68be3994aa1abb0bb078c90f82c671a5c155cc031f1a010ff51450da078e646904377016677e4d35f74"' :
                                            'id="xs-controllers-links-module-HealthModule-4b73503c69517ba43047a9d63e39bb6a5e944bcce5b8c68be3994aa1abb0bb078c90f82c671a5c155cc031f1a010ff51450da078e646904377016677e4d35f74"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SocialCardModule.html" data-type="entity-link" >SocialCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SocialCardModule-e286c8ce7881819a2c617636c7ce38497ceb22410151f27631eecaddc570426f5fc20d0dc8a1a761c518807da2576e56769e6d6cac5fb39da5b3d308697c4974"' : 'data-target="#xs-controllers-links-module-SocialCardModule-e286c8ce7881819a2c617636c7ce38497ceb22410151f27631eecaddc570426f5fc20d0dc8a1a761c518807da2576e56769e6d6cac5fb39da5b3d308697c4974"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SocialCardModule-e286c8ce7881819a2c617636c7ce38497ceb22410151f27631eecaddc570426f5fc20d0dc8a1a761c518807da2576e56769e6d6cac5fb39da5b3d308697c4974"' :
                                            'id="xs-controllers-links-module-SocialCardModule-e286c8ce7881819a2c617636c7ce38497ceb22410151f27631eecaddc570426f5fc20d0dc8a1a761c518807da2576e56769e6d6cac5fb39da5b3d308697c4974"' }>
                                            <li class="link">
                                                <a href="controllers/SocialCardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocialCardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SocialCardModule-e286c8ce7881819a2c617636c7ce38497ceb22410151f27631eecaddc570426f5fc20d0dc8a1a761c518807da2576e56769e6d6cac5fb39da5b3d308697c4974"' : 'data-target="#xs-injectables-links-module-SocialCardModule-e286c8ce7881819a2c617636c7ce38497ceb22410151f27631eecaddc570426f5fc20d0dc8a1a761c518807da2576e56769e6d6cac5fb39da5b3d308697c4974"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SocialCardModule-e286c8ce7881819a2c617636c7ce38497ceb22410151f27631eecaddc570426f5fc20d0dc8a1a761c518807da2576e56769e6d6cac5fb39da5b3d308697c4974"' :
                                        'id="xs-injectables-links-module-SocialCardModule-e286c8ce7881819a2c617636c7ce38497ceb22410151f27631eecaddc570426f5fc20d0dc8a1a761c518807da2576e56769e6d6cac5fb39da5b3d308697c4974"' }>
                                        <li class="link">
                                            <a href="injectables/SocialCardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocialCardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});