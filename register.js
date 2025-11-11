//  Get all form elements
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const idInput = document.getElementById('studentId');
const emailInput = document.getElementById('email');
const contactInput = document.getElementById('contact');
const classSelect = document.getElementById('class');

//  Validation patterns (Regular Expressions)
const namePattern = /^[A-Za-z\s]+$/;        
const idPattern = /^\d+$/;                 
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;  
const contactPattern = /^\d{10,15}$/;       

// Form Submit Event
form.addEventListener('submit', function(e) {
    e.preventDefault();  
    
    //  input values
    let name = nameInput.value.trim();
    let studentId = idInput.value.trim();
    let email = emailInput.value.trim();
    let contact = contactInput.value.trim();
    let studentClass = classSelect.value;
    let gender = document.querySelector('input[name="gender"]:checked');
    
    // Clear previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('idError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('contactError').textContent = '';
    document.getElementById('classError').textContent = '';
    document.getElementById('genderError').textContent = '';
    
    let isValid = true;  
    
    // Validate Name (only letters and spaces)
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name cannot be empty';
        isValid = false;
    } else if (!namePattern.test(name)) {
        document.getElementById('nameError').textContent = 'Name should contain only letters';
        isValid = false;
    }
    
    // Validate Student ID (only numbers)
    if (studentId === '') {
        document.getElementById('idError').textContent = 'Student ID cannot be empty';
        isValid = false;
    } else if (!idPattern.test(studentId)) {
        document.getElementById('idError').textContent = 'Student ID must be numbers only';
        isValid = false;
    }
    
    // Validate email
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email cannot be empty';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    }
    
    // Validate Contact (10-15 digits)
    if (contact === '') {
        document.getElementById('contactError').textContent = 'Contact cannot be empty';
        isValid = false;
    } else if (!contactPattern.test(contact)) {
        document.getElementById('contactError').textContent = 'Contact must be 10-15 digits';
        isValid = false;
    }
    
    // Validate Class Selection
    if (studentClass === '' || studentClass === null) {
        document.getElementById('classError').textContent = 'Please select a class';
        isValid = false;
    }
    
    // Validate Gender Selection
    if (!gender) {
        document.getElementById('genderError').textContent = 'Please select a gender';
        isValid = false;
    }
    
    if (!isValid) {
        alert('Please fix the errors in the form');
        return;
    }
    
    // Check for duplicate Student ID
    let existingStudents = localStorage.getItem('students');
    let studentsArray = existingStudents ? JSON.parse(existingStudents) : [];
    
    let isDuplicate = studentsArray.some(student => student.studentId === studentId);
    
    if (isDuplicate) {
        document.getElementById('idError').textContent = 'This Student ID already exists';
        alert('Student ID already registered!');
        return;
    }
    
    // Create student object
    let newStudent = {
        name: name,
        studentId: studentId,
        email: email,
        contact: contact,
        class: studentClass,
        gender: gender.value
    };
    
    studentsArray.push(newStudent);
    localStorage.setItem('students', JSON.stringify(studentsArray));
    
    form.reset();
    
    console.log('New student added:', newStudent);
});

// error on input fields
const inputs = [nameInput, idInput, emailInput, contactInput];
const errorIds = ['nameError', 'idError', 'emailError', 'contactError'];

inputs.forEach((input, index) => {
    input.addEventListener('input', function() {
        document.getElementById(errorIds[index]).textContent = '';
    });
});

console.log('Registration form ready!');