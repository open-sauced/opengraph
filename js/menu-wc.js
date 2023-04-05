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
                                <a href="modules/SocialCardModule.html" data-type="entity-link" >SocialCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SocialCardModule-92d98c6767ae4622b42f4589427d8815d889f3b1b7c3d163bf16f4b1fdcced01d0b31fd9099a9015e7f28f702a917b7026f9eaee44859b3804aa308a7d1e1c38"' : 'data-target="#xs-controllers-links-module-SocialCardModule-92d98c6767ae4622b42f4589427d8815d889f3b1b7c3d163bf16f4b1fdcced01d0b31fd9099a9015e7f28f702a917b7026f9eaee44859b3804aa308a7d1e1c38"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SocialCardModule-92d98c6767ae4622b42f4589427d8815d889f3b1b7c3d163bf16f4b1fdcced01d0b31fd9099a9015e7f28f702a917b7026f9eaee44859b3804aa308a7d1e1c38"' :
                                            'id="xs-controllers-links-module-SocialCardModule-92d98c6767ae4622b42f4589427d8815d889f3b1b7c3d163bf16f4b1fdcced01d0b31fd9099a9015e7f28f702a917b7026f9eaee44859b3804aa308a7d1e1c38"' }>
                                            <li class="link">
                                                <a href="controllers/SocialCardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocialCardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SocialCardModule-92d98c6767ae4622b42f4589427d8815d889f3b1b7c3d163bf16f4b1fdcced01d0b31fd9099a9015e7f28f702a917b7026f9eaee44859b3804aa308a7d1e1c38"' : 'data-target="#xs-injectables-links-module-SocialCardModule-92d98c6767ae4622b42f4589427d8815d889f3b1b7c3d163bf16f4b1fdcced01d0b31fd9099a9015e7f28f702a917b7026f9eaee44859b3804aa308a7d1e1c38"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SocialCardModule-92d98c6767ae4622b42f4589427d8815d889f3b1b7c3d163bf16f4b1fdcced01d0b31fd9099a9015e7f28f702a917b7026f9eaee44859b3804aa308a7d1e1c38"' :
                                        'id="xs-injectables-links-module-SocialCardModule-92d98c6767ae4622b42f4589427d8815d889f3b1b7c3d163bf16f4b1fdcced01d0b31fd9099a9015e7f28f702a917b7026f9eaee44859b3804aa308a7d1e1c38"' }>
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