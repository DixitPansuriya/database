import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, ref, set,remove,update } from "firebase/database";
import { app } from '../FireBase/Fire';


export default function DataBase() {
  const db = getDatabase(app);
  const [post, setPost] = useState({})

  function sendData() {

    set(ref(db,'user/john'), {
      username: "john",
      email: "john1112@gmail.com",
    });
  }

  function fetch() {

    const user = ref(db,'user/john');
    onValue(user,(snapshot) => {
      const data = snapshot.val();
      setPost(data)
    });
  }

  useEffect(() => {
    fetch()
  }, [])

    function delet(){
        remove (ref(db,'user/john'))
        setPost("")


    }
   


    function edit(){
      const newUsername = prompt("Enter new username:", post?.username);
      const newemail = prompt("Enter new email:", post?.email);
      if (newUsername && newemail) {
        update(ref(db, 'user/john'), {
          username: newUsername,
          email: newemail,
        });
      }


    }

    

     

  return (
    <div>

      <button onClick={sendData}>send a Data </button>
      <button onClick={delet}>delete</button>
      <button onClick={edit}>edit</button>

      <h1>{post.username}</h1>
      <h1>{post.email}</h1>
    </div>
  )
}

