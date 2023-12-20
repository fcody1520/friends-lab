import { useState,useEffect } from "react";
import axios from 'axios'




export default function App() {
  const [friends, setFriends] = useState([])
  const [picture, setPicture] = useState('')
  const [name, setName] = useState('')

  const getSavedFriends = async () => {
    const res = await axios.get('/api/friends');
    setFriends(res.data)
  }

  useEffect(() => {
    getSavedFriends()
  }, [])

  function handlePicture(evt){
    setPicture(evt.target.value)
  }

  function handleName(evt){
    setName(evt.target.value)
  }

 let addFriend = () => {
  const newFriends = [...friends]
  newFriends.push({picture: picture, name: name})
  setFriends(newFriends)
  setPicture('');
  setName('')

 }

 const friendInfo = friends.map((friend) => {
  return(
    <div key={`${friend.name}`}>
      <img width='100px' src={friend.picture} alt={friend.name} />
      <span>{friend.name}</span>

    </div>
  )
 })
  
  return (<div>
    <label htmlFor="picture">Picture:</label>
    <input type="text" id="picture" value={picture} onChange={handlePicture}/>
    <label htmlFor="name">Name:</label>
    <input type="text" id="name" value={name} onChange={handleName}/>
    <button onClick={addFriend}>Add Friend</button>

    {friendInfo}

  </div>
  );
}
