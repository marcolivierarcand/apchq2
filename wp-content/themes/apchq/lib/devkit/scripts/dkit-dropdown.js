var selector = $('[data-dropdown]')
var oneMenuIsOpen = false
var activeSelector = {}

function checkState (target) {
  let child = $(target).parent().find('.dropdown-menu')
  if (oneMenuIsOpen) {
    selector.find('span').removeClass('dropdown-open').parent().parent().find('.dropdown-menu').fadeOut()
  }
  if (child.is(":visible")){
    closeDropdown(target)
  } else {
    target.addClass('dropdown-open')
    child.stop().fadeIn()
    oneMenuIsOpen = true
    activeSelector = target
  }
}

function initSelection(target) {
  let parent = target.parent()
  let boxSelector = parent.parent()
  let button = boxSelector.find('[data-dropdown]')
  let choiceLabel = target.text()
  let attr = boxSelector.attr('data-callback')
  target.parent().parent().find('a').removeClass('active')
  target.addClass('active')
  parent.fadeOut()
  boxSelector.find('[data-dropdown]').removeClass('dropdown-open')
  oneMenuIsOpen = false
  activeSelector = {}
  if (button.attr('data-dropdown') == 'self') {
    console.log(button.find('svg'))
    let buttonIcon = button.find('svg').length
      ? ` ${$(button.find('svg')).prop('outerHTML')}`
      : ''
    button.html(choiceLabel + buttonIcon)
  }
  if (typeof attr !== typeof undefined && attr !== false) {
    let fn = boxSelector.attr('data-callback')
    if  (typeof window[fn] === 'function') {
      window[fn]()
    }
    else {
      throw Error(`DKIT ERROR: You declared a callback with the name: "${fn}", however Devkit doesn't seem to find this function, check for syntax errors or find a way to declare this function in the global scope.`)
    }

  }
}

function closeDropdown (target) {
  let child = target.parent().find('.dropdown-menu')
  target.removeClass('dropdown-open')
  child.stop().fadeOut()
  oneMenuIsOpen = false
  activeSelector = {}
}

function preventBodyScroll (target) {
  let child = selector.parent().find('.dropdown-menu')
  child.unbind('mouseenter')
  child.on('mouseenter', function(){
    $('body').css({overflow:'hidden'})
  })
  child.on('mouseleave', function(){
    $('body').css({overflow:''})
  })
}

function clickOutside (event) {
  let left = event.pageX
  let top = event.pageY

  if (activeSelector.length){
    let boxPosition = activeSelector.offset()
    let boxWidth = activeSelector.outerWidth()
    let boxHeight = activeSelector.outerHeight()

    if(!(
      (left >= boxPosition.left) &&
      (top >= boxPosition.top) &&
      (left <= boxPosition.left + boxWidth) &&
      (top <= boxPosition.top + boxHeight)
      )){
        closeDropdown(activeSelector)
    }
  }
}

export function init () {
  selector.on('click', function(){
    checkState($(this))
  })
  selector.parent().find('.dropdown-menu').find('a').on('click', function(){
    initSelection($(this))
  })
  $('html').on('click', function(event){
    clickOutside(event);
  })
}
