
class Person {
  #age
  constructor(firstName, age = 30) {
    this.#age = age;
    this.firstName = firstName;
    this.say = this.say.bind(this);
  }
  get name() {
    return this.firstName.toUpperCase()
  }

  set name(val) {
    this.firstName = val.toLowerCase();
  }

  say(sentence= 'Salam!') {
    console.log(`${this.firstName} said '${sentence}'`)

  }

}

const zahra = new Person("zahra")
zahra.say("Hello!")
console.log(zahra.name)
zahra.name = "MARAL"
console.log(zahra.name)
console.log(zahra.firstName)


class Student extends Person {
  constructor(firstName, age, score) {
    super(firstName, age)
    this.score = score
    this.age = age
    this.sayYourScore = this.sayYourScore.bind(this)

  }
  sayYourScore() {
    console.log(`I am ${this.firstName} and ${this.age} years old and my score is ${this.score}`)
  }
}

const saeed = new Student("Saeed", "35", 20)
saeed.sayYourScore()
