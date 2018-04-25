var _D = require('./_helpers/dom-data-modifiers.js'); 

var $parent = $('[data-fix-height-parent]');
var $child = $('[data-fix-height-child]');

var getChilds = (parent) => { 
  var childs = [];
  parent.find($child).each(function(){
    childs.push($(this))
  });
  return childs;
}

var getRows = (siblings) => {
  siblings.forEach(function(sibling){
    sibling.css({'height': '1px', 'padding-top': ''});
  });
  var rows = {};
  var verticalOffsets = siblings.map(a => a.offset().top);
  var rowOffsets = Array.from(new Set(verticalOffsets));
  rowOffsets.forEach(function(rowOffset, i){
    var rowElements = siblings.filter(a => a.offset().top === rowOffset);
    rows[i] = rowElements;
  });
  siblings.forEach(function(sibling){
    sibling.css({'height': '', 'padding-top': ''});
  });
  return rows;
}

var getHighestInRow = (row) => {
  row.sort((a, b) => a.height() - b.height());
  var highest = row[row.length-1];
  return highest;
}

var getHighestSibling = (siblings) => {
  siblings.sort((a, b) => a.height() - b.height());
  var highest = siblings[siblings.length-1];
  return highest;
}

var getPadding = (position, sibling, highest) =>{

  if (position === 'center'){
    var height = highest.outerHeight();
    var ptop = (height - sibling.height()) /2;
    return ptop;
  }

  if (position === 'bottom'){
    var height = highest.outerHeight();
    var pbottom = parseInt(highest.css('padding-bottom').split('px')[0]);
    var ptop = (height - sibling.height() - pbottom);
    return ptop;
  }

  if (position === 'top'){
    return parseInt(highest.css('padding-top').split('px')[0]);;
  }

  return '';

}

var setHeightsByRows = (parent, siblings) => {

  var modifiers = _D.getModifiers(parent);
  var hasRestrictions = _D.getModifierValues(modifiers, 'stop');
  var position = parent.attr('data-fix-height-position');
  var rows = getRows(siblings);


    if (_D.getRestriction(modifiers, 'position')){
      position = _D.getRestriction(modifiers, 'position');
    }

    if (_D.getRestriction(modifiers, 'stop') == true){
      for (let row in rows){
        rows[row].forEach(function(sibling){
          sibling.css({'height': '', 'padding-top': ''});
        });
      }
      return false;
    }
    if (_D.getRestriction(modifiers, 'rows') == false){
      var siblings = getChilds(parent);
      setHeightsBySibling(parent, siblings);
      return false;
    }


  for (let row in rows){
    rows[row].forEach(function(sibling){
      sibling.css({height: '', padding: ''});
    });
    var highest = getHighestInRow(rows[row]);
    rows[row].forEach(function(rowSibling){
      var padding = getPadding(position, rowSibling, highest);
      rowSibling.css({'height': highest.outerHeight(), 'padding-top': padding});
    });
  }
}

var setHeightsBySibling = (parent, siblings) => {
  var highest = getHighestSibling(siblings);
  var modifiers = _D.getModifiers(parent);
  var hasRestrictions = _D.getModifierValues(modifiers, 'stop');
  var position = parent.attr('data-fix-height-position');

  if (hasRestrictions){
    if (_D.getRestriction(modifiers, 'position')){
      position = _D.getRestriction(modifiers, 'position');
    }
    if (_D.getRestriction(modifiers, 'stop') == true){
      siblings.forEach(function(sibling){
        sibling.css({'padding-top': ''});
      });
      return false;
    }
    if (_D.getRestriction(modifiers, 'rows') == true){
      var rows = getRows(siblings);
      setHeightsByRows(parent, rows);
      return false;
    }
  }

  siblings.forEach(function(sibling){
    var padding = getPadding(position, sibling, highest);
    sibling.css({'height': highest.outerHeight(), 'padding-top': padding});
  });

}

var run = () => {
  $parent.each(function(){
    if ($(this).attr('data-fix-height-rows') == 'true'){
      var siblings = getChilds($(this));
      setHeightsByRows($(this), siblings);
    } else {
      var siblings = getChilds($(this));
      setHeightsBySibling($(this), siblings);
    }
  });
}

var init = () => {
  run();
  $(window).on('resize', run);
}

module.exports = {
  init,
  run
}