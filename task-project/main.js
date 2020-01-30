const taskList = {}
var unique_id = 0
document.getElementById('addSubBut').addEventListener('click', function (event) {
    event.preventDefault()
    var form = document.getElementById("addTask");
    taskList[unique_id + 1] = {
        name: form['name'].value,
        priority: form['priority'].value,
        deadline: form['deadline'].value,
        description: form['description'].value
    }

    unique_id++
    addItems()
    form.reset()
    closeForm()
});


document.getElementById('editSubBut').addEventListener('click', function (event) {
    event.preventDefault()
    var form = document.getElementById("editTask");
    var editButtonId = document.getElementById('editSubBut').getAttribute('data-id')
    taskList[editButtonId] = {
        name: form['editName'].value,
        priority: form['editPriority'].value,
        deadline: form['editDeadline'].value,
        description: form['editDescription'].value
    }


    var row = document.getElementById(editButtonId)

    row.cells[0].innerHTML = taskList[editButtonId].name
    row.cells[1].innerHTML = taskList[editButtonId].priority
    row.cells[2].innerHTML = taskList[editButtonId].deadline
    row.cells[3].innerHTML = taskList[editButtonId].description

    closeEditForm()

});





function addItems() {
    var taks_id = Object.keys(taskList).length
    if (taks_id > 0) {
        if (unique_id == 1) {
            var table = document.createElement("TABLE")
            table.setAttribute("id", 'taskTable')
            document.getElementById('tableDiv').appendChild(table)
            for (let task of Object.values(taskList)) {
                Object.keys(task).forEach(header => {
                    var tableHead = document.createElement('TH');
                    // tableHead.style.textAlign = 'center'
                    tableHead.innerHTML = header.toUpperCase()
                    document.getElementById("taskTable").appendChild(tableHead);
                })
            }
            var tableHead = document.createElement('TH');
            tableHead.innerHTML = 'OPTIONS'
            document.getElementById("taskTable").appendChild(tableHead);

        }



        for (let i of Object.keys(taskList)) {
            if (!document.getElementById(i)) {
                var tableRow = document.createElement("TR");
                tableRow.setAttribute("id", i);
                document.getElementById("taskTable").appendChild(tableRow);

                Object.values(taskList[i]).forEach((values,index) => {
                
                    var tableData = document.createElement("TD");
                    tableData.style.textAlign = 'center'
                    var data = document.createTextNode(values);
                    tableData.appendChild(data)
                    // tableData.style.wordBreak = 'break-all'  
                    // tableData.style['overflow-y'] = 'auto'
                    // tableData.style['height'] = '50px'
                    document.getElementById(i).appendChild(tableData);

                })
                var tableData = document.createElement("TD");
                var edit = document.createElement('input');
                edit.type = "button";
                edit.value = '\u270E';
                edit.setAttribute('data', i)
                edit.className = 'option-btn-edit'
                edit.onclick = function () { editButton(this) }
                edit.title = 'Edit this Task!'
                tableData.appendChild(edit)
                document.getElementById(i).appendChild(tableData);

                var remove = document.createElement('input');
                remove.type = "button";
                remove.value = '\u2718';
                remove.setAttribute('data', i)
                remove.className = 'option-btn-remove'
                remove.onclick = function () { removeButton(this) }
                remove.title = 'Remove this Task!'
                tableData.appendChild(remove)
                document.getElementById(i).appendChild(tableData);


            }

        }
    }
}



function editButton(row) {
    var reference = row.getAttribute('data')
    document.getElementById('editFormDiv').style.display = 'block'
    var form = document.getElementById("editTask");
    form['editName'].value = taskList[reference].name
    form['editPriority'].value = taskList[reference].priority
    if (taskList[reference].deadline) {
        form['editDeadline'].value = taskList[reference].deadline
    }
    form['editDescription'].value = taskList[reference].description
    document.getElementById('editName').focus()

    document.getElementById('editSubBut').setAttribute('data-id', reference)
}

function closeEditForm() {
    document.getElementById('editFormDiv').style.display = 'none'
}


function removeButton(row) {
    var reference = row.getAttribute('data')
    delete taskList[reference]
    var table = document.getElementById("taskTable")
    table.deleteRow(row.parentNode.parentNode.rowIndex)

}



function openForm() {
    document.getElementById('addFormDiv').style.display = 'block'
    document.getElementById('name').focus()
}

function closeForm() {
    document.getElementById('addFormDiv').style.display = 'none'
}