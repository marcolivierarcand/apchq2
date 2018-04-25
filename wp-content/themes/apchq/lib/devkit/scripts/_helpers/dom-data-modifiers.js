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

// __getActiveModifierValues(`OBJECT ARRAY`)__  
// * `modifier` is the name of the attribute to check (ex: 'verticalPadding')
// * `self` is used to pass the `this` scope to the function since it might be used with an on-event handler
//
// Checks in all the breakpoints, if window width is smaller than one of the breakpoints, 
// it will check in all the modifier array for the correct breakpoint values to return.
//
// returns `OBJECT`:
// * `.breakpoint` Window width at which this attribute has new rules
// * `.value` The new value for this attribute
// * `.attribute` The attribute name as stored in the modifiers object
var getActiveModifierValues = (modifierValues) => {
  var windowWidth = $(window).width();
  var activeBreakpoints = [];
  var breakpoints = modifierValues.map(mv => mv.breakpoint);
  var active;

  if (windowWidth <= Math.max.apply(null, breakpoints)){
    active = Math.min.apply(null, breakpoints.filter(bp => bp >= windowWidth));
    return modifierValues.filter(mv => mv.breakpoint == active)[0];
  } 

  return false; 
}

// __getModifierValues(`STRING`, `OBJECT`)__  
// * `modifier` is the name of the attribute to check (ex: 'verticalPadding')
// * `self` is used to pass the `this` scope to the function since it might be used with an on-event handler
//
// Check if there is an active modifier for the given attribute at this given window width, if so returns the modifier objects  
//
// returns `OBJECT`:
// * `.breakpoint` Window width at which this attribute has new rules
// * `.value` The new value for this attribute
// * `.attribute` The attribute name as stored in the modifiers object
var getModifierValues = (modifiers, modifier) => {
  var modifierValues = [];

  for (let key in modifiers){
    modifierValues.push(modifiers[key]);
  }

  modifierValues = modifierValues.filter(obj => obj[modifier.toLowerCase()])
  modifierValues = modifierValues.map(obj => {
    return {
      attribute: modifier,
      breakpoint: obj.breakpoint,
      value: obj[modifier.toLowerCase()]
    } 
  });

  return getActiveModifierValues(modifierValues);

}

// __getRestriction(`STRING`)__  
// Returns the current active restriction value
var getRestriction = (modifiers, modifier) => {
  var restriction = getModifierValues(modifiers, modifier);

  if (restriction.value == "true" || restriction.value == true) 
    return true;

  else if (restriction.value == "false" || restriction.value == false) 
    return false;

  else 
    return restriction.value;
}



module.exports = {
  getAllAttributes, 
  getModifierAttributes, 
  getModifiers, 
  getActiveModifierValues, 
  getModifierValues, 
  getRestriction
}