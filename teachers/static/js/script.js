document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('menu').addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const action = event.target.textContent.trim();
            switch (action) {
                case 'Show All Teachers':
                    showAllTeachers();
                    break;
                case 'Add a Teacher':
                    showAddTeacherForm();
                    break;
                case 'Filter Teachers':
                    showFilterForm();
                    break;
                case 'Search for a Teacher':
                    showSearchForm();
                    break;
                case 'Update a Teacher\'s Record':
                    showUpdateForm();
                    break;
                case 'Delete a Teacher':
                    showDeleteForm();
                    break;
                case 'Calculate Average Classes':
                    calculateAverageClasses();
                    break;
                default:
                    console.error('Unknown action:', action);
            }
        }
    });

    function showAllTeachers() {
        fetch('/api/teachers')
            .then(response => response.json())
            .then(data => {
                let content = '<h2>All Teachers</h2><ul>';
                data.forEach(teacher => {
                    content += `<li>${teacher.name} - ${teacher.age} years old</li>`;
                });
                content += '</ul>';
                document.getElementById('content').innerHTML = content;
            });
    }

    function showAddTeacherForm() {
        let content = `
            <h2>Add a Teacher</h2>
            <form id="add-teacher-form">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br>
                <label for="age">Age:</label>
                <input type="number" id="age" name="age" required><br>
                <label for="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" required><br>
                <label for="num_classes">Number of Classes:</label>
                <input type="number" id="num_classes" name="num_classes" required><br>
                <button type="submit">Add Teacher</button>
            </form>`;
        document.getElementById('content').innerHTML = content;
        document.getElementById('add-teacher-form').addEventListener('submit', addTeacher);
    }

    function addTeacher(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        fetch('/api/teachers', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            showAllTeachers();
        });
    }

    function showFilterForm() {
        let content = `
            <h2>Filter Teachers</h2>
            <form id="filter-form">
                <label for="age">Age:</label>
                <input type="number" id="age" name="age"><br>
                <label for="num_classes">Number of Classes:</label>
                <input type="number" id="num_classes" name="num_classes"><br>
                <button type="submit">Filter Teachers</button>
            </form>`;
        document.getElementById('content').innerHTML = content;
        document.getElementById('filter-form').addEventListener('submit', filterTeachers);
    }

    function filterTeachers(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const params = new URLSearchParams(Object.fromEntries(formData.entries()));

        fetch(`/api/teachers/filter?${params.toString()}`)
            .then(response => response.json())
            .then(data => {
                let content = '<h2>Filtered Teachers</h2><ul>';
                data.forEach(teacher => {
                    content += `<li>${teacher.name} - ${teacher.age} years old</li>`;
                });
                content += '</ul>';
                document.getElementById('content').innerHTML = content;
            });
    }

    function showSearchForm() {
        let content = `
            <h2>Search for a Teacher</h2>
            <form id="search-form">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br>
                <button type="submit">Search</button>
            </form>`;
        document.getElementById('content').innerHTML = content;
        document.getElementById('search-form').addEventListener('submit', searchTeachers);
    }

    function searchTeachers(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const params = new URLSearchParams(Object.fromEntries(formData.entries()));

        fetch(`/api/teachers/search?${params.toString()}`)
            .then(response => response.json())
            .then(data => {
                let content = '<h2>Search Results</h2><ul>';
                data.forEach(teacher => {
                    content += `<li>${teacher.name} - ${teacher.age} years old</li>`;
                });
                content += '</ul>';
                document.getElementById('content').innerHTML = content;
            });
    }

    function showUpdateForm() {
        let content = `
            <h2>Update a Teacher's Record</h2>
            <form id="update-form">
                <label for="teacher_id">Teacher ID:</label>
                <input type="number" id="teacher_id" name="teacher_id" required><br>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br>
                <label for="age">Age:</label>
                <input type="number" id="age" name="age" required><br>
                <label for="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" required><br>
                <label for="num_classes">Number of Classes:</label>
                <input type="number" id="num_classes" name="num_classes" required><br>
                <button type="submit">Update Teacher</button>
            </form>`;
        document.getElementById('content').innerHTML = content;
        document.getElementById('update-form').addEventListener('submit', updateTeacher);
    }

    function updateTeacher(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const teacherId = formData.get('teacher_id');
        const data = Object.fromEntries(formData.entries());

        fetch(`/api/teachers/${teacherId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            showAllTeachers();
        });
    }

    function showDeleteForm() {
        let content = `
            <h2>Delete a Teacher</h2>
            <form id="delete-form">
                <label for="teacher_id">Teacher ID:</label>
                <input type="number" id="teacher_id" name="teacher_id" required><br>
                <button type="submit">Delete Teacher</button>
            </form>`;
        document.getElementById('content').innerHTML = content;
        document.getElementById('delete-form').addEventListener('submit', deleteTeacher);
    }

    function deleteTeacher(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const teacherId = formData.get('teacher_id');

        fetch(`/api/teachers/${teacherId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            showAllTeachers();
        });
    }

   
});
