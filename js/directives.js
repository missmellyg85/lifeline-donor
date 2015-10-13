'use strict';

angular.module('myApp.directives', [])
  .directive('responsiveSlides', function() {
      return {
          restrict: 'A',
          link: function(scope, element, attrs) {
              angular.element(".rslides").responsiveSlides({
                speed: 1500, // Integer: Speed of the transition, in milliseconds
                timeout: 5000, // Integer: Time between slide transitions, in milliseconds
                maxwidth: "500",           // Integer: Max-width of the slideshow, in pixels
            });
          }
      };
  })
  .directive('addFooter', function() {
    return {
      restrict: 'A',
      link: function(scope,element,attrs) {
        element.append('<div class="footer well">Copyright &#169; 2015 - The content of this website is copyright of Lifeline Pregnancy Help Clinic and may not be copied without permission. </div>');
      }
    }
  })
  .directive('supporterBody', function() {
    return {
      restrict: 'A',
      link: function(scope,element,attrs) {
        var bodytag = document.getElementsByTagName("body")[0];
        bodytag.id = "supporter";
      }
    }
  })
  .directive('navigation', function() {
    return {
      templateUrl: 'partials/supporter/supporter-nav.html?101215'
    }
  })
;
