let form = document.querySelector('form')
let nameInput = document.getElementById('name')
let idInput = document.getElementById('studentId')
let emailInput = document.getElementById('email')
let contactInput = document.getElementById('tel')
let selectClass = document.getElementById('class')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = {};
    const reId = /^\d+$/;
    const reContact = /^\d{10,15}$/;
    const reEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let valid = true;

    if (nameInput.value.trim() === '') {
        alert("Name cannot be empty");
        valid = false;
    } else {
        data.name = nameInput.value.trim();
    }
    if (!reId.test(idInput.value.trim())) {
        alert("Student ID must be numeric");
        valid = false;
    } else {
        data.studentId = idInput.value.trim();
    }
    if (!reEmail.test(emailInput.value.trim())) {
        alert("Invalid Email format");
        valid = false;
    } else {
        data.email = emailInput.value.trim();
    }
    if (!reContact.test(contactInput.value.trim())) {
        alert("Contact number must be 10 to 15 digits");
        valid = false;
    } else {
        data.contact = contactInput.value.trim();
    }
    if (!selectClass.value) {
        alert("Please select your class");
        valid = false;
    } else {
        data.class = selectClass.value;
    }

    let genderInput = document.querySelector('input[name="gender"]:checked');
    if (!genderInput) {
        alert("Please select your gender");
        valid = false;
    } else {
        data.gender = genderInput.value;
    }
    if (!valid) return;

    const raw = localStorage.getItem('students'); // store under 'students'
    const students = raw ? JSON.parse(raw) : [];

    const exists = students.some(s => s.studentId === data.studentId);
    if (exists) {
        alert("Student ID already exists!");
        return;
    }

    students.push(data);
    localStorage.setItem('students', JSON.stringify(students));
    console.log("Saved student:", data);
    alert("Student registered successfully!");
    form.reset();

})
