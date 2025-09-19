'use client'

import { useState } from 'react'
import Graph from '../components/Graficadora.jsx'
import Tabla from '../components/Tabla'

export default function Metodo_grafico() {
  const [restrictions, setRestrictions] = useState([
    { x1: '', x2: '', type: '>=', b: '' },
    { x1: '', x2: '', type: '>=', b: '' }
  ])
  const [calculate, setCalculate] = useState(false)
  const [calculatedData, setCalculatedData] = useState(null)
  const [fo, setFo] = useState({ x1: '', x2: '' })
  const [foType, setFoType] = useState('max')
  const [resultZ, setResultZ] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const handleChange = (index, field, value) => {
    const newRestrictions = [...restrictions]
    newRestrictions[index][field] = value
    setRestrictions(newRestrictions)
    setShowResults(false)
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

    for (const r of restrictions) {
      if (r.x1 === '' || r.x2 === '' || r.b === '') {
        alert('Complete todos los campos antes de calcular')
        return
      }
    }

    setCalculatedData({
      restrictions: [...restrictions],
      fo: { ...fo },
      foType: foType
    })
    setResultZ(null)
    setCalculate(true)
    setShowResults(true)
  }

  const handleResultCalculated = (result) => {
    setResultZ(result)
  }

  const handleFoChange = (field, value) => {
    setFo({ ...fo, [field]: value })
    setShowResults(false)
  }

  const handleFoTypeChange = (value) => {
    setFoType(value)
    setShowResults(false)
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='text-center mb-12'>
        <h1 className='text-5xl font-bold mb-4 text-balance'>
          <span className='bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent'>
            MÉTODO GRÁFICO
          </span>
        </h1>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto text-pretty'>
          Resuelve problemas de programación lineal con dos variables utilizando
          el método gráfico
        </p>
        <div className='flex justify-center items-center gap-4 mt-6'>
          <div className='w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full'></div>
          <span className='gold-accent text-2xl'>⚽</span>
          <div className='w-12 h-1 bg-gradient-to-r from-accent to-primary rounded-full'></div>
        </div>

        {showResults && resultZ !== null && (
          <div className='mt-8 max-w-md mx-auto'>
            <div className='barca-card p-6 rounded-2xl barca-shadow backdrop-blur-sm border-2 border-accent/40'>
              <div className='text-center'>
                <h2 className='text-xl font-semibold text-card-foreground mb-3'>
                  🏆 Resultado Final
                </h2>
                <div className='text-4xl font-bold mb-2'>
                  <span className='bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent'>
                    Z = {resultZ}
                  </span>
                </div>
                <p className='text-sm gold-accent font-medium'>
                  Valor {foType === 'max' ? 'máximo' : 'mínimo'} encontrado
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='space-y-6'>
          <div className='barca-card p-6 rounded-xl barca-shadow backdrop-blur-sm'>
            <h2 className='text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2'>
              <span className='w-2 h-2 bg-primary rounded-full'></span>
              Restricciones
            </h2>
            <div className='space-y-4'>
              {restrictions.map((r, idx) => (
                <div
                  key={idx}
                  className='flex items-center space-x-2 flex-wrap gap-2 p-3 bg-white/50 rounded-lg border border-primary/10'
                >
                  <input
                    type='number'
                    value={r.x1}
                    onChange={(e) => handleChange(idx, 'x1', e.target.value)}
                    placeholder='x1'
                    className='w-16 p-2 border-2 border-primary/20 rounded-lg bg-white/80 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300'
                  />
                  <span className='text-foreground font-medium'>x1 +</span>
                  <input
                    type='number'
                    value={r.x2}
                    onChange={(e) => handleChange(idx, 'x2', e.target.value)}
                    placeholder='x2'
                    className='w-16 p-2 border-2 border-primary/20 rounded-lg bg-white/80 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300'
                  />
                  <span className='text-foreground font-medium'>x2</span>
                  <select
                    value={r.type}
                    onChange={(e) => handleChange(idx, 'type', e.target.value)}
                    className='p-2 border-2 border-primary/20 rounded-lg bg-white/80 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300'
                  >
                    <option value='>='>&gt;=</option>
                    <option value='<='>&lt;=</option>
                  </select>
                  <input
                    type='number'
                    value={r.b}
                    onChange={(e) => handleChange(idx, 'b', e.target.value)}
                    placeholder='b'
                    className='w-16 p-2 border-2 border-primary/20 rounded-lg bg-white/80 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300'
                  />
                  {idx > 1 && (
                    <button
                      onClick={() => removeRestriction(idx)}
                      className='bg-gradient-to-r from-destructive to-red-600 text-white px-3 py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium'
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className='barca-card p-6 rounded-xl barca-shadow backdrop-blur-sm'>
            <h2 className='text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2'>
              <span className='w-2 h-2 bg-accent rounded-full'></span>
              Función Objetivo
            </h2>
            <div className='space-y-4'>
              <div className='flex items-center space-x-2 flex-wrap gap-2 p-3 bg-white/50 rounded-lg border border-accent/10'>
                <span className='text-foreground font-bold text-lg gold-accent'>
                  Z =
                </span>
                <input
                  type='number'
                  placeholder='x1'
                  value={fo.x1}
                  onChange={(e) => handleFoChange('x1', e.target.value)}
                  className='w-16 p-2 border-2 border-accent/20 rounded-lg bg-white/80 text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300'
                />
                <span className='text-foreground font-medium'>x1 +</span>
                <input
                  type='number'
                  placeholder='x2'
                  value={fo.x2}
                  onChange={(e) => handleFoChange('x2', e.target.value)}
                  className='w-16 p-2 border-2 border-accent/20 rounded-lg bg-white/80 text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300'
                />
                <span className='text-foreground font-medium'>x2</span>
              </div>
              <div className='flex items-center space-x-2 p-3 bg-white/50 rounded-lg border border-accent/10'>
                <span className='text-foreground font-medium'>Optimizar:</span>
                <select
                  value={foType}
                  onChange={(e) => handleFoTypeChange(e.target.value)}
                  className='p-2 border-2 border-accent/20 rounded-lg bg-white/80 text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300'
                >
                  <option value='max'>Maximizar</option>
                  <option value='min'>Minimizar</option>
                </select>
              </div>
            </div>
          </div>

          <div className='flex space-x-3'>
            <button
              onClick={addRestriction}
              className='bg-gradient-to-r from-secondary to-muted text-secondary-foreground px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium border border-primary/20'
            >
              Añadir restricción
            </button>
            <button
              onClick={handleCalculate}
              className='barca-gradient text-white px-8 py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-bold transform hover:scale-105'
            >
              ⚡ Calcular
            </button>
          </div>
        </div>

        <div className='space-y-6'>
          <div className='barca-card p-6 rounded-xl barca-shadow backdrop-blur-sm'>
            <h2 className='text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2'>
              <span className='w-2 h-2 bg-chart-3 rounded-full'></span>
              Gráfico
            </h2>
            <div className='flex items-center justify-center bg-white/30 rounded-lg p-4'>
              {showResults && calculatedData ? (
                <Graph restrictions={calculatedData.restrictions} />
              ) : (
                <div className='flex items-center justify-center w-full h-96 border-2 border-dashed border-gray-300 rounded-lg'>
                  <p className='text-gray-500'>
                    Presione "Calcular" para ver el gráfico
                  </p>
                </div>
              )}
            </div>
          </div>

          {showResults && calculatedData && (
            <div className='barca-card p-6 rounded-xl barca-shadow backdrop-blur-sm'>
              <h2 className='text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2'>
                <span className='w-2 h-2 bg-chart-1 rounded-full'></span>
                Resultados
              </h2>
              <div className='bg-white/30 rounded-lg p-4'>
                <Tabla
                  restrictions={calculatedData.restrictions}
                  fo={{
                    x1: Number.parseFloat(calculatedData.fo.x1),
                    x2: Number.parseFloat(calculatedData.fo.x2)
                  }}
                  fotype={calculatedData.foType}
                  onResultCalculated={handleResultCalculated}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
