// This library works with a parent / children pair, the parent will instanciate global settings
// while the chidren will instanciate it's own. This documentation is only for the DOM controller,
// if you wish to learn more on the public lightbox API, read the lightbox model documentation.

//---------
// Parent attributes
//---

// `data-lightbox-parent` (required).
// This attribute will define de scope of it's childrens, a page can have many scopes containing different childrens. 
// When you declare a parent, the script will look inside this element for any data-lightbox-child attributes.
/* <div data-lightbox-parent></div> */

// `data-lightbox-nav` (optional defaults to false)
// This will enable the navigation arrows for the lightbox.
/* <div data-lightbox-nav></div> */

// `data-lightbox-animate` (optional defaults to false)
//This will enable an elegant swipe and fade out animation between images.
/* <div data-lightbox-animate></div> */

// `data-lightbox-infinite` (optional defaults to false)
// This will enable infinite navigation, when the user navigates to the next image while currently 
// displaying the last image, it will bring him back to the beginning.
/* <div data-lightbox-infinite></div> */

// `data-lightbox-paginate` (optional defaults to false)
// Display a "image of lenght" pagination in the ligthbox, this updates automatically.
/* <div data-lightbox-paginate></div> */

// `data-lightbox-paginatelabel="STRING"` (optional defaults to "/")
// Change the label between the two numbers of the pagination depending of your locale.
/* <div data-lightbox-paginatelabel=" of "></div> */

//`data-lightbox-gradient` (optional)
// This will display a gradient in front of the image on the bottom of the screen to increase the readability of the titles // and descriptions. If there are no titles, descriptions or captions for the current child, this gradient will automatically fadeOut
/* <div data-lightbox-gradient></div> */

//---------
// Child attributes
//---

// `data-lightbox-child` (required)
// This attribute will define a child inside of a parent scope
/* <div data-lightbox-child></div> */

// `data-lightbox-url="URL"` (required)
// Pass the path of the image you want to display
/* <div data-lightbox-url="/images/cat.jpg"></div> */

// `data-lightbox-title="STRING"` (optional defaults to not display)
// Pass the title you want to display, if none, will not show anything
/* <div data-lightbox-title="Wild cat"></div> */

// `data-lightbox-description="STRING"` (optional defaults to not display)
// Pass the description you want to display, if none, will not show anything
/* <div data-lightbox-description="This cat is dangerous"></div> */

// `data-lightbox-caption="STRING"` (optional defaults to not display)
// Pass the caption you want to display, if none, will not show anything
/* <div data-lightbox-caption="Photo by: Ranh rrr Catehelsby"></div> */

//---------
// Controller
//---


// Grabs the lightbox class from the models folder
const LightboxModel = require('./_models/lightbox-model');

var parent = $('[data-lightbox-parent]');
var child = $('[data-lightbox-child]');

// Check if the passed jquery element has the attribute
var has_attribute = (element) => {
  return (typeof element !== typeof undefined && element !== false && element != "false")
}

// Get all of the element attributes
var getAllAttributes = ($element) => {
  var attrs = {};

  $.each($element[0].attributes, function (index, attribute) {
    attrs[attribute.name] = attribute.value;
  });
  return attrs;
}

// Get all the `--` attribute modifiers
var getModifierAttributes = ($element) => {
  var attrs = getAllAttributes($element);
  var mediaAttrs = [];

  for (let attr in attrs) {
    if (attr.indexOf('--') > -1) mediaAttrs.push(attr)
  }

  return mediaAttrs;
}

// Returns an object containing the breakpoint modifiers
var getModifiers = ($element) => {
  var attrs = getModifierAttributes($element);
  var modifiers = {};

  attrs.forEach(function(attr){

    var keyPair = attr.split('--')[1];
    var modifierType;
    var modifierKey;

    if (keyPair.indexOf('-') > -1){
      modifierKey = keyPair.split('-')[0];
      modifierType = keyPair.split('-')[1];

      if (!modifiers[modifierKey]) modifiers[modifierKey] = {};
      modifiers[modifierKey][modifierType] = $element.attr(attr);

    } else {
      modifiers[keyPair] = {};
      if ( !isNaN($element.attr(attr)) && $element.attr(attr).length) {
        modifiers[keyPair].breakpoint = $element.attr(attr);
      } else {
        throw `devkit error: Your modifier attribute "@${keyPair}" must be a valid integer to be used as a breakpoint. Here is an example that works in your context: dkit-lightbox-@${keyPair}="550".`;
      }

    }

  });

  return modifiers;

}


// Check if the `data-lightbox-nav` attribute is present, returns `BOOL`
var has_nav_enabled = (lb_parent) => {
  var attr = lb_parent.attr('data-lightbox-navigation');
  return has_attribute(attr);
}

// Check if the `data-lightbox-animate` attribute is present, if so return `50px`
var has_navAnim_enabled = (lb_parent) => {
  var attr = lb_parent.attr('data-lightbox-animate');
  return (has_attribute(attr)) ? 50 : 0;
}

