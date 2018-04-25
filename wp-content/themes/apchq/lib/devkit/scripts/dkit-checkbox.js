function toggleCheckboxState (target) {
  let checked = target.hasClass('checked')
  let radio = target.hasClass('radio')
  let name = target.attr('data-checkbox-name')

  if (radio) {
    if (!target.hasClass('checked')) {
      $(`[data-checkbox-name="${name}"]`).removeClass('checked')
      $(`[data-checkbox-name="${name}"]`).find('input').prop('checked', false)
      target.addClass('checked')
      target.parent().find('input').prop('checked', true)
      return
    }
    return
  }

  if (checked) {
    target.removeClass('checked')
    target.parent().find('input').prop('checked', false)
  } else {
    target.addClass('checked')
    target.parent().find('input').prop('checked', true)
  }
}


export function init () {
  $('[data-checkbox-name]').each(function() {
    if ($(this).hasClass('checked')) {
      $(this).parent().find('input').prop('checked', true)
    } else {
      $(this).parent().find('input').prop('checked', false)
    }
  })
  $('body').on('click', '[data-checkbox-name]', function() {
    toggleCheckboxState($(this))
  })
}
