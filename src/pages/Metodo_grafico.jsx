import React, { useState } from 'react'
import Graph from '../components/graficadora'
import Tabla from '../components/Tabla'

export default function Metodo_grafico() {
  const [restrictions, setRestrictions] = useState([
    { x1: '', x2: '', type: '>=', b: '' },
    { x1: '', x2: '', type: '>=', b: '' }
  ])
  const [calulate, setCalulate] = useState(false)
  const [fo, setFo] = useState({ x1: '', x2: '' })
  const [foType, setFoType] = useState('max') // 'max' o 'min'

  const handleChange = (index, field, value) => {
    const newRestrictions = [...restrictions]
    newRestrictions[index][field] = value
    setRestrictions(newRestrictions)
  }

  const addRestriction = () => {
    setRestrictions([...restrictions, { x1: '', x2: '', type: '>=', b: '' }])
  }

  const removeRestriction = (index) => {
    const newRestrictions = [...restrictions]
    newRestrictions.splice(index, 1)
    setRestrictions(newRestrictions)
  }

  const handleCalculate = () => {
    if (restrictions.length < 2) {
      alert('Debe ingresar al menos 2 restricciones')
      return
    }
    if (fo.x1 === '' || fo.x2 === '') {
      alert('Complete los coeficientes de la función objetivo')
      return
    }

    for (let r of restrictions) {
      if (r.x1 === '' || r.x2 === '' || r.b === '') {
        alert('Complete todos los campos antes de calcular')
        return
      }
    }

    setCalulate(true)
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen space-y-8'>
      {/* Formulario para inputs  */}
      <div className='p-4 space-y-4 border rounded shadow max-w-lg w-full'>
        {restrictions.map((r, idx) => (
          <div key={idx} className='flex items-center space-x-2'>
            <input
              type='number'
              value={r.x1}
              onChange={(e) => handleChange(idx, 'x1', e.target.value)}
              placeholder='x1'
              className='w-16 p-1 border rounded'
            />
            <span>x1 +</span>
            <input
              type='number'
              value={r.x2}
              onChange={(e) => handleChange(idx, 'x2', e.target.value)}
              placeholder='x2'
              className='w-16 p-1 border rounded'
            />
            <span>x2 </span>
            <select
              value={r.type}
              onChange={(e) => handleChange(idx, 'type', e.target.value)}
              className='p-1 border rounded'
            >
              <option value='>='>&gt;=</option>
              <option value='<='>&lt;=</option>
            </select>
            <input
              type='number'
              value={r.b}
              onChange={(e) => handleChange(idx, 'b', e.target.value)}
              placeholder='b'
              className='w-16 p-1 border rounded'
            />
            {idx > 1 && (
              <button
                onClick={() => removeRestriction(idx)}
                className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        <div className='flex items-center space-x-2 mt-2'>
          <span>Z = </span>
          <input
            type='number'
            placeholder='x1'
            value={fo.x1}
            onChange={(e) => setFo({ ...fo, x1: e.target.value })}
            className='w-16 p-1 border rounded'
          />
          <span>x1 +</span>
          <input
            type='number'
            placeholder='x2'
            value={fo.x2}
            onChange={(e) => setFo({ ...fo, x2: e.target.value })}
            className='w-16 p-1 border rounded'
          />
          <span>x2</span>
        </div>
        <div className='flex items-center space-x-2 mt-2'>
          <span>Optimizar:</span>
          <select
            value={foType}
            onChange={(e) => setFoType(e.target.value)}
            className='p-1 border rounded'
          >
            <option value='max'>Maximizar</option>
            <option value='min'>Minimizar</option>
          </select>
        </div>

        <div className='flex space-x-2 mt-2'>
          <button
            onClick={addRestriction}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Añadir restricción
          </button>
          <button
            onClick={handleCalculate}
            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
          >
            Calcular
          </button>
        </div>
      </div>

      {/* Gráfico centrado */}
      <div className='flex items-center justify-center w-full'>
        <Graph restrictions={restrictions} />
      </div>

      {/* Tabla Final de Resultados */}
      {calulate && (
        <div className='flex items-center justify-center w-full'>
          <Tabla
            restrictions={restrictions}
            fo={{ x1: parseFloat(fo.x1), x2: parseFloat(fo.x2) }}
            fotype={foType}
          />
        </div>
      )}
    </div>
  )
}
