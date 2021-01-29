const cards = document.querySelectorAll('.card')
const colorsInputs = document.querySelectorAll('.colors input')
const sizesButtons = document.querySelectorAll('.sizes span')

let cardFocused = cards[0]

cards.forEach((card, index) =>
  card.addEventListener('mouseover', () => handleCardFocused(index))
)

colorsInputs.forEach(colorInput =>
  colorInput.addEventListener('change', handleSelectColor)
)

sizesButtons.forEach(sizeButton =>
  sizeButton.addEventListener('click', handleSelectSize)
)

function handleCardFocused(index) {
  cardFocused = cards[index]
}

function handleSelectSize({ target: sizeButton }) {
  const sizesButtons = cardFocused.querySelectorAll('.sizes span')
  
  sizesButtons.forEach(sizeButton => sizeButton.classList.remove('selected'))

  sizeButton.classList.add('selected')
}

function handleSelectColor({ target: { value: color } }) {
  const tennisImage = cardFocused.querySelector('.card-image img')

  const animation = {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    config: {
      duration: 1000,
      easing: 'ease-out'
    }
  }

  tennisImage.src = tennisImage.src.replace(/green|blue|red/, color)

  handleChangeLayoutColor(color)

  tennisImage.animate(animation.keyframes, animation.config)
}

function handleChangeLayoutColor(colorName) {
  const root = document.querySelector(':root')
  const rootStyles = getComputedStyle(root)

  const color = rootStyles.getPropertyValue(`--${colorName}`)

  cardFocused.style.setProperty('--layout-color', color)
}
