import Plot from 'react-plotly.js'
import {
  Intersecciones,
  filtrarFactibles,
  ordenarPoligono
} from '../utils/metodo_grafico' // importa tus funciones

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

  // 4. Crear arrays para Plotly
  const factiblesOrdenados = ordenarPoligono(factibles)

  const xFactibles = factiblesOrdenados.map((p) => p.x1)
  const yFactibles = factiblesOrdenados.map((p) => p.x2)

  //   console.log('xFactibles', xFactibles)
  //   console.log('yFactibles', yFactibles)

  return (
    <Plot
      data={[
        // Dibujar líneas de cada restricción
        ...parsedRestrictions.map((r, idx) => {
          const xValues = [0, Math.max(...xFactibles, 20)]
          const yValues = xValues.map((x) =>
            r.a[1] !== 0 ? (r.b - r.a[0] * x) / r.a[1] : r.b
          )
          return {
            x: xValues,
            y: yValues,
            type: 'scatter',
            mode: 'lines',
            name: `R${idx + 1}: ${r.a[0]}x1 + ${r.a[1]}x2 ${r.type} ${r.b}`,
            line: { width: 2 }
          }
        }),
        // Área factible
        {
          x: xFactibles,
          y: yFactibles,
          fill: 'toself',
          fillcolor: 'rgba(0, 200, 0, 0.3)',
          type: 'scatter',
          name: 'Región factible',
          line: { color: 'green', width: 0 }
        }
      ]}
      layout={{
        width: 600,
        height: 400,
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
