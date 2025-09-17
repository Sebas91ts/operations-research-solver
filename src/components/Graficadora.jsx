import Plot from 'react-plotly.js'
import {
  Intersecciones,
  filtrarFactibles,
  ordenarPoligono
} from '../utils/metodo_grafico' // importa tus funciones

const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export default function Graph({ restrictions }) {
  // 1. Parsear restricciones a formato numérico
  const parsedRestrictions = restrictions
    .filter((r) => r.x1 !== '' && r.x2 !== '' && r.b !== '') // ignorar vacíos
    .map((r) => ({
      a: [parseFloat(r.x1), parseFloat(r.x2)],
      type: r.type,
      b: parseFloat(r.b)
    }))
  // 2. Calcular intersecciones
  const points = Intersecciones(parsedRestrictions)

  // 3. Filtrar solo puntos factibles
  const factibles = filtrarFactibles(points, parsedRestrictions)

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
        width: 1000,
        height: 600,
        title: 'Método gráfico de programación lineal',
        xaxis: { title: 'X1', range: [0, Math.max(...xFactibles, 10)] },
        yaxis: { title: 'X2', range: [0, Math.max(...yFactibles, 10)] },
        dragmode: 'pan'
      }}
      config={{
        scrollZoom: true,
        displayModeBar: false
      }}
    />
  )
}
