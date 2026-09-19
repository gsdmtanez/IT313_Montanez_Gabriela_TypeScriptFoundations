# IT313 - TypeScript Foundations

**Student:** Gabriela Shaine Montañez  
**Course:** IT313 - Mobile Programming  
**Laboratory:** TypeScript Foundations for React Native  
**Project:** Enrollment Eligibility Checker

---

## 1. Project Description

This project is an Enrollment Eligibility Checker developed using TypeScript. It evaluates students based on their Prelim, Midterm, and Final grades. The program calculates the average grade of each enrollee and determines whether the student is Passing or on Probation.

The project demonstrates the use of TypeScript features such as interfaces, type aliases, enums, functions, union types, generics, arrays, `map()`, `reduce()`, Promises, `async/await`, and template literals.

---

## 2. Objectives

The objectives of this laboratory are to:

- Understand the basic syntax and features of TypeScript.
- Use interfaces to define the structure of data.
- Use enums for fixed status values.
- Use type aliases and union types.
- Create typed functions and arrays.
- Use generics with reusable functions.
- Use Promises and `async/await` for asynchronous operations.
- Use `map()` to create eligibility reports.
- Use `reduce()` to calculate the class average.
- Apply TypeScript strict type checking.

---

## 3. Technologies Used

- TypeScript
- Node.js
- ts-node
- Visual Studio Code
- Git
- GitHub

---

## 4. TypeScript Concepts Used

### Interface

The `Enrollee` interface defines the structure of student information:

- `name`
- `prelim`
- `midterm`
- `final`

The `EligibilityReport` interface defines the structure of the generated eligibility report.

Example:

```typescript
interface Enrollee {
  name: string;
  prelim: number;
  midterm: number;
  final: number;
}

### Enum

The EnrollmentStatus enum stores the two possible enrollment statuses:

export enum EnrollmentStatus {
  Passing = "PASSING",
  Probation = "PROBATION"
}

The enum is used whenever the student's enrollment status is stored or compared.

### Type Alias and Union Type

The project uses a BatchId type alias with a union type:
type BatchId = string | number;

This means that a batch ID can either be a string or a number. 
The program uses typeof to determine whether the value is a string or a number.

Example:

if (typeof batchId === "string") {
  console.log(`Batch ID: ${batchId.toUpperCase()}`);
} else {
  console.log(`Batch ID: ${batchId}`);
}

### Functions

The project uses typed functions to perform specific tasks.
The computeAverage() function calculates the average of the Prelim, Midterm, and Final grades.

function computeAverage(
  prelim: number,
  midterm: number,
  final: number
): number

The getStatus() function determines whether a student is Passing or on Probation based on the computed average.

### Generics

The project includes a generic groupBy() function:

function groupBy<T>(
  items: T[],
  keyFn: (item: T) => string
): Record<string, T[]>

The generic function allows the program to group different types of data based on a specified key.
In this project, it is used to group eligibility reports according to their enrollment status.

### Map

The map() method is used to transform the list of enrollees into an array of typed EligibilityReport objects.
Each enrollee's average and enrollment status are calculated while creating the report.

### Reduce

The reduce() method is used to calculate the total of all student averages.
The total is then divided by the number of enrollees to calculate the class average.

### Promises and Async/Await

The getEnrollees() function returns a Promise containing the enrollee data.
A short delay is used to simulate retrieving data from a registrar system.

The generateReport() function uses async/await to wait for the enrollee data and uses try/catch to handle possible errors.

### Template Literals

Template literals are used to display the report in a readable format.

Example:

console.log(
  `${report.name.padEnd(12)} - Average: ${report.average.toFixed(2)} - ${report.status}${remarks}`
);

---

## 5. Interface vs Type Alias

An interface is used to describe the structure of objects.

For example, the Enrollee interface describes the properties that every enrollee must have:

interface Enrollee {
  name: string;
  prelim: number;
  midterm: number;
  final: number;
}

A type alias is used to create a custom type. In this project, the BatchId type alias allows a value to be either a string or a number:

type BatchId = string | number;

The main difference demonstrated in this project is that interfaces are used to define object structures, while the type alias is used to define a union type.

---

## 6. Project Structure
IT313_Montanez_Gabriela_TypeScriptFoundations/
│
├── src/
│   ├── gradeUtils.ts
│   └── main.ts
│
├── node_modules/
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
└── README.md
File Descriptions

src/gradeUtils.ts

Contains:

EnrollmentStatus enum
computeAverage() function
getStatus() function

src/main.ts

Contains:

Enrollee interface
EligibilityReport interface
BatchId union type
getEnrollees() Promise
groupBy() generic function
map() processing
reduce() calculation
async/await
Report output

tsconfig.json

Contains the TypeScript compiler configuration, including strict type checking.

README.md

Contains the documentation for the project.

---

## 7. How to Run the Project
Step 1: Install Dependencies

Open the terminal in the project folder and run:

npm install
Step 2: Check the TypeScript Version

Run:

npx tsc --version

The project uses TypeScript version:

Version 5.9.3
Step 3: Check for TypeScript Errors

Run:

npx tsc --noEmit

If there are no errors, the TypeScript project passes the type check.

Step 4: Run the Program

Run:

npx ts-node src/main.ts

The program will generate the enrollment eligibility report in the terminal.


---

## 8. Expected Output
Batch ID: IT313-2026-03

=== IT313 Enrollment Eligibility Report (TypeScript) ===
Ana Cruz     - Average: 87.67 - PASSING
Bea Santos   - Average: 65.00 - PROBATION - Needs consultation
Cid Ramos    - Average: 94.67 - PASSING
Dex Alonzo   - Average: 55.00 - PROBATION - Needs consultation
Eli Tan      - Average: 78.00 - PASSING
Class Average: 76.07
Passing: 3 / 5

Students with an average of 75 or higher are classified as PASSING.

Students with an average below 75 are classified as PROBATION and receive the remark:

Needs consultation

--- 

## 9. TypeScript Configuration

The project uses a tsconfig.json file to configure the TypeScript compiler.

The project uses strict type checking:

"strict": true

Strict mode helps detect type-related errors during development before the program is executed.

The project also uses:

"rootDir": "./src",
"outDir": "./dist"

The source TypeScript files are stored inside the src folder, while compiled JavaScript files can be placed inside the dist folder

---

## 10. Type Checking Demonstration

As part of the laboratory activity, a deliberate type error was introduced by assigning a Boolean value to the BatchId variable.

Example:

const batchId: BatchId = true;

This produces a TypeScript compile-time error because BatchId only accepts a string or number.

The error was fixed by changing the value back to a valid type:

const batchId: BatchId = "IT313-2026-03";

After fixing the error, the command:

npx tsc --noEmit

completed without errors.

---

## 11. Conclusion

This laboratory provided practical experience with TypeScript and its type-safe features. The Enrollment Eligibility Checker demonstrates how TypeScript can make JavaScript applications more structured and easier to maintain. The project also shows how interfaces, enums, union types, generics, asynchronous programming, map(), reduce(), and strict type checking can be combined in one application.