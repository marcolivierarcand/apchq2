import * as Dropdown from "./dkit-dropdown.js";
import * as Checkbox from "./dkit-checkbox.js";
import * as Lightbox from "./dkit-lightbox.js";
import * as Height from "./dkit-fix-height.js";
import * as Ratio from "./dkit-fix-img-ratio.js";
import * as Lazy from "./dkit-fix-img-lazy.js";
import * as Inner from "./dkit-fix-inner.js";
import "../../vendor/slick/slick.min.js";



$(window).ready(function(){
  Height.init();
  Lightbox.init();
  Dropdown.init();
  Checkbox.init();
  Inner.init();
})


// Carousel Slick section Témoignage
$('.slick-carousel').slick({

  slidesToShow: 1,
  prevArrow: $('.prev'),
  nextArrow: $('.next'),
});


Ratio.init();
Lazy.init();
