// Model for creating highly effective, fast to load, slick and easy to configure lightbox. Built with ES6, Jquery (and love).
//
//---
class LightboxModel {
  // ## Constructor
  // __config:__ `OBJECT`
  // * `LightboxModel` Will take a few configuration options on creation.
  // * `navigation` Is used to display the navigation arrows or not.
  // * `swipeDistance` Is used to increase or reduce the effect of the swipe animation.
  // * `infinite` Is used to make to bring back the user to the first image after he used 'next' on the last one or 'prev' on the first one.
  // * `gradient` Is used to display a gradient that gives better contrast between the images and descriptions.
  // * `paginate` Is used to display the number of pictures in the scope, and at what index we're at.
  // * `paginateLabel` Is used to change the label used in the pagination ex: "1 `of` 2".
  // * `descriptionsOnHover` if set to false, the descriptions will show up regardless of the cursor position.
  //
  // __modifiers:__ `OBJECT`
  // _modifierKey: { attributeName: attributeValue, ... }, ..._
  // * `breakpoint` The modifier is active when screen is <= this width
  // * `...` Any attribute name as a key-value pair to be effective at the specified breakpoint.
  //
  // __images:__ `OBJECT ARRAY`
  // * `url` Will take the path of the image to display. (__required__)
  // * `active` Will define if this image is the current displayed image (usefull to set first image on load)
  // * `title` Will define a title attribute for the image
  // * `description` Will define a description attribute for the image
  // * `caption` Will define a caption or a credit for the image
  // * `type` Define what kind of media we are using (image / video / gif)
  // * `verticalPadding` Add padding on left and right between the image sides and the viewport
  // * `horizontalPadding` Add padding on top and bottom between the image sides and the viewport
  constructor({
    navigation = false,
    swipeDistance = 0,
    infinite = false,
    gradient = false,
    paginate = true,
    paginateLabel = '/',
    verticalPadding = 0,
    horizontalPadding = 0,
    descriptions = true,
    mobileDescriptions = false,
    descriptionsOnHover = true,
    descBtnLabel = 'infos',
    modifiers = {},
    images = []
  }){

    this.config = {
      navigation: navigation,
      swipeDistance: swipeDistance,
      infinite: infinite,
      gradient: gradient,
      paginate: paginate,
      paginateLabel: paginateLabel,
      verticalPadding: verticalPadding,
      horizontalPadding: horizontalPadding,
      descriptions: descriptions,
      descriptionsOnHover: descriptionsOnHover,
      mobileDescriptions: mobileDescriptions,
      descBtnLabel: descBtnLabel,
      modifiers: modifiers
    };

    this.images = images;
    this.ongoing = false; // <~ Bool flag to prevent queuing animations
    this.self = '.dkitLightbox';
    this.nav = '.dkitLightbox-arrow';
    this.loaderWrap = '.dkitLightbox-loader';
    this.closebtn = '.dkitLightbox-close';
    this.loader = '.dkit-loader';
    this.body = '.dkitLightbox-body';
    this.pagination = '.dkitLightbox-pagination';
    this.mediaWrap = '.dkitLightbox-body_wrap';
    this.foot = '.dkitLightbox-foot';
    this.gradient = '.dkitLightbox-foot_bg';
    this.footBody = '.dkitLightbox-foot_body';
    this.credit = '.dkitLightbox-credit';
    this.title = '.dkitLightbox-title';
    this.description = '.dkitLightbox-description';
    this.mobileFoot = '.dkitLightbox-mobileFoot';
    this.mobileFootBody = '.dkitLightbox-mobileFoot_body';
    this.mobileFootCredit = '.dkitLightbox-mobileFoot_credit';
    this.mobileOverlay = '.dkitLightbox-mobileDescriptions';
    this.mobileOverlayBody = '.dkitLightbox-mobileDescriptions-body';
    this.shadow = '.dkitLightbox-shadow';
    this.currentImgObj = {}; /* Simple store to know which image is active atm */
    this.head = '.dkitLightbox-head';
    this.next = '.dkitLightbox-next';
    this.back = '.dkitLightbox-back';
    this.html = `

    <div class="dkitLightbox" data-grid="col-12">
      <div class="dkitLightbox-loader" data-grid="col-12">
        <div class="dkit-loader hide"></div>
      </div>
      <div class="dkitLightbox-shadow" dkit-grid="col-12"></div>
      <div class="dkitLightbox-mobileDescriptions" data-grid="col-12">
        <div class="dkitLightbox-mobileDescriptions-body" data-grid="col-12"></div>
      </div>
      <div class="dkitLightbox-head" data-grid="col-12">
        <a class="dkitLightbox-close f-r"><span class="icon-close"></span></a>
      </div>
      <div class="dkitLightbox-side_left">
        <a class="dkitLightbox-arrow dkitLightbox-back"><span class="icon-arrow-left"></span></a>
      </div>
      <div class="dkitLightbox-body">
        <div class="dkitLightbox-body_wrap"></div>
      </div>

      <div class="dkitLightbox-side_right">
        <a class="dkitLightbox-arrow dkitLightbox-next"><span class="icon-arrow-right"></span></a>
      </div>

      <div class="dkitLightbox-foot" data-grid="col-12">
        <div class="dkitLightbox-foot_body" data-grid="col-12"></div>
      </div>

      <div class="dkitLightbox-mobileFoot" data-grid="col-12">
        <div class="dkitLightbox-mobileFoot_body" data-grid="col-12"></div>
      </div>
    </div>`;

    }

