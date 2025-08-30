"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Conversion data and functions

// Define a type for the conversion data
interface ConversionData {
  title: string
  fromUnit: string
  toUnit: string
  fromSymbol: string
  toSymbol: string
  category: string
  convert: (value: number) => number
  reverseConvert: (value: number) => number
  relatedConverters: { name: string; slug: string; title: string }[]
  offset?: number // Optional offset for conversions like temperature
}

const conversions: Record<string, ConversionData> = {
  "cm-to-inches": {
    title: "Centimeters to Inches",
    fromUnit: "Centimeters",
    toUnit: "Inches",
    fromSymbol: "cm",
    toSymbol: "in",
    category: "Length",
    convert: (value: number) => value / 2.54,
    reverseConvert: (value: number) => value * 2.54,
    relatedConverters: [
      { name: "Meters to Feet", slug: "meters-to-feet", title: "Meters to Feet" },
      { name: "Millimeters to Inches", slug: "millimeters-to-inches", title: "Millimeters to Inches" },
      { name: "Feet to Meters", slug: "feet-to-meters", title: "Feet to Meters" },
      { name: "Inches to CM", slug: "inches-to-cm", title: "Inches to CM" },
      { name: "Yards to Meters", slug: "yards-to-meters", title: "Yards to Meters" },
      { name: "Kilometers to Miles", slug: "kilometers-to-miles", title: "Kilometers to Miles" },
      { name: "Miles to Kilometers", slug: "miles-to-kilometers", title: "Miles to Kilometers" },
      { name: "Feet to Inches", slug: "feet-to-inches", title: "Feet to Inches" },
    ],
  },
  "meters-to-feet": {
    title: "Meters to Feet",
    fromUnit: "Meters",
    toUnit: "Feet",
    fromSymbol: "m",
    toSymbol: "ft",
    category: "Length",
    convert: (value: number) => value * 3.28084,
    reverseConvert: (value: number) => value / 3.28084,
    relatedConverters: [
      { name: "CM to Inches", slug: "cm-to-inches", title: "CM to Inches" },
      { name: "Millimeters to Inches", slug: "millimeters-to-inches", title: "Millimeters to Inches" },
      { name: "Feet to Meters", slug: "feet-to-meters", title: "Feet to Meters" },
      { name: "Inches to CM", slug: "inches-to-cm", title: "Inches to CM" },
      { name: "Yards to Meters", slug: "yards-to-meters", title: "Yards to Meters" },
      { name: "Kilometers to Miles", slug: "kilometers-to-miles", title: "Kilometers to Miles" },
      { name: "Miles to Kilometers", slug: "miles-to-kilometers", title: "Miles to Kilometers" },
      { name: "Centimeters to Feet", slug: "centimeters-to-feet", title: "Centimeters to Feet" },
    ],
  },
  "kilometers-to-miles": {
    title: "Kilometers to Miles",
    fromUnit: "Kilometers",
    toUnit: "Miles",
    fromSymbol: "km",
    toSymbol: "mi",
    category: "Length",
    convert: (value: number) => value * 0.621371,
    reverseConvert: (value: number) => value / 0.621371,
    relatedConverters: [
      { name: "Meters to Feet", slug: "meters-to-feet", title: "Meters to Feet" },
      { name: "Miles to KM", slug: "miles-to-km", title: "Miles to KM" },
      { name: "Nautical Miles to Miles", slug: "nautical-miles-to-miles", title: "Nautical Miles to Miles" },
      { name: "CM to Inches", slug: "cm-to-inches", title: "CM to Inches" },
      { name: "Yards to Meters", slug: "yards-to-meters", title: "Yards to Meters" },
      { name: "Feet to Meters", slug: "feet-to-meters", title: "Feet to Meters" },
      { name: "Inches to CM", slug: "inches-to-cm", title: "Inches to CM" },
      { name: "Millimeters to Inches", slug: "millimeters-to-inches", title: "Millimeters to Inches" },
    ],
  },
  "millimeters-to-inches": {
    title: "Millimeters to Inches",
    fromUnit: "Millimeters",
    toUnit: "Inches",
    fromSymbol: "mm",
    toSymbol: "in",
    category: "Length",
    convert: (value: number) => value * 0.0393701,
    reverseConvert: (value: number) => value / 0.0393701,
    relatedConverters: [
      { name: "CM to Inches", slug: "cm-to-inches", title: "CM to Inches" },
      { name: "Meters to Feet", slug: "meters-to-feet", title: "Meters to Feet" },
      { name: "Inches to MM", slug: "inches-to-mm", title: "Inches to MM" },
      { name: "Feet to Meters", slug: "feet-to-meters", title: "Feet to Meters" },
      { name: "Yards to Meters", slug: "yards-to-meters", title: "Yards to Meters" },
      { name: "Kilometers to Miles", slug: "kilometers-to-miles", title: "Kilometers to Miles" },
      { name: "Miles to Kilometers", slug: "miles-to-kilometers", title: "Miles to Kilometers" },
      { name: "Centimeters to Feet", slug: "centimeters-to-feet", title: "Centimeters to Feet" },
    ],
  },
  "yards-to-meters": {
    title: "Yards to Meters",
    fromUnit: "Yards",
    toUnit: "Meters",
    fromSymbol: "yd",
    toSymbol: "m",
    category: "Length",
    convert: (value: number) => value * 0.9144,
    reverseConvert: (value: number) => value / 0.9144,
    relatedConverters: [
      { name: "Meters to Yards", slug: "meters-to-yards", title: "Meters to Yards" },
      { name: "Feet to Meters", slug: "feet-to-meters", title: "Feet to Meters" },
      { name: "Meters to Feet", slug: "meters-to-feet", title: "Meters to Feet" },
      { name: "CM to Inches", slug: "cm-to-inches", title: "CM to Inches" },
      { name: "Kilometers to Miles", slug: "kilometers-to-miles", title: "Kilometers to Miles" },
      { name: "Miles to Kilometers", slug: "miles-to-kilometers", title: "Miles to Kilometers" },
      { name: "Inches to CM", slug: "inches-to-cm", title: "Inches to CM" },
      { name: "Millimeters to Inches", slug: "millimeters-to-inches", title: "Millimeters to Inches" },
    ],
  },
  "nautical-miles-to-miles": {
    title: "Nautical Miles to Miles",
    fromUnit: "Nautical Miles",
    toUnit: "Miles",
    fromSymbol: "nmi",
    toSymbol: "mi",
    category: "Length",
    convert: (value: number) => value * 1.15078,
    reverseConvert: (value: number) => value / 1.15078,
    relatedConverters: [
      { name: "Miles to Nautical Miles", slug: "miles-to-nautical-miles", title: "Miles to Nautical Miles" },
      { name: "Kilometers to Miles", slug: "kilometers-to-miles", title: "Kilometers to Miles" },
      { name: "Miles to KM", slug: "miles-to-km", title: "Miles to KM" },
      { name: "Meters to Feet", slug: "meters-to-feet", title: "Meters to Feet" },
      { name: "Yards to Meters", slug: "yards-to-meters", title: "Yards to Meters" },
      { name: "Feet to Meters", slug: "feet-to-meters", title: "Feet to Meters" },
      { name: "Inches to CM", slug: "inches-to-cm", title: "Inches to CM" },
      { name: "Millimeters to Inches", slug: "millimeters-to-inches", title: "Millimeters to Inches" },
    ],
  },
  "feet-to-meters": {
    title: "Feet to Meters",
    fromUnit: "Feet",
    toUnit: "Meters",
    fromSymbol: "ft",
    toSymbol: "m",
    category: "Length",
    convert: (value: number) => value * 0.3048,
    reverseConvert: (value: number) => value / 0.3048,
    relatedConverters: [
      { name: "Meters to Feet", slug: "meters-to-feet", title: "Meters to Feet" },
      { name: "Inches to CM", slug: "inches-to-cm", title: "Inches to CM" },
      { name: "Yards to Meters", slug: "yards-to-meters", title: "Yards to Meters" },
      { name: "CM to Inches", slug: "cm-to-inches", title: "CM to Inches" },
      { name: "Kilometers to Miles", slug: "kilometers-to-miles", title: "Kilometers to Miles" },
      { name: "Miles to Kilometers", slug: "miles-to-kilometers", title: "Miles to Kilometers" },
      { name: "Millimeters to Inches", slug: "millimeters-to-inches", title: "Millimeters to Inches" },
      { name: "Centimeters to Feet", slug: "centimeters-to-feet", title: "Centimeters to Feet" },
    ],
  },
  "inches-to-cm": {
    title: "Inches to CM",
    fromUnit: "Inches",
    toUnit: "Centimeters",
    fromSymbol: "in",
    toSymbol: "cm",
    category: "Length",
    convert: (value: number) => value * 2.54,
    reverseConvert: (value: number) => value / 2.54,
    relatedConverters: [
      { name: "CM to Inches", slug: "cm-to-inches", title: "CM to Inches" },
      { name: "Feet to Meters", slug: "feet-to-meters", title: "Feet to Meters" },
      { name: "Millimeters to Inches", slug: "millimeters-to-inches", title: "Millimeters to Inches" },
      { name: "Meters to Feet", slug: "meters-to-feet", title: "Meters to Feet" },
      { name: "Yards to Meters", slug: "yards-to-meters", title: "Yards to Meters" },
      { name: "Kilometers to Miles", slug: "kilometers-to-miles", title: "Kilometers to Miles" },
      { name: "Miles to Kilometers", slug: "miles-to-kilometers", title: "Miles to Kilometers" },
      { name: "Centimeters to Feet", slug: "centimeters-to-feet", title: "Centimeters to Feet" },
    ],
  },
  "miles-to-km": {
    title: "Miles to KM",
    fromUnit: "Miles",
    toUnit: "Kilometers",
    fromSymbol: "mi",
    toSymbol: "km",
    category: "Length",
    convert: (value: number) => value * 1.60934,
    reverseConvert: (value: number) => value / 1.60934,
    relatedConverters: [
      { name: "Kilometers to Miles", slug: "kilometers-to-miles", title: "Kilometers to Miles" },
      { name: "Nautical Miles to Miles", slug: "nautical-miles-to-miles", title: "Nautical Miles to Miles" },
      { name: "Meters to Feet", slug: "meters-to-feet", title: "Meters to Feet" },
      { name: "Feet to Meters", slug: "feet-to-meters", title: "Feet to Meters" },
      { name: "Yards to Meters", slug: "yards-to-meters", title: "Yards to Meters" },
      { name: "Inches to CM", slug: "inches-to-cm", title: "Inches to CM" },
      { name: "Millimeters to Inches", slug: "millimeters-to-inches", title: "Millimeters to Inches" },
      { name: "Centimeters to Feet", slug: "centimeters-to-feet", title: "Centimeters to Feet" },
    ],
  },

  // Weight conversions
  "kilograms-to-pounds": {
    title: "Kilograms to Pounds",
    fromUnit: "Kilograms",
    toUnit: "Pounds",
    fromSymbol: "kg",
    toSymbol: "lbs",
    category: "Weight",
    convert: (value: number) => value * 2.20462,
    reverseConvert: (value: number) => value / 2.20462,
    relatedConverters: [
      { name: "Pounds to KG", slug: "pounds-to-kg", title: "Pounds to KG" },
      { name: "Grams to Ounces", slug: "grams-to-ounces", title: "Grams to Ounces" },
      { name: "Stones to Kilograms", slug: "stones-to-kilograms", title: "Stones to Kilograms" },
      { name: "Tons to Pounds", slug: "tons-to-pounds", title: "Tons to Pounds" },
    ],
  },
  "grams-to-ounces": {
    title: "Grams to Ounces",
    fromUnit: "Grams",
    toUnit: "Ounces",
    fromSymbol: "g",
    toSymbol: "oz",
    category: "Weight",
    convert: (value: number) => value * 0.035274,
    reverseConvert: (value: number) => value / 0.035274,
    relatedConverters: [
      { name: "Ounces to Grams", slug: "ounces-to-grams", title: "Ounces to Grams" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds", title: "Kilograms to Pounds" },
      { name: "Pounds to KG", slug: "pounds-to-kg", title: "Pounds to KG" },
      { name: "Carats to Grams", slug: "carats-to-grams", title: "Carats to Grams" },
    ],
  },
  "tons-to-pounds": {
    title: "Tons to Pounds",
    fromUnit: "Tons",
    toUnit: "Pounds",
    fromSymbol: "t",
    toSymbol: "lbs",
    category: "Weight",
    convert: (value: number) => value * 2204.62,
    reverseConvert: (value: number) => value / 2204.62,
    relatedConverters: [
      { name: "Pounds to Tons", slug: "pounds-to-tons", title: "Pounds to Tons" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds", title: "Kilograms to Pounds" },
      { name: "Stones to Kilograms", slug: "stones-to-kilograms", title: "Stones to Kilograms" },
      { name: "Grams to Ounces", slug: "grams-to-ounces", title: "Grams to Ounces" },
    ],
  },
  "stones-to-kilograms": {
    title: "Stones to Kilograms",
    fromUnit: "Stones",
    toUnit: "Kilograms",
    fromSymbol: "st",
    toSymbol: "kg",
    category: "Weight",
    convert: (value: number) => value * 6.35029,
    reverseConvert: (value: number) => value / 6.35029,
    relatedConverters: [
      { name: "Kilograms to Stones", slug: "kilograms-to-stones", title: "Kilograms to Stones" },
      { name: "Pounds to KG", slug: "pounds-to-kg", title: "Pounds to KG" },
      { name: "Stones to Pounds", slug: "stones-to-pounds", title: "Stones to Pounds" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds", title: "Kilograms to Pounds" },
    ],
  },
  "carats-to-grams": {
    title: "Carats to Grams",
    fromUnit: "Carats",
    toUnit: "Grams",
    fromSymbol: "ct",
    toSymbol: "g",
    category: "Weight",
    convert: (value: number) => value * 0.2,
    reverseConvert: (value: number) => value / 0.2,
    relatedConverters: [
      { name: "Grams to Carats", slug: "grams-to-carats", title: "Grams to Carats" },
      { name: "Grams to Ounces", slug: "grams-to-ounces", title: "Grams to Ounces" },
      { name: "Ounces to Grams", slug: "ounces-to-grams", title: "Ounces to Grams" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds", title: "Kilograms to Pounds" },
    ],
  },
  "pounds-to-kg": {
    title: "Pounds to KG",
    fromUnit: "Pounds",
    toUnit: "Kilograms",
    fromSymbol: "lbs",
    toSymbol: "kg",
    category: "Weight",
    convert: (value: number) => value * 0.453592,
    reverseConvert: (value: number) => value / 0.453592,
    relatedConverters: [
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds", title: "Kilograms to Pounds" },
      { name: "Stones to Kilograms", slug: "stones-to-kilograms", title: "Stones to Kilograms" },
      { name: "Grams to Ounces", slug: "grams-to-ounces", title: "Grams to Ounces" },
      { name: "Tons to Pounds", slug: "tons-to-pounds", title: "Tons to Pounds" },
    ],
  },
  "ounces-to-grams": {
    title: "Ounces to Grams",
    fromUnit: "Ounces",
    toUnit: "Grams",
    fromSymbol: "oz",
    toSymbol: "g",
    category: "Weight",
    convert: (value: number) => value * 28.3495,
    reverseConvert: (value: number) => value / 28.3495,
    relatedConverters: [
      { name: "Grams to Ounces", slug: "grams-to-ounces", title: "Grams to Ounces" },
      { name: "Pounds to KG", slug: "pounds-to-kg", title: "Pounds to KG" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds", title: "Kilograms to Pounds" },
      { name: "Carats to Grams", slug: "carats-to-grams", title: "Carats to Grams" },
    ],
  },
  "stones-to-pounds": {
    title: "Stones to Pounds",
    fromUnit: "Stones",
    toUnit: "Pounds",
    fromSymbol: "st",
    toSymbol: "lbs",
    category: "Weight",
    convert: (value: number) => value * 14,
    reverseConvert: (value: number) => value / 14,
    relatedConverters: [
      { name: "Pounds to Stones", slug: "pounds-to-stones", title: "Pounds to Stones" },
      { name: "Stones to Kilograms", slug: "stones-to-kilograms", title: "Stones to Kilograms" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds", title: "Kilograms to Pounds" },
      { name: "Pounds to KG", slug: "pounds-to-kg", title: "Pounds to KG" },
    ],
  },

  // Temperature conversions
  "celsius-to-fahrenheit": {
    title: "Celsius to Fahrenheit",
    fromUnit: "Celsius",
    toUnit: "Fahrenheit",
    fromSymbol: "°C",
    toSymbol: "°F",
    category: "Temperature",
    convert: (value: number) => (value * 9) / 5 + 32,
    reverseConvert: (value: number) => ((value - 32) * 5) / 9,
    relatedConverters: [
      { name: "Fahrenheit to Celsius", slug: "fahrenheit-to-celsius", title: "Fahrenheit to Celsius" },
      { name: "Kelvin to Celsius", slug: "kelvin-to-celsius", title: "Kelvin to Celsius" },
      { name: "Rankine to Fahrenheit", slug: "rankine-to-fahrenheit", title: "Rankine to Fahrenheit" },
    ],
  },
  "kelvin-to-celsius": {
    title: "Kelvin to Celsius",
    fromUnit: "Kelvin",
    toUnit: "Celsius",
    fromSymbol: "K",
    toSymbol: "°C",
    category: "Temperature",
    convert: (value: number) => value - 273.15,
    reverseConvert: (value: number) => value + 273.15,
    relatedConverters: [
      { name: "Celsius to Kelvin", slug: "celsius-to-kelvin", title: "Celsius to Kelvin" },
      { name: "Celsius to Fahrenheit", slug: "celsius-to-fahrenheit", title: "Celsius to Fahrenheit" },
      { name: "Fahrenheit to Celsius", slug: "fahrenheit-to-celsius", title: "Fahrenheit to Celsius" },
      { name: "Rankine to Fahrenheit", slug: "rankine-to-fahrenheit", title: "Rankine to Fahrenheit" },
    ],
  },
  "rankine-to-fahrenheit": {
    title: "Rankine to Fahrenheit",
    fromUnit: "Rankine",
    toUnit: "Fahrenheit",
    fromSymbol: "°R",
    toSymbol: "°F",
    category: "Temperature",
    convert: (value: number) => value - 459.67,
    reverseConvert: (value: number) => value + 459.67,
    relatedConverters: [
      { name: "Fahrenheit to Rankine", slug: "fahrenheit-to-rankine", title: "Fahrenheit to Rankine" },
      { name: "Celsius to Fahrenheit", slug: "celsius-to-fahrenheit", title: "Celsius to Fahrenheit" },
      { name: "Kelvin to Celsius", slug: "kelvin-to-celsius", title: "Kelvin to Celsius" },
      { name: "Fahrenheit to Celsius", slug: "fahrenheit-to-celsius", title: "Fahrenheit to Celsius" },
    ],
  },
  "fahrenheit-to-celsius": {
    title: "Fahrenheit to Celsius",
    fromUnit: "Fahrenheit",
    toUnit: "Celsius",
    fromSymbol: "°F",
    toSymbol: "°C",
    category: "Temperature",
    convert: (value: number) => ((value - 32) * 5) / 9,
    reverseConvert: (value: number) => (value * 9) / 5 + 32,
    relatedConverters: [
      { name: "Celsius to Fahrenheit", slug: "celsius-to-fahrenheit", title: "Celsius to Fahrenheit" },
      { name: "Kelvin to Celsius", slug: "kelvin-to-celsius", title: "Kelvin to Celsius" },
      { name: "Rankine to Fahrenheit", slug: "rankine-to-fahrenheit", title: "Rankine to Fahrenheit" },
    ],
  },

  // Volume conversions
  "liters-to-gallons": {
    title: "Liters to Gallons",
    fromUnit: "Liters",
    toUnit: "Gallons",
    fromSymbol: "L",
    toSymbol: "gal",
    category: "Volume",
    convert: (value: number) => value * 0.264172,
    reverseConvert: (value: number) => value / 0.264172,
    relatedConverters: [
      { name: "Gallons to Liters", slug: "gallons-to-liters", title: "Gallons to Liters" },
      {
        name: "Milliliters to Fluid Ounces",
        slug: "milliliters-to-fluid-ounces",
        title: "Milliliters to Fluid Ounces",
      },
      { name: "Cups to Milliliters", slug: "cups-to-milliliters", title: "Cups to Milliliters" },
      { name: "Pints to Liters", slug: "pints-to-liters", title: "Pints to Liters" },
    ],
  },
  "milliliters-to-fluid-ounces": {
    title: "Milliliters to Fluid Ounces",
    fromUnit: "Milliliters",
    toUnit: "Fluid Ounces",
    fromSymbol: "mL",
    toSymbol: "fl oz",
    category: "Volume",
    convert: (value: number) => value * 0.033814,
    reverseConvert: (value: number) => value / 0.033814,
    relatedConverters: [
      { name: "Fluid Ounces to ML", slug: "fluid-ounces-to-ml", title: "Fluid Ounces to ML" },
      { name: "Liters to Gallons", slug: "liters-to-gallons", title: "Liters to Gallons" },
      { name: "ML to Fluid Ounces", slug: "ml-to-fluid-ounces", title: "ML to Fluid Ounces" },
      { name: "Cups to ML", slug: "cups-to-ml", title: "Cups to ML" },
    ],
  },
  "cubic-meters-to-cubic-feet": {
    title: "Cubic Meters to Cubic Feet",
    fromUnit: "Cubic Meters",
    toUnit: "Cubic Feet",
    fromSymbol: "m³",
    toSymbol: "ft³",
    category: "Volume",
    convert: (value: number) => value * 35.3147,
    reverseConvert: (value: number) => value / 35.3147,
    relatedConverters: [
      { name: "Cubic Feet to Cubic Meters", slug: "cubic-feet-to-cubic-meters", title: "Cubic Feet to Cubic Meters" },
      { name: "Liters to Gallons", slug: "liters-to-gallons", title: "Liters to Gallons" },
      {
        name: "Milliliters to Fluid Ounces",
        slug: "milliliters-to-fluid-ounces",
        title: "Milliliters to Fluid Ounces",
      },
      { name: "Cups to Milliliters", slug: "cups-to-milliliters", title: "Cups to Milliliters" },
    ],
  },
  "cups-to-milliliters": {
    title: "Cups to Milliliters",
    fromUnit: "Cups",
    toUnit: "Milliliters",
    fromSymbol: "cup",
    toSymbol: "mL",
    category: "Volume",
    convert: (value: number) => value * 236.588,
    reverseConvert: (value: number) => value / 236.588,
    relatedConverters: [
      { name: "Milliliters to Cups", slug: "milliliters-to-cups", title: "Milliliters to Cups" },
      { name: "Cups to ML", slug: "cups-to-ml", title: "Cups to ML" },
      { name: "Liters to Gallons", slug: "liters-to-gallons", title: "Liters to Gallons" },
      { name: "ML to Fluid Ounces", slug: "ml-to-fluid-ounces", title: "ML to Fluid Ounces" },
    ],
  },
  "pints-to-liters": {
    title: "Pints to Liters",
    fromUnit: "Pints",
    toUnit: "Liters",
    fromSymbol: "pt",
    toSymbol: "L",
    category: "Volume",
    convert: (value: number) => value * 0.473176,
    reverseConvert: (value: number) => value / 0.473176,
    relatedConverters: [
      { name: "Liters to Pints", slug: "liters-to-pints", title: "Liters to Pints" },
      { name: "Quarts to Liters", slug: "quarts-to-liters", title: "Quarts to Liters" },
      { name: "Liters to Gallons", slug: "liters-to-gallons", title: "Liters to Gallons" },
      { name: "Cups to Milliliters", slug: "cups-to-milliliters", title: "Cups to Milliliters" },
    ],
  },
  "quarts-to-liters": {
    title: "Quarts to Liters",
    fromUnit: "Quarts",
    toUnit: "Liters",
    fromSymbol: "qt",
    toSymbol: "L",
    category: "Volume",
    convert: (value: number) => value * 0.946353,
    reverseConvert: (value: number) => value / 0.946353,
    relatedConverters: [
      { name: "Liters to Quarts", slug: "liters-to-quarts", title: "Liters to Quarts" },
      { name: "Pints to Liters", slug: "pints-to-liters", title: "Pints to Liters" },
      { name: "Liters to Gallons", slug: "liters-to-gallons", title: "Liters to Gallons" },
      { name: "Gallons to Liters", slug: "gallons-to-liters", title: "Gallons to Liters" },
    ],
  },
  "ml-to-fluid-ounces": {
    title: "ML to Fluid Ounces",
    fromUnit: "Milliliters",
    toUnit: "Fluid Ounces",
    fromSymbol: "mL",
    toSymbol: "fl oz",
    category: "Volume",
    convert: (value: number) => value * 0.033814,
    reverseConvert: (value: number) => value / 0.033814,
    relatedConverters: [
      {
        name: "Milliliters to Fluid Ounces",
        slug: "milliliters-to-fluid-ounces",
        title: "Milliliters to Fluid Ounces",
      },
      { name: "Fluid Ounces to ML", slug: "fluid-ounces-to-ml", title: "Fluid Ounces to ML" },
      { name: "Cups to ML", slug: "cups-to-ml", title: "Cups to ML" },
      { name: "Liters to Gallons", slug: "liters-to-gallons", title: "Liters to Gallons" },
    ],
  },
  "cups-to-ml": {
    title: "Cups to ML",
    fromUnit: "Cups",
    toUnit: "Milliliters",
    fromSymbol: "cup",
    toSymbol: "mL",
    category: "Volume",
    convert: (value: number) => value * 236.588,
    reverseConvert: (value: number) => value / 236.588,
    relatedConverters: [
      { name: "Cups to Milliliters", slug: "cups-to-milliliters", title: "Cups to Milliliters" },
      { name: "ML to Cups", slug: "ml-to-cups", title: "ML to Cups" },
      { name: "ML to Fluid Ounces", slug: "ml-to-fluid-ounces", title: "ML to Fluid Ounces" },
      { name: "Pints to Liters", slug: "pints-to-liters", title: "Pints to Liters" },
    ],

  // Area conversions
  "square-meters-to-square-feet": {
    title: "Square Meters to Square Feet",
    fromUnit: "Square Meters",
    toUnit: "Square Feet",
    fromSymbol: "m²",
    toSymbol: "ft²",
    category: "Area",
    convert: (value: number) => value * 10.7639,
    reverseConvert: (value: number) => value / 10.7639,
    relatedConverters: [
      {
        name: "Square Feet to Square Meters",
        slug: "square-feet-to-square-meters",
        title: "Square Feet to Square Meters",
      },
      { name: "Sq Feet to Sq Meters", slug: "sq-feet-to-sq-meters", title: "Sq Feet to Sq Meters" },
      { name: "Acres to Square Meters", slug: "acres-to-square-meters", title: "Acres to Square Meters" },
      { name: "Hectares to Acres", slug: "hectares-to-acres", title: "Hectares to Acres" },
    ],
  },
  "acres-to-square-meters": {
    title: "Acres to Square Meters",
    fromUnit: "Acres",
    toUnit: "Square Meters",
    fromSymbol: "ac",
    toSymbol: "m²",
    category: "Area",
    convert: (value: number) => value * 4046.86,
    reverseConvert: (value: number) => value / 4046.86,
    relatedConverters: [
      { name: "Square Meters to Acres", slug: "square-meters-to-acres", title: "Square Meters to Acres" },
      { name: "Hectares to Acres", slug: "hectares-to-acres", title: "Hectares to Acres" },
      { name: "Acres to Hectares", slug: "acres-to-hectares", title: "Acres to Hectares" },
      {
        name: "Square Meters to Square Feet",
        slug: "square-meters-to-square-feet",
        title: "Square Meters to Square Feet",
      },
    ],
  },
  "hectares-to-acres": {
    title: "Hectares to Acres",
    fromUnit: "Hectares",
    toUnit: "Acres",
    fromSymbol: "ha",
    toSymbol: "ac",
    category: "Area",
    convert: (value: number) => value * 2.47105,
    reverseConvert: (value: number) => value / 2.47105,
    relatedConverters: [
      { name: "Acres to Hectares", slug: "acres-to-hectares", title: "Acres to Hectares" },
      { name: "Acres to Square Meters", slug: "acres-to-square-meters", title: "Acres to Square Meters" },
      {
        name: "Square Kilometers to Square Miles",
        slug: "square-kilometers-to-square-miles",
        title: "Square Kilometers to Square Miles",
      },
      {
        name: "Square Meters to Square Feet",
        slug: "square-meters-to-square-feet",
        title: "Square Meters to Square Feet",
      },
    ],
  },
  "square-kilometers-to-square-miles": {
    title: "Square Kilometers to Square Miles",
    fromUnit: "Square Kilometers",
    toUnit: "Square Miles",
    fromSymbol: "km²",
    toSymbol: "mi²",
    category: "Area",
    convert: (value: number) => value * 0.386102,
    reverseConvert: (value: number) => value / 0.386102,
    relatedConverters: [
      {
        name: "Square Miles to Square Kilometers",
        slug: "square-miles-to-square-kilometers",
        title: "Square Miles to Square Kilometers",
      },
      { name: "Hectares to Acres", slug: "hectares-to-acres", title: "Hectares to Acres" },
      { name: "Acres to Square Meters", slug: "acres-to-square-meters", title: "Acres to Square Meters" },
      {
        name: "Square Meters to Square Feet",
        slug: "square-meters-to-square-feet",
        title: "Square Meters to Square Feet",
      },
    ],
  },
  "sq-feet-to-sq-meters": {
    title: "Sq Feet to Sq Meters",
    fromUnit: "Square Feet",
    toUnit: "Square Meters",
    fromSymbol: "ft²",
    toSymbol: "m²",
    category: "Area",
    convert: (value: number) => value * 0.092903,
    reverseConvert: (value: number) => value / 0.092903,
    relatedConverters: [
      {
        name: "Square Meters to Square Feet",
        slug: "square-meters-to-square-feet",
        title: "Square Meters to Square Feet",
      },
      { name: "Acres to Square Meters", slug: "acres-to-square-meters", title: "Acres to Square Meters" },
      { name: "Hectares to Acres", slug: "hectares-to-acres", title: "Hectares to Acres" },
      {
        name: "Square Kilometers to Square Miles",
        slug: "square-kilometers-to-square-miles",
        title: "Square Kilometers to Square Miles",
      },
    ],
  },
  "acres-to-hectares": {
    title: "Acres to Hectares",
    fromUnit: "Acres",
    toUnit: "Hectares",
    fromSymbol: "ac",
    toSymbol: "ha",
    category: "Area",
    convert: (value: number) => value * 0.404686,
    reverseConvert: (value: number) => value / 0.404686,
    relatedConverters: [
      { name: "Hectares to Acres", slug: "hectares-to-acres", title: "Hectares to Acres" },
      { name: "Acres to Square Meters", slug: "acres-to-square-meters", title: "Acres to Square Meters" },
      {
        name: "Square Meters to Square Feet",
        slug: "square-meters-to-square-feet",
        title: "Square Meters to Square Feet",
      },
      {
        name: "Square Kilometers to Square Miles",
        slug: "square-kilometers-to-square-miles",
        title: "Square Kilometers to Square Miles",
      },
    ],
  },

  // Speed conversions
  "kmh-to-mph": {
    title: "KM/H to MPH",
    fromUnit: "Kilometers per Hour",
    toUnit: "Miles per Hour",
    fromSymbol: "km/h",
    toSymbol: "mph",
    category: "Speed",
    convert: (value: number) => value * 0.621371,
    reverseConvert: (value: number) => value / 0.621371,
    relatedConverters: [
      { name: "MPH to KM/H", slug: "mph-to-kmh", title: "MPH to KM/H" },
      { name: "M/S to FT/S", slug: "ms-to-fts", title: "M/S to FT/S" },
      { name: "Knots to MPH", slug: "knots-to-mph", title: "Knots to MPH" },
      { name: "Mach to KM/H", slug: "mach-to-kmh", title: "Mach to KM/H" },
    ],
  },
  "ms-to-fts": {
    title: "M/S to FT/S",
    fromUnit: "Meters per Second",
    toUnit: "Feet per Second",
    fromSymbol: "m/s",
    toSymbol: "ft/s",
    category: "Speed",
    convert: (value: number) => value * 3.28084,
    reverseConvert: (value: number) => value / 3.28084,
    relatedConverters: [
      { name: "FT/S to M/S", slug: "fts-to-ms", title: "FT/S to M/S" },
      { name: "KM/H to MPH", slug: "kmh-to-mph", title: "KM/H to MPH" },
      { name: "MPH to KM/H", slug: "mph-to-kmh", title: "MPH to KM/H" },
      { name: "Knots to MPH", slug: "knots-to-mph", title: "Knots to MPH" },
    ],
  },
  "knots-to-mph": {
    title: "Knots to MPH",
    fromUnit: "Knots",
    toUnit: "Miles per Hour",
    fromSymbol: "kn",
    toSymbol: "mph",
    category: "Speed",
    convert: (value: number) => value * 1.15078,
    reverseConvert: (value: number) => value / 1.15078,
    relatedConverters: [
      { name: "MPH to Knots", slug: "mph-to-knots", title: "MPH to Knots" },
      { name: "KM/H to MPH", slug: "kmh-to-mph", title: "KM/H to MPH" },
      { name: "M/S to FT/S", slug: "ms-to-fts", title: "M/S to FT/S" },
      { name: "Mach to KM/H", slug: "mach-to-kmh", title: "Mach to KM/H" },
    ],
  },
  "mach-to-kmh": {
    title: "Mach to KM/H",
    fromUnit: "Mach",
    toUnit: "Kilometers per Hour",
    fromSymbol: "Ma",
    toSymbol: "km/h",
    category: "Speed",
    convert: (value: number) => value * 1234.8,
    reverseConvert: (value: number) => value / 1234.8,
    relatedConverters: [
      { name: "KM/H to Mach", slug: "kmh-to-mach", title: "KM/H to Mach" },
      { name: "KM/H to MPH", slug: "kmh-to-mph", title: "KM/H to MPH" },
      { name: "Knots to MPH", slug: "knots-to-mph", title: "Knots to MPH" },
      { name: "M/S to FT/S", slug: "ms-to-fts", title: "M/S to FT/S" },
    ],
  },
  "mph-to-kmh": {
    title: "MPH to KM/H",
    fromUnit: "Miles per Hour",
    toUnit: "Kilometers per Hour",
    fromSymbol: "mph",
    toSymbol: "km/h",
    category: "Speed",
    convert: (value: number) => value * 1.60934,
    reverseConvert: (value: number) => value / 1.60934,
    relatedConverters: [
      { name: "KM/H to MPH", slug: "kmh-to-mph", title: "KM/H to MPH" },
      { name: "Knots to MPH", slug: "knots-to-mph", title: "Knots to MPH" },
      { name: "M/S to FT/S", slug: "ms-to-fts", title: "M/S to FT/S" },
      { name: "Mach to KM/H", slug: "mach-to-kmh", title: "Mach to KM/H" },
    ],
  },

  // Pressure conversions
  "pascal-to-psi": {
    title: "Pascal to PSI",
    fromUnit: "Pascal",
    toUnit: "PSI",
    fromSymbol: "Pa",
    toSymbol: "psi",
    category: "Pressure",
    convert: (value: number) => value * 0.000145038,
    reverseConvert: (value: number) => value / 0.000145038,
    relatedConverters: [
      { name: "PSI to Pascal", slug: "psi-to-pascal", title: "PSI to Pascal" },
      { name: "Bar to PSI", slug: "bar-to-psi", title: "Bar to PSI" },
      { name: "PSI to Bar", slug: "psi-to-bar", title: "PSI to Bar" },
      { name: "Bar to Atmosphere", slug: "bar-to-atmosphere", title: "Bar to Atmosphere" },
    ],
  },
  "bar-to-atmosphere": {
    title: "Bar to Atmosphere",
    fromUnit: "Bar",
    toUnit: "Atmosphere",
    fromSymbol: "bar",
    toSymbol: "atm",
    category: "Pressure",
    convert: (value: number) => value * 0.986923,
    reverseConvert: (value: number) => value / 0.986923,
    relatedConverters: [
      { name: "Atmosphere to Bar", slug: "atmosphere-to-bar", title: "Atmosphere to Bar" },
      { name: "Pascal to PSI", slug: "pascal-to-psi", title: "Pascal to PSI" },
      { name: "PSI to Bar", slug: "psi-to-bar", title: "PSI to Bar" },
      { name: "Torr to mmHg", slug: "torr-to-mmhg", title: "Torr to mmHg" },
    ],
  },
  "torr-to-mmhg": {
    title: "Torr to mmHg",
    fromUnit: "Torr",
    toUnit: "mmHg",
    fromSymbol: "Torr",
    toSymbol: "mmHg",
    category: "Pressure",
    convert: (value: number) => value * 1,
    reverseConvert: (value: number) => value / 1,
    relatedConverters: [
      { name: "mmHg to Torr", slug: "mmhg-to-torr", title: "mmHg to Torr" },
      { name: "Pascal to PSI", slug: "pascal-to-psi", title: "Pascal to PSI" },
      { name: "Bar to Atmosphere", slug: "bar-to-atmosphere", title: "Bar to Atmosphere" },
      { name: "PSI to Bar", slug: "psi-to-bar", title: "PSI to Bar" },
    ],
  },
  "psi-to-bar": {
    title: "PSI to Bar",
    fromUnit: "PSI",
    toUnit: "Bar",
    fromSymbol: "psi",
    toSymbol: "bar",
    category: "Pressure",
    convert: (value: number) => value * 0.0689476,
    reverseConvert: (value: number) => value / 0.0689476,
    relatedConverters: [
      { name: "Bar to PSI", slug: "bar-to-psi", title: "Bar to PSI" },
      { name: "Pascal to PSI", slug: "pascal-to-psi", title: "Pascal to PSI" },
      { name: "Bar to Atmosphere", slug: "bar-to-atmosphere", title: "Bar to Atmosphere" },
      { name: "Torr to mmHg", slug: "torr-to-mmhg", title: "Torr to mmHg" },
    ],
  },
  "bar-to-psi": {
    title: "Bar to PSI",
    fromUnit: "Bar",
    toUnit: "PSI",
    fromSymbol: "bar",
    toSymbol: "psi",
    category: "Pressure",
    convert: (value: number) => value * 14.5038,
    reverseConvert: (value: number) => value / 14.5038,
    relatedConverters: [
      { name: "PSI to Bar", slug: "psi-to-bar", title: "PSI to Bar" },
      { name: "Pascal to PSI", slug: "pascal-to-psi", title: "Pascal to PSI" },
      { name: "Bar to Atmosphere", slug: "bar-to-atmosphere", title: "Bar to Atmosphere" },
      { name: "Torr to mmHg", slug: "torr-to-mmhg", title: "Torr to mmHg" },
    ],
  },

  // Energy conversions
  "joules-to-calories": {
    title: "Joules to Calories",
    fromUnit: "Joules",
    toUnit: "Calories",
    fromSymbol: "J",
    toSymbol: "cal",
    category: "Energy",
    convert: (value: number) => value * 0.239006,
    reverseConvert: (value: number) => value / 0.239006,
    relatedConverters: [
      { name: "Calories to Joules", slug: "calories-to-joules", title: "Calories to Joules" },
      { name: "kWh to BTU", slug: "kwh-to-btu", title: "kWh to BTU" },
      { name: "Watts to Horsepower", slug: "watts-to-horsepower", title: "Watts to Horsepower" },
      { name: "BTU to kWh", slug: "btu-to-kwh", title: "BTU to kWh" },
    ],
  },
  "kwh-to-btu": {
    title: "kWh to BTU",
    fromUnit: "Kilowatt Hours",
    toUnit: "BTU",
    fromSymbol: "kWh",
    toSymbol: "BTU",
    category: "Energy",
    convert: (value: number) => value * 3412.14,
    reverseConvert: (value: number) => value / 3412.14,
    relatedConverters: [
      { name: "BTU to kWh", slug: "btu-to-kwh", title: "BTU to kWh" },
      { name: "Joules to Calories", slug: "joules-to-calories", title: "Joules to Calories" },
      { name: "Calories to Joules", slug: "calories-to-joules", title: "Calories to Joules" },
      { name: "Watts to Horsepower", slug: "watts-to-horsepower", title: "Watts to Horsepower" },
    ],
  },
  "watts-to-horsepower": {
    title: "Watts to Horsepower",
    fromUnit: "Watts",
    toUnit: "Horsepower",
    fromSymbol: "W",
    toSymbol: "hp",
    category: "Energy",
    convert: (value: number) => value * 0.00134102,
    reverseConvert: (value: number) => value / 0.00134102,
    relatedConverters: [
      { name: "Horsepower to Watts", slug: "horsepower-to-watts", title: "Horsepower to Watts" },
      { name: "Joules to Calories", slug: "joules-to-calories", title: "Joules to Calories" },
      { name: "kWh to BTU", slug: "kwh-to-btu", title: "kWh to BTU" },
      { name: "Calories to Joules", slug: "calories-to-joules", title: "Calories to Joules" },
    ],
  },
  "calories-to-joules": {
    title: "Calories to Joules",
    fromUnit: "Calories",
    toUnit: "Joules",
    fromSymbol: "cal",
    toSymbol: "J",
    category: "Energy",
    convert: (value: number) => value * 4.184,
    reverseConvert: (value: number) => value / 4.184,
    relatedConverters: [
      { name: "Joules to Calories", slug: "joules-to-calories", title: "Calories to Joules" },
      { name: "kWh to BTU", slug: "kwh-to-btu", title: "kWh to BTU" },
      { name: "Watts to Horsepower", slug: "watts-to-horsepower", title: "Watts to Horsepower" },
      { name: "BTU to kWh", slug: "btu-to-kwh", title: "BTU to kWh" },
    ],
  },

  // Data Storage conversions
  "bytes-to-bits": {
    title: "Bytes to Bits",
    fromUnit: "Bytes",
    toUnit: "Bits",
    fromSymbol: "B",
    toSymbol: "bit",
    category: "Data Storage",
    convert: (value: number) => value * 8,
    reverseConvert: (value: number) => value / 8,
    relatedConverters: [
      { name: "Bits to Bytes", slug: "bits-to-bytes", title: "Bits to Bytes" },
      { name: "KB to MB", slug: "kb-to-mb", title: "KB to MB" },
      { name: "GB to TB", slug: "gb-to-tb", title: "GB to TB" },
      { name: "MB to KB", slug: "mb-to-kb", title: "MB to KB" },
    ],
  },
  "kb-to-mb": {
    title: "KB to MB",
    fromUnit: "Kilobytes",
    toUnit: "Megabytes",
    fromSymbol: "KB",
    toSymbol: "MB",
    category: "Data Storage",
    convert: (value: number) => value / 1024,
    reverseConvert: (value: number) => value * 1024,
    relatedConverters: [
      { name: "MB to KB", slug: "mb-to-kb", title: "MB to KB" },
      { name: "GB to MB", slug: "gb-to-mb", title: "GB to MB" },
      { name: "GB to TB", slug: "gb-to-tb", title: "GB to TB" },
      { name: "Bytes to Bits", slug: "bytes-to-bits", title: "Bytes to Bits" },
    ],
  },
  "gb-to-tb": {
    title: "GB to TB",
    fromUnit: "Gigabytes",
    toUnit: "Terabytes",
    fromSymbol: "GB",
    toSymbol: "TB",
    category: "Data Storage",
    convert: (value: number) => value / 1024,
    reverseConvert: (value: number) => value * 1024,
    relatedConverters: [
      { name: "TB to GB", slug: "tb-to-gb", title: "TB to GB" },
      { name: "GB to MB", slug: "gb-to-mb", title: "GB to MB" },
      { name: "KB to MB", slug: "kb-to-mb", title: "KB to MB" },
      { name: "MB to KB", slug: "mb-to-kb", title: "MB to KB" },
    ],
  },
  "gb-to-mb": {
    title: "GB to MB",
    fromUnit: "Gigabytes",
    toUnit: "Megabytes",
    fromSymbol: "GB",
    toSymbol: "MB",
    category: "Data Storage",
    convert: (value: number) => value * 1024,
    reverseConvert: (value: number) => value / 1024,
    relatedConverters: [
      { name: "MB to GB", slug: "mb-to-gb", title: "MB to GB" },
      { name: "KB to MB", slug: "kb-to-mb", title: "KB to MB" },
      { name: "GB to TB", slug: "gb-to-tb", title: "GB to TB" },
      { name: "MB to KB", slug: "mb-to-kb", title: "MB to KB" },
    ],
  },
  "mb-to-kb": {
    title: "MB to KB",
    fromUnit: "Megabytes",
    toUnit: "Kilobytes",
    fromSymbol: "MB",
    toSymbol: "KB",
    category: "Data Storage",
    convert: (value: number) => value * 1024,
    reverseConvert: (value: number) => value / 1024,
    relatedConverters: [
      { name: "KB to MB", slug: "kb-to-mb", title: "KB to MB" },
      { name: "GB to MB", slug: "gb-to-mb", title: "GB to MB" },
      { name: "GB to TB", slug: "gb-to-tb", title: "GB to TB" },
      { name: "Bytes to Bits", slug: "bytes-to-bits", title: "Bytes to Bits" },
    ],
  },

  // Time conversions
  "hours-to-minutes": {
    title: "Hours to Minutes",
    fromUnit: "Hours",
    toUnit: "Minutes",
    fromSymbol: "hr",
    toSymbol: "min",
    category: "Time",
    convert: (value: number) => value * 60,
    reverseConvert: (value: number) => value / 60,
    relatedConverters: [
      { name: "Minutes to Hours", slug: "minutes-to-hours", title: "Minutes to Hours" },
      { name: "Days to Hours", slug: "days-to-hours", title: "Days to Hours" },
      { name: "Years to Days", slug: "years-to-days", title: "Years to Days" },
      { name: "Hours to Seconds", slug: "hours-to-seconds", title: "Hours to Seconds" },
    ],
  },
  "days-to-hours": {
    title: "Days to Hours",
    fromUnit: "Days",
    toUnit: "Hours",
    fromSymbol: "day",
    toSymbol: "hr",
    category: "Time",
    convert: (value: number) => value * 24,
    reverseConvert: (value: number) => value / 24,
    relatedConverters: [
      { name: "Hours to Days", slug: "hours-to-days", title: "Hours to Days" },
      { name: "Hours to Minutes", slug: "hours-to-minutes", title: "Hours to Minutes" },
      { name: "Years to Days", slug: "years-to-days", title: "Years to Days" },
      { name: "Weeks to Days", slug: "weeks-to-days", title: "Weeks to Days" },
    ],
  },
  "years-to-days": {
    title: "Years to Days",
    fromUnit: "Years",
    toUnit: "Days",
    fromSymbol: "yr",
    toSymbol: "day",
    category: "Time",
    convert: (value: number) => value * 365.25,
    reverseConvert: (value: number) => value / 365.25,
    relatedConverters: [
      { name: "Days to Years", slug: "days-to-years", title: "Days to Years" },
      { name: "Days to Hours", slug: "days-to-hours", title: "Days to Hours" },
      { name: "Hours to Minutes", slug: "hours-to-minutes", title: "Hours to Minutes" },
      { name: "Months to Days", slug: "months-to-days", title: "Months to Days" },
    ],
  },
  "months-to-days": {
    title: "Months to Days",
    fromUnit: "Months",
    toUnit: "Days",
    fromSymbol: "month",
    toSymbol: "day",
    category: "Time",
    convert: (value: number) => value * 30.44,
    reverseConvert: (value: number) => value / 30.44,
    relatedConverters: [
      { name: "Days to Months", slug: "days-to-months", title: "Days to Months" },
      { name: "Years to Days", slug: "years-to-days", title: "Years to Days" },
      { name: "Days to Hours", slug: "days-to-hours", title: "Days to Hours" },
      { name: "Hours to Minutes", slug: "hours-to-minutes", title: "Hours to Minutes" },
    ],
  },
  "inches-to-mm": {
    title: "Inches to MM",
    fromUnit: "Inches",
    toUnit: "Millimeters",
    fromSymbol: "in",
    toSymbol: "mm",
    category: "Length",
    convert: (value: number) => value * 25.4,
    reverseConvert: (value: number) => value / 25.4,
    relatedConverters: [
      { name: "Millimeters to Inches", slug: "millimeters-to-inches", title: "Millimeters to Inches" },
      { name: "CM to Inches", slug: "cm-to-inches", title: "CM to Inches" },
      { name: "Inches to CM", slug: "inches-to-cm", title: "Inches to CM" },
      { name: "Feet to Inches", slug: "feet-to-inches", title: "Feet to Inches" },
    ],
  },
  "meters-to-yards": {
    title: "Meters to Yards",
    fromUnit: "Meters",
    toUnit: "Yards",
    fromSymbol: "m",
    toSymbol: "yd",
    category: "Length",
    convert: (value: number) => value * 1.09361,
    reverseConvert: (value: number) => value / 1.09361,
    relatedConverters: [
      { name: "Yards to Meters", slug: "yards-to-meters", title: "Yards to Meters" },
      { name: "Meters to Feet", slug: "meters-to-feet", title: "Meters to Feet" },
      { name: "Feet to Meters", slug: "feet-to-meters", title: "Feet to Meters" },
      { name: "Yards to Feet", slug: "yards-to-feet", title: "Yards to Feet" },
    ],
  },
  "centimeters-to-feet": {
    title: "Centimeters to Feet",
    fromUnit: "Centimeters",
    toUnit: "Feet",
    fromSymbol: "cm",
    toSymbol: "ft",
    category: "Length",
    convert: (value: number) => value * 0.0328084,
    reverseConvert: (value: number) => value / 0.0328084,
    relatedConverters: [
      { name: "Feet to Centimeters", slug: "feet-to-centimeters", title: "Feet to Centimeters" },
      { name: "CM to Inches", slug: "cm-to-inches", title: "CM to Inches" },
      { name: "Meters to Feet", slug: "meters-to-feet", title: "Meters to Feet" },
      { name: "Inches to CM", slug: "inches-to-cm", title: "Inches to CM" },
    ],
  },
  "feet-to-inches": {
    title: "Feet to Inches",
    fromUnit: "Feet",
    toUnit: "Inches",
    fromSymbol: "ft",
    toSymbol: "in",
    category: "Length",
    convert: (value: number) => value * 12,
    reverseConvert: (value: number) => value / 12,
    relatedConverters: [
      { name: "Inches to Feet", slug: "inches-to-feet", title: "Inches to Feet" },
      { name: "Feet to Meters", slug: "feet-to-meters", title: "Feet to Meters" },
      { name: "Inches to CM", slug: "inches-to-cm", title: "Inches to CM" },
      { name: "CM to Inches", slug: "cm-to-inches", title: "CM to Inches" },
    ],
  },
  "miles-to-nautical-miles": {
    title: "Miles to Nautical Miles",
    fromUnit: "Miles",
    toUnit: "Nautical Miles",
    fromSymbol: "mi",
    toSymbol: "nmi",
    category: "Length",
    convert: (value: number) => value * 0.868976,
    reverseConvert: (value: number) => value / 0.868976,
    relatedConverters: [
      { name: "Nautical Miles to Miles", slug: "nautical-miles-to-miles", title: "Nautical Miles to Miles" },
      { name: "Kilometers to Miles", slug: "kilometers-to-miles", title: "Kilometers to Miles" },
      { name: "Miles to KM", slug: "miles-to-km", title: "Miles to KM" },
      { name: "Meters to Feet", slug: "meters-to-feet", title: "Meters to Feet" },
    ],
  },

  // Missing Weight converters
  "kilograms-to-stones": {
    title: "Kilograms to Stones",
    fromUnit: "Kilograms",
    toUnit: "Stones",
    fromSymbol: "kg",
    toSymbol: "st",
    category: "Weight",
    convert: (value: number) => value * 0.157473,
    reverseConvert: (value: number) => value / 0.157473,
    relatedConverters: [
      { name: "Stones to Kilograms", slug: "stones-to-kilograms", title: "Stones to Kilograms" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds", title: "Kilograms to Pounds" },
      { name: "Pounds to KG", slug: "pounds-to-kg", title: "Pounds to KG" },
      { name: "Stones to Pounds", slug: "stones-to-pounds", title: "Stones to Pounds" },
    ],
  },
  "pounds-to-tons": {
    title: "Pounds to Tons",
    fromUnit: "Pounds",
    toUnit: "Tons",
    fromSymbol: "lbs",
    toSymbol: "t",
    category: "Weight",
    convert: (value: number) => value * 0.000453592,
    reverseConvert: (value: number) => value / 0.000453592,
    relatedConverters: [
      { name: "Tons to Pounds", slug: "tons-to-pounds", title: "Tons to Pounds" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds", title: "Kilograms to Pounds" },
      { name: "Pounds to KG", slug: "pounds-to-kg", title: "Pounds to KG" },
      { name: "Stones to Kilograms", slug: "stones-to-kilograms", title: "Stones to Kilograms" },
    ],
  },
  "grams-to-carats": {
    title: "Grams to Carats",
    fromUnit: "Grams",
    toUnit: "Carats",
    fromSymbol: "g",
    toSymbol: "ct",
    category: "Weight",
    convert: (value: number) => value * 5,
    reverseConvert: (value: number) => value / 5,
    relatedConverters: [
      { name: "Carats to Grams", slug: "carats-to-grams", title: "Carats to Grams" },
      { name: "Grams to Ounces", slug: "grams-to-ounces", title: "Grams to Ounces" },
      { name: "Ounces to Grams", slug: "ounces-to-grams", title: "Ounces to Grams" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds", title: "Kilograms to Pounds" },
    ],
  },
  "pounds-to-stones": {
    title: "Pounds to Stones",
    fromUnit: "Pounds",
    toUnit: "Stones",
    fromSymbol: "lbs",
    toSymbol: "st",
    category: "Weight",
    convert: (value: number) => value * 0.0714286,
    reverseConvert: (value: number) => value / 0.0714286,
    relatedConverters: [
      { name: "Stones to Pounds", slug: "stones-to-pounds", title: "Stones to Pounds" },
      { name: "Stones to Kilograms", slug: "stones-to-kilograms", title: "Stones to Kilograms" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds", title: "Kilograms to Pounds" },
      { name: "Pounds to KG", slug: "pounds-to-kg", title: "Pounds to KG" },
    ],
  },

  // Missing Temperature converters
  "celsius-to-kelvin": {
    title: "Celsius to Kelvin",
    fromUnit: "Celsius",
    toUnit: "Kelvin",
    fromSymbol: "°C",
    toSymbol: "K",
    category: "Temperature",
    convert: (value: number) => value + 273.15,
    reverseConvert: (value: number) => value - 273.15,
    relatedConverters: [
      { name: "Kelvin to Celsius", slug: "kelvin-to-celsius", title: "Kelvin to Celsius" },
      { name: "Celsius to Fahrenheit", slug: "celsius-to-fahrenheit", title: "Celsius to Fahrenheit" },
      { name: "Fahrenheit to Celsius", slug: "fahrenheit-to-celsius", title: "Fahrenheit to Celsius" },
      { name: "Rankine to Fahrenheit", slug: "rankine-to-fahrenheit", title: "Rankine to Fahrenheit" },
    ],
  },
  "fahrenheit-to-rankine": {
    title: "Fahrenheit to Rankine",
    fromUnit: "Fahrenheit",
    toUnit: "Rankine",
    fromSymbol: "°F",
    toSymbol: "°R",
    category: "Temperature",
    convert: (value: number) => value + 459.67,
    reverseConvert: (value: number) => value - 459.67,
    relatedConverters: [
      { name: "Rankine to Fahrenheit", slug: "rankine-to-fahrenheit", title: "Rankine to Fahrenheit" },
      { name: "Celsius to Fahrenheit", slug: "celsius-to-fahrenheit", title: "Celsius to Fahrenheit" },
      { name: "Fahrenheit to Celsius", slug: "fahrenheit-to-celsius", title: "Fahrenheit to Celsius" },
      { name: "Kelvin to Celsius", slug: "kelvin-to-celsius", title: "Kelvin to Celsius" },
    ],
  },

  // Missing Volume converters
  "gallons-to-liters": {
    title: "Gallons to Liters",
    fromUnit: "Gallons",
    toUnit: "Liters",
    fromSymbol: "gal",
    toSymbol: "L",
    category: "Volume",
    convert: (value: number) => value * 3.78541,
    reverseConvert: (value: number) => value / 3.78541,
    relatedConverters: [
      { name: "Liters to Gallons", slug: "liters-to-gallons", title: "Liters to Gallons" },
      { name: "Quarts to Liters", slug: "quarts-to-liters", title: "Quarts to Liters" },
      { name: "Pints to Liters", slug: "pints-to-liters", title: "Pints to Liters" },
      { name: "Cups to Milliliters", slug: "cups-to-milliliters", title: "Cups to Milliliters" },
    ],
  },
  "fluid-ounces-to-ml": {
    title: "Fluid Ounces to ML",
    fromUnit: "Fluid Ounces",
    toUnit: "Milliliters",
    fromSymbol: "fl oz",
    toSymbol: "mL",
    category: "Volume",
    convert: (value: number) => value * 29.5735,
    reverseConvert: (value: number) => value / 29.5735,
    relatedConverters: [
      { name: "ML to Fluid Ounces", slug: "ml-to-fluid-ounces", title: "ML to Fluid Ounces" },
      { name: "Milliliters to Fluid Ounces", slug: "milliliters-to-fluid-ounces", title: "Milliliters to Fluid Ounces" },
      { name: "Cups to ML", slug: "cups-to-ml", title: "Cups to ML" },
      { name: "Liters to Gallons", slug: "liters-to-gallons", title: "Liters to Gallons" },
    ],
  },
  "milliliters-to-cups": {
    title: "Milliliters to Cups",
    fromUnit: "Milliliters",
    toUnit: "Cups",
    fromSymbol: "mL",
    toSymbol: "cup",
    category: "Volume",
    convert: (value: number) => value * 0.00422675,
    reverseConvert: (value: number) => value / 0.00422675,
    relatedConverters: [
      { name: "Cups to Milliliters", slug: "cups-to-milliliters", title: "Cups to Milliliters" },
      { name: "Cups to ML", slug: "cups-to-ml", title: "Cups to ML" },
      { name: "ML to Cups", slug: "ml-to-cups", title: "ML to Cups" },
      { name: "ML to Fluid Ounces", slug: "ml-to-fluid-ounces", title: "ML to Fluid Ounces" },
    ],
  },
  "ml-to-cups": {
    title: "ML to Cups",
    fromUnit: "Milliliters",
    toUnit: "Cups",
    fromSymbol: "mL",
    toSymbol: "cup",
    category: "Volume",
    convert: (value: number) => value * 0.00422675,
    reverseConvert: (value: number) => value / 0.00422675,
    relatedConverters: [
      { name: "Cups to ML", slug: "cups-to-ml", title: "Cups to ML" },
      { name: "Milliliters to Cups", slug: "milliliters-to-cups", title: "Milliliters to Cups" },
      { name: "ML to Fluid Ounces", slug: "ml-to-fluid-ounces", title: "ML to Fluid Ounces" },
      { name: "Pints to Liters", slug: "pints-to-liters", title: "Pints to Liters" },
    ],
  },
  "liters-to-pints": {
    title: "Liters to Pints",
    fromUnit: "Liters",
    toUnit: "Pints",
    fromSymbol: "L",
    toSymbol: "pt",
    category: "Volume",
    convert: (value: number) => value * 2.11338,
    reverseConvert: (value: number) => value / 2.11338,
    relatedConverters: [
      { name: "Pints to Liters", slug: "pints-to-liters", title: "Pints to Liters" },
      { name: "Quarts to Liters", slug: "quarts-to-liters", title: "Quarts to Liters" },
      { name: "Liters to Gallons", slug: "liters-to-gallons", title: "Liters to Gallons" },
      { name: "Cups to Milliliters", slug: "cups-to-milliliters", title: "Cups to Milliliters" },
    ],
  },
  "liters-to-quarts": {
    title: "Liters to Quarts",
    fromUnit: "Liters",
    toUnit: "Quarts",
    fromSymbol: "L",
    toSymbol: "qt",
    category: "Volume",
    convert: (value: number) => value * 1.05669,
    reverseConvert: (value: number) => value / 1.05669,
    relatedConverters: [
      { name: "Quarts to Liters", slug: "quarts-to-liters", title: "Quarts to Liters" },
      { name: "Pints to Liters", slug: "pints-to-liters", title: "Pints to Liters" },
      { name: "Liters to Gallons", slug: "liters-to-gallons", title: "Liters to Gallons" },
      { name: "Gallons to Liters", slug: "gallons-to-liters", title: "Gallons to Liters" },
    ],
  },
  "cubic-feet-to-cubic-meters": {
    title: "Cubic Feet to Cubic Meters",
    fromUnit: "Cubic Feet",
    toUnit: "Cubic Meters",
    fromSymbol: "ft³",
    toSymbol: "m³",
    category: "Volume",
    convert: (value: number) => value * 0.0283168,
    reverseConvert: (value: number) => value / 0.0283168,
    relatedConverters: [
      { name: "Cubic Meters to Cubic Feet", slug: "cubic-meters-to-cubic-feet", title: "Cubic Meters to Cubic Feet" },
      { name: "Liters to Gallons", slug: "liters-to-gallons", title: "Liters to Gallons" },
      { name: "Milliliters to Fluid Ounces", slug: "milliliters-to-fluid-ounces", title: "Milliliters to Fluid Ounces" },
      { name: "Cups to Milliliters", slug: "cups-to-milliliters", title: "Cups to Milliliters" },
    ],
  },

  // Missing Area converters
  "square-feet-to-square-meters": {
    title: "Square Feet to Square Meters",
    fromUnit: "Square Feet",
    toUnit: "Square Meters",
    fromSymbol: "ft²",
    toSymbol: "m²",
    category: "Area",
    convert: (value: number) => value * 0.092903,
    reverseConvert: (value: number) => value / 0.092903,
    relatedConverters: [
      { name: "Square Meters to Square Feet", slug: "square-meters-to-square-feet", title: "Square Meters to Square Feet" },
      { name: "Sq Feet to Sq Meters", slug: "sq-feet-to-sq-meters", title: "Sq Feet to Sq Meters" },
      { name: "Acres to Square Meters", slug: "acres-to-square-meters", title: "Acres to Square Meters" },
      { name: "Hectares to Acres", slug: "hectares-to-acres", title: "Hectares to Acres" },
    ],
  },
  "square-meters-to-acres": {
    title: "Square Meters to Acres",
    fromUnit: "Square Meters",
    toUnit: "Acres",
    fromSymbol: "m²",
    toSymbol: "ac",
    category: "Area",
    convert: (value: number) => value * 0.000247105,
    reverseConvert: (value: number) => value / 0.000247105,
    relatedConverters: [
      { name: "Acres to Square Meters", slug: "acres-to-square-meters", title: "Acres to Square Meters" },
      { name: "Hectares to Acres", slug: "hectares-to-acres", title: "Hectares to Acres" },
      { name: "Acres to Hectares", slug: "acres-to-hectares", title: "Acres to Hectares" },
      { name: "Square Meters to Square Feet", slug: "square-meters-to-square-feet", title: "Square Meters to Square Feet" },
    ],
  },
  "square-miles-to-square-kilometers": {
    title: "Square Miles to Square Kilometers",
    fromUnit: "Square Miles",
    toUnit: "Square Kilometers",
    fromSymbol: "mi²",
    toSymbol: "km²",
    category: "Area",
    convert: (value: number) => value * 2.58999,
    reverseConvert: (value: number) => value / 2.58999,
    relatedConverters: [
      { name: "Square Kilometers to Square Miles", slug: "square-kilometers-to-square-miles", title: "Square Kilometers to Square Miles" },
      { name: "Hectares to Acres", slug: "hectares-to-acres", title: "Hectares to Acres" },
      { name: "Acres to Square Meters", slug: "acres-to-square-meters", title: "Acres to Square Meters" },
      { name: "Square Meters to Square Feet", slug: "square-meters-to-square-feet", title: "Square Meters to Square Feet" },
    ],
  },

  // Missing Speed converters
  "fts-to-ms": {
    title: "FT/S to M/S",
    fromUnit: "Feet per Second",
    toUnit: "Meters per Second",
    fromSymbol: "ft/s",
    toSymbol: "m/s",
    category: "Speed",
    convert: (value: number) => value * 0.3048,
    reverseConvert: (value: number) => value / 0.3048,
    relatedConverters: [
      { name: "M/S to FT/S", slug: "ms-to-fts", title: "M/S to FT/S" },
      { name: "KM/H to MPH", slug: "kmh-to-mph", title: "KM/H to MPH" },
      { name: "MPH to KM/H", slug: "mph-to-kmh", title: "MPH to KM/H" },
      { name: "Knots to MPH", slug: "knots-to-mph", title: "Knots to MPH" },
    ],
  },
  "mph-to-knots": {
    title: "MPH to Knots",
    fromUnit: "Miles per Hour",
    toUnit: "Knots",
    fromSymbol: "mph",
    toSymbol: "kn",
    category: "Speed",
    convert: (value: number) => value * 0.868976,
    reverseConvert: (value: number) => value / 0.868976,
    relatedConverters: [
      { name: "Knots to MPH", slug: "knots-to-mph", title: "Knots to MPH" },
      { name: "KM/H to MPH", slug: "kmh-to-mph", title: "KM/H to MPH" },
      { name: "M/S to FT/S", slug: "ms-to-fts", title: "M/S to FT/S" },
      { name: "Mach to KM/H", slug: "mach-to-kmh", title: "Mach to KM/H" },
    ],
  },
  "kmh-to-mach": {
    title: "KM/H to Mach",
    fromUnit: "Kilometers per Hour",
    toUnit: "Mach",
    fromSymbol: "km/h",
    toSymbol: "Ma",
    category: "Speed",
    convert: (value: number) => value * 0.00081,
    reverseConvert: (value: number) => value / 0.00081,
    relatedConverters: [
      { name: "Mach to KM/H", slug: "mach-to-kmh", title: "Mach to KM/H" },
      { name: "KM/H to MPH", slug: "kmh-to-mph", title: "KM/H to MPH" },
      { name: "Knots to MPH", slug: "knots-to-mph", title: "Knots to MPH" },
      { name: "M/S to FT/S", slug: "ms-to-fts", title: "M/S to FT/S" },
    ],
  },

  // Missing Pressure converters
  "psi-to-pascal": {
    title: "PSI to Pascal",
    fromUnit: "PSI",
    toUnit: "Pascal",
    fromSymbol: "psi",
    toSymbol: "Pa",
    category: "Pressure",
    convert: (value: number) => value * 6894.76,
    reverseConvert: (value: number) => value / 6894.76,
    relatedConverters: [
      { name: "Pascal to PSI", slug: "pascal-to-psi", title: "Pascal to PSI" },
      { name: "Bar to PSI", slug: "bar-to-psi", title: "Bar to PSI" },
      { name: "PSI to Bar", slug: "psi-to-bar", title: "PSI to Bar" },
      { name: "Bar to Atmosphere", slug: "bar-to-atmosphere", title: "Bar to Atmosphere" },
    ],
  },
  "atmosphere-to-bar": {
    title: "Atmosphere to Bar",
    fromUnit: "Atmosphere",
    toUnit: "Bar",
    fromSymbol: "atm",
    toSymbol: "bar",
    category: "Pressure",
    convert: (value: number) => value * 1.01325,
    reverseConvert: (value: number) => value / 1.01325,
    relatedConverters: [
      { name: "Bar to Atmosphere", slug: "bar-to-atmosphere", title: "Bar to Atmosphere" },
      { name: "Pascal to PSI", slug: "pascal-to-psi", title: "Pascal to PSI" },
      { name: "PSI to Bar", slug: "psi-to-bar", title: "PSI to Bar" },
      { name: "Torr to mmHg", slug: "torr-to-mmhg", title: "Torr to mmHg" },
    ],
  },
  "mmhg-to-torr": {
    title: "mmHg to Torr",
    fromUnit: "mmHg",
    toUnit: "Torr",
    fromSymbol: "mmHg",
    toSymbol: "Torr",
    category: "Pressure",
    convert: (value: number) => value * 1,
    reverseConvert: (value: number) => value / 1,
    relatedConverters: [
      { name: "Torr to mmHg", slug: "torr-to-mmhg", title: "Torr to mmHg" },
      { name: "Pascal to PSI", slug: "pascal-to-psi", title: "Pascal to PSI" },
      { name: "Bar to Atmosphere", slug: "bar-to-atmosphere", title: "Bar to Atmosphere" },
      { name: "PSI to Bar", slug: "psi-to-bar", title: "PSI to Bar" },
    ],
  },

  // Missing Energy converters
  "btu-to-kwh": {
    title: "BTU to kWh",
    fromUnit: "BTU",
    toUnit: "Kilowatt Hours",
    fromSymbol: "BTU",
    toSymbol: "kWh",
    category: "Energy",
    convert: (value: number) => value * 0.000293071,
    reverseConvert: (value: number) => value / 0.000293071,
    relatedConverters: [
      { name: "kWh to BTU", slug: "kwh-to-btu", title: "kWh to BTU" },
      { name: "Joules to Calories", slug: "joules-to-calories", title: "Joules to Calories" },
      { name: "Calories to Joules", slug: "calories-to-joules", title: "Calories to Joules" },
      { name: "Watts to Horsepower", slug: "watts-to-horsepower", title: "Watts to Horsepower" },
    ],
  },
  "horsepower-to-watts": {
    title: "Horsepower to Watts",
    fromUnit: "Horsepower",
    toUnit: "Watts",
    fromSymbol: "hp",
    toSymbol: "W",
    category: "Energy",
    convert: (value: number) => value * 745.7,
    reverseConvert: (value: number) => value / 745.7,
    relatedConverters: [
      { name: "Watts to Horsepower", slug: "watts-to-horsepower", title: "Watts to Horsepower" },
      { name: "Joules to Calories", slug: "joules-to-calories", title: "Joules to Calories" },
      { name: "kWh to BTU", slug: "kwh-to-btu", title: "kWh to BTU" },
      { name: "Calories to Joules", slug: "calories-to-joules", title: "Calories to Joules" },
    ],
  },

  // Missing Data Storage converters
  "bits-to-bytes": {
    title: "Bits to Bytes",
    fromUnit: "Bits",
    toUnit: "Bytes",
    fromSymbol: "bit",
    toSymbol: "B",
    category: "Data Storage",
    convert: (value: number) => value / 8,
    reverseConvert: (value: number) => value * 8,
    relatedConverters: [
      { name: "Bytes to Bits", slug: "bytes-to-bits", title: "Bytes to Bits" },
      { name: "KB to MB", slug: "kb-to-mb", title: "KB to MB" },
      { name: "GB to TB", slug: "gb-to-tb", title: "GB to TB" },
      { name: "MB to KB", slug: "mb-to-kb", title: "MB to KB" },
    ],
  },
  "mb-to-gb": {
    title: "MB to GB",
    fromUnit: "Megabytes",
    toUnit: "Gigabytes",
    fromSymbol: "MB",
    toSymbol: "GB",
    category: "Data Storage",
    convert: (value: number) => value / 1024,
    reverseConvert: (value: number) => value * 1024,
    relatedConverters: [
      { name: "GB to MB", slug: "gb-to-mb", title: "GB to MB" },
      { name: "KB to MB", slug: "kb-to-mb", title: "KB to MB" },
      { name: "GB to TB", slug: "gb-to-tb", title: "GB to TB" },
      { name: "MB to KB", slug: "mb-to-kb", title: "MB to KB" },
    ],
  },
  "tb-to-gb": {
    title: "TB to GB",
    fromUnit: "Terabytes",
    toUnit: "Gigabytes",
    fromSymbol: "TB",
    toSymbol: "GB",
    category: "Data Storage",
    convert: (value: number) => value * 1024,
    reverseConvert: (value: number) => value / 1024,
    relatedConverters: [
      { name: "GB to TB", slug: "gb-to-tb", title: "GB to TB" },
      { name: "GB to MB", slug: "gb-to-mb", title: "GB to MB" },
      { name: "KB to MB", slug: "kb-to-mb", title: "KB to MB" },
      { name: "MB to KB", slug: "mb-to-kb", title: "MB to KB" },
    ],
  },

  // Missing Time converters
  "minutes-to-hours": {
    title: "Minutes to Hours",
    fromUnit: "Minutes",
    toUnit: "Hours",
    fromSymbol: "min",
    toSymbol: "hr",
    category: "Time",
    convert: (value: number) => value / 60,
    reverseConvert: (value: number) => value * 60,
    relatedConverters: [
      { name: "Hours to Minutes", slug: "hours-to-minutes", title: "Hours to Minutes" },
      { name: "Days to Hours", slug: "days-to-hours", title: "Days to Hours" },
      { name: "Years to Days", slug: "years-to-days", title: "Years to Days" },
      { name: "Hours to Seconds", slug: "hours-to-seconds", title: "Hours to Seconds" },
    ],
  },
  "hours-to-days": {
    title: "Hours to Days",
    fromUnit: "Hours",
    toUnit: "Days",
    fromSymbol: "hr",
    toSymbol: "day",
    category: "Time",
    convert: (value: number) => value / 24,
    reverseConvert: (value: number) => value * 24,
    relatedConverters: [
      { name: "Days to Hours", slug: "days-to-hours", title: "Days to Hours" },
      { name: "Hours to Minutes", slug: "hours-to-minutes", title: "Hours to Minutes" },
      { name: "Years to Days", slug: "years-to-days", title: "Years to Days" },
      { name: "Weeks to Days", slug: "weeks-to-days", title: "Weeks to Days" },
    ],
  },
  "days-to-years": {
    title: "Days to Years",
    fromUnit: "Days",
    toUnit: "Years",
    fromSymbol: "day",
    toSymbol: "yr",
    category: "Time",
    convert: (value: number) => value / 365.25,
    reverseConvert: (value: number) => value * 365.25,
    relatedConverters: [
      { name: "Years to Days", slug: "years-to-days", title: "Years to Days" },
      { name: "Days to Hours", slug: "days-to-hours", title: "Days to Hours" },
      { name: "Hours to Minutes", slug: "hours-to-minutes", title: "Hours to Minutes" },
      { name: "Months to Days", slug: "months-to-days", title: "Months to Days" },
    ],
  },
  "days-to-months": {
    title: "Days to Months",
    fromUnit: "Days",
    toUnit: "Months",
    fromSymbol: "day",
    toSymbol: "month",
    category: "Time",
    convert: (value: number) => value / 30.44,
    reverseConvert: (value: number) => value * 30.44,
    relatedConverters: [
      { name: "Months to Days", slug: "months-to-days", title: "Months to Days" },
      { name: "Years to Days", slug: "years-to-days", title: "Years to Days" },
      { name: "Days to Hours", slug: "days-to-hours", title: "Days to Hours" },
      { name: "Hours to Minutes", slug: "hours-to-minutes", title: "Hours to Minutes" },
    ],
  },
  "weeks-to-days": {
    title: "Weeks to Days",
    fromUnit: "Weeks",
    toUnit: "Days",
    fromSymbol: "wk",
    toSymbol: "day",
    category: "Time",
    convert: (value: number) => value * 7,
    reverseConvert: (value: number) => value / 7,
    relatedConverters: [
      { name: "Days to Weeks", slug: "days-to-weeks", title: "Days to Weeks" },
      { name: "Days to Hours", slug: "days-to-hours", title: "Days to Hours" },
      { name: "Years to Days", slug: "years-to-days", title: "Years to Days" },
      { name: "Months to Days", slug: "months-to-days", title: "Months to Days" },
    ],
  },
  "hours-to-seconds": {
    title: "Hours to Seconds",
    fromUnit: "Hours",
    toUnit: "Seconds",
    fromSymbol: "hr",
    toSymbol: "sec",
    category: "Time",
    convert: (value: number) => value * 3600,
    reverseConvert: (value: number) => value / 3600,
    relatedConverters: [
      { name: "Seconds to Hours", slug: "seconds-to-hours", title: "Seconds to Hours" },
      { name: "Minutes to Seconds", slug: "minutes-to-seconds", title: "Minutes to Seconds" },
      { name: "Hours to Minutes", slug: "hours-to-minutes", title: "Hours to Minutes" },
      { name: "Days to Hours", slug: "days-to-hours", title: "Days to Hours" },
    ],
  },
  "inches-to-feet": {
    title: "Inches to Feet",
    fromUnit: "Inches",
    toUnit: "Feet",
    fromSymbol: "in",
    toSymbol: "ft",
    category: "Length",
    convert: (value: number) => value / 12,
    reverseConvert: (value: number) => value * 12,
    relatedConverters: [
      { name: "Feet to Inches", slug: "feet-to-inches", title: "Feet to Inches" },
      { name: "Inches to CM", slug: "inches-to-cm", title: "Inches to CM" },
      { name: "CM to Inches", slug: "cm-to-inches", title: "CM to Inches" },
      { name: "Feet to Meters", slug: "feet-to-meters", title: "Feet to Meters" },
    ],
  },
  "feet-to-centimeters": {
    title: "Feet to Centimeters",
    fromUnit: "Feet",
    toUnit: "Centimeters",
    fromSymbol: "ft",
    toSymbol: "cm",
    category: "Length",
    convert: (value: number) => value * 30.48,
    reverseConvert: (value: number) => value / 30.48,
    relatedConverters: [
      { name: "Centimeters to Feet", slug: "centimeters-to-feet", title: "Centimeters to Feet" },
      { name: "Feet to Meters", slug: "feet-to-meters", title: "Feet to Meters" },
      { name: "CM to Inches", slug: "cm-to-inches", title: "CM to Inches" },
      { name: "Meters to Feet", slug: "meters-to-feet", title: "Meters to Feet" },
    ],
  },
  "yards-to-feet": {
    title: "Yards to Feet",
    fromUnit: "Yards",
    toUnit: "Feet",
    fromSymbol: "yd",
    toSymbol: "ft",
    category: "Length",
    convert: (value: number) => value * 3,
    reverseConvert: (value: number) => value / 3,
    relatedConverters: [
      { name: "Feet to Yards", slug: "feet-to-yards", title: "Feet to Yards" },
      { name: "Yards to Meters", slug: "yards-to-meters", title: "Yards to Meters" },
      { name: "Meters to Yards", slug: "meters-to-yards", title: "Meters to Yards" },
      { name: "Feet to Meters", slug: "feet-to-meters", title: "Feet to Meters" },
    ],
  },
  "feet-to-yards": {
    title: "Feet to Yards",
    fromUnit: "Feet",
    toUnit: "Yards",
    fromSymbol: "ft",
    toSymbol: "yd",
    category: "Length",
    convert: (value: number) => value / 3,
    reverseConvert: (value: number) => value * 3,
    relatedConverters: [
      { name: "Yards to Feet", slug: "yards-to-feet", title: "Yards to Feet" },
      { name: "Feet to Meters", slug: "feet-to-meters", title: "Feet to Meters" },
      { name: "Yards to Meters", slug: "yards-to-meters", title: "Yards to Meters" },
      { name: "Meters to Feet", slug: "meters-to-feet", title: "Meters to Feet" },
    ],
  },
  "days-to-weeks": {
    title: "Days to Weeks",
    fromUnit: "Days",
    toUnit: "Weeks",
    fromSymbol: "day",
    toSymbol: "wk",
    category: "Time",
    convert: (value: number) => value / 7,
    reverseConvert: (value: number) => value * 7,
    relatedConverters: [
      { name: "Weeks to Days", slug: "weeks-to-days", title: "Weeks to Days" },
      { name: "Days to Hours", slug: "days-to-hours", title: "Days to Hours" },
      { name: "Hours to Days", slug: "hours-to-days", title: "Hours to Days" },
      { name: "Days to Months", slug: "days-to-months", title: "Days to Months" },
    ],
  },
  "seconds-to-hours": {
    title: "Seconds to Hours",
    fromUnit: "Seconds",
    toUnit: "Hours",
    fromSymbol: "sec",
    toSymbol: "hr",
    category: "Time",
    convert: (value: number) => value / 3600,
    reverseConvert: (value: number) => value * 3600,
    relatedConverters: [
      { name: "Hours to Seconds", slug: "hours-to-seconds", title: "Hours to Seconds" },
      { name: "Minutes to Seconds", slug: "minutes-to-seconds", title: "Minutes to Seconds" },
      { name: "Seconds to Minutes", slug: "seconds-to-minutes", title: "Seconds to Minutes" },
      { name: "Hours to Minutes", slug: "hours-to-minutes", title: "Hours to Minutes" },
    ],
  },
  "minutes-to-seconds": {
    title: "Minutes to Seconds",
    fromUnit: "Minutes",
    toUnit: "Seconds",
    fromSymbol: "min",
    toSymbol: "sec",
    category: "Time",
    convert: (value: number) => value * 60,
    reverseConvert: (value: number) => value / 60,
    relatedConverters: [
      { name: "Seconds to Minutes", slug: "seconds-to-minutes", title: "Seconds to Minutes" },
      { name: "Hours to Seconds", slug: "hours-to-seconds", title: "Hours to Seconds" },
      { name: "Minutes to Hours", slug: "minutes-to-hours", title: "Minutes to Hours" },
      { name: "Hours to Minutes", slug: "hours-to-minutes", title: "Hours to Minutes" },
    ],
  },
  "seconds-to-minutes": {
    title: "Seconds to Minutes",
    fromUnit: "Seconds",
    toUnit: "Minutes",
    fromSymbol: "sec",
    toSymbol: "min",
    category: "Time",
    convert: (value: number) => value / 60,
    reverseConvert: (value: number) => value * 60,
    relatedConverters: [
      { name: "Minutes to Seconds", slug: "minutes-to-seconds", title: "Minutes to Seconds" },
      { name: "Seconds to Hours", slug: "seconds-to-hours", title: "Hours to Seconds" },
      { name: "Hours to Minutes", slug: "hours-to-minutes", title: "Hours to Minutes" },
      { name: "Minutes to Hours", slug: "minutes-to-hours", title: "Minutes to Hours" },
    ],
  },
}
\
const getConverterCategory = (slug: string): string => {
  const lengthConverters = [
    "cm-to-inches",
    "meters-to-feet",
    "kilometers-to-miles",
    "inches-to-cm",
    "feet-to-meters",
    "miles-to-km",
    "millimeters-to-inches",
    "yards-to-meters",
    "nautical-miles-to-miles",
    "inches-to-mm",
    "centimeters-to-feet",
    "feet-to-inches",
    "meters-to-yards",
    "miles-to-nautical-miles",
  ]

  const weightConverters = ["kilograms-to-pounds", "pounds-to-kg", "grams-to-ounces", "ounces-to-grams"]
  const temperatureConverters = [
    "celsius-to-fahrenheit",
    "fahrenheit-to-celsius",
    "kelvin-to-celsius",
    "celsius-to-kelvin",
  ]
  const volumeConverters = ["liters-to-gallons", "gallons-to-liters", "ml-to-fluid-ounces", "fluid-ounces-to-ml"]
  const areaConverters = ["square-meters-to-square-feet", "square-feet-to-square-meters"]
  const speedConverters = ["kmh-to-mph", "mph-to-kmh"]
  const pressureConverters = ["bar-to-psi", "psi-to-bar"]
  const energyConverters = ["joules-to-calories", "calories-to-joules"]
  const dataConverters = ["gb-to-mb", "mb-to-gb"]
  const timeConverters = ["hours-to-minutes", "minutes-to-hours"]

  if (lengthConverters.includes(slug)) return "Length"
  if (weightConverters.includes(slug)) return "Weight"
  if (temperatureConverters.includes(slug)) return "Temperature"
  if (volumeConverters.includes(slug)) return "Volume"
  if (areaConverters.includes(slug)) return "Area"
  if (speedConverters.includes(slug)) return "Speed"
  if (pressureConverters.includes(slug)) return "Pressure"
  if (energyConverters.includes(slug)) return "Energy"
  if (dataConverters.includes(slug)) return "Data Storage"
  if (timeConverters.includes(slug)) return "Time"
  return "General"
}

const getCategoryConverters = (category: string) => {
  const categoryConverters = {
    Length: [
      { name: "CM to Inches", slug: "cm-to-inches", title: "CM to Inches" },
      { name: "Meters to Feet", slug: "meters-to-feet", title: "Meters to Feet" },
      { name: "Kilometers to Miles", slug: "kilometers-to-miles", title: "Kilometers to Miles" },
      { name: "Inches to CM", slug: "inches-to-cm", title: "Inches to CM" },
      { name: "Feet to Meters", slug: "feet-to-meters", title: "Feet to Meters" },
      { name: "Miles to KM", slug: "miles-to-km", title: "Miles to KM" },
      { name: "Millimeters to Inches", slug: "millimeters-to-inches", title: "Millimeters to Inches" },
      { name: "Yards to Meters", slug: "yards-to-meters", title: "Yards to Meters" },
    ],
    Weight: [
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds", title: "Kilograms to Pounds" },
      { name: "Pounds to KG", slug: "pounds-to-kg", title: "Pounds to KG" },
      { name: "Grams to Ounces", slug: "grams-to-ounces", title: "Grams to Ounces" },
      { name: "Ounces to Grams", slug: "ounces-to-grams", title: "Ounces to Grams" },
      { name: "Stones to Kilograms", slug: "stones-to-kilograms", title: "Stones to Kilograms" },
      { name: "Tons to Pounds", slug: "tons-to-pounds", title: "Tons to Pounds" },
    ],
    Temperature: [
      { name: "Celsius to Fahrenheit", slug: "celsius-to-fahrenheit", title: "Celsius to Fahrenheit" },
      { name: "Fahrenheit to Celsius", slug: "fahrenheit-to-celsius", title: "Fahrenheit to Celsius" },
      { name: "Kelvin to Celsius", slug: "kelvin-to-celsius", title: "Kelvin to Celsius" },
      { name: "Celsius to Kelvin", slug: "celsius-to-kelvin", title: "Celsius to Kelvin" },
    ],
    Volume: [
      { name: "Liters to Gallons", slug: "liters-to-gallons", title: "Liters to Gallons" },
      { name: "Gallons to Liters", slug: "gallons-to-liters", title: "Gallons to Liters" },
      { name: "ML to Fluid Ounces", slug: "ml-to-fluid-ounces", title: "ML to Fluid Ounces" },
      { name: "Fluid Ounces to ML", slug: "fluid-ounces-to-ml", title: "Fluid Ounces to ML" },
    ],
    Area: [
      {
        name: "Square Meters to Square Feet",
        slug: "square-meters-to-square-feet",
        title: "Square Meters to Square Feet",
      },
      {
        name: "Square Feet to Square Meters",
        slug: "square-feet-to-square-meters",
        title: "Square Feet to Square Meters",
      },
      { name: "Acres to Square Meters", slug: "acres-to-square-meters", title: "Acres to Square Meters" },
      { name: "Hectares to Acres", slug: "hectares-to-acres", title: "Hectares to Acres" },
    ],
    Speed: [
      { name: "KM/H to MPH", slug: "kmh-to-mph", title: "KM/H to MPH" },
      { name: "MPH to KM/H", slug: "mph-to-kmh", title: "MPH to KM/H" },
      { name: "M/S to FT/S", slug: "ms-to-fts", title: "M/S to FT/S" },
      { name: "Knots to MPH", slug: "knots-to-mph", title: "Knots to MPH" },
    ],
    Pressure: [
      { name: "Bar to PSI", slug: "bar-to-psi", title: "Bar to PSI" },
      { name: "PSI to Bar", slug: "psi-to-bar", title: "PSI to Bar" },
      { name: "PSI to Pascal", slug: "psi-to-pascal", title: "PSI to Pascal" },
      { name: "Bar to Atmosphere", slug: "bar-to-atmosphere", title: "Bar to Atmosphere" },
    ],
    Energy: [
      { name: "Joules to Calories", slug: "joules-to-calories", title: "Joules to Calories" },
      { name: "Calories to Joules", slug: "calories-to-joules", title: "Calories to Joules" },
      { name: "kWh to BTU", slug: "kwh-to-btu", title: "kWh to BTU" },
      { name: "BTU to kWh", slug: "btu-to-kwh", title: "BTU to kWh" },
    ],
    "Data Storage": [
      { name: "GB to MB", slug: "gb-to-mb", title: "GB to MB" },
      { name: "MB to GB", slug: "mb-to-gb", title: "MB to GB" },
      { name: "KB to MB", slug: "kb-to-mb", title: "KB to MB" },
      { name: "GB to TB", slug: "gb-to-tb", title: "GB to TB" },
    ],
    Time: [
      { name: "Hours to Minutes", slug: "hours-to-minutes", title: "Hours to Minutes" },
      { name: "Minutes to Hours", slug: "minutes-to-hours", title: "Minutes to Hours" },
      { name: "Days to Hours", slug: "days-to-hours", title: "Days to Hours" },
      { name: "Years to Days", slug: "years-to-days", title: "Years to Days" },
    ],
  }

  return categoryConverters[category as keyof typeof categoryConverters] || []
}

export default function ConverterPage() {
  const params = useParams()
  const converter = params.converter as string

  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [isReversed, setIsReversed] = useState(false)

  const conversionData = conversions[converter as keyof typeof conversions]

  useEffect(() => {
    if (fromValue && !isNaN(Number(fromValue))) {
      const result = isReversed
        ? conversionData.reverseConvert(Number(fromValue))
        : conversionData.convert(Number(fromValue))
      setToValue(result.toFixed(6).replace(/\.?0+$/, ""))
    } else {
      setToValue("")
    }
  }, [fromValue, isReversed, conversionData])

  if (!conversionData) {
    return <div className="p-8">Converter not found</div>
  }

  const currentFromUnit = isReversed ? conversionData.toUnit : conversionData.fromUnit
  const currentToUnit = isReversed ? conversionData.fromUnit : conversionData.toUnit
  const currentFromSymbol = isReversed ? conversionData.toSymbol : conversionData.fromSymbol
  const currentToSymbol = isReversed ? conversionData.fromSymbol : conversionData.toSymbol

  return (
    <div className="max-w-4xl mx-auto p-6">
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">{conversionData.title}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">{conversionData.title}</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From: {currentFromUnit} ({currentFromSymbol})
            </label>
            <input
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter ${currentFromUnit.toLowerCase()}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To: {currentToUnit} ({currentToSymbol})
            </label>
            <input
              type="text"
              value={toValue}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Result"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              setIsReversed(!isReversed)
              setFromValue(toValue)
              setToValue("")
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ⇄ Swap Units
          </button>
        </div>
      </div>

      {/* Related Converters */}
      <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
          Related {conversionData.category} Converters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {conversionData.relatedConverters.slice(0, 6).map((converter) => (
            <Link
              key={converter.slug}
              href={`/convert/${converter.slug}`}
              className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="font-semibold text-blue-900 mb-1 text-base">{converter.title}</div>
              <div className="text-sm text-blue-600">Quick and accurate conversion</div>
            </Link>
          ))}
        </div>

        {conversionData.relatedConverters.length > 6 && (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-8">More Related Converters</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {conversionData.relatedConverters.slice(6).map((converter) => (
                <Link
                  key={converter.slug}
                  href={`/convert/${converter.slug}`}
                  className="block p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-center"
                >
                  <div className="font-medium text-gray-900 text-sm">{converter.title}</div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      <div className="mt-12 space-y-12">
        {/* Introduction Section */}
        <section className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About {currentFromUnit} to {currentToUnit} Conversion
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Converting {currentFromUnit.toLowerCase()} to {currentToUnit.toLowerCase()} is a common measurement
            conversion that professionals, students, and everyday users frequently need. Whether you're working in
            engineering, cooking, construction, or academic studies, understanding how to accurately convert between{" "}
            {currentFromUnit.toLowerCase()} and {currentToUnit.toLowerCase()}
            is essential for precise calculations and measurements.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This comprehensive guide provides you with the exact conversion formula, step-by-step examples, and
            practical tips to master {currentFromUnit.toLowerCase()} to {currentToUnit.toLowerCase()} conversions. Our
            calculator above gives you instant results, but understanding the underlying mathematics helps you verify
            calculations and work confidently with these units in any situation.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The relationship between {currentFromUnit.toLowerCase()} and {currentToUnit.toLowerCase()} is based on
            standardized measurement systems that ensure consistency across different applications and industries. By
            learning this conversion, you'll be better equipped to handle measurements in both units and understand
            their practical applications.
          </p>
        </section>

        {/* Conversion Formula Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Conversion Formula</h2>
          <p className="text-gray-700 mb-4">
            The mathematical formula to convert {currentFromUnit.toLowerCase()} to {currentToUnit.toLowerCase()} is:
          </p>
          <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>
              {currentToUnit} = {currentFromUnit} ×{" "}
              {conversionData
                .convert(1)
                .toFixed(6)
                .replace(/\.?0+$/, "") || "conversion_factor"}
              {conversionData.offset ? ` + ${conversionData.offset}` : ""}
            </code>
          </div>
          <p className="text-gray-600 text-sm mt-3">
            Where the conversion factor represents the mathematical relationship between these two units of measurement.
          </p>
        </section>

        {/* Quick Conversion Table */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Conversion Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                    {currentFromUnit} ({currentFromSymbol})
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                    {currentToUnit} ({currentToSymbol})
                  </th>
                </tr>
              </thead>
              <tbody>
                {[0.1, 0.5, 1, 2, 5, 10, 20, 25, 50, 75, 100, 250, 500, 750, 1000, 2000, 5000, 10000].map((value) => (
                  <tr key={value} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{value}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">
                      {conversionData
                        .convert(value)
                        .toFixed(6)
                        .replace(/\.?0+$/, "")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Step-by-Step Examples */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Conversion Examples</h2>

          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Example 1: Convert 10 {currentFromUnit}</h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Given:</strong> 10 {currentFromSymbol}
                </p>
                <p>
                  <strong>Formula:</strong> {currentToUnit} = {currentFromUnit} ×{" "}
                  {conversionData
                    .convert(1)
                    .toFixed(6)
                    .replace(/\.?0+$/, "") || "conversion_factor"}
                </p>
                <p>
                  <strong>Calculation:</strong> {currentToUnit} = 10 ×{" "}
                  {conversionData
                    .convert(1)
                    .toFixed(6)
                    .replace(/\.?0+$/, "") || "conversion_factor"}
                </p>
                <p>
                  <strong>Result:</strong> 10 {currentFromSymbol} = {conversionData.convert(10).toFixed(4)}{" "}
                  {currentToSymbol}
                </p>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Example 2: Convert 25.5 {currentFromUnit}</h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Given:</strong> 25.5 {currentFromSymbol}
                </p>
                <p>
                  <strong>Formula:</strong> {currentToUnit} = {currentFromUnit} ×{" "}
                  {conversionData
                    .convert(1)
                    .toFixed(6)
                    .replace(/\.?0+$/, "") || "conversion_factor"}
                </p>
                <p>
                  <strong>Calculation:</strong> {currentToUnit} = 25.5 ×{" "}
                  {conversionData
                    .convert(1)
                    .toFixed(6)
                    .replace(/\.?0+$/, "") || "conversion_factor"}
                </p>
                <p>
                  <strong>Result:</strong> 25.5 {currentFromSymbol} = {conversionData.convert(25.5).toFixed(4)}{" "}
                  {currentToSymbol}
                </p>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Example 3: Convert 100 {currentFromUnit}</h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Given:</strong> 100 {currentFromSymbol}
                </p>
                <p>
                  <strong>Formula:</strong> {currentToUnit} = {currentFromUnit} ×{" "}
                  {conversionData
                    .convert(1)
                    .toFixed(6)
                    .replace(/\.?0+$/, "") || "conversion_factor"}
                </p>
                <p>
                  <strong>Calculation:</strong> {currentToUnit} = 100 ×{" "}
                  {conversionData
                    .convert(1)
                    .toFixed(6)
                    .replace(/\.?0+$/, "") || "conversion_factor"}
                </p>
                <p>
                  <strong>Result:</strong> 100 {currentFromSymbol} = {conversionData.convert(100).toFixed(4)}{" "}
                  {currentToSymbol}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips & Best Practices */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips & Best Practices</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-red-600">Common Mistakes to Avoid</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span>
                    Confusing the conversion direction - always double-check which unit you're converting from and to
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span>Using outdated or incorrect conversion factors - always use standardized values</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span>
                    Rounding too early in multi-step calculations - keep full precision until the final result
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span>Forgetting to include proper units in your final answer</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-green-600">Best Practices</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Always verify your results using a reliable calculator or conversion tool</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Keep track of significant figures based on your input precision</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Understand the context - some applications may require specific precision levels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Practice with common values to develop intuition for reasonable results</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How do I convert {currentFromUnit.toLowerCase()} to {currentToUnit.toLowerCase()}?
              </h3>
              <p className="text-gray-700">
                To convert {currentFromUnit.toLowerCase()} to {currentToUnit.toLowerCase()}, multiply the{" "}
                {currentFromUnit.toLowerCase()} value by the conversion factor. Use our calculator above for instant
                results, or apply the formula: {currentToUnit} = {currentFromUnit} ×{" "}
                {conversionData
                  .convert(1)
                  .toFixed(6)
                  .replace(/\.?0+$/, "") || "conversion_factor"}
                .
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How do I convert {currentToUnit.toLowerCase()} back to {currentFromUnit.toLowerCase()}?
              </h3>
              <p className="text-gray-700">
                To convert {currentToUnit.toLowerCase()} to {currentFromUnit.toLowerCase()}, divide the{" "}
                {currentToUnit.toLowerCase()} value by the conversion factor, or multiply by{" "}
                {(
                  1 /
                  conversionData
                    .convert(1)
                    .toFixed(6)
                    .replace(/\.?0+$/, "")
                ).toFixed(6)}
                . You can also use the "Swap Units" button in our calculator above.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What is the exact conversion factor between {currentFromUnit.toLowerCase()} and{" "}
                {currentToUnit.toLowerCase()}?
              </h3>
              <p className="text-gray-700">
                The exact conversion factor is{" "}
                {conversionData
                  .convert(1)
                  .toFixed(6)
                  .replace(/\.?0+$/, "") || "standardized_value"}
                . This means that 1 {currentFromSymbol} equals {conversionData.convert(1).toFixed(6)} {currentToSymbol}.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Why is this conversion important?</h3>
              <p className="text-gray-700">
                Converting between {currentFromUnit.toLowerCase()} and {currentToUnit.toLowerCase()} is essential in
                many fields including engineering, science, construction, and international trade. Different regions and
                industries may use different measurement systems, making accurate conversion crucial for communication
                and precision.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How accurate is this conversion?</h3>
              <p className="text-gray-700">
                Our conversion uses internationally standardized conversion factors, providing accuracy suitable for
                most practical applications. For scientific or engineering applications requiring extreme precision,
                always verify with official standards for your specific use case.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I bookmark this converter for future use?
              </h3>
              <p className="text-gray-700">
                Yes! This {currentFromUnit.toLowerCase()} to {currentToUnit.toLowerCase()} converter has a permanent URL
                that you can bookmark. The page works offline once loaded and provides instant conversions without
                requiring page refreshes.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Are there mobile apps for this conversion?</h3>
              <p className="text-gray-700">
                This web-based converter is fully responsive and works perfectly on mobile devices. You can add it to
                your home screen for quick access, and it functions like a native app with fast loading times and
                offline capability.
              </p>
            </div>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `How do I convert {currentFromUnit.toLowerCase()} to {currentToUnit.toLowerCase()}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `To convert {currentFromUnit.toLowerCase()} to {currentToUnit.toLowerCase()}, multiply the {currentFromUnit.toLowerCase()} value by the conversion factor. Use our calculator for instant results, or apply the formula: {currentToUnit} = {currentFromUnit} × ${
                    conversionData
                      .convert(1)
                      .toFixed(6)
                      .replace(/\.?0+$/, "") || "conversion_factor"
                  }.`,
                },
              },
              {
                "@type": "Question",
                name: `How do I convert {currentToUnit.toLowerCase()} back to {currentFromUnit.toLowerCase()}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `To convert {currentToUnit.toLowerCase()} to {currentFromUnit.toLowerCase()}, divide the {currentToUnit.toLowerCase()} value by the conversion factor, or multiply by {(1 / (conversionData.convert(1).toFixed(6).replace(/\.?0+$/, ""))).toFixed(6)}.`,
                },
              },
              {
                "@type": "Question",
                name: `What is the exact conversion factor between {currentFromUnit.toLowerCase()} and {currentToUnit.toLowerCase()}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `The exact conversion factor is ${
                    conversionData
                      .convert(1)
                      .toFixed(6)
                      .replace(/\.?0+$/, "") || "standardized_value"
                  }. This means that 1 {currentFromSymbol} equals {conversionData.convert(1).toFixed(6)} {currentToSymbol}.`,
                },
              },
              {
                "@type": "Question",
                name: `Why is this conversion important?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Converting between {currentFromUnit.toLowerCase()} and {currentToUnit.toLowerCase()} is essential in many fields including engineering, science, construction, and international trade. Different regions and industries may use different measurement systems, making accurate conversion crucial.`,
                },
              },
              {
                "@type": "Question",
                name: `How accurate is this conversion?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Our conversion uses internationally standardized conversion factors, providing accuracy suitable for most practical applications. For scientific or engineering applications requiring extreme precision, always verify with official standards.`,
                },
              },
            ],
          }),
        }}
      />
    </div>
  )
}
