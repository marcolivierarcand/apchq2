const _D = require('./_helpers/dom-data-modifiers.js'); 
const _D_fixHeight = require('./dkit-fix-height.js');
const _D_fixRatio = require('./dkit-fix-img-ratio.js');
const _D_fixInner = require('./dkit-fix-inner.js');
const $lazy = $('[data-set-img-lazy]');

var addLoader = (target) => {
  target.prepend(`
    <div class="dkit-lazy" dkit-grid="col-12">
      <div class="dkit-loader c-gray"></div>
    </div>
  `);
}

var removeLoader = (target, cb) => {
  target.find('.dkit-lazy').fadeOut(function(){
    $(this).remove();
    cb();
  });
}

var resizeLoader = (target) => {
  var attr = $(this).attr('data-fix-img-ratio');
  var modifiers = _D.getModifiers(target);
  if (typeof attr !== typeof undefined && attr !== false) {
    return false;
  }

  var ratio = target.attr('data-fix-img-ratio');
  if (_D.getRestriction(modifiers, 'ratio')){
    ratio = _D.getRestriction(modifiers, 'ratio');
  }

  var ratioW = parseInt(ratio.split(':')[0]);
  var ratioH = parseInt(ratio.split(':')[1]);
  var width = target.width();
  var height = Math.round((width * ratioH) / ratioW);

  target.find('.dkit-lazy').css({
    height: Math.round(height)
  });

  _D_fixHeight.run();
	_D_fixInner.run();
  var loader = target.find('.dkit-loader');
  var loaderH = loader.height();

  loader.css({
    'margin-top': (height - loaderH) /2
  });
}

var isInViewport = (target) => {
  var scroll = $(window).scrollTop();
  var wHeight = $(window).height();
  var viewportBottom = scroll + wHeight;
  var elemTop = target.offset().top;
  var elemHeight = target.outerHeight();
  var elemBottom = elemTop + elemHeight;
  return (elemTop <= viewportBottom)
}

var appendTrueImg = (target) => {
  target.addClass('dkit-is-marked');
  var imgUrl = target.attr('data-set-img-url');
  target.prepend(`<img src="${imgUrl}"/>`);
  target.find('img').css({display: 'none'});
  target.find('img').on( 'load', function(){ 
    target.addClass('dkit-is-loaded');
    removeLoader(target, function(){
      target.find('img').fadeIn();
      target.css({height:''})
      _D_fixRatio.crop(target.find('img'));
    });

  });	
}

var run = (cb) => {
  $lazy.each(function(){ 
    addLoader($(this));
    resizeLoader($(this));
    if(isInViewport($(this))){
      appendTrueImg($(this))
    };
  });
  cb();
}

var watchScroll = () => {
  $lazy.each(function(){
    if(isInViewport($(this))){
      if (!$(this).hasClass('dkit-is-marked')){
        appendTrueImg($(this))
      }

    };
  });
}


 var init = () =>{
   $(window).on('load', function(){
     run(function(){
      $(window).on('scroll', function(){
        watchScroll();
      })
     });
   });
 } 
  
   
module.exports = {
  init
}
