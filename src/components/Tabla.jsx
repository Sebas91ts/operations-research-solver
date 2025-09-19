import React from 'react'
import {
  Intersecciones,
  filtrarFactibles,
  ValoresZ,
  ResolucionFO
} from '../utils/metodo_grafico.js'

export default function TablaVertices({
  restrictions,
  fo,
  fotype,
  onResultCalculated
}) {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const parsedRestrictions = restrictions
    .filter((r) => r.x1 !== '' && r.x2 !== '' && r.b !== '') // ignorar vacíos
    .map((r) => ({
      a: [Number.parseFloat(r.x1), Number.parseFloat(r.x2)],
      type: r.type,
      b: Number.parseFloat(r.b)
    }))

  const points = Intersecciones(parsedRestrictions)
  const factibles = filtrarFactibles(points, parsedRestrictions)
  console.log(factibles)
  const values = ValoresZ(fo, factibles)
  const resFO = ResolucionFO(values, fotype)

  React.useEffect(() => {
    if (onResultCalculated && resFO !== undefined) {
      onResultCalculated(resFO)
    }
  }, [resFO, onResultCalculated])

  return (
    <div className='space-y-4'>
      <div className='barca-card p-4 rounded-xl barca-shadow backdrop-blur-sm border-2 border-accent/30'>
        <div className='text-center'>
          <h3 className='text-lg font-semibold text-card-foreground mb-2'>
            Resultado Óptimo
          </h3>
          <div className='text-3xl font-bold'>
            <span className='bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent'>
              Z = {resFO}
            </span>
          </div>
          <p className='text-sm text-muted-foreground mt-1'>
            Valor {fotype === 'max' ? 'máximo' : 'mínimo'} de la función
            objetivo
          </p>
        </div>
      </div>

      <div className='overflow-x-auto max-w-lg mx-auto'>
        <table className='min-w-full border border-primary/20 rounded-lg overflow-hidden'>
          <thead className='barca-gradient text-white'>
            <tr>
              <th className='border border-white/20 px-4 py-3 text-left font-semibold'>
                Vértice
              </th>
              <th className='border border-white/20 px-4 py-3 text-left font-semibold'>
                Coordenadas (x1, x2)
              </th>
              <th className='border border-white/20 px-4 py-3 text-left font-semibold'>
                Z
              </th>
            </tr>
          </thead>
          <tbody>
            {factibles.map((p, idx) => (
              <tr
                key={idx}
                className={
                  values[idx] === resFO
                    ? 'bg-gradient-to-r from-accent/20 to-primary/20 border-accent/30'
                    : idx % 2 === 0
                    ? 'bg-white/80'
                    : 'bg-white/50'
                }
              >
                <td className='border border-primary/10 px-4 py-3 font-medium'>
                  {letras[idx]}
                </td>
                <td className='border border-primary/10 px-4 py-3'>
                  ({p.x1.toFixed(2)}, {p.x2.toFixed(2)})
                </td>
                <td
                  className={`border border-primary/10 px-4 py-3 font-semibold ${
                    values[idx] === resFO ? 'text-accent font-bold' : ''
                  }`}
                >
                  {values[idx].toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
