import {useState} from 'react'
export function FormTest() {
  const [fields, setFields] = useState({
    field01:"inciial",
    field02:"--"
  })

  const cambiarInputs = (e) =>{
    
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  const enviarDatos = (e)=>{
    alert(fields.field02)
    alert(e.target.field2.value)
    e.preventDefault()
  }
  return (
  <div>
    
    <br/>
    <form onSubmit={enviarDatos}>
      <input type={"text"} name="field2" />
      <input type="text"  name="field01" value={fields.field01} onChange={cambiarInputs}/>
      <input type="text" name="field02" value={fields.field02} onChange={cambiarInputs}/>
      <br/>
      <button type='submit'>enviar</button>
    </form>
  </div>
  )
}
