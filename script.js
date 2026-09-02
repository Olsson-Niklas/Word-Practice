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

      categoryElement.style.backgroundImage = `url(img/${category.categoryPath}${category.words[5].fileName}.avif)`

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

  const imagePath = "img/" + categoryPath + word.fileName + ".avif"

  return imagePath
}

function getAudioPath(category, word) {
  const categoryPath = jsonData.categories.find(
    (cat) => cat.category === category,
  ).categoryPath
  console.log(word)
  const audioPath = "audio/" + categoryPath + word.fileName + ".mp3"

  return audioPath
}

// Start TTS
function speakWord(category, word) {
  var path = getAudioPath(category, word)

  console.log(path)
  var audio = new Audio(path)
  audio.play()
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

    const playButton = document.createElement("button")
    playButton.classList.add("play-button")
    playButton.textContent = ""
    playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="rgb(255, 255, 255)" d="M443.6 64.3C434.7 65.5 426.4 70.5 421.2 78.4C414.4 88.8 414.2 102.5 420.8 113C426.4 121.9 436.3 125.7 444.6 131.5C452.1 136.7 462.2 144.7 472.3 155.7C492.3 177.4 511.8 210 511.8 256C511.8 273.7 526.1 288 543.8 288C561.5 288 575.8 273.7 575.8 256C575.8 190 547.3 142.6 519.3 112.3C505.4 97.2 491.5 86.2 481 79C470 71.4 457.5 62.4 443.4 64.3zM304 192C246.4 192 198.9 235.6 192.7 291.5C190.8 309.1 174.9 321.7 157.4 319.8C139.9 317.9 127.2 302 129.1 284.5C138.8 196.5 213.4 128 304 128C401.2 128 480 206.8 480 304C480 350 462.3 391.9 433.4 423.3C421.4 436.3 416 448.1 416 458L416 464.1C416 526 365.9 576.1 304 576.1C286.3 576.1 272 561.8 272 544.1C272 526.4 286.3 512.1 304 512.1C330.5 512.1 352 490.6 352 464.1L352 458C352 425.1 369.4 398.4 386.4 380C404.8 360 416 333.4 416 304.1C416 242.2 365.9 192.1 304 192.1zM64 544C64 526.3 78.3 512 96 512C113.7 512 128 526.3 128 544C128 561.7 113.7 576 96 576C78.3 576 64 561.7 64 544zM224 448C241.7 448 256 433.7 256 416C256 398.3 241.7 384 224 384C206.3 384 192 398.3 192 416C192 433.7 206.3 448 224 448zM150.6 425.4C138.1 412.9 117.8 412.9 105.3 425.4C92.8 437.9 92.8 458.2 105.3 470.7L169.3 534.7C181.8 547.2 202.1 547.2 214.6 534.7C227.1 522.2 227.1 501.9 214.6 489.4L150.6 425.4zM304 272C286.3 272 272 286.3 272 304C272 317.3 261.3 328 248 328C234.7 328 224 317.3 224 304C224 259.8 259.8 224 304 224C348.2 224 384 259.8 384 304C384 317.3 373.3 328 360 328C346.7 328 336 317.3 336 304C336 286.3 321.7 272 304 272z"/></svg>`
    playButton.setAttribute("aria-label", "Listen to the word")
    playButton.addEventListener("click", () => speakWord(category, word))

    wordContainerElement.appendChild(playButton)

    const navContainer = document.createElement("div")
    navContainer.classList.add("nav")

    const prevButton = document.createElement("button")
    prevButton.classList.add("prevButton")
    prevButton.setAttribute("id", "prev-button")
    prevButton.textContent = "Bakåt"
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
    document.getElementById("prev-button").innerText = "Hem"
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
