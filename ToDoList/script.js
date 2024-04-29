const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;
const usernameTetxtField = document.getElementById('username');
const recordDisplay = document.getElementById('records');
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem('users');
if (objStr != null) {
  userArray = JSON.parse(objStr);
}

DisplayInfo();
addUserBtn.onclick = () => {
  const task = usernameTetxtField.value;
  if (edit_id != null) {
    // Edit
    userArray.splice(edit_id, 1, { 'task': task })
    edit_id = null;
  } else {
    // Insert
    userArray.push({ 'task': task, 'completed': false });
  }

  SaveInfo(userArray);
  usernameTetxtField.value = '';
  addUserBtn.innerText = btnText;
}

function SaveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem('users', str);
  DisplayInfo();
}

function DisplayInfo() {
  let statement = '';
  userArray.forEach((user, i) => {
    statement += `
      <tr>
        <th scope="row">${i + 1}</th>
        <td>${user.task}</td>
        <td>
          <button class="btn btn-success" onclick="ToggleComplete(${i})">
            ${user.completed ? 'Completed' : 'Not Completed'}
          </button>
          <button class="btn btn-info" onclick="EditInfo(${i})">
            <i class="text-white fa fa-pencil-alt"></i> Edit
          </button>
          <button class="btn btn-danger" onclick="DeleteInfo(${i})">
            <i class="text-white fa fa-trash"></i> Delete
          </button>
        </td>
      </tr>
    `;
  });
  recordDisplay.innerHTML = statement;
}

function ToggleComplete(id) {
  userArray[id].completed = !userArray[id].completed;
  SaveInfo(userArray);
}

function EditInfo(id) {
  edit_id = id;
  usernameTetxtField.value = userArray[id].task;
  addUserBtn.innerText = 'save changes';
}

function DeleteInfo(id) {
  userArray.splice(id, 1);
  SaveInfo(userArray);
}
