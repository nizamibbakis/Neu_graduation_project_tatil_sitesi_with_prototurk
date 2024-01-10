import { useEffect,useState } from "react";


function App(){
  
  const [users,setUsers]=useState(false)

  const addpost= data =>{
    fetch('https://jsonplaceholder.typicode.com/posts',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-type':'application/json',
        'Authorization':'Bearer 4567987678945231'
      }
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
  }


  useEffect(()=>{

    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res=>{
      if(res.ok && res.status==200){
        return res.json()
      }
    })
    .then(data=>setUsers(data))
    .catch(err=>console.log(err))

    addpost({
      userID:1,
      title:'ornek post',
      body:'post icerigi"'
    })

  },[]);
  return (
   <>
   <ul>
{users&&users.map(user=>(
  <li style={{textDecoration:'underline red',fontSize:'25px'}}>
    name:{user.name} id:{user.id} username:{user.username}

  </li>
  
))}
</ul>
   </>
  );

}

export default App;