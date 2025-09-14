export function Intersecciones(restrictions) {
  const points = [];

  // Intersecciones entre restricciones
  for (let i = 0; i < restrictions.length; i++) {
    for (let j = i + 1; j < restrictions.length; j++) {
      const r1 = restrictions[i];
      const r2 = restrictions[j];
      const [a1, b1] = r1.a;
      const [a2, b2] = r2.a;

      //sistema de ecuaciones
      // a1x1 + b1x2 = r1.b
      // a2x1 + b2x2 = r2.b
      const det = a1 * b2 - a2 * b1;
      if (det === 0) continue; // paralelas

      const x1 = (r1.b * b2 - r2.b * b1) / det;
      const x2 = (a1 * r2.b - a2 * r1.b) / det;

      if (x1 >= 0 && x2 >= 0) {
        points.push({ x1: parseFloat(x1.toFixed(2)), x2: parseFloat(x2.toFixed(2)) });
      }
    }
  }

  // Intersecciones con eje X y Y
  restrictions.forEach(r => {
    const [a1, a2] = r.a;

    // Intersección con X (x2 = 0)
    if (a1 !== 0) {
      const x1 = r.b / a1;
      if (x1 >= 0) points.push({ x1: parseFloat(x1.toFixed(2)), x2: 0 });
    }

    // Intersección con Y (x1 = 0)
    if (a2 !== 0) {
      const x2 = r.b / a2;
      if (x2 >= 0) points.push({ x1: 0, x2: parseFloat(x2.toFixed(2)) });
    }
  });

  return points;
}

export function filtrarFactibles(points, restrictions) {
  // Filtrar puntos existentes
  let factibles = points.filter(p => 
    restrictions.every(r => 
      r.type === "<=" ? r.a[0]*p.x1 + r.a[1]*p.x2 <= r.b :
      r.a[0]*p.x1 + r.a[1]*p.x2 >= r.b
    )
    && p.x1 >= 0
    && p.x2 >= 0
  )

  // Verificar si (0,0) cumple todas las restricciones
  const origen = { x1: 0, x2: 0 }
  const esFactibleOrigen = restrictions.every(r =>
    r.type === "<=" ? 0 <= r.b : 0 >= r.b
  )
  if (esFactibleOrigen) factibles.push(origen)

  return factibles
}


export function ValoresZ(f, factibles){
    return factibles.map(p => (f.x1*p.x1 + f.x2*p.x2)) 
}

export function ResolucionFO(ValoresZ, type){
    if (type === "max") return Math.max(...ValoresZ)
    if (type === "min") return Math.min(...ValoresZ)
}

export function ordenarPoligono(points) {
  // calcular centroide
  const cx = points.reduce((acc, p) => acc + p.x1, 0) / points.length
  const cy = points.reduce((acc, p) => acc + p.x2, 0) / points.length

  // ordenar por ángulo respecto al centroide
  return points.slice().sort((a, b) => {
    const angleA = Math.atan2(a.x2 - cy, a.x1 - cx)
    const angleB = Math.atan2(b.x2 - cy, b.x1 - cx)
    return angleA - angleB
  })
}

const restrictions = [{a: [1, 2], type: '<=', b: 120}, {a: [1, 1], type: '<=', b: 90}]
const points = Intersecciones(restrictions)
console.log(points) 

const factibles = filtrarFactibles(points, restrictions)
console.log(factibles)

const resFO = ValoresZ({x1: 50, x2: 80}, factibles)
console.log(resFO)

const resFOmax = ResolucionFO(resFO, "max")
console.log(resFOmax)