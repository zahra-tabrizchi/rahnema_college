//error object
const error = new Error("Oh nooooooooooooooooooooo!")

// console.log(error.message)
//throw error
// throw error
// console.log("Hi")

class DevideByZero extends Error {
  constructor() {
    super("You can not devide with zero")
    this.name = "DevisionByZero"
  }
}

const devide = (x, y) => {
  if(y===0) {
    throw new DevideByZero();
  }
  return x/y
}

// devide(10, 0)
const person = "{\"firstName\":\"Hadi\",\"courses\":[{\"lesson\":\"Math\",\"score\":10},{\"lesson\":\"literature\",\"score\":20}]}"

// console.log(person)

// console.log(JSON.parse(person))

function getPersonAvg(per) {
  try {
  const person = JSON.parse(per);
  const sum = person.courses.reduce((prev, curr) => prev+curr.score, 0)
    return devide(sum, person.courses.length)
  } catch(err) {
    if (err instanceof DevideByZero) {
      return 0;
    }
  throw err;
  } finally {
    console.log("Get average done!")
  }
}

console.log(getPersonAvg(person))