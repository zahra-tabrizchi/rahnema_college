const app = document.getElementById("app");

const form = document.createElement("form")
const input = document.createElement("input")



const submit = document.createElement("button")
submit.type = "submit";
submit.innerText = "submit"


form.append(input)
form.append(submit)
app.append(form)


const thinkingElement = document.createElement("h1")
thinkingElement.innerText = "Thinking..."
thinkingElement.style.display = 'none';
app.append(thinkingElement)

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const firstName = input.value
//   form.style.display = "none";
//   thinking.style.display = "block"
//   input.value = ""

// })

const thinking = (seconds, fn) => {
  thinkingElement.style.display = "block"
  setTimeout(()=>{
    thinkingElement.style.display = "none"
    fn()
  }, seconds*1000)
}

const ask = (title, fn) => {
  input.placeholder = title;
  form.style.display = "block";
  const handler = event => {
    event.preventDefault();
    const value = input.value
    input.value = ""
    form.removeEventListener("submit", handler)
    form.style.display = "none";
    fn(value)
  }
  form.addEventListener("submit", handler)
}

ask("Please enter your firstname", (firstname) => {
  thinking(1, ()=>{
    ask("please enter your lastname", (lastName) => {
      thinking(2, ()=>{
        ask("please enter your age", (age)=> {
          thinking(2, () => {
            alert(`you are ${firstname} ${lastName} and ${age} years old`);
          })
        })
      })
    })
  })
})
