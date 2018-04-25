var _D = require('./_helpers/dom-data-modifiers.js'); 
let domloaded = false;

var applyCss = (target) => {
  var ratio = target.parent().attr('data-fix-img-ratio');
  var modifiers = _D.getModifiers(target.parent());
  var hasRestrictions = _D.getModifierValues(modifiers, 'ratio');

  if (hasRestrictions){ 
    if (_D.getRestriction(modifiers, 'stop')){
      target.parent().css({"position": "", "padding-bottom": "", "display": "", "overflow": "" })
      target.css({"position": "", "width": ""});
      return false;
    }
    if (_D.getRestriction(modifiers, 'ratio')){
      ratio = _D.getRestriction(modifiers, 'ratio');
    }
  }

  var ratioW = parseInt(ratio.split(':')[0]);
  var ratioH = parseInt(ratio.split(':')[1]);

  var paddingRatio = (ratioH / ratioW) * 100;

  target.parent().css({
    "position": "relative",
    "padding-bottom": Math.round(paddingRatio) + "%",
    "display": "block",
    "overflow": "hidden",
  })

  target.css({
    "position": "absolute",
    "width": "100%"
  });

};

var adjustHeight = (target) => {

  applyCss(target);
  target.css({ "margin-top": "", "margin-left": "", "min-width": "", "min-height": "" });


  var minW, minH, mTop, mLeft;

  var childH = target.height();
  var childW = target.width();
  var parentH = target.parent().outerHeight();
  var parentW = target.parent().outerWidth();

  if (childH > parentH && childW >= parentH){
    mTop = -Math.abs((parentH - childH)/2);
  }

  if (childH < parentH && childW >= parentW){
    minH = parentH * childW / parentW;
    minW = minH * childW / childH;
    mLeft = -Math.abs((minW - parentW) /2);
  }

  target.css({ 
    "margin-top": Math.round(mTop), 
    "margin-left": Math.round(mLeft), 
    "min-width": Math.round(minW), 
    "min-height": Math.round(minH) 
  });

};

var cropAll = () => {
  $('[data-fix-img-ratio]').each(function(){

    var attr = $(this).attr('data-set-img-lazy');

    if (typeof attr !== typeof undefined && attr !== false) {
      if (!$(this).hasClass('dkit-is-loaded'))
        return true;
    }

    if (!domloaded) 
      $(this).find('img').on( 'load', function(){ 
        adjustHeight($(this)) 
      });	

    else 
      adjustHeight( $(this).find('img') )

  });

  domloaded = true;

};

var crop = (target) => adjustHeight(target);


var init = () => {
  cropAll(); 
  $(window).on('resize load', cropAll);
};

module.exports = {
  init,
  crop,
}