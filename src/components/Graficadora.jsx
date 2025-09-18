import Plot from 'react-plotly.js'
import {
  Intersecciones,
  filtrarFactibles,
  ordenarPoligono
} from '../utils/metodo_grafico' // importa tus funciones

const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export default function Graph({ restrictions }) {
  if (!restrictions || restrictions.length === 0) {
    return (
      <div className='flex items-center justify-center w-full h-96 border-2 border-dashed border-gray-300 rounded-lg'>
        <p className='text-gray-500'>
          Ingrese restricciones para ver el gráfico
        </p>
      </div>
    )
  }

  // 1. Parsear restricciones a formato numérico
  const parsedRestrictions = restrictions
    .filter((r) => r.x1 !== '' && r.x2 !== '' && r.b !== '') // ignorar vacíos
    .map((r) => ({
      a: [Number.parseFloat(r.x1), Number.parseFloat(r.x2)],
      type: r.type,
      b: Number.parseFloat(r.b)
    }))

  if (parsedRestrictions.length === 0) {
    return (
      <div className='flex items-center justify-center w-full h-96 border-2 border-dashed border-gray-300 rounded-lg'>
        <p className='text-gray-500'>
          Complete las restricciones para ver el gráfico
        </p>
      </div>
    )
  }

  // 2. Calcular intersecciones
  const points = Intersecciones(parsedRestrictions)

  // 3. Filtrar solo puntos factibles
  const factibles = filtrarFactibles(points, parsedRestrictions)

  if (!factibles || factibles.length === 0) {
    return (
      <div className='flex items-center justify-center w-full h-96 border-2 border-dashed border-gray-300 rounded-lg'>
        <p className='text-gray-500'>No se encontraron puntos factibles</p>
      </div>
    )
  }

  // 4. Crear arrays ordenados para Plotly
  const factiblesOrdenados = ordenarPoligono(factibles)

  const xFactibles = factiblesOrdenados.map((p) => p.x1)
  const yFactibles = factiblesOrdenados.map((p) => p.x2)

  // 5. Preparar puntos factibles con etiquetas
  const puntosFactibles = {
    x: factibles.map((p) => p.x1),
    y: factibles.map((p) => p.x2),
    mode: 'markers+text',
    type: 'scatter',
    name: 'Factibles',
    text: factibles.map((p, i) => `${letras[i]}(${p.x1},${p.x2})`),
    textposition: 'top right',
    marker: { size: 10, color: 'red' }
  }

  // 6. Dibujar líneas de restricciones
  const lineasRestricciones = parsedRestrictions.map((r, idx) => {
    const maxX = Math.max(...xFactibles, 20)
    const maxY = Math.max(...yFactibles, 20)

    let xValuesLine, yValuesLine

    // Línea vertical (a[1] === 0)
    if (r.a[1] === 0) {
      xValuesLine = [r.b / r.a[0], r.b / r.a[0]]
      yValuesLine = [0, maxY]
    }
    // Línea horizontal (a[0] === 0)
    else if (r.a[0] === 0) {
      xValuesLine = [0, maxX]
      yValuesLine = [r.b / r.a[1], r.b / r.a[1]]
    }
    // Línea oblicua
    else {
      xValuesLine = [0, maxX]
      yValuesLine = xValuesLine.map((x) => (r.b - r.a[0] * x) / r.a[1])
    }

    return {
      x: xValuesLine,
      y: yValuesLine,
      type: 'scatter',
      mode: 'lines',
      name: `R${idx + 1}: ${r.a[0]}x1 + ${r.a[1]}x2 ${r.type} ${r.b}`,
      line: { width: 2 }
    }
  })

  return (
    <Plot
      data={[
        ...lineasRestricciones,
        {
          x: xFactibles,
          y: yFactibles,
          fill: 'toself',
          fillcolor: 'rgba(0, 200, 0, 0.3)',
          type: 'scatter',
          name: 'Región factible',
          line: { color: 'green', width: 0 }
        },
        puntosFactibles
      ]}
      layout={{
        width: undefined,
        height: window.innerWidth < 768 ? 350 : 450,
        title: {
          text: 'Método Gráfico de Programación Lineal',
          font: {
            size: window.innerWidth < 768 ? 14 : 16,
            color: '#1e40af',
            family: 'Arial, sans-serif'
          },
          x: 0.5,
          xanchor: 'center'
        },
        xaxis: {
          title: {
            text: 'X₁',
            font: { size: window.innerWidth < 768 ? 12 : 14, color: '#374151' }
          },
          range: [0, Math.max(...xFactibles, 10)],
          gridcolor: '#e5e7eb',
          gridwidth: 1,
          zeroline: true,
          zerolinecolor: '#6b7280',
          zerolinewidth: 2
        },
        yaxis: {
          title: {
            text: 'X₂',
            font: { size: window.innerWidth < 768 ? 12 : 14, color: '#374151' }
          },
          range: [0, Math.max(...yFactibles, 10)],
          gridcolor: '#e5e7eb',
          gridwidth: 1,
          zeroline: true,
          zerolinecolor: '#6b7280',
          zerolinewidth: 2
        },
        dragmode: 'pan',
        margin: {
          l: window.innerWidth < 768 ? 35 : 50,
          r: window.innerWidth < 768 ? 25 : 40,
          t: window.innerWidth < 768 ? 45 : 60,
          b: window.innerWidth < 768 ? 35 : 50
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(248,250,252,0.8)',
        legend: {
          x: window.innerWidth < 768 ? 0.5 : 0.02,
          y: window.innerWidth < 768 ? -0.15 : 0.98,
          xanchor: window.innerWidth < 768 ? 'center' : 'left',
          yanchor: window.innerWidth < 768 ? 'top' : 'top',
          bgcolor: 'rgba(255,255,255,0.9)',
          bordercolor: '#d1d5db',
          borderwidth: 1,
          font: { size: window.innerWidth < 768 ? 8 : 10 },
          orientation: window.innerWidth < 768 ? 'h' : 'v',
          itemsizing: 'constant',
          itemwidth: window.innerWidth < 768 ? 20 : 25
        },
        autosize: true,
        responsive: true
      }}
      config={{
        scrollZoom: true,
        displayModeBar: false,
        displaylogo: false,
        responsive: true
      }}
      style={{ width: '100%', height: '100%', maxWidth: '100%' }}
      useResizeHandler={true}
    />
  )
}
