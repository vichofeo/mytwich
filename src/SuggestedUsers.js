import {useEffect,  useState} from 'react'
import APIInvoker from './utils/APIInvoker'


export default function SuggestedUser () {
  
  const [usuario, setUsuario] = useState({load:false, users: null})

  useEffect(() => {
    APIInvoker.invokeGET(
        '/secure/suggestedUsers',
        (response) => {
          setUsuario( {load:true,users:response.body})
        },
        (error) => {
          console.log('Error al actualizar el perfil', error)
        }
      )
  }, [])
  

  
    return (
      <aside id="suggestedUsers" className="twitter-panel">
        <span className="su-title">A quién seguir</span>
        {(()=>{
          if(usuario.load){
           return usuario.users.map((user)=>{
              <div className="sg-item" key={user._id}>
              <div className="su-avatar">
                <img src={user.avatar} alt="Juan manuel" />
              </div>
              <div className="sg-body">
                <div>
                  <a href={`/${user.userName}`}>
                    <span className="sg-name">{user.name}</span>
                    <span className="sg-username">@{user.userName}</span>
                  </a>
                </div>
                <a
                  href={`/${user.userName}`}
                  className="btn btn-primary btn-sm"
                >
                  <i className="fa fa-user-plus" aria-hidden="true"></i>
                  Ver perfil
                </a>
              </div>
            </div>
            })
          }
        })()}
        
      </aside>
    )
  
}

