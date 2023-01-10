import { useState, useEffect } from 'react'
import axios from "axios";

const Resident = ({ resident }) => {

  const [dataResident, setDataResdent] = useState({})

  
  useEffect(()=>{
    axios.get(`${ resident }`)
    .then(res => setDataResdent(res.data))
  },[])

  // console.log(dataResident.status)



    return(
        <div>
         <li>
            <div className='resident-card'>
              <span>
                 {dataResident.status}
                 { dataResident.status === 'Alive' ? <i className="fa-solid fa-circle" style={{color:'green'}}></i>: dataResident.status === 'Dead' ? <i className="fa-solid fa-circle" style={{color:'red'}}></i>: <i className="fa-solid fa-circle" style={{color:'gray'}}></i>}
              </span>
              <div>
                <img src={dataResident.image} alt="" />
              </div>
               <div className="resident-detail">
                  <article><b>Name: </b>{dataResident.name}</article>
                  {/* <article>{dataResident.species}</article> */}
                  <article><b>Origin: </b>{dataResident.origin?.name}</article>
                  <article><b>Number of episodes: </b>{dataResident.episode?.length}</article>
               </div>
            </div>
         </li>
        </div>
    )
}

export default Resident;