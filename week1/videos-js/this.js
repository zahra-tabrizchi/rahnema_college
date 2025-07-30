const person = {
  firstName : "Hadi",
  foods: ["pizza", "pasta"],
  say: function(str){
    console.log(this.firstName + " said "+ str)
   }

}


// person.say("I am from person")
const say = person.say
window.firstName = "Mammmad"
say("I am from window")


say.call(person, "I am from person")


const person2 = {
  firstName: "Zahra",
  say: person.say
}

person2.say("I am from person2")


say.call({firstName: "Ali"}, "I am from call")

const sayParii = say.bind({firstName: "Parii"})
sayParii()

person2.saykooft = sayParii
person2.saykooft("I am from person2")


function kooft(x) {
  const y = x**2
  return function(z) {
    return y+z
  }
}

const m = kooft(5)
console.log(m(3))
