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
                                        'data-target="#injectables-links-module-GithubModule-4eefe9a3d0ed855e1546625c8ce80c7d044e119fd30086eff5280300430d469d91ecce8352bf025a9e4c2ccc888095da504f286ec73ebc45dfc69e096a68ab9f"' : 'data-target="#xs-injectables-links-module-GithubModule-4eefe9a3d0ed855e1546625c8ce80c7d044e119fd30086eff5280300430d469d91ecce8352bf025a9e4c2ccc888095da504f286ec73ebc45dfc69e096a68ab9f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GithubModule-4eefe9a3d0ed855e1546625c8ce80c7d044e119fd30086eff5280300430d469d91ecce8352bf025a9e4c2ccc888095da504f286ec73ebc45dfc69e096a68ab9f"' :
                                        'id="xs-injectables-links-module-GithubModule-4eefe9a3d0ed855e1546625c8ce80c7d044e119fd30086eff5280300430d469d91ecce8352bf025a9e4c2ccc888095da504f286ec73ebc45dfc69e096a68ab9f"' }>
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
                                <a href="modules/HighlightCardModule.html" data-type="entity-link" >HighlightCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-HighlightCardModule-681e3691f75fc9c4426877615d7cdae87f179b296db6813d0ad00a23628cdaf743df55a37d607227adfffbe38c8ac5e5d1c7aaf40607c1a81be606dcaec40df3"' : 'data-target="#xs-controllers-links-module-HighlightCardModule-681e3691f75fc9c4426877615d7cdae87f179b296db6813d0ad00a23628cdaf743df55a37d607227adfffbe38c8ac5e5d1c7aaf40607c1a81be606dcaec40df3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HighlightCardModule-681e3691f75fc9c4426877615d7cdae87f179b296db6813d0ad00a23628cdaf743df55a37d607227adfffbe38c8ac5e5d1c7aaf40607c1a81be606dcaec40df3"' :
                                            'id="xs-controllers-links-module-HighlightCardModule-681e3691f75fc9c4426877615d7cdae87f179b296db6813d0ad00a23628cdaf743df55a37d607227adfffbe38c8ac5e5d1c7aaf40607c1a81be606dcaec40df3"' }>
                                            <li class="link">
                                                <a href="controllers/HighlightCardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HighlightCardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HighlightCardModule-681e3691f75fc9c4426877615d7cdae87f179b296db6813d0ad00a23628cdaf743df55a37d607227adfffbe38c8ac5e5d1c7aaf40607c1a81be606dcaec40df3"' : 'data-target="#xs-injectables-links-module-HighlightCardModule-681e3691f75fc9c4426877615d7cdae87f179b296db6813d0ad00a23628cdaf743df55a37d607227adfffbe38c8ac5e5d1c7aaf40607c1a81be606dcaec40df3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HighlightCardModule-681e3691f75fc9c4426877615d7cdae87f179b296db6813d0ad00a23628cdaf743df55a37d607227adfffbe38c8ac5e5d1c7aaf40607c1a81be606dcaec40df3"' :
                                        'id="xs-injectables-links-module-HighlightCardModule-681e3691f75fc9c4426877615d7cdae87f179b296db6813d0ad00a23628cdaf743df55a37d607227adfffbe38c8ac5e5d1c7aaf40607c1a81be606dcaec40df3"' }>
                                        <li class="link">
                                            <a href="injectables/HighlightCardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HighlightCardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InsightCardModule.html" data-type="entity-link" >InsightCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-InsightCardModule-6af7a7484269e9343893ede092e3638afcf4e5fcac52454cd6e103145a9b777fdb19f5c9843a051a5775713068c07c160463832f22fd7831dd50e41d7b72867e"' : 'data-target="#xs-controllers-links-module-InsightCardModule-6af7a7484269e9343893ede092e3638afcf4e5fcac52454cd6e103145a9b777fdb19f5c9843a051a5775713068c07c160463832f22fd7831dd50e41d7b72867e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InsightCardModule-6af7a7484269e9343893ede092e3638afcf4e5fcac52454cd6e103145a9b777fdb19f5c9843a051a5775713068c07c160463832f22fd7831dd50e41d7b72867e"' :
                                            'id="xs-controllers-links-module-InsightCardModule-6af7a7484269e9343893ede092e3638afcf4e5fcac52454cd6e103145a9b777fdb19f5c9843a051a5775713068c07c160463832f22fd7831dd50e41d7b72867e"' }>
                                            <li class="link">
                                                <a href="controllers/InsightCardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InsightCardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-InsightCardModule-6af7a7484269e9343893ede092e3638afcf4e5fcac52454cd6e103145a9b777fdb19f5c9843a051a5775713068c07c160463832f22fd7831dd50e41d7b72867e"' : 'data-target="#xs-injectables-links-module-InsightCardModule-6af7a7484269e9343893ede092e3638afcf4e5fcac52454cd6e103145a9b777fdb19f5c9843a051a5775713068c07c160463832f22fd7831dd50e41d7b72867e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InsightCardModule-6af7a7484269e9343893ede092e3638afcf4e5fcac52454cd6e103145a9b777fdb19f5c9843a051a5775713068c07c160463832f22fd7831dd50e41d7b72867e"' :
                                        'id="xs-injectables-links-module-InsightCardModule-6af7a7484269e9343893ede092e3638afcf4e5fcac52454cd6e103145a9b777fdb19f5c9843a051a5775713068c07c160463832f22fd7831dd50e41d7b72867e"' }>
                                        <li class="link">
                                            <a href="injectables/InsightCardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InsightCardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/S3FileStorageModule.html" data-type="entity-link" >S3FileStorageModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-S3FileStorageModule-8ab3ec218ea62a220d301b949354f1fa671a8cd5f2ff4fe53a4286f7e54972b929531d4b28b87f2feea058d7db4ae2e1630898668377508fdf9c852958e20f1b"' : 'data-target="#xs-injectables-links-module-S3FileStorageModule-8ab3ec218ea62a220d301b949354f1fa671a8cd5f2ff4fe53a4286f7e54972b929531d4b28b87f2feea058d7db4ae2e1630898668377508fdf9c852958e20f1b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-S3FileStorageModule-8ab3ec218ea62a220d301b949354f1fa671a8cd5f2ff4fe53a4286f7e54972b929531d4b28b87f2feea058d7db4ae2e1630898668377508fdf9c852958e20f1b"' :
                                        'id="xs-injectables-links-module-S3FileStorageModule-8ab3ec218ea62a220d301b949354f1fa671a8cd5f2ff4fe53a4286f7e54972b929531d4b28b87f2feea058d7db4ae2e1630898668377508fdf9c852958e20f1b"' }>
                                        <li class="link">
                                            <a href="injectables/S3FileStorageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >S3FileStorageService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserCardModule.html" data-type="entity-link" >UserCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserCardModule-ebf8b2351ef77458558e55a22347474495de5c8093ab5e325f21a243690778fd553118240fc1aaab8c980500b87f132cb11e74d7f302ea4d5859ff75774bc261"' : 'data-target="#xs-controllers-links-module-UserCardModule-ebf8b2351ef77458558e55a22347474495de5c8093ab5e325f21a243690778fd553118240fc1aaab8c980500b87f132cb11e74d7f302ea4d5859ff75774bc261"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserCardModule-ebf8b2351ef77458558e55a22347474495de5c8093ab5e325f21a243690778fd553118240fc1aaab8c980500b87f132cb11e74d7f302ea4d5859ff75774bc261"' :
                                            'id="xs-controllers-links-module-UserCardModule-ebf8b2351ef77458558e55a22347474495de5c8093ab5e325f21a243690778fd553118240fc1aaab8c980500b87f132cb11e74d7f302ea4d5859ff75774bc261"' }>
                                            <li class="link">
                                                <a href="controllers/UserCardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserCardModule-ebf8b2351ef77458558e55a22347474495de5c8093ab5e325f21a243690778fd553118240fc1aaab8c980500b87f132cb11e74d7f302ea4d5859ff75774bc261"' : 'data-target="#xs-injectables-links-module-UserCardModule-ebf8b2351ef77458558e55a22347474495de5c8093ab5e325f21a243690778fd553118240fc1aaab8c980500b87f132cb11e74d7f302ea4d5859ff75774bc261"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserCardModule-ebf8b2351ef77458558e55a22347474495de5c8093ab5e325f21a243690778fd553118240fc1aaab8c980500b87f132cb11e74d7f302ea4d5859ff75774bc261"' :
                                        'id="xs-injectables-links-module-UserCardModule-ebf8b2351ef77458558e55a22347474495de5c8093ab5e325f21a243690778fd553118240fc1aaab8c980500b87f132cb11e74d7f302ea4d5859ff75774bc261"' }>
                                        <li class="link">
                                            <a href="injectables/UserCardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DbInsight.html" data-type="entity-link" >DbInsight</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DbReaction.html" data-type="entity-link" >DbReaction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DbRepo.html" data-type="entity-link" >DbRepo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DbUserHighlight.html" data-type="entity-link" >DbUserHighlight</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DbUserInsightRepo.html" data-type="entity-link" >DbUserInsightRepo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HighlightCardData.html" data-type="entity-link" >HighlightCardData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InsightCardData.html" data-type="entity-link" >InsightCardData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequiresUpdateMeta.html" data-type="entity-link" >RequiresUpdateMeta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserCardData.html" data-type="entity-link" >UserCardData</a>
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