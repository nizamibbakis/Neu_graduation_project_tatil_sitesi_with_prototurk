import { useMemo,useState } from "react";

function App() {

  const genders=[
    {key:'1',value:'erkek'},
    {key:'2',value:'kadin'},
  ]
  const categoryList=[
    {key:'1',value:'php'},
    {key:'2',value:'javascript'},
    {key:'3',value:'css'},
    {key:'4',value:'html'},
  ]
  const [name,setName]=useState('baris')
  const [description,setDescription]=useState('')
  const [gender,setGender]=useState('')
  const [categories,setCategories]=useState([])

  const selectedGender=genders.find(g=>g.key==gender)


  return (
    <>
    <button onClick={()=>setName('ahmet')}>adi degistir</button>
    <input type="text" value={name} onChange={e=>setName(e.target.value)} /><br />

    <textarea value={description} onChange={e=>setDescription(e.target.value)}></textarea>
    ad:{name}
    <br />
    desc:{description}

    <select value={gender} onChange={e=>setGender(e.target.value)}>
      <option value=''>seçin</option>
      {genders.map((gender)=>(
        <option value={gender.key} key={gender.key}>{gender.value}</option>
      ))}
    </select ><br /><br /><br />

    <select value={categories} multiple={true} onChange={e=>setCategories([...e.target.selectedOptions].map(option=>parseInt(option.value)))}>
      <option value=''>seçin</option>
      {categoryList.map((category)=>(
        <option value={category.key} key={category.key}>{category.value}</option>
      ))}
    </select ><br /><br /><br />

    {/* cinsiyet:{selectGender} */}

    <pre>{JSON.stringify(categories,null,2)}</pre>
    
    </>
  )
      }

export default App;
