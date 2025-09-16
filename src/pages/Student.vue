<template>
  <div class="container">
    <h1>Student Form</h1>
    <form @submit.prevent="createStudent">
      <label for="studentID">Student ID</label>
      <input type="text" id="studentID" v-model="studentID" required>

      <label for="section">Section</label>
      <input type="text" id="section" v-model="section">

      <hr>

      <label for="firstName">First Name</label>
      <input type="text" id="firstName" v-model="firstName">

      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model="lastName">

      <input type="submit" value="Add Student">
    </form>

    <hr>
    <h2>All Students</h2>
    <button @click="fetchStudents">Refresh List</button>
    <ul>
      <li v-for="student in students" :key="student.studentID">
        <strong>{{ student.studentID }}</strong> - {{ student.firstName }} {{ student.lastName }} ({{ student.section }})
        <button @click="editStudent(student)">Edit</button>
        <button @click="deleteStudent(student.studentID)">Delete</button>
      </li>
    </ul>

    <div v-if="editing">
      <h2>Edit Student</h2>
      <form @submit.prevent="updateStudent">
        <label for="editSection">Section</label>
        <input type="text" id="editSection" v-model="editSection">

        <label for="editFirstName">First Name</label>
        <input type="text" id="editFirstName" v-model="editFirstName">

        <label for="editLastName">Last Name</label>
        <input type="text" id="editLastName" v-model="editLastName">

        <input type="submit" value="Update Student">
        <button @click="cancelEdit" type="button">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    return {
      studentID: '',
      section: '',
      firstName: '',
      lastName: '',
      students: [],
      editing: false,
      editID: '',
      editSection: '',
      editFirstName: '',
      editLastName: '',
    };
  },
  methods: {
    async fetchStudents() {
      const res = await fetch('/students');
      this.students = await res.json();
    },
    async createStudent() {
      const body = {
        studentID: this.studentID,
        section: this.section,
        firstName: this.firstName,
        lastName: this.lastName,
      };
      const res = await fetch('/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        this.studentID = this.section = this.firstName = this.lastName = '';
        this.fetchStudents();
      } else {
        alert('Error adding student');
      }
    },
    editStudent(student) {
      this.editing = true;
      this.editID = student.studentID;
      this.editSection = student.section;
      this.editFirstName = student.firstName;
      this.editLastName = student.lastName;
    },
    async updateStudent() {
      const body = {
        section: this.editSection,
        firstName: this.editFirstName,
        lastName: this.editLastName,
      };
      const res = await fetch(`/students/${this.editID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        this.editing = false;
        this.editID = this.editSection = this.editFirstName = this.editLastName = '';
        this.fetchStudents();
      } else {
        alert('Error updating student');
      }
    },
    async deleteStudent(id) {
      const res = await fetch(`/students/${id}`, { method: 'DELETE' });
      if (res.ok) {
        this.fetchStudents();
      } else {
        alert('Error deleting student');
      }
    },
    cancelEdit() {
      this.editing = false;
      this.editID = this.editSection = this.editFirstName = this.editLastName = '';
    },
  },
  mounted() {
    this.fetchStudents();
  },
};
</script>

<style scoped>
.form-center {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff4e6;
}
.container {
  background: white;
  padding: 24px 28px;
  border-radius: 12px;
  width: 320px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
}
h1 {
  text-align: center;
  color: #e86a00;
}
label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
  color: #402810;
}
input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #b35600;
  border-radius: 4px;
  box-sizing: border-box;
}
input[type="submit"] {
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  background: #e86a00;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
input[type="submit"]:hover {
  background: #b35600;
}
hr {
  margin: 15px 0;
  border: 0;
  border-top: 1px solid #e86a00;
}
</style>