// Check if the `data-lightbox-infinite` attribute is present, returns `BOOL`
var has_infinite_enabled = (lb_parent) => {
  var attr = lb_parent.attr('data-lightbox-infinite');
  return has_attribute(attr);
}

// Check if the `data-lightbox-gradient` attribute is present, returns `BOOL`
var has_gradient_enabled = (lb_parent) => {
  var attr = lb_parent.attr('data-lightbox-gradient');
  return has_attribute(attr);
}

// Check if the `data-lightbox-paginate` attribute is present, returns `BOOL`
var has_paginate_enabled = (lb_parent) => {
  var attr = lb_parent.attr('data-lightbox-paginate');
  return has_attribute(attr);
}

var has_descriptionsHover_enabled = (lb_parent) => {
  var attr = lb_parent.attr('data-lightbox-descriptionsonhover');
  return has_attribute(attr);
}

var has_descriptions_enabled = (lb_parent) => {
  var attr = lb_parent.attr('data-lightbox-descriptions');
  return has_attribute(attr);
}

var has_mobileDescriptions_enabled = (lb_parent) => {
  var attr = lb_parent.attr('data-lightbox-mobileDescriptions');
  return has_attribute(attr);
}

// Check if the `data-lightbox-verticalpadding` attribute is present, returns `INT`
var get_vertical_padding = (lb_parent) => {
  var attr = lb_parent.attr('data-lightbox-verticalpadding');
  return (has_attribute(attr)) ? parseInt(attr) : 0;
}

// Check if the `data-lightbox-horizontalpadding` attribute is present, returns `INT`
var get_horizontal_padding = (lb_parent) => {
  var attr = lb_parent.attr('data-lightbox-horizontalpadding');
  return (has_attribute(attr)) ? parseInt(attr) : 0;
}

// Check if the `data-lightbox-paginatelabel` attribute is present, if so return `STRING`, if not, return `/`
var get_paginate_label = (lb_parent) => {
  var attr = lb_parent.attr('data-lightbox-paginatelabel');

  if (has_attribute(attr)){
    return attr;
  } else {
    return false
  }
}

//Creates the lightbox object with the parent settings, also pass the array of objects
//containing the images information for this scope.
var build_lightbox = (lb_parent, images) => {
  var lbConf = {};
  lbConf.modifiers = getModifiers(lb_parent);
  lbConf.images = images

  if (has_nav_enabled(lb_parent)) 
    lbConf.navigation = true;

  if (has_navAnim_enabled(lb_parent)) 
    lbConf.swipeDistance = 50;

  if (has_infinite_enabled(lb_parent)) 
    lbConf.infinite = true;

  if (has_gradient_enabled(lb_parent)) 
    lbConf.gradient = true;

  if (has_paginate_enabled(lb_parent)){
    lbConf.paginate = true;
  } else {
    lbConf.paginate = false;
  }

  if (get_paginate_label(lb_parent))
    lbConf.paginateLabel = get_paginate_label(lb_parent);

  if (get_vertical_padding(lb_parent))
    lbConf.verticalPadding = get_vertical_padding(lb_parent);

  if (get_horizontal_padding(lb_parent))
    lbConf.horizontalPadding = get_horizontal_padding(lb_parent);

  if (has_descriptionsHover_enabled(lb_parent)){
    lbConf.descriptionsOnHover = true;
  } else {
    lbConf.descriptionsOnHover = false;
  }

  if (has_descriptions_enabled(lb_parent)){
    lbConf.descriptions = true;
  } else {
    lbConf.descriptions = false;
  }

  if (has_mobileDescriptions_enabled(lb_parent)){
    lbConf.mobileDescriptions = true;
  } else {
    lbConf.mobileDescriptions = false;
  }


  new LightboxModel(lbConf).make();
}

// Find all the childrens inside the parent scope and returns an array of objects with the child attributes.
var get_all_images = (lb_parent) => {
  var images = [];
  lb_parent.find(child).each(function(){
    images.push({
      url: $(this).attr('data-lightbox-url'),
      active: ($(this).hasClass('data-lightbox-selected')),
      title: $(this).attr('data-lightbox-title'),
      description: $(this).attr('data-lightbox-description'),
      caption: $(this).attr('data-lightbox-caption'),
      type: 'image'
    });
    $(this).removeClass('data-lightbox-selected');
  });
  return images;
}

//---------
// Public functions
//---
// Waits for a click event on a child element, instanciates the lightbox.

var init = () => {
  child.on('click', function(event){
    var lb_parent = $(this).closest(parent);
    var lb_child = $(this);
    getModifiers(lb_parent);
    lb_child.addClass('data-lightbox-selected');
    var images = get_all_images(lb_parent);
    build_lightbox(lb_parent, images);
  });
}
  
	
module.exports = { init }

