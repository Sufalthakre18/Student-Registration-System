
// -------------------------------------------------------
// For displaying students on Students.html
// -------------------------------------------------------
const raw = localStorage.getItem('students');
const students = raw ? JSON.parse(raw) : [];
function displayStudents() {

    const tableBody = document.querySelector('tbody');
    if (!tableBody) return;
    tableBody.innerHTML = ''; // clear existing rows

    if (students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="py-4 text-gray-500 italic">No students registered yet.</td></tr>`;
        return;
    }

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
    const idx = students.some((s => s.studentId === studentId))
    if (!idx) {
        alert("Student not found!");
        return;
    } else {
        const updated = students.filter(s => s.studentId !== studentId)
        localStorage.setItem('students', JSON.stringify(updated));
        alert("Student deleted successfully!");
        location.reload();
    }
    displayStudents();
}

function editStudent(studentId) {
  console.log("Edit clicked for:", studentId);

  const raw = localStorage.getItem('students');
  let students = raw ? JSON.parse(raw) : [];

  const student = students.find(s => s.studentId === studentId);
  if (!student) {
    alert("Student not found!");
    return;
  }

  // find the table row
  const row = Array.from(document.querySelectorAll('tbody tr')).find(r =>
    r.querySelector('td')?.textContent === studentId
  );

  if (!row) return;

  // replace row with editable inputs
  row.innerHTML = `
    <td class="py-3 px-2 font-medium">${student.studentId}</td>
    <td class="py-3 px-2"><input type="text" value="${student.name}" class="border rounded p-1 w-full"></td>
    <td class="py-3 px-2"><input type="email" value="${student.email}" class="border rounded p-1 w-full"></td>
    <td class="py-3 px-2"><input type="tel" value="${student.contact}" class="border rounded p-1 w-full"></td>
    <td class="py-3 px-2">
      <select class="border rounded p-1 w-full">
        <option value="11th" ${student.class === '11th' ? 'selected' : ''}>11th</option>
        <option value="12th" ${student.class === '12th' ? 'selected' : ''}>12th</option>
      </select>
    </td>
    <td class="py-3 px-2 space-x-2">
      <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded" id="saveBtn">Save</button>
      <button class="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-1 px-2 rounded" id="cancelBtn">Cancel</button>
    </td>
  `;

  // ✅ handle save
  row.querySelector('#saveBtn').addEventListener('click', () => {
    const updated = {
      studentId: student.studentId, 
      name: row.querySelector('input[type="text"]').value.trim(),
      email: row.querySelector('input[type="email"]').value.trim(),
      contact: row.querySelector('input[type="tel"]').value.trim(),
      class: row.querySelector('select').value,
      gender:student.gender
    };

    if (!updated.name || !updated.email || !updated.contact) {
      alert("All fields are required!");
      return;
    }

    // replace in localStorage
    students = students.map(s =>
      s.studentId === studentId ? updated : s
    );

    localStorage.setItem('students', JSON.stringify(students));
    alert("Student updated successfully!");
    
    displayStudents();
    document.location.reload();
  });

  // ✅ handle cancel
  row.querySelector('#cancelBtn').addEventListener('click', () => {
    displayStudents(); // reload the table view
  });
}
