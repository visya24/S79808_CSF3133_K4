/*
Error list from the given starter code:

1. grade.html, Line 9:
   onsubmit did not return checkMark().

2. grade.html, Line 19:
   Incorrect JavaScript file name grades.js.
   Correct file name is grade.js.

3. grade.html, Line 17:
   Incorrect function name showtable().
   Correct function name is showTable().

4. grade.js, Line 5:
   Used assignment (=) instead of comparison (===).

5. grade.js, Line 9:
   Incorrect function name isNan().
   Correct function name is isNaN().

6. grade.js, Line 14:
   Used && instead of || for mark validation.

7. grade.js, Line 28:
   Incorrect capitalization getElementByID().
   Correct method is getElementById().

8. grade.js, Line 30:
   Incorrect property style.colour.
   Correct property is style.color.

9. grade.js, Line 38:
   Loop started at 1 and skipped grade A.
   Correct starting index is 0.

10. grade.js, Line 42:
    Incorrect property innerHtml.
    Correct property is innerHTML.

11. grade.js, Line 42:
    Incorrect capitalization of showTable().

12. Added empty mark validation.

13. Added grade-specific result colours.

14. Added Random Mark button.

15. Added date and time when grade is checked.
*/

// Check the student's name and mark
function checkMark() {

    // Get name and mark from the form
    let name = document.forms["gradeForm"]["name"].value.trim();

    let markText = document.forms["gradeForm"]["mark"].value.trim();

    // Validate empty name
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Validate empty mark
    if (markText === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Validate non-numeric mark
    if (isNaN(markText)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Convert mark to number
    let mark = Number(markText);

    // Validate mark range
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine the grade
    let grade;

    if (mark >= 80) {
        grade = "A";
    }

    else if (mark >= 65) {
        grade = "B";
    }

    else if (mark >= 50) {
        grade = "C";
    }

    else {
        grade = "F";
    }

    // Display the result
    const resultElement = document.getElementById("result");

    resultElement.innerHTML =
        name + " got grade " + grade;

    // Change result colour according to grade
    if (grade === "A" || grade === "B") {
        resultElement.style.color = "green";
    }

    else if (grade === "C") {
        resultElement.style.color = "orange";
    }

    else {
        resultElement.style.color = "red";
    }

    // Display date and time when grade was checked
    document.getElementById("checkedTime").innerHTML =
        "Checked on: " + new Date();

    // Prevent the page from refreshing
    return false;
}

// Generate a random whole-number mark from 0 to 100
function randomMark() {

    const randomNumber = Math.floor(Math.random() * 101);

    document.getElementById("mark").value = randomNumber;
}

// Display the grade table
function showTable() {

    // Grade names and mark ranges
    const grades = ["A", "B", "C", "F"];

    const ranges = ["80-100", "65-79", "50-64", "0-49"];

    // Create table heading
    let tableHTML =
        "<table>" +
        "<tr>" +
        "<th>Grade</th>" +
        "<th>Mark range</th>" +
        "</tr>";

    // Add all grades using a for loop
    for (let i = 0; i < grades.length; i++) {

        tableHTML +=
            "<tr>" +
            "<td>" + grades[i] + "</td>" +
            "<td>" + ranges[i] + "</td>" +
            "</tr>";
    }

    // Close the table
    tableHTML += "</table>";

    // Display the table
    document.getElementById("tableContainer").innerHTML =
        tableHTML;
}
