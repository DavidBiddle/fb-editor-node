let textInput = document.querySelector('.govuk-input[name="value"][type="text"]')
if (textInput && textInput.className.includes('govuk-input--width')) {
  textInput = undefined
}
if (textInput) {
  textInput.insertAdjacentHTML('afterend', `<textarea class="govuk-textarea" id="expandingTextInput" name="value" rows="1" aria-describedby="admin.instance.property--value-hint">${textInput.value}</textarea>`);
  textInput.remove()

  function insertAtCursor(insertField, insertValue) {
      //IE support
      if (document.selection) {
          insertField.focus()
          sel = document.selection.createRange()
          sel.text = insertValue
      }
      //MOZILLA and others
      else if (insertField.selectionStart || insertField.selectionStart == '0') {
          var startPos = insertField.selectionStart
          var endPos = insertField.selectionEnd
          insertField.value = insertField.value.substring(0, startPos)
              + insertValue
              + insertField.value.substring(endPos, insertField.value.length)
          insertField.selectionStart = startPos + insertValue.length
          insertField.selectionEnd = startPos + insertValue.length
      } else {
          insertField.value += insertValue;
      }
  }

  const expandingTextInput = document.querySelector('#expandingTextInput')
  expandingTextInput.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
    }
  })
  expandingTextInput.addEventListener('paste', (e) => {
    e.preventDefault()
    e.stopPropagation()
    let paste = (e.clipboardData || window.clipboardData).getData('text')
    paste = paste.replace(/\n/gi, ' ');
    insertAtCursor(expandingTextInput, paste)

  })
}
