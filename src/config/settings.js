/*
| -----------------------------------------------------------------------------
| Unified InstantSearch E-commerce by Algolia             http://alg.li/unified
| -----------------------------------------------------------------------------
|
| Welcome to the Unified InstantSearch E-commerce configuration file.
| This is where you can customize Unified InstantSearch E-commerce specifically
| for your project.
|
| Unless mandatory, if you don't use a setting, feel free to comment it out.
|
| View the full documentation at http://alg.li/unified/doc
|
*/

import React from 'preact/compat';

import './Hit.scss';
/*
|-------------------------------------------------------------------------------
| Base configuration                           http://alg.li/unified/base-config
|-------------------------------------------------------------------------------
|
| Here is where you define your base configuration.
|
| This is the starting point of your project. These options are necessary to
| integrate Unified InstantSearch E-commerce in your website, and wire it with
| your Algolia index.
|
*/

var algoliaData = {
  'hitComponent': ({ hit }) => {
    console.log(hit);

    const img = hit.image_groups.find(imageGroup => imageGroup.view_type === 'large').images[0];
    const price = hit.price[algoliaData.currencyCode];
    return `
      <article class="uni-Hit">
      <a href="#"  class="uni-Hit-inner">
        <div class="uni-Hit-image">
            <img  src="${img.dis_base_link}" alt="${img.alt}" loading="lazy"> 
            </div>
        
       <div class="uni-Hit-Body">
         <header class="uni-Hit-header">
           <h2 class="uni-Hit-category">Category</h2>
           <h1 class="uni-Hit-title">${hit.name}</h1>
         </header> 
         <p class="uni-Hit-description">${hit.description}</p>
         <footer>
          <span class="uni-Hit-Currency">${algoliaData.currencySymbol} </span><strong>${price}</strong>
         </footer>
       </div>
      
      </a>
      </article>
    `;
  },
  'enable': true,
  'applicationID': 'SJLFQYQA2U',
  'searchApiKey': '2e88068356ba17d0008787699965a189',
  'locale': 'en_US',
  'currencyCode': 'USD',
  'currencySymbol': '\x24',
  'productsIndex': 'algolia01_tech_prtnr_na08_dw__RefArch__products__en_US',
  'categoriesIndex': 'algolia01_tech_prtnr_na08_dw__RefArch__categories__en_US',
  'quickViewUrlBase': '/on/demandware.store/Sites-RefArch-Site/en_US/Product-ShowQuickView',
  'strings': {
    'moreResults': 'More Results',
    'noResults': 'No results',
    'result': 'result',
    'results': 'results',
    'bestMetches': 'Best Matches',
    'priceAsc': 'Price (asc)',
    'priceDesc': 'Price (desc)',
    'reset': 'Reset',
    'brandPanelTitle': 'Brand',
    'sizePanelTitle': 'Size Chart',
    'colorPanelTitle': 'Colors',
    'pricePanelTitle': 'Price',
    'categoryPanelTitle': 'Category',
    'products': 'Products',
    'categories': 'Categories',
    'priceFilter': {
      'separator': 'to',
      'submit': 'Go',
    },
    'newArrivals': 'New Arrivals',
  },
  'noImages': {
    'large': '/on/demandware.static/Sites-RefArch-Site/-/default/dwc258fdb5/images/noimagelarge.png',
    'medium': '/on/demandware.static/Sites-RefArch-Site/-/default/dwd7fc9b54/images/noimagemedium.png',
    'small': '/on/demandware.static/Sites-RefArch-Site/-/default/dwd0542312/images/noimagesmall.png',
  },
};

let window = window || {};
window.algoliaData = algoliaData;

export const inputContainer = '#unified-ui';
export const inputContent = 'Search for products';
export const keyboardShortcuts = ['/'];
export const appId = window.algoliaData.applicationID;
export const searchApiKey = window.algoliaData.searchApiKey;
export const hitComponent = window.algoliaData.hitComponent || (() => null);
export const index = {
  indexName: window.algoliaData.productsIndex,
  searchParameters: {
    analytics: true,
    clickAnalytics: true,
    hitsPerPage: 18,
    attributesToSnippet: ['short_description:25'],
  },
};

