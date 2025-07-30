const div = document.querySelector("#app")

const h1 = document.createElement("h1")
h1.innerText = "DOM Lessons"

div.append(h1)

const form = document.createElement("form")
const input = document.createElement("input")
input.placeholder = "Please enter your name"
const submit = document.createElement("button")

submit.type = "submit";
submit.innerText = "submit"

form.append(input)
form.append(submit)

div.append(form)


const handler = (event) => {
  event.preventDefault();
  console.log("Hello");
  alert(`Hello ${input.value}`)
  input.value = ""
};

form.addEventListener("submit", handler)