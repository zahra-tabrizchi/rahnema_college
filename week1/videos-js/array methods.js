// splice & delete
// const arr = [1, 2, 3];

// console.log(arr);

// arr.splice(0, 2);

// console.log("splice", arr);

// **slice

// const arr = [1, 2, 3]
// const arr2 = arr.slice(1,3)

// console.log("slice", arr)
// console.log(arr2)

// includes & indexof & lastIndexOf
// const arr = [1, 2, 3, 5, 2, 2]

// console.log(arr.lastIndexOf(2))

// *find && findIndex

// const arr = [
//   { firstName: 'zahra', age: 10 },

//   { firstName: 'b', age: 25 },

//   { firstName: 'd', age: 22 },
// ];

// const zahra = arr.find((x) => x.firstName === 'zahra');

// console.log(zahra);

//*map
// const arr = [1, 2, 3]
// const arr2 = arr.map(x => x+1)
// console.log(arr2)

//* filtermap

// const arr = [1, 2, 3];

// const arr2 = arr.flatMap(x => [x,x])
// console.log(arr2)

// const arr = [1, 2, 3, 4]

// const even = arr.filter(x => x%2 ===0)
// console.log(even)

//*reduce

// const arr = [1, 2, 3, 4]
// const sum = arr.reduce((prev, curr) => prev + curr, 0)
// console.log(sum)



// const arr = [1, 2, 3, 4]

// const map = arr.reduce((acc, curr) => { 
//   acc.push(curr+1)
//   return acc
//   }, [])
// console.log(map)

// const users = [
//   { name: 'Ali', role: 'admin' },
//   { name: 'Sara', role: 'user' },
//   { name: 'John', role: 'admin' },
// ];

// const grouped = users.reduce((acc, user) => {
//   acc[user.role] = acc[user.role] || [];
//   acc[user.role].push(user.name);
//   return acc;
// }, {});

// console.log(grouped);
/*
{
  admin: ['Ali', 'John'],
  user: ['Sara']
}
*/

// const persons = [
//   {firstName : "Zahra", age: 32},
//   {firstName : "pozhhan", age: 36},
//   {firstName : "Kimia", age: 33},
//   {firstName : "Pariii", age: 32},
// ]

// const groupByage = persons.reduce((prev, curr) => {
//   return {...prev, [curr.age] : [...prev[curr.age] ?? [], curr.firstName]}
// }, {})

// console.log(groupByage)

// const range = (start, end) => {
//   const step = start < end ? 1 : -1
//   const len = Math.abs(end - start)
//   const arr = Array(len).fill(0).map((x, i) => start +i*step)
//   return arr
// }

// console.log(range(100,9))