/*
|-------------------------------------------------------------------------------
| Insights, Analytics and Personalization         http://alg.li/unified/insights
|-------------------------------------------------------------------------------
|
| Here is where you define your Analytics and Personalization settings.
|
| We provide you with ways to measure how your search is doing, and make search
| results more relevant for individual users by personalizing their experience
| based on a unique profile built over time.
|
*/

export const googleAnalytics = false;
// export const setUserToken = (setToken) => {
//   setToken(/* The current user's `userToken` */);
// };

/*
|-------------------------------------------------------------------------------
| Sort-by                                          http://alg.li/unified/sort-by
|-------------------------------------------------------------------------------
|
| Here is where you define your different sort-by options.
|
| Algolia sorts search results by relevance, using its ranking formula.
| Yet, you can provide several sorting options based on a specific attribute
| (e.g., descending price) using replica indices.
|
*/

export const sorts = [
  {
    label: 'Price ascending',
    value: window.algoliaData.productsIndex + '__price_USD_asc',
  },
  {
    label: 'Price descending',
    value: window.algoliaData.productsIndex + '__price_USD_desc',
  },
];

/*
|-------------------------------------------------------------------------------
| Refinements                                  http://alg.li/unified/refinements
|-------------------------------------------------------------------------------
|
| Here is where you define your different refinement options.
|
| We provide you with different types of refinement options to let users narrow
| down their searches based on a specific attribute.
|
| Some refinement types require you to follow a specific record schema.
|
*/

export const refinements = [
  {
    type: 'hierarchical',
    header: 'Categories',
    label: 'Category',
    options: {
      attributes: [
        '__primary_category.0',
        '__primary_category.1',
        '__primary_category.2',
      ],
      limit: 6,
      searchable: true,
      showMore: true,
    },
  },
  {
    type: 'list',
    header: 'Brands',
    label: 'Brand',
    options: {
      attribute: 'brand',
      searchable: true,
      showMore: true,
      limit: 6,
      showMoreLimit: 20,
      translations: {
        showMore: (expanded) =>
          expanded ? '- View fewer brands' : '+ View more brands',
      },
    },
  },
  {
    type: 'list',
    header: 'Sizes',
    label: 'Sizes',
    options: {
      attribute: 'size',
      searchable: true,
      showMore: true,
      limit: 6,
      showMoreLimit: 20,
      translations: {
        showMore: (expanded) =>
          expanded ? '- View fewer sizes' : '+ View more sizes',
      },
    },
  },
  {
    type: 'slider',
    header: 'Price',
    label: 'Price',
    options: {
      attribute: `price.${algoliaData.currencyCode}`,
      transformValue: (value) => (
        <>
          <span className="uni-Hit-currency">$</span>
          {value}
        </>
      ),
    },
  },
];

/*
|-------------------------------------------------------------------------------
| Query Suggestions                      http://alg.li/unified/query-suggestions
|-------------------------------------------------------------------------------
|
| Here is where you define your Query Suggestions settings.
|
| Query Suggestions let you display a list of relevant queries that your users
| can select from as they type.
|
| This requires a Query Suggestion index that we populate over time with data
| from what your users are searching for. If your index isn't ready yet, feel
| free to comment out this section and re-enable it later.
|
*/

// export const suggestionsIndex = {
//   indexName: 'instant_search_demo_query_suggestions',
//   searchParameters: {
//     hitsPerPage: 6,
//   },
// };

/*
|-------------------------------------------------------------------------------
| Styles                                            http://alg.li/unified/styles
|-------------------------------------------------------------------------------
|
| Here is where you define the styling for your search experience.
|
| If you edit these values while in development mode, you must restart the
| server to see your changes.
|
*/

export const styles = {
  colors: {
    primary: '#000000',
    secondary: '#21243d',
  },
  text: {
    fontFamily: `-apple-system, blinkmacsystemfont, 'Segoe UI', roboto, oxygen,
ubuntu, cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
  },
  baseZIndex: 100,
};
