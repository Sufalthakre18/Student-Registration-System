const tableBody = document.getElementById('studentsTableBody');
const tableWrapper = document.getElementById('tableWrapper');

// Function to display all students
function showStudents() {
    let studentsData = localStorage.getItem('students');
    let students = studentsData ? JSON.parse(studentsData) : [];
    
    tableBody.innerHTML = '';
    
    if (students.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                    <p class="text-lg">No students registered yet.</p>
                    <a href="index.html" class="text-purple-600 underline">Register students here</a>
                </td>
            </tr>
        `;
        return;
    }
    
    students.forEach((student) => {
        let row = `
            <tr class="hover:bg-purple-50">
                <td class="px-3 py-4 text-center">${student.studentId}</td>
                <td class="px-3 py-4 text-center">${student.name}</td>
                <td class="px-3 py-4 text-center">${student.email}</td>
                <td class="px-3 py-4 text-center">${student.contact}</td>
                <td class="px-3 py-4 text-center">${student.class}</td>
                <td class="px-3 py-4 text-center">${student.gender}</td>
                <td class="px-3 py-4 text-center space-x-2">
                    <button onclick="editStudent('${student.studentId}')" 
                            class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
                        Edit
                    </button>
                    <button onclick="deleteStudent('${student.studentId}')" 
                            class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
                        Delete
                    </button>
                </td>
            </tr>
        `;
        
        tableBody.innerHTML += row;
    });
    
    if (students.length > 5) {
        tableWrapper.style.maxHeight = '60vh';
        tableWrapper.style.overflowY = 'scroll';
        console.log('Scrollbar added - more than 5 students');
    } else {
        tableWrapper.style.maxHeight = 'none';
        tableWrapper.style.overflowY = 'visible';
    }
}

// Function to delete a student
function deleteStudent(studentId) {
    let confirmDelete = confirm('Are you sure you want to delete this student?');
    
    if (!confirmDelete) {
        return;  
    }
    let studentsData = localStorage.getItem('students');
    let students = studentsData ? JSON.parse(studentsData) : [];
    
    let updatedStudents = students.filter((student) => student.studentId !== studentId);
    
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    
    alert('Student deleted successfully!');
    showStudents();
}

// Function to edit a student
function editStudent(studentId) {
    let studentsData = localStorage.getItem('students');
    let students = studentsData ? JSON.parse(studentsData) : [];
    let student = students.find((s) => s.studentId === studentId);
    
    if (!student) {
        alert('Student not found!');
        return;
    }
    let allRows = tableBody.querySelectorAll('tr');
    let rowToEdit = Array.from(allRows).find((row) => {
        let firstCell = row.querySelector('td');
        return firstCell && firstCell.textContent === studentId;
    });
    
    if (!rowToEdit) return;
    rowToEdit.innerHTML = `
        <td class="px-3 py-4 text-center font-bold">${student.studentId}</td>
        <td class="px-3 py-4">
            <input type="text" value="${student.name}" 
                   id="edit-name-${studentId}"
                   class="w-full px-3 py-2 border-2 border-purple-400 rounded-lg text-center">
        </td>
        <td class="px-3 py-4">
            <input type="email" value="${student.email}" 
                   id="edit-email-${studentId}"
                   class="w-full px-3 py-2 border-2 border-purple-400 rounded-lg text-center">
        </td>
        <td class="px-3 py-4">
            <input type="tel" value="${student.contact}" 
                   id="edit-contact-${studentId}"
                   class="w-full px-3 py-2 border-2 border-purple-400 rounded-lg text-center">
        </td>
        <td class="px-3 py-4">
            <select id="edit-class-${studentId}"
                    class="w-full px-3 py-2 border-2 border-purple-400 rounded-lg text-center">
                <option value="11th" ${student.class === '11th' ? 'selected' : ''}>11th</option>
                <option value="12th" ${student.class === '12th' ? 'selected' : ''}>12th</option>
            </select>
        </td>
        <td class="px-3 py-4">
            <select id="edit-gender-${studentId}"
                    class="w-full px-3 py-2 border-2 border-purple-400 rounded-lg text-center">
                <option value="Male" ${student.gender === 'Male' ? 'selected' : ''}>Male</option>
                <option value="Female" ${student.gender === 'Female' ? 'selected' : ''}>Female</option>
                <option value="Other" ${student.gender === 'Other' ? 'selected' : ''}>Other</option>
            </select>
        </td>
        <td class="px-3 py-4 text-center space-x-2">
            <button onclick="saveStudent('${studentId}')" 
                    class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                Save
            </button>
            <button onclick="showStudents()" 
                    class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg">
                Cancel
            </button>
        </td>
    `;
}

//Function to save edited student
function saveStudent(studentId) {
    let newName = document.getElementById('edit-name-' + studentId).value.trim();
    let newEmail = document.getElementById('edit-email-' + studentId).value.trim();
    let newContact = document.getElementById('edit-contact-' + studentId).value.trim();
    let newClass = document.getElementById('edit-class-' + studentId).value;
    let newGender = document.getElementById('edit-gender-' + studentId).value;
    
    let namePattern = /^[A-Za-z\s]+$/;
    let emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let contactPattern = /^\d{10,15}$/;
    
    if (newName === '') {
        alert('Name cannot be empty!');
        return;
    }
    if (!namePattern.test(newName)) {
        alert('Name should contain only letters!');
        return;
    }
    if (newEmail === '') {
        alert('Email cannot be empty!');
        return;
    }
    if (!emailPattern.test(newEmail)) {
        alert('Please enter a valid email!');
        return;
    }
    if (newContact === '') {
        alert('Contact cannot be empty!');
        return;
    }
    if (!contactPattern.test(newContact)) {
        alert('Contact must be 10-15 digits!');
        return;
    }
    
    let studentsData = localStorage.getItem('students');
    let students = studentsData ? JSON.parse(studentsData) : [];
    
    let studentIndex = students.findIndex((s) => s.studentId === studentId);
    if (studentIndex !== -1) {
        students[studentIndex].name = newName;
        students[studentIndex].email = newEmail;
        students[studentIndex].contact = newContact;
        students[studentIndex].class = newClass;
        students[studentIndex].gender = newGender;
    }
    
    localStorage.setItem('students', JSON.stringify(students));
    
    alert('Student updated successfully!');
    
    showStudents();
}


showStudents();