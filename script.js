
/*
    We replicate the Python "questions_and_majors" structure in JavaScript.
    Each object has:
    - text: The question prompt
    - majors: An array of possible majors incremented if answer is "Y".
*/
const questionsAndMajors = [
    {
    text: "Do you enjoy exploring how things work, such as machines, technology, or systems?",
    majors: ["Computer Science", "Computer Information Systems", "Cyber Security",
                "Electronic Systems Engineering Technology", "Mathematics", "Data Analytics"]
    },
    {
    text: "Are you fascinated by understanding how people think, behave, or interact?",
    majors: ["Psychology", "Sociology", "Applied Behavioral Analysis", "Human Services",
                "Child Developemnt", "Criminology and Criminal Justice", "Spanish"]
    },
    {
    text: "Do you like analyzing data or trends to make decisions or predictions?",
    majors: ["Finance", "Accounting", "Data Analytics", "Marketing", "Management",
                "General Business", "International Management"]
    },
    {
    text: "Do you have a strong interest in creating art, music, or design?",
    majors: ["Communication", "English"]
    },
    {
    text: "Do you enjoy discussing or debating social, political, or ethical issues?",
    majors: ["Political Science", "Philosophy", "History", "Sociology", "Criminology and Criminal Justice"]
    },
    {
    text: "Are you good at remembering and working with detailed information?",
    majors: ["Accounting", "Data Analytics", "Cyber Security", "Finance", "Chemistry"]
    },
    {
    text: "Do you want a career where you can help solve global challenges?",
    majors: ["Water Resources Science & Technology", "Sociology", "Human Services",
                "Community Health", "Biology", "Kinesiology", "Special Education",
                "Interdisciplinary Studies Bilingual Generalists", "Education", "Spanish"]
    }
];

// Dynamically generate the question elements (HTML)
const questionsWrapper = document.getElementById("questionsWrapper");
questionsAndMajors.forEach((q, index) => {
    const container = document.createElement("div");
    container.className = "question-container";
    
    const questionText = document.createElement("div");
    questionText.className = "question-text";
    questionText.innerText = `Q${index + 1}: ${q.text}`;
    
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";
    
    // "Yes" radio
    const yesLabel = document.createElement("label");
    yesLabel.innerHTML = `
    <input type="radio" name="question${index}" value="Y" required />
    Yes
    `;
    
    // "No" radio
    const noLabel = document.createElement("label");
    noLabel.innerHTML = `
    <input type="radio" name="question${index}" value="N" required />
    No
    `;
    
    optionsDiv.appendChild(yesLabel);
    optionsDiv.appendChild(document.createTextNode(" "));
    optionsDiv.appendChild(noLabel);
    
    container.appendChild(questionText);
    container.appendChild(optionsDiv);
    questionsWrapper.appendChild(container);
});

// Event handler for the Submit button
document.getElementById("submit-btn").addEventListener("click", () => {
    // Create a major count object
    const majorCounts = {};

    // Helper function: increments count in majorCounts
    function incrementMajorCount(major) {
    if (majorCounts[major]) {
        majorCounts[major] += 1;
    } else {
        majorCounts[major] = 1;
    }
    }

    // Collect user responses from the form
    questionsAndMajors.forEach((q, index) => {
    const radios = document.getElementsByName(`question${index}`);
    let answer = null;
    for (let r of radios) {
        if (r.checked) {
        answer = r.value;
        break;
        }
    }
    
    // If user answered "Yes", increment each relevant major
    if (answer === "Y") {
        q.majors.forEach(major => incrementMajorCount(major));
    }
    });

    // Determine recommended major(s)
    const majorArray = Object.entries(majorCounts); 
    if (majorArray.length === 0) {
    // Means the user answered "No" to all
    document.getElementById("result-message").innerText =
        "No majors were selected (You answered 'No' to all questions).";
    document.getElementById("result-container").style.display = "block";
    return;
    }

    // Find the maximum count
    let maxCount = 0;
    majorArray.forEach(([_, count]) => {
    if (count > maxCount) {
        maxCount = count;
    }
    });

    // Gather all majors that have the maxCount
    const recommendedMajors = majorArray
    .filter(([_, count]) => count === maxCount)
    .map(([major, _]) => major);

    // Display the results
    if (recommendedMajors.length === 1) {
    document.getElementById("result-message").innerText =
        `Your recommended major is: ${recommendedMajors[0]}`;
    } else {
    let listOfMajors = recommendedMajors.map(m => ` - ${m}`).join("\n");
    document.getElementById("result-message").innerText =
        `There is a tie! The following majors are recommended:\n${listOfMajors}`;
    }
    
    // Show the results container
    document.getElementById("result-container").style.display = "block";
});

// Event handler for the Try Again button
document.getElementById("reset-btn").addEventListener("click", () => {
    // Reset the form
    document.getElementById("questionnaireForm").reset();
    // Hide the result container
    document.getElementById("result-container").style.display = "none";
});