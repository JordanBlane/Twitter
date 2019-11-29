import React from 'react';
import './App.css';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//gets data from json
getData();



class Login extends React.Component{
  render(){
    return(
      <LoginPage />
    )
  }
}


function LoginPage(){
  return(
      <div id='loginwrapper'>
        <div id='signupdiv'>
          <h2>Sign  Up</h2>
          <h4 onClick={closesignup}>X</h4>
          <input id='newusername' placeholder="Username"></input>
          <input id='newpassword' placeholder="Password"></input>
          <input id='repeatpassword' placeholder="Repeat your Password"></input>
          <button id='signupbutton' onClick={newsccount}>Sign up</button>
        </div>
        <div id="logindiv">
          <button id="loginbutton" onClick={login}>Log in</button>
          <input id="password" type="password" placeholder="Password"></input>
          <input id="username" type="text" placeholder="Username"></input>
          <div id = 'wronglogin'>
            <h4 onClick={closeloginalert}>X</h4>
            <p>wrong username / password, try again</p>
          </div>
          <div id="logindiv2">
            <h2>See what's happening in the world right now</h2>
            <p>Join Twitter today.</p>
          <button id="signup" onClick={signup}>Sign up</button>
        </div>
        </div>
        <div id="bluebox">

        </div>
      </div>
  )
}
//------- Login ---------
function closeloginalert(){
  var loginalert = document.getElementById('wronglogin')
  loginalert.style.display='none';
}

function closesignup(){
  var signupbox = document.getElementById('signupdiv');
  signupbox.style.display = 'none'
}
let template;

function newsccount(){
  var username = document.getElementById('newusername');
  var password = document.getElementById('newpassword');
  var repeat = document.getElementById('repeatpassword');
  var button = document.getElementById('signupbutton')

  if(password.value == repeat.value){
    template = {
      "username":username.value,"password":password.value
    }
    DataObject.users[DataObject.users.length] = template
    setData(DataObject)
    console.log('user added to DB')

  }else{
    password.value = ''
    repeat.value = ''
    button.innerHTML = 'passwords did not match - try again'
  }
    console.log(DataObject)
  }

function login(){
  console.log(DataObject)
  var loginalert = document.getElementById('wronglogin')
  var usernameinput = document.getElementById('username');
  var passwordinput = document.getElementById('password');
  for(var i=0;i<DataObject.users.length;i++){
    if(DataObject.users[i].username == usernameinput.value){
      console.log('username right')
      if(DataObject.users[i].password == passwordinput.value){
        console.log('password right')
      }else{
        loginalert.style.display='inline-block';
      }
    }else{
      loginalert.style.display='inline-block';
    }
  }
  }

function signup(){
  var signupbox = document.getElementById('signupdiv');
  signupbox.style.display = 'inline-block'
}


//-------- Database ---------
function resetJson(){
  DataObject = {
    "users":[
      {"username":"User1", "password":"1"}
    ]
  }
  setData(DataObject)
}

//gets data from server
var DataObject = 0;
async function getData(){
  await getDataPromise()
  return DataObject
}

function getDataPromise(){
  new Promise((resolve,reject) =>{
    $.get( "https://api.myjson.com/bins/g0rre", function( data ) {
      console.log( "Data Loaded: ");
      DataObject = data;
      resolve();
    });
  })
}

//pushes to json
function setData(data){
  $.ajax({
    url:"https://api.myjson.com/bins/g0rre",
    type:"PUT",
    data: JSON.stringify(data),
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(data, textStatus, jqXHR){
      console.log("updated")
    }
  });
}

export default Login;