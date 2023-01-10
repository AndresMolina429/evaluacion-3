import { useState, useEffect } from 'react'
import background from './assets/image 2.svg'
import title from './assets/image 3.svg'
import './App.css'
import axios from 'axios'
import Resident from './components/Resident'

function App() {
  const [autocomplete, setAutocomplete] = useState([])
  const [rickymorty, setRickyMorty] = useState({})
  const [id, setId] = useState({})
  const [search, setSearch] = useState("")
  const [stateSearch, setStateSearch] = useState(false)

  useEffect(()=>{
    const randomId = Math.floor(Math.random() * 126) + 1; 
    axios.get(`https://rickandmortyapi.com/api/location/${randomId}`)
    .then(res => setRickyMorty(res.data))
  },[])

  useEffect(()=>{
    if (!stateSearch){
      axios.get(`https://rickandmortyapi.com/api/location/?name=${search}`)
      .then(res => setRickyMorty(res.data.results[0]))
    }
    },[search])

  const autoComplete = (value) => {
    if (value.length > 0) {
      setSearch(value)
      setStateSearch(true)
      axios.get(`https://rickandmortyapi.com/api/location/?name=${value}`)
      .then(res => setAutocomplete(res.data.results))
      .catch(function (error) {
      //  setSearch('')
       setStateSearch(false)
       setAutocomplete([])
     })
   }else{
    setSearch('')
    setStateSearch(false)
    setAutocomplete([])
   }
  }

  const selectLocation = (name,id) => {
    setStateSearch(false)
    setSearch(name)
  }
  
  // const searchLocation = (search) => {
  //   axios.get(`https://rickandmortyapi.com/api/location/?name=${search}`)
  //   .then(res => setRickyMorty(res.data))
  // }
  
  return (
    <div className="App">
      <div className="img">
        <img src={title} alt="img" className='img2'/>
        <img src={background} alt="title" className="img1"/>
       <div className="search">
        <div className='div-input'>
         <input className='input-search' type="text" placeholder="Insert Location" value={search} onChange={e => autoComplete(e.target.value)} />
         {/* <button onClick={() => searchLocation(search)}>Search Location</button> */}
        </div>
        { stateSearch &&
          <div className='label-autocomplete'>
           <ul className="ul-autocomplete">
            {
              autocomplete?.map(location => (
                <li key={location.id} onClick={() => selectLocation(location.name,location.id)}>
                 {location.name}
               </li>
              ))
            }
           </ul>
          </div>
        }
       </div>
      </div>
      <div className="container">
       <div className="title">
        <h1>{rickymorty.name}</h1>
       </div>
       <div className="characteristics">
        <div>
         <b>Type: </b>{rickymorty.type}
        </div>
        <div>
         <b>Dimension: </b>{rickymorty.dimension}
        </div>
        <div>
         <b>Population: </b>{rickymorty.residents?.length}
        </div>
       </div>
       <div className="residents">
        <h2>Residents</h2>
        <ul className='resident-list'>
          {
            rickymorty.residents?.map(resident =>(
               <Resident resident={resident} key={resident}/>
              ))
            }
        </ul>
       </div>
      </div>
    </div>
  )
}

export default App
