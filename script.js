// Load categories from JSON file
async function loadJSON() {
  try {
    const response = await fetch("data.json")
    jsonData = await response.json()
  } catch (error) {
    console.error("Error loading JSON:", error)
  }

  displayCategories()
}

// Display categories
function displayCategories() {
  for (const category of jsonData.categories) {
    const categoryElement = document.createElement("button")
    categoryElement.classList.add(
      "category",
      "background",
      "center",
      "column",
      "pointer",
      "rounded",
      "drop-shadow",
      "text--adaptive",
      "border",
    )
    categoryElement.textContent = category.category
    categoryElement.addEventListener("click", () =>
      generateWords(category.category),
    )
    categoriesSection.appendChild(categoryElement)
  }
}

// Create randomized array of words in category
function getRandomWords(category) {
  const words = jsonData.categories.find(
    (cat) => cat.category === category,
  ).words
  const shuffledWords = words.sort(() => 0.5 - Math.random())
  return shuffledWords
}

// Generate all the word and image pages in the category
function generateWords(category) {
  wordPracticePageList = []

  const words = getRandomWords(category)

  categoriesSection.style.display = "none"

  for (const word of words) {
    const wordContainer = document.createElement("div")
    wordContainer.classList.add(
      "word",
      "background",
      "rounded",
      "flex",
      "center",
      "gap",
      "column",
      "text--medium",
    )

    const imageElement = document.createElement("img")
    imageElement.src = word.image
    imageElement.alt = word.word
    imageElement.classList.add("word-image")
    wordContainer.appendChild(imageElement)

    const wordElement = document.createElement("h2")
    wordElement.classList.add("text--medium", "center")
    wordElement.style.display = "none"
    wordElement.textContent = word.word
    wordContainer.appendChild(wordElement)

    const navContainer = document.createElement("div")
    navContainer.classList.add("flex", "center", "gap")

    const revealButton = document.createElement("button")
    revealButton.classList.add(
      "background",
      "flex",
      "center",
      "rounded",
      "border",
      "text--medium",
      "pointer",
    )
    revealButton.textContent = "Visa Ordet"
    revealButton.addEventListener("click", () => revealWord(wordElement))
    navContainer.appendChild(revealButton)

    const nextButton = document.createElement("button")
    nextButton.classList.add(
      "background",
      "flex",
      "center",
      "rounded",
      "border",
      "text--medium",
      "pointer",
    )
    nextButton.textContent = "Nästa Ord"
    nextButton.addEventListener("click", nextWord)
    navContainer.appendChild(nextButton)

    wordContainer.appendChild(navContainer)

    wordPracticePageList.push(wordContainer)
  }

  console.log(index)
  console.log(wordPracticePageList)
  console.log(category)
  displayWord(index)
}

function revealWord(element) {
  element.style.display = "block"
}

function nextWord() {
  if (index < wordPracticePageList.length - 1) {
    index += 1
    displayWord(index)
  } else {
    wordSection.style.display = "none"
    categoriesSection.style.display = "grid"
    index = 0
  }
}

// Display a word
function displayWord(index) {
  wordSection.innerHTML = ""
  wordSection.appendChild(wordPracticePageList[index])
  wordSection.style.display = "flex"
}

let wordPracticePageList = []
let index = 0

// Get the section where the categories will be displayed
const categoriesSection = document.getElementById("categories")

// Get the section where the words will be displayed
const wordSection = document.getElementById("words")

// Call the function to load data
let jsonData
if (document.getElementById("categories")) loadJSON()
