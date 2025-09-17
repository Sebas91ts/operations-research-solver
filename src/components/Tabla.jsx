import React from 'react'
import {
  Intersecciones,
  filtrarFactibles,
  ValoresZ,
  ResolucionFO
} from '../utils/metodo_grafico'

export default function TablaVertices({ restrictions, fo, fotype }) {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const parsedRestrictions = restrictions
    .filter((r) => r.x1 !== '' && r.x2 !== '' && r.b !== '') // ignorar vacíos
    .map((r) => ({
      a: [parseFloat(r.x1), parseFloat(r.x2)],
      type: r.type,
      b: parseFloat(r.b)
    }))

  const points = Intersecciones(parsedRestrictions)
  const factibles = filtrarFactibles(points, parsedRestrictions)
  console.log(factibles)
  const values = ValoresZ(fo, factibles)
  const resFO = ResolucionFO(values, fotype)

  return (
    <div className='overflow-x-auto max-w-lg mx-auto mt-4'>
      <table className='min-w-full border border-gray-300'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='border px-4 py-2 text-left'>Vértice</th>
            <th className='border px-4 py-2 text-left'>Coordenadas (x1, x2)</th>
            <th className='border px-4 py-2 text-left'>Z</th>
          </tr>
        </thead>
        <tbody>
          {factibles.map((p, idx) => (
            <tr
              key={idx}
              className={
                values[idx] === resFO
                  ? 'bg-green-100'
                  : idx % 2 === 0
                  ? 'bg-white'
                  : 'bg-gray-50'
              }
            >
              <td className='border px-4 py-2'>{letras[idx]}</td>
              <td className='border px-4 py-2'>
                ({p.x1}, {p.x2})
              </td>
              <td className='border px-4 py-2'>{values[idx]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
