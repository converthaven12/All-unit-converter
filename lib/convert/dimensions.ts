// Dimension utilities and constants

import type { DimensionVector } from "./types"

export const ZERO_DIMENSION: DimensionVector = {
  L: 0,
  M: 0,
  T: 0,
  I: 0,
  Θ: 0,
  N: 0,
  J: 0,
  A: 0,
}

export const BASE_DIMENSIONS = {
  LENGTH: { L: 1, M: 0, T: 0, I: 0, Θ: 0, N: 0, J: 0, A: 0 } as DimensionVector,
  MASS: { L: 0, M: 1, T: 0, I: 0, Θ: 0, N: 0, J: 0, A: 0 } as DimensionVector,
  TIME: { L: 0, M: 0, T: 1, I: 0, Θ: 0, N: 0, J: 0, A: 0 } as DimensionVector,
  CURRENT: { L: 0, M: 0, T: 0, I: 1, Θ: 0, N: 0, J: 0, A: 0 } as DimensionVector,
  TEMPERATURE: { L: 0, M: 0, T: 0, I: 0, Θ: 1, N: 0, J: 0, A: 0 } as DimensionVector,
  AMOUNT: { L: 0, M: 0, T: 0, I: 0, Θ: 0, N: 1, J: 0, A: 0 } as DimensionVector,
  LUMINOSITY: { L: 0, M: 0, T: 0, I: 0, Θ: 0, N: 0, J: 1, A: 0 } as DimensionVector,
  ANGLE: { L: 0, M: 0, T: 0, I: 0, Θ: 0, N: 0, J: 0, A: 1 } as DimensionVector,

  // Derived dimensions
  AREA: { L: 2, M: 0, T: 0, I: 0, Θ: 0, N: 0, J: 0, A: 0 } as DimensionVector,
  VOLUME: { L: 3, M: 0, T: 0, I: 0, Θ: 0, N: 0, J: 0, A: 0 } as DimensionVector,
  SPEED: { L: 1, M: 0, T: -1, I: 0, Θ: 0, N: 0, J: 0, A: 0 } as DimensionVector,
  ACCELERATION: { L: 1, M: 0, T: -2, I: 0, Θ: 0, N: 0, J: 0, A: 0 } as DimensionVector,
  FORCE: { L: 1, M: 1, T: -2, I: 0, Θ: 0, N: 0, J: 0, A: 0 } as DimensionVector,
  ENERGY: { L: 2, M: 1, T: -2, I: 0, Θ: 0, N: 0, J: 0, A: 0 } as DimensionVector,
  POWER: { L: 2, M: 1, T: -3, I: 0, Θ: 0, N: 0, J: 0, A: 0 } as DimensionVector,
  PRESSURE: { L: -1, M: 1, T: -2, I: 0, Θ: 0, N: 0, J: 0, A: 0 } as DimensionVector,
  FREQUENCY: { L: 0, M: 0, T: -1, I: 0, Θ: 0, N: 0, J: 0, A: 0 } as DimensionVector,
  DENSITY: { L: -3, M: 1, T: 0, I: 0, Θ: 0, N: 0, J: 0, A: 0 } as DimensionVector,
}

export function dimensionsEqual(a: DimensionVector, b: DimensionVector): boolean {
  return (
    a.L === b.L && a.M === b.M && a.T === b.T && a.I === b.I && a.Θ === b.Θ && a.N === b.N && a.J === b.J && a.A === b.A
  )
}

export function multiplyDimensions(a: DimensionVector, b: DimensionVector): DimensionVector {
  return {
    L: a.L + b.L,
    M: a.M + b.M,
    T: a.T + b.T,
    I: a.I + b.I,
    Θ: a.Θ + b.Θ,
    N: a.N + b.N,
    J: a.J + b.J,
    A: a.A + b.A,
  }
}

export function divideDimensions(a: DimensionVector, b: DimensionVector): DimensionVector {
  return {
    L: a.L - b.L,
    M: a.M - b.M,
    T: a.T - b.T,
    I: a.I - b.I,
    Θ: a.Θ - b.Θ,
    N: a.N - b.N,
    J: a.J - b.J,
    A: a.A - b.A,
  }
}

export function powerDimension(dim: DimensionVector, exponent: number): DimensionVector {
  return {
    L: dim.L * exponent,
    M: dim.M * exponent,
    T: dim.T * exponent,
    I: dim.I * exponent,
    Θ: dim.Θ * exponent,
    N: dim.N * exponent,
    J: dim.J * exponent,
    A: dim.A * exponent,
  }
}

export function dimensionToString(dim: DimensionVector): string {
  const parts: string[] = []

  if (dim.L !== 0) parts.push(`L${dim.L !== 1 ? `^${dim.L}` : ""}`)
  if (dim.M !== 0) parts.push(`M${dim.M !== 1 ? `^${dim.M}` : ""}`)
  if (dim.T !== 0) parts.push(`T${dim.T !== 1 ? `^${dim.T}` : ""}`)
  if (dim.I !== 0) parts.push(`I${dim.I !== 1 ? `^${dim.I}` : ""}`)
  if (dim.Θ !== 0) parts.push(`Θ${dim.Θ !== 1 ? `^${dim.Θ}` : ""}`)
  if (dim.N !== 0) parts.push(`N${dim.N !== 1 ? `^${dim.N}` : ""}`)
  if (dim.J !== 0) parts.push(`J${dim.J !== 1 ? `^${dim.J}` : ""}`)
  if (dim.A !== 0) parts.push(`A${dim.A !== 1 ? `^${dim.A}` : ""}`)

  return parts.length > 0 ? parts.join("·") : "1"
}
