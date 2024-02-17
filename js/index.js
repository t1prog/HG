class ValidateInput {
  textOnly(event) {
    const inputValue = event.target.value
    const isValid = /^[a-zA-Zа-яА-Я\s]*$/.test(inputValue)
    if (!isValid) {
      event.target.value = inputValue.replace(/[^a-zA-Zа-яА-Я]/g, '')
    }
  }

  numberOnly(event) {
    const inputValue = event.target.value
    const isValid = /^\d*$/.test(inputValue)
    if (!isValid) {
      event.target.value = inputValue.replace(/\D/g, '')
    }
  }

  hours(event) {
    const inputValue = event.target.value
    if (!/^\d*$/.test(inputValue)) {
      event.target.value = inputValue.replace(/\D/g, '')
      return
    }
    if (parseInt(inputValue, 10) >= 24) {
      event.target.value = '23'
    }
    if (parseInt(inputValue, 10) < 0 || !inputValue) {
      event.target.value = '00'
    }
  }
}

const validator = new ValidateInput()
function createSudokuTable() {
  const sudokuValues = [
    8, 0, 6, 0, 0, 3, 0, 9, 0, 0, 0, 0, 4, 0, 0, 1, 0, 0, 0, 0, 8, 0, 0, 2, 8,
    7, 5, 0, 1, 0, 0, 8, 0, 0, 0, 5, 0, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,
    5, 0, 0, 0, 2, 1, 0, 0, 0, 7, 0, 0, 8, 0, 0, 0, 0, 0, 6, 0, 7, 6, 3, 0, 0,
    0, 0, 0, 0, 0, 3,
  ]

  let table = document.getElementById('sudokuTable')
  for (let i = 0; i < 9; i++) {
    let row = table.insertRow()
    for (let j = 0; j < 9; j++) {
      let cell = row.insertCell()
      let index = i * 9 + j
      let value = sudokuValues[index]
      let input = document.createElement('input')
      input.type = 'text'
      input.setAttribute('maxlength', '1')
      input.style.textAlign = 'center'
      if (value !== 0) {
        input.value = value
        input.setAttribute('readonly', 'readonly')
        input.classList.add('sudoku-active')
      }
      input.addEventListener('blur', () => {
        trackFilledInputs()
      })
      input.addEventListener('input', (event) => {
        validator.numberOnly(event)
      })
      cell.appendChild(input)
      if ((i + 1) % 3 === 0 && i !== 9) {
        cell.classList.add('bottom-border')
      }
      if ((j + 1) % 3 === 0 && j !== 9) {
        cell.classList.add('right-border')
      }
      if (i % 3 === 0 && i !== 1) {
        cell.classList.add('top-border')
      }
      if (j % 3 === 0 && j !== 1) {
        cell.classList.add('left-border')
      }
    }
  }
  trackFilledInputs()
}

function trackFilledInputs() {
  const inputs = document.querySelectorAll('#sudokuTable input[type="text"]')
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.classList.add('sudoku-active')
      } else {
        input.classList.remove('sudoku-active')
      }
    })
  })
}

function getFormattedDate() {
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, '0')
  let mm = String(today.getMonth() + 1).padStart(2, '0')
  let yyyy = today.getFullYear()

  return dd + '.' + mm + '.' + yyyy
}

function headerHandler() {
  const labelDate = document.getElementById('date-now')
  labelDate.innerHTML = String(getFormattedDate())

  const inputName = document.getElementById('inputName')
  const inputPhone = document.getElementById('inputPhone')
  const timeArr = document.getElementsByClassName('h-time')

  const handleInput = (event, validationFunction) => {
    validationFunction(event)
  }

  for (let i = 0; i < timeArr.length; i++) {
    timeArr[i].setAttribute('maxlength', '2')
    timeArr[i].addEventListener('input', (event) => {
      validator.numberOnly(event)
    })
  }

  inputName.addEventListener('input', (event) => {
    validator.textOnly(event)
  })
  inputPhone.addEventListener('input', (event) => {
    validator.numberOnly(event)
  })
}

window.addEventListener('scroll', function () {
  let logoW = document.getElementById('logo-white')
  let logoB = document.getElementById('logo-black')
  let logoText = document.getElementById('logo-text')
  let separatorW = document.getElementById('separator-1')
  let separatorB = document.getElementById('separator-3')

  if (window.scrollY > 550) {
    logoW.classList.add('hidden')
    logoB.classList.remove('hidden')
    separatorB.classList.remove('hidden')
    separatorW.classList.add('hidden')
    logoText.style.color = 'black'
  } else {
    logoW.classList.remove('hidden')
    logoB.classList.add('hidden')
    separatorB.classList.add('hidden')
    separatorW.classList.remove('hidden')
    logoText.style.color = 'white'
  }
})

function infoNavControl() {
  const nav = document.getElementsByClassName('c-form__header-nav__item')
  for (const item of nav) {
    item.addEventListener('click', (event) => {
      const clickedItem = event.currentTarget
      for (const navItem of nav) {
        if (navItem === clickedItem) {
          navItem.classList.add('active')
          document.getElementById(navItem.id + '-form').classList.add('active')
        } else {
          navItem.classList.remove('active')
          document
            .getElementById(navItem.id + '-form')
            .classList.remove('active')
        }
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', function () {
  createSudokuTable()
  headerHandler()
  infoNavControl()
})
