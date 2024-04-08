// Define an object for number operations
const numberHandlerExercise1 = {
  numbers: [10, 20, 30, 40, 50],
  // Method to calculate the average of all numbers in the array
  calculateAverage() {
    // TODO: Implement a method to calculate the average of all numbers in the array
    let sum = 0
    this.numbers.map((num) => sum = sum + num)
    return sum/this.numbers.length
  },
  // Method to find the median of the array
  findMedian() {
    let sortedNumbers = this.numbers.sort()
    if (sortedNumbers.length % 2 === 0){
      let middleElement = sortedNumbers.length / 2
      return (sortedNumbers[middleElement -1] + sortedNumbers[middleElement]) / 2
    }else{
      let middleElement = (sortedNumbers.length - 1) / 2
      return sortedNumbers[middleElement]
    }

  },
  // Method to find the mode of the array
  findMode() {
    // TODO: Implement a method to find the mode of the array
    let obj = {}
    for (let i = 0; i < this.numbers.length; i++) {
      if(this.numbers[i] in obj){
        obj[this.numbers[i]] = obj[this.numbers[i]] + 1
      }else{
        obj[this.numbers[i]] = 0
      }
    }
    let maximum = 0
    let mode = -1
    for (let key in obj){
      if(obj[key] > maximum){
        maximum = obj[key]
        mode = key
      }
    }

    return mode
  },
  // Method to raise each number to the power of 3
  powerOfThree() {
    // TODO: Implement a method to raise each number to the power of 3
    let arr = []
    this.numbers.forEach((nums) => {
      arr.push(nums * nums * nums)
    })
    return arr
  },
  // Method to calculate the factorial of each number in the array
  calculateFactorials() {
    // TODO: Implement a method to calculate the factorial of each number in the array

    let arr = []
    for (let i = 0; i < this.numbers.length; i++){
      let factorial = 1
      for(let j = this.numbers[i]; j > 0; j--){
        factorial = factorial * j
      }
      arr[i] = factorial
    }

    return arr
  },
  // Method to demonstrate asynchronous operation using promises
  asyncOperation() {
    // TODO: Implement an asynchronous operation using promises
    const promise = new Promise((resolve, reject) => {
      fetch('https://jsonplaceholder.typicode.com/todos/1')
          .then(response => {
            if(response.ok){
              resolve(response.json())
            }else {
              reject("Error Fetching Data")
            }
          })
          .catch(error => reject())
    })

    return promise
  },
  // Method to demonstrate type coercion
  typeCoercionDemo() {
    let intElement = 20
    let StringElement = "20"
    let result = intElement + StringElement
    console.log(typeof result)

    console.log (StringElement == intElement)
    console.log (StringElement === intElement)


  }
};
// Test the number methods
console.log('Average:', numberHandlerExercise1.calculateAverage());
console.log('Median:', numberHandlerExercise1.findMedian());
console.log('Mode:', numberHandlerExercise1.findMode());
console.log('Numbers after power of three:', numberHandlerExercise1.powerOfThree());
console.log('Factorials:', numberHandlerExercise1.calculateFactorials());
// Demonstrate asynchronous operation with promises
numberHandlerExercise1.asyncOperation()
    .then(result => {
      console.log(result);
    });
// Demonstrate type coercion
numberHandlerExercise1.typeCoercionDemo();
console.log('End of script execution. Event loop continues...');

export default function App() {
  return(
      <>

      </>
  )
}