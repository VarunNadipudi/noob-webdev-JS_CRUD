//t is an array object which will store the student records used in searching for records
let t = [];

function createRecord(){
  //getting the data from the inputs and inserting it to cells of new row.

  var stdId = document.getElementById("stdid").value;
  var stdName = document.getElementById("stdname").value;
  var stdStream = document.getElementById("stdstream").value;
  var stdMarks = parseInt(document.getElementById("stdmarks").value);
  var table = document.getElementById("MyDynamicTable");

  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);

  row.insertCell(0).innerHTML = stdId;
  row.insertCell(1).innerHTML = stdName;
  row.insertCell(2).innerHTML = stdStream;
  row.insertCell(3).innerHTML = stdMarks;
  row.insertCell(4).innerHTML = '<input type="button" value = "Edit" onClick="editRow(this)">';
  row.insertCell(5).innerHTML = '<input type="button" value = "Delete" onClick="delRow(this)">';

  document.getElementById("stdid").value = "";
  document.getElementById("stdname").value = "";
  document.getElementById("stdstream").value = "";
  document.getElementById("stdmarks").value = "";

  //creating this record to push it to 't'
  //so that all the records are present in 't' and use it for searching
  let record = {
    StudentId:stdId,
    StudentName:stdName,
    StudentStream:stdStream,
    StudentMarks:stdMarks,
  }
  t.push(record);
  //MyDynamicTableBody.remove();
  //console.log(t);
}

function delRow(obj){
  var index = obj.parentNode.parentNode.rowIndex;
  var table = document.getElementById("MyDynamicTable");
  table.deleteRow(index);

  //updating array object 't'
  t.splice(index-1,1);
  //console.log(t);
}

function editRow(obj){

  //onclick of edit Add record is made invisible and save record is made visible
  document.getElementById("save_record").style.display = "block";
  document.getElementById("create_record").style.display = "none";

  //here r is made global variable so that on saving record we use r and we exactly know which row is to be saved
  r = obj.parentNode.parentNode;
  var index = r.rowIndex;

  //updating array object 't'
  t.splice(index-1,1);

  //updating the inputs with the table cells to edit them
  document.getElementById("stdid").value = r.cells[0].innerHTML;
  document.getElementById("stdname").value = r.cells[1].innerHTML;
  document.getElementById("stdstream").value = r.cells[2].innerHTML;
  document.getElementById("stdmarks").value = r.cells[3].innerHTML;
}

function saveRecord(){
  //saving the changes into the table
  r.cells[0].innerHTML = document.getElementById("stdid").value;
  r.cells[1].innerHTML = document.getElementById("stdname").value;
  r.cells[2].innerHTML = document.getElementById("stdstream").value;
  r.cells[3].innerHTML = document.getElementById("stdmarks").value;

  //since on edit we removed the record that needs to be updated, so on save we are making a new record with all the changes and pushing it to the array object 't'
  let record = {
    StudentId:document.getElementById("stdid").value,
    StudentName:document.getElementById("stdname").value,
    StudentStream:document.getElementById("stdstream").value,
    StudentMarks:document.getElementById("stdmarks").value,
  }
  var index = r.rowIndex;
  t.splice(index,0,record);
  //console.log(t);

  //making the inputs to original state after saving the changes
  document.getElementById("stdid").value="";
  document.getElementById("stdname").value="";
  document.getElementById("stdstream").value="";
  document.getElementById("stdmarks").value="";

  //onclick of save record it becomes invisible and add records is made visible
  document.getElementById("save_record").style.display = "none";
  document.getElementById("create_record").style.display = "block";
}

function searchRecord(){

  //getting the details to be searched from the inputs
  var stdId = document.getElementById("sstdid").value;
  var stdName = document.getElementById("sstdname").value;
  var stdStream = document.getElementById("sstdstream").value;
  /*console.log(stdId);
  console.log(stdName);
  console.log(stdStream);*/
  var table = document.getElementById("MyDynamicSearchTable");

  //if we need search by student id then below if is evaluated
  if(stdId != null && (stdName=="" && stdStream=="")){
    //search using employee empId
    var flag = false;
    for(var item of t){
      if(item.StudentId==stdId){
        var rowCount = table.rows.length;
        //console.log(rowCount);
        var row = table.insertRow(rowCount);

        row.insertCell(0).innerHTML = item.StudentId;
        row.insertCell(1).innerHTML = item.StudentName;
        row.insertCell(2).innerHTML = item.StudentStream;
        row.insertCell(3).innerHTML = item.StudentMarks;
        flag = true;
      }
    }

    if(!flag){
      alert("Student Details Not Found!");
      document.getElementById("search_record").style.display = "block";
      document.getElementById("clear_record").style.display = "none";
    }
    else{
      document.getElementById("search_record").style.display = "none";
      document.getElementById("clear_record").style.display = "block";
    }
  }

  //if we wanted to search based on Student name the below of is evaluated
  if(stdName != null && (stdId=="" && stdStream=="")){
    //search using employee Name
    var flag = false;
    for(var item of t){
      if(item.StudentName==stdName){
        var rowCount = table.rows.length;
        //console.log(rowCount);
        var row = table.insertRow(rowCount);

        row.insertCell(0).innerHTML = item.StudentId;
        row.insertCell(1).innerHTML = item.StudentName;
        row.insertCell(2).innerHTML = item.StudentStream;
        row.insertCell(3).innerHTML = item.StudentMarks;
        flag = true;
      }
    }
    if(!flag){
      alert("Student Details Not Found!");
      document.getElementById("search_record").style.display = "block";
      document.getElementById("clear_record").style.display = "none";
    }
    else{
      document.getElementById("search_record").style.display = "none";
      document.getElementById("clear_record").style.display = "block";
    }
  }

  //If we wanted to search by the student stream below if condition is followed
  if(stdStream != null && (stdName=="" && stdId=="")){
    //search using employee empDept
    var flag = false;
    for(var item of t){
      if(item.StudentStream==stdStream){
        var rowCount = table.rows.length;
        //console.log(rowCount);
        var row = table.insertRow(rowCount);

        row.insertCell(0).innerHTML = item.StudentId;
        row.insertCell(1).innerHTML = item.StudentName;
        row.insertCell(2).innerHTML = item.StudentStream;
        row.insertCell(3).innerHTML = item.StudentMarks;
        flag = true;
      }
    }

    if(!flag){
      alert("Student Details Not Found!");
      document.getElementById("search_record").style.display = "block";
      document.getElementById("clear_record").style.display = "none";
    }
    else{
      document.getElementById("search_record").style.display = "none";
      document.getElementById("clear_record").style.display = "block";
    }
  }
}

//this function is used to clear the search inputs and the search results in the table.
function clearTable(){

  document.getElementById("sstdid").value="";
  document.getElementById("sstdname").value="";
  document.getElementById("sstdstream").value="";
  var table = document.getElementById("MyDynamicSearchTable");

  //going through all the search results and deleting them from the table but not from the array object 't'
  var rowCount = table.rows.length;
  while(rowCount>1){
    table.deleteRow(rowCount-1);
    rowCount--;
  }

  //onclick of clear we are hiding it and making search visible again.
  document.getElementById("search_record").style.display = "block";
  document.getElementById("clear_record").style.display = "none";
  
}


