// ==UserScript==
// @name         Instagram Large Images
// @namespace    https://github.com/vekvoid/
// @version      1.0.0
// @author       Vekvoid
// @match        *://www.instagram.com/*
// @grant none
// ==/UserScript==

(function() {
  'use strict';
  
  const sizesCustom = '9000px';
  const sizesAttributeMutated = (mutation) => mutation.type == 'attributes' && mutation.attributeName == 'sizes';
  const sizesNeedsDesiredValue = (mutation) => mutation.target.getAttribute('sizes') !== sizesCustom;

  const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
      if (sizesAttributeMutated(mutation) && sizesNeedsDesiredValue(mutation)) {
        mutation.target.setAttribute('sizes', sizesCustom);
      }
    }
  };

  const targetNode = document.getElementsByTagName('body')[0];
  const config = { attributes: true, childList: true, subtree: true };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
})();
