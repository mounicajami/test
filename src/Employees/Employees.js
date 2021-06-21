
import { useEffect, useState } from 'react';
import {Table} from 'reactstrap';
import axios from "axios";
import './Employees.css';
function Employees() {
    const url = "http://localhost:3000/employees";
    const [tableData, setTableData] = useState([]);
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isEditMode, setEditMode] = useState(false);

    const loadData = () => {
        axios.get(url).then(response => {
          setTableData(response.data);
        })
    }
    useEffect(() =>{
        loadData();
    }, []);

    function addRecord(){
        console.log("add record");
        axios.post(url, {
            "id" : id,
            "first_name":firstName,
            "last_name": lastName,
            "email":email
        }).then(response => {
            console.log("data added successfully");
            loadData();
        }).catch(err => console.log(err));
    }

    function updateRecord() {
        console.log("update record");
        axios.put(url+"/"+id, {
            "id" : id,
            "first_name":firstName,
            "last_name": lastName,
            "email":email
        }).then(res => {
            console.log("data updated successfully");
            setEditMode(false);
            loadData();
           clearInputs();
        })
    }

    function clearInputs() {
        console.log("clear inputs");
        setId("");
        setFirstName("");
        setLastName("");
        setEmail("");
    }

    function deleteRecord(id) {
        axios.delete(url+"/"+id).then(res => {
            console.log("record is deleted");
            loadData();
        }).catch(err => console.log(err));

    }

    function getEmployeeDetailById(id) {
        axios.get(url+"/"+id).then(res => {
            let emp = res.data;
            setId(emp.id);
            setFirstName(emp.first_name);
            setLastName(emp.last_name);
            setEmail(emp.email);
            setEditMode(true);
        })
    }
    return (
        <div className = "table-container">
            <h1>AXIOS - CRUD Demo</h1>
            <div className = "add-form">
                <form className = "form-inline">
                    <input type = "text"
                    id = "id"
                    placeholder = "Enter id"
                    value = {id}
                    onChange = { event => {setId(event.target.value)}}
                    disabled = {isEditMode ?"disabled" : ""}
                    />
                    <input type = "text"
                    id = "first_name"
                    placeholder = "Enter First Name"
                    value = {firstName}
                    onChange = { event => {setFirstName(event.target.value)}}
                    />
                  
                    <input type = "text"
                    id = "last_name"
                    placeholder = "Enter Last Name"
                    value = {lastName}
                    onChange = { event => {setLastName(event.target.value)}}
                    />
                    <input type = "text"
                    id = "email"
                    placeholder = "Enter Email"
                    value = {email}
                    onChange = { event => {setEmail(event.target.value)}}
                    />
                    <button type = "button" onClick = {
                       () =>{ isEditMode ? updateRecord() : addRecord()
                       }
                        }>{isEditMode ? "Update" : "Add"}</button>
                    <button type = "reset" onClick = {clearInputs}>Clear</button>
                </form>
            </div>
            <h1> Data GRID!!!!</h1>
            <Table className="data-table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>first name</th>
                        <th>last name</th>
                        <th>email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { tableData.map( emp => 
                        <tr key = {emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.first_name}</td>
                            <td>{emp.last_name}</td>
                            <td>{emp.email}</td>
                            <td>
                                <button onClick = {() => {
                                    getEmployeeDetailById(emp.id);
                                }}>Edit</button>
                                <button onClick= {() => {
                                    deleteRecord(emp.id);
                                }}>
                                Delete
                                </button>
                            </td>
                        </tr>
                    )}
                   
                </tbody>
            </Table>
        </div>
    );
}

export default Employees;