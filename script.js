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
  if (categoriesSection.innerHTML === "") {
    for (const category of jsonData.categories) {
      const categoryElement = document.createElement("button")
      categoryElement.classList.add("category")

      const labelElement = document.createElement("span")
      labelElement.classList.add("category-label")
      labelElement.textContent = category.category
      categoryElement.appendChild(labelElement)

      categoryElement.style.backgroundImage = `url(${category.categoryPath}${category.words[5].image})`

      categoryElement.addEventListener("click", () =>
        generateWords(category.category),
      )
      categoriesSection.appendChild(categoryElement)
    }
  }

  document.getElementById("header").textContent = "Kategorier"
  wordSection.style.display = "none"
  categoriesSection.style.display = "grid"
}

// Create randomized array of words in category
function getRandomWords(category) {
  const words = jsonData.categories.find(
    (cat) => cat.category === category,
  ).words
  const shuffledWords = words.sort(() => 0.5 - Math.random())
  return shuffledWords
}

function getImagePath(category, word) {
  const categoryPath = jsonData.categories.find(
    (cat) => cat.category === category,
  ).categoryPath

  const imagePath = categoryPath + word.image

  return imagePath
}

// Generate all the word and image pages in the category
function generateWords(category) {
  wordPracticePageList = []

  document.getElementById("header").textContent = category
  const words = getRandomWords(category)

  categoriesSection.style.display = "none"

  for (const word of words) {
    const wordContainer = document.createElement("div")
    wordContainer.classList.add("word-container")

    const imageElement = document.createElement("img")
    imageElement.src = getImagePath(category, word)
    imageElement.alt = word.word
    imageElement.classList.add("word-image")
    wordContainer.appendChild(imageElement)

    const wordContainerElement = document.createElement("div")
    wordContainerElement.classList.add("word-text-container")

    const wordElement = document.createElement("span")
    wordElement.classList.add("word-text")
    wordElement.textContent = word.word
    wordElement.style.color = "#604e8b"
    wordContainerElement.appendChild(wordElement)

    wordContainer.appendChild(wordContainerElement)

    const navContainer = document.createElement("div")
    navContainer.classList.add("nav")

    const prevButton = document.createElement("button")
    prevButton.classList.add("prevButton")
    prevButton.setAttribute("id", "prev-button")
    prevButton.textContent = "Föregående"
    prevButton.addEventListener("click", prevWord)
    navContainer.appendChild(prevButton)

    const revealButton = document.createElement("button")
    revealButton.classList.add("revealButton")
    revealButton.textContent = "Visa"
    revealButton.addEventListener("click", () => revealWord(wordElement))
    navContainer.appendChild(revealButton)

    const nextButton = document.createElement("button")
    nextButton.classList.add("nextButton")
    nextButton.setAttribute("id", "next-button")
    nextButton.textContent = "Nästa"
    nextButton.addEventListener("click", nextWord)
    navContainer.appendChild(nextButton)

    wordContainer.appendChild(navContainer)

    wordPracticePageList.push(wordContainer)
  }

  displayWord(index)
}

function revealWord(element) {
  element.style.color = "white"
}

function nextWord() {
  if (index < wordPracticePageList.length - 1) {
    index += 1
    displayWord(index)
  } else {
    displayCategories()
    index = 0
  }
}

function prevWord() {
  if (index > 0) {
    index -= 1
    displayWord(index)
  } else {
    displayCategories()
    index = 0
  }
}

// Display a word
function displayWord(index) {
  wordSection.innerHTML = ""
  wordSection.appendChild(wordPracticePageList[index])
  wordPracticePageList[index].querySelector(".word-text").style.color =
    "#604e8b"
  if (index === wordPracticePageList.length - 1) {
    document.getElementById("next-button").innerText = "Klart"
  } else if (index === 0) {
    document.getElementById("prev-button").innerText = "Tillbaka"
  }

  wordSection.style.display = "block"
}

let wordPracticePageList = []
let index = 0

// Get the section where the categories will be displayed
const categoriesSection = document.getElementById("categories")

// Get the section where the words will be displayed
const wordSection = document.getElementById("word")

// Call the function to load data
let jsonData
if (document.getElementById("categories")) loadJSON()
