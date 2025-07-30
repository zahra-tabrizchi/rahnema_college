console.log("Hello")

const sayGoodbye = () => console.log("Good bye")
const timeOutId= setTimeout(sayGoodbye, 2000)

const cancelButton = document.getElementById("button")

const sayAreYouThere = () => {
  console.log("Are you there?")
}

const intervalId = setInterval(sayAreYouThere, 1000)

cancelButton.addEventListener( "click", () => {
  clearTimeout(timeOutId);
  clearInterval(intervalId)
})

//nested setTimeout
const sayAreYouThere2 = () => {
  console.log("Are you there2?");
  setTimeout(sayAreYouThere2, 1000);
}

sayAreYouThere2()



//html code

{/* <div id="app">
  <button id="button">Cancel</button>
</div> */}