  // ## PROTOTYPE FUNCTIONS
  //-------------------------------------------------------------------

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
  getActiveModifierValues(modifierValues){
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
  getModifierValues(modifier, self){
    var self = self || this;
    var modifierValues = [];

    for (let key in self.config.modifiers){
      modifierValues.push(self.config.modifiers[key]);
    }

    modifierValues = modifierValues.filter(obj => obj[modifier.toLowerCase()])
    modifierValues = modifierValues.map(obj => {
      return {
        attribute: modifier,
        breakpoint: obj.breakpoint,
        value: obj[modifier.toLowerCase()]
      }
    });

    return this.getActiveModifierValues(modifierValues);

  }

  // __getRestriction(`STRING`)__
  // Returns the current active restriction value
  getRestriction(modifier){
    var restriction = this.getModifierValues(modifier, this);

    if (restriction.value == "true" || restriction.value == true)
      return true;

    else if (restriction.value == "false" || restriction.value == false)
      return false;

    else
      return restriction.value;
  }

  // __render(`CALLBACK`)__
  // Add the lightbox html to the dom in `display:none`, also prevent body scroll with `overflow:"hidden"`
  render(cb){
    $('body').prepend(this.html);
    $('body').css({overflow:"hidden"});
    if (cb) cb();
  }

  // __display(`CALLBACK`)__
  // Fade in the lightbox, need to be called after the `render()` function or if the dom already contains the HTML.
  display(cb){
    $(this.self).fadeIn(function(){
      if (cb) cb();
    });
  }

  // __close(`CALLBACK`)__
  // Close the lightbox and removes the appended HTML from the dom. Sets back the body to `overflow:''` to allow scroll.
  close(){
    $('.dkitLightbox').fadeOut(function(){
      $(document).off('keydown');
      $('.dkitLightbox').remove();
      $('body').css({overflow: ''})
    });
  }

  // __centerLoader()__
  // Dynamically centers the loader on the screen, >= IE8 freindly.
  centerLoader(){
    var wHeight = $(window).height();
    var lHeight = $('.dkitLightbox-loader').height();
    $('.dkitLightbox-loader').css({'margin-top': wHeight/2 - lHeight/2});
  }

  // __centerArrows()__
  // Dynamically centers the navigation on the screen, >= IE8 freindly.
  centerArrows(){
    var wHeight = $(window).height();
    var aHeight = $('.dkitLightbox-arrow').outerHeight();
    $('.dkitLightbox-arrow').css({'margin-top': wHeight/2 - aHeight/2 });
  }

  // __displayGradient()__
  // Display a gradient to increase the image attributes contrast over the image
  displayGradient(){
    if (this.config.gradient)
    $(this.foot).append(`<div class="dkitLightbox-foot_bg" data-grid="col-12"></div>`);
  }

  // __hideGradient()__
  // Display a gradient to increase the image attributes contrast over the image
  hideGradient(){
    $(this.gradient).animate({opacity: 0},200, function(){
      $(this.gradient).remove();
    })
  }

  // __hasContent(`OBJECT`)__
  // Pass the [image object](#section-3) and returns if the image contains any title, description or caption.
  // Can be usefull to know when to display the gradient or not.
  hasContent(imgObj){
    return (imgObj.title != undefined || imgObj.description != undefined || imgObj.caption != undefined );
  }

  // __hasDescriptions(`OBJECT`)__
  // Pass the [image object](#section-3) and returns if the image contains any title or description.
  // Can be usefull to know when to display the gradient or not.
  hasDescriptions(imgObj){
    return (imgObj.title != undefined || imgObj.description != undefined);
  }

  // __displayPagination()__
  // Adds the HTML to the lightbox header for displaying pagination information if there are no restrictions
  displayPagination(){
    var hasRestrictions = this.getModifierValues('paginate', this);
    var render = () => $(this.head).prepend(`<span class="text sm c-white d-i p-20 dkitLightbox-pagination"></span>`);
    var remove = () => $(this.pagination).remove();

    if (hasRestrictions){
      if (this.getRestriction('paginate') == false){
        remove();
        return false;
      } else {
        render();
        return false;
      }
    }

    if (this.config.paginate) render();
  }

  // __updatePagination()__
  // Updates the pagination indexes with the current values
  updatePagination(){
    var lable = (this.config.paginateLabel) ? this.config.paginateLabel : '/';
    var index = this.getIndexOf('all');
    $(this.pagination).text(`${index.current+1}${lable}${index.last+1}`);
  }

  // __displayLoader(`CALLBACK`)__
  // Display the loading animation
  displayLoader(cb){
    this.centerLoader();
    $(this.loader).animate({opacity:1},200,function(){
      if (cb) cb();
    })
  }

  // __hideLoader(`CALLBACK`)__
  // Hides the loading animation
  hideLoader(cb){
    $(this.loader).animate({opacity: 0},200);
  }

  // __displayNav()__
  // Loads and center the arrows in the lightbox. If `this.config.infinite` is `false` it will hide the back arrow if it's the first image to display, or hide the next arrow if it's the last image to display. It will also hide or display the navigation depending on the current modifier values.
  displayNav(){
    var hasRestriction = this.getModifierValues('descriptionsonhover', this);

    if (hasRestriction){
      if (this.getRestriction('navigation') == false){
        $('.dkitLightbox-next, .dkitLightbox-back').css({"display":""});
        return false;
      }
    }

    this.centerArrows();
    var index = this.getIndexOf('all');

    if (!this.config.infinite){
      if ((index.current != index.next) && (index.current != index.last)) $('.dkitLightbox-next').css({"display":"block"});
      if (index.previous != index.last) $('.dkitLightbox-back').css({"display":"block"});
    } else {
      $(this.nav).css({"display":"block"});
    }
  }


  // __displaymobileDescriptionsFoot(`SCOPE`)__
  // Will display the mobile version of the description on the bottom of the page. Ideally do not use this at the same time than regular descriptions or they will overlap.
  displaymobileDescriptionsFoot(self){
    $(this.mobileFoot).css({display:'none'});
    $('.dkitLightbox-mobileFoot_infoBtn').remove();
    $('.dkitLightbox-mobileFoot_credit').css({display:'none'});
    var hasRestrictions = this.getModifierValues('mobiledescriptions', this);
    var self = self || this;

    var render= () => {
      $(this.mobileFoot).css({display:'block'});
      if (this.hasDescriptions(self.currentImgObj)){
        $('.dkitLightbox-mobileFoot_credit').css({display:''});
        $(this.mobileFootBody).prepend(`<a class="label up c-white m-r10 dkitLightbox-mobileFoot_infoBtn"><span class="icon-uni60"></span>${self.config.descBtnLabel}</a>`);
        $('.dkitLightbox-mobileFoot_infoBtn').on('click', function(){
          self.displayMobileDescriptionsOverlay(self)
        });
      }
    }

    if (hasRestrictions){
      if (this.getRestriction('mobiledescriptions') == true){
        render();
        return true;
      } else {
        return false;
      }
    }

    if (this.config.mobileDescriptions){
      render();
    }

  }

  displayMobileDescriptionsOverlay(self){
    var icon = $('.dkitLightbox-mobileFoot_infoBtn').find('span');

    var render = () => {
      var winHeight = $(window).height();
      $(self.shadow).fadeIn();
      $(self.mobileOverlay).css({'max-height': winHeight-120});
      $('.dkitLightbox-mobileFoot_infoBtn').find('span').removeClass('icon-uni60').addClass('icon-uni5D');
      $(self.mobileOverlay).css({display:'block', opacity:0});
      $(self.mobileOverlay).animate({opacity:1}, 300);
    }

    var hide = () => {
      $('.dkitLightbox-mobileFoot_infoBtn').find('span').removeClass('icon-uni5D').addClass('icon-uni60');
      $(self.shadow).fadeOut();
      $(self.mobileOverlay).animate({opacity:0}, 300, function(){
        $(self.mobileOverlay).css({display: 'none'});
      });
    }

    if (icon.hasClass('icon-uni60'))
      render();
    else
      hide();

  }


  // __displayDescriptions()__
  // Display the description block if allowed by the configs and modifiers.
  displayDescriptions(){
    var self = this;
    var hasHoverRestriction = this.getModifierValues('descriptionsonhover', this);
    var hasDisplayRestriction = this.getModifierValues('descriptions', this);
    var descElements = $(this.title +', '+ this.credit+', '+ this.description);
    var hideDesc = () => descElements.css({display:''});
    var displayDesc = () => descElements.css({display:'block'});

    /* This block checks if descriptions can be displayed */

    if (hasDisplayRestriction){
      if (this.getRestriction('descriptions') == false){
        hideDesc();
        this.hideGradient();
        return false;
      } else {
        displayDesc();
      }
    } else if (!this.config.descriptions){
      hideDesc();
      this.hideGradient();
      return false;
    } else {
      displayDesc();
    }


    /* This block checks if descriptions needs to be displayed on hover */
    if(hasHoverRestriction){
      if (this.getRestriction('descriptionsonhover') == false){
        $(this.foot).css({"display":"block"});
        $(this.mediaWrap).unbind('mouseenter');
        $(this.mediaWrap).unbind('mouseleave');
        return false;
      }
    }

    if (this.config.descriptionsOnHover){
      $(this.mediaWrap).on('mouseenter', function(){
        $(self.foot).stop().fadeIn();
      });

      $(this.mediaWrap).on('mouseleave', function(){
        $(self.foot).stop().fadeOut();
      });
    } else {
      $(self.foot).css({display:'block'});
    }

  }

  // __scaleMedia(`OBJECT`)__
  // * `self` is the `this` scope that needs to be passed, since using it on a window resize event
  // would make it loose the `this` scope of the LightboxModel prototype.
  //
  // Dynamically resizes the image inside the lightbox for a perfect fit ! Also checks if there are padding restrictions for the given breakpoint.
  scaleMedia(self){
    $('.dkitLightbox-body').find('img').css({"max-width": "", "max-height": ""});
    $('.dkitLightbox-body').css({"left": "", "top": ""});
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var hasVerticalRestriction = this.getModifierValues('verticalpadding', this);
    var hasHorizontalRestriction = this.getModifierValues('horizontalpadding', this);
    var verticalPadding = 0;
    var horizontalPadding = 0;

    if (hasVerticalRestriction) {
      verticalPadding = this.getRestriction('verticalpadding');
    } else {
      verticalPadding = self.config.verticalPadding;
    }

    if (hasHorizontalRestriction){
      horizontalPadding = this.getRestriction('horizontalpadding');
    } else {
      horizontalPadding = self.config.horizontalPadding;
    }


    $('.dkitLightbox-body').find('img').css({
      "max-width": windowWidth - horizontalPadding
    });

    var mediaHeight = $('.dkitLightbox-body').outerHeight();
    var mediaWidth = $('.dkitLightbox-body').outerWidth();

    if(mediaHeight > (windowHeight - verticalPadding)){
      $('.dkitLightbox-body').find('img').css({
        "max-width": "",
        "max-height": windowHeight - verticalPadding
      });
      mediaHeight = $('.dkitLightbox-body').outerHeight();
      mediaWidth = $('.dkitLightbox-body').outerWidth();
    }

    $('.dkitLightbox-body').css({
      "left": windowWidth/2 - mediaWidth/2,
      "top": windowHeight/2 - mediaHeight/2
    });

  }

  // __removeMedia()__
  // Removes the current image in the lightbox body
  removeMedia(){
    $(this.mediaWrap).empty();
  }

  // __addMedia(`STRING`, `CALLBACK`)__
  // Add a new media in the lightbox, complete with smooth animations. Dynamically waits for the loaded image.
  addMedia(mediaUrl, cb){
    $(this.mediaWrap).css({opacity:0});
    $(this.mediaWrap).append(`<img src="${mediaUrl}"/>`);
    this.displayLoader();
    var self = this;
    $(this.body).find('img').on('load', function(){
      $(self.body).find('img').off('load');
      $(self.loader).animate({opacity: 0},200);
      $(self.mediaWrap).animate({opacity:1},400);
      self.scaleMedia(self);
      if (cb) cb();
    });
  }

  // __changeTitle(`STRING`)__
  // Change the displayed image title
  changeTitle(title){
    $(this.title).remove();
    $('.dkitLightbox-mobileTitle').remove();
    if(title){
      $(this.footBody).append(`<span class="label c-white db dkitLightbox-title">${title}</span>`);
      $(this.mobileOverlayBody).append(`<span class="label med c-white db dkitLightbox-mobileTitle">${title}</span>`)
    }


  }

  // __changeDescription(`STRING`)__
  // Change the displayed image description
  changeDescription(description){
    $(this.description).remove();
    $('.dkitLightbox-mobileDesc').remove();
    if (description){
      $(this.footBody).append(`<span class="text c-white db dkitLightbox-description">${description}</span>`);
      $(this.mobileOverlayBody).append(`<span class="text c-white db dkitLightbox-mobileDesc">${description}</span>`)
    }

  }

  // __changeCaption(`STRING`)__
  // Change the displayed image caption
  changeCaption(credit){
    $(this.credit).remove();
    $(this.mobileFootCredit).remove();
    if (credit){
      $(this.footBody).append(`<span class="text xsm c-white o-05 p-t5 di dkitLightbox-credit">${credit}</span>`);
      $('.dkitLightbox-mobileFoot_body').append(`<span class="text xsm c-white o-05 p-t5 dkitLightbox-mobileFoot_credit">${credit}</span>`);
    }
  }

  // __changeMedia(`STRING`, `STRING`, `CALLBACK`)__
  // * `mediaUrl` Takes the url of the image you want to display
  // * `direction` Used for the swiping animation, can take `'prev'` or `'next'` as arguments
  // * `cb` A callback if you need to use one
  //
  // This function is used to dynamically change the displayed image in the lightbox, complete with a transition animation.
  changeMedia(mediaUrl, direction, cb){
    var self = this;
    this.displayLoader();
    var left = $(this.body).offset().left;

    if(direction == 'prev' || direction == 'previous'){
      left += this.config.swipeDistance;
    }

    if(direction == 'next'){
      left -= this.config.swipeDistance;
    }

    $(this.body).animate({left:left, opacity: 0},200, function(){
      $(self.mediaWrap).empty();
      $(self.mediaWrap).append(`<img src="${mediaUrl}"/>`);
      $(self.body).find('img').on('load', function(){
        $(self.body).find('img').off('load');
        $(self.loader).animate({opacity: 0},200);
        $(self.body).animate({opacity:1},400);
        self.scaleMedia(self);
        self.ongoing = false;
        if (cb) cb();
      });
    })
  }

  // __getFirstImage()__
  // Finds the first image to display based on the `'active'` flag in the [image object](#section-3)
  getFirstImage(){
    var firstActive;

    this.images.forEach(function(image, i){
      if(image.active){
        firstActive = image;
        firstActive.index = i;
        firstActive.lastSiblingIndex = this.images.length-1;
      }
    }, this);

    if(firstActive.url.length){
      return firstActive;
    } else {
      this.images[0].active = true;
      return this.images[0];
    }
  }

  // __getIndexOf(`STRING`)__
  // * `direction` can be `'all'` to return an object containing all the indexes, `'prev'` or `'previous'` for the index behind the current displayed image, `'next'` for the index after the current displayed image, `'current'` for the current image and `'last'` for the last index in the scope.
  //
  // Finds the index based on direction and the flag active in the [image object](#section-3). Very useful to know
  // At which index is the current displayed image relative to the last index and the possible previous and future indexes.
  getIndexOf(direction){
    var current;
    var currentIndex;
    var previous;
    var previousIndex;
    var next;
    var nextIndex;
    var self = this;
    var imgArrayLength = this.images.length - 1;

    this.images.forEach(function(image, i){
      if (image.active){
        current = self.images[i];
        currentIndex = i;

        if (currentIndex+1 <= imgArrayLength){
          nextIndex = i+1;
          next = self.images[i+1];
        } else {
          nextIndex = 0;
          next = self.images[0];
        }

        if (currentIndex-1 >= 0){
          previousIndex = i-1;
          previous = self.images[i-1]
        } else {
          previousIndex = imgArrayLength;
          previous = self.images[imgArrayLength];
        }
      }
    });

    if (direction === 'next')
      return nextIndex;
    if (direction === 'prev' || direction === 'previous')
      return previousIndex;
    if (direction === 'current' || direction === 'active')
      return currentIndex;
    if (direction === 'last' || direction === 'end')
      return imgArrayLength;
    if (direction === 'all' || direction === 'all')
      return {next: nextIndex, previous: previousIndex, current: currentIndex, last: imgArrayLength};
  }

  // __updateNavArrows()__
  // Updates the display of navigation arrows if the `this.config.infinite` is set to false
  updateNavArrows(){
    var index = this.getIndexOf('all');

    if (!this.config.infinite){
      if (index.previous != index.last){
        $('.dkitLightbox-back').css({"display":"block"});
      } else {
        $('.dkitLightbox-back').css({"display":"none"});
      }
      if (index.current != index.last){
        $('.dkitLightbox-next').css({"display":"block"});
      } else {
        $('.dkitLightbox-next').css({"display":"none"});
      }
    }
  }

  // __changeTo(`STRING`)__
  // * `direction` can be either `'previous'` or `'next'`
  //
  // Changes the displayed image based on the previous or next index, also calls `changeMedia()` for the animations
  changeTo(direction){
    var index = this.getIndexOf('all');
    this.currentImgObj = this.images[index[direction]];
    this.displaymobileDescriptionsFoot();
    this.images[index.current].active = false;
    this.images[index[direction]].active = true;
    this.changeMedia(this.images[index[direction]].url, direction);
    this.changeTitle(this.images[index[direction]].title);
    this.changeDescription(this.images[index[direction]].description);
    this.changeCaption(this.images[index[direction]].caption);
    this.updatePagination();
    this.updateNavArrows();

    if (this.config.gradient && this.hasContent(this.images[index[direction]]))
      this.displayGradient();
    else
      this.hideGradient();

    this.displayDescriptions();

  }

  // __arrowNudge(`STRING`)__
  // * `direction` can be either `'previous'` or `'next'`
  //
  // Simple animation to nudge the lightbox arrow. Fun to use with keyboard bindings for increased user experience.
  arrowNudge(direction){
    var self = this;
    if (direction === 'previous'){
      $(self.back).animate({"margin-left": -10},100,function(){
        $(self.back).animate({"margin-left": ''},100);
      })
    }
    if (direction === 'next'){
      $(self.next).animate({"margin-right": -10},100,function(){
        $(self.next).animate({"margin-right": ''},100);
      })
    }
  }

  // __addEventListeners()__
  // Helper function to add all the possible event listeners on the lightbox
  addEventListeners(){
    var self = this;

    $(this.closebtn).on('click', this.close); // <~ close event

    $(window).on('resize', function(){
      self.centerLoader();
      self.centerArrows();
      self.displayNav();
      self.scaleMedia(self);
      self.displayDescriptions();
      self.displaymobileDescriptionsFoot(self);
    });

    $(this.next).on('click', function(){
      if (!self.ongoing){
        self.ongoing = true;
        self.changeTo('next');
      }
    });

    $(this.back).on('click', function(){
      if (!self.ongoing){
        self.ongoing = true;
        self.changeTo('previous');
      }
    });

    $(document).on('keydown',function(e) {
      switch(e.which) {
        case 27: // <~ Escape key
          self.close();
          break;
          
        case 37: // <~ Left arrow key
          if (!self.ongoing){
            self.ongoing = true;
            self.changeTo('previous');
            self.arrowNudge('previous');
          }
          break;

        case 39: // <~ Right arrow key
          if (!self.ongoing){
            self.ongoing = true;
            self.changeTo('next');
            self.arrowNudge('next');
          }
          break;

        default: return;
      }
      e.preventDefault();
    });
  }

  // __make(`CALLBACK`)__
  // Helper function to render and display the lightbox, also render and display the first active image.
  make(cb){
    var self = this;
    this.render();
    this.display();
    this.displayLoader();
    this.displayNav();
    this.addEventListeners();
    var firstImg = this.getFirstImage();
    this.addMedia(firstImg.url, function(){
      self.currentImgObj = firstImg;
      if (self.config.gradient && self.hasContent(firstImg)) self.displayGradient();
      self.displaymobileDescriptionsFoot(self);
      self.changeTitle(firstImg.title);
      self.changeDescription(firstImg.description);
      self.changeCaption(firstImg.caption);
      self.displayPagination();
      self.updatePagination();
      self.displayDescriptions();
      if (cb) cb();
    });
  }

}

module.exports = LightboxModel;
