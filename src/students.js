
// -------------------------------------------------------
// For displaying students on Students.html
// -------------------------------------------------------
const raw = localStorage.getItem('students');
const students = raw ? JSON.parse(raw) : [];
function displayStudents() {

    const tableBody = document.querySelector('tbody');
    if (!tableBody) return;
    tableBody.innerHTML = ''; // clear existing rows

    students.forEach((student) => {
        const row = `
      <tr class="hover:bg-gray-100 transition duration-300 border border-gray-200">
        <td class="py-3 px-2 font-medium">${student.studentId}</td>
        <td class="py-3 px-2">${student.name}</td>
        <td class="py-3 px-2">${student.email}</td>
        <td class="py-3 px-2">${student.contact}</td>
        <td class="py-3 px-2">${student.class}</td>
        <td class="py-3 px-2 space-x-2">
          <button onclick="editStudent('${student.studentId}')" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg shadow-sm">Edit</button>
          <button onclick="deleteStudent('${student.studentId}')" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg shadow-sm">Delete</button>
        </td>
      </tr>
    `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}


displayStudents();
function deleteStudent(studentId) {
    const idx=students.some((s=>s.studentId===studentId))
    if(!idx){
        alert("Student not found!");
        return;
    }else{
        localStorage.setItem('students',JSON.stringify(students.filter(s=>s.studentId!==studentId)));
        alert("Student deleted successfully!");
        location.reload();
    }
}

function editStudent(studentId) {
    
}