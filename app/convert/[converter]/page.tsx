"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { use } from "react"

// Conversion data and functions
const conversions = {
  // Length conversions
  "cm-to-inches": {
    title: "CM to Inches Converter",
    fromUnit: "Centimeters",
    toUnit: "Inches",
    fromSymbol: "cm",
    toSymbol: "in",
    convert: (value: number) => value * 0.393701,
    reverse: (value: number) => value / 0.393701,
    category: "Length",
    relatedConverters: [
      { name: "Meters to Feet", slug: "meters-to-feet" },
      { name: "Millimeters to Inches", slug: "millimeters-to-inches" },
      { name: "Feet to Meters", slug: "feet-to-meters" },
      { name: "Inches to CM", slug: "inches-to-cm" },
    ],
  },
  "meters-to-feet": {
    title: "Meters to Feet Converter",
    fromUnit: "Meters",
    toUnit: "Feet",
    fromSymbol: "m",
    toSymbol: "ft",
    convert: (value: number) => value * 3.28084,
    reverse: (value: number) => value / 3.28084,
    category: "Length",
    relatedConverters: [
      { name: "CM to Inches", slug: "cm-to-inches" },
      { name: "Kilometers to Miles", slug: "kilometers-to-miles" },
      { name: "Feet to Meters", slug: "feet-to-meters" },
      { name: "Yards to Meters", slug: "yards-to-meters" },
    ],
  },
  "kilometers-to-miles": {
    title: "Kilometers to Miles Converter",
    fromUnit: "Kilometers",
    toUnit: "Miles",
    fromSymbol: "km",
    toSymbol: "mi",
    convert: (value: number) => value * 0.621371,
    reverse: (value: number) => value / 0.621371,
    category: "Length",
    relatedConverters: [
      { name: "Meters to Feet", slug: "meters-to-feet" },
      { name: "Miles to KM", slug: "miles-to-km" },
      { name: "Nautical Miles to Miles", slug: "nautical-miles-to-miles" },
      { name: "CM to Inches", slug: "cm-to-inches" },
    ],
  },
  "millimeters-to-inches": {
    title: "Millimeters to Inches Converter",
    fromUnit: "Millimeters",
    toUnit: "Inches",
    fromSymbol: "mm",
    toSymbol: "in",
    convert: (value: number) => value * 0.0393701,
    reverse: (value: number) => value / 0.0393701,
    category: "Length",
    relatedConverters: [
      { name: "CM to Inches", slug: "cm-to-inches" },
      { name: "Meters to Feet", slug: "meters-to-feet" },
      { name: "Inches to MM", slug: "inches-to-mm" },
      { name: "Feet to Meters", slug: "feet-to-meters" },
    ],
  },
  "yards-to-meters": {
    title: "Yards to Meters Converter",
    fromUnit: "Yards",
    toUnit: "Meters",
    fromSymbol: "yd",
    toSymbol: "m",
    convert: (value: number) => value * 0.9144,
    reverse: (value: number) => value / 0.9144,
    category: "Length",
    relatedConverters: [
      { name: "Meters to Yards", slug: "meters-to-yards" },
      { name: "Feet to Meters", slug: "feet-to-meters" },
      { name: "Meters to Feet", slug: "meters-to-feet" },
      { name: "CM to Inches", slug: "cm-to-inches" },
    ],
  },
  "nautical-miles-to-miles": {
    title: "Nautical Miles to Miles Converter",
    fromUnit: "Nautical Miles",
    toUnit: "Miles",
    fromSymbol: "nmi",
    toSymbol: "mi",
    convert: (value: number) => value * 1.15078,
    reverse: (value: number) => value / 1.15078,
    category: "Length",
    relatedConverters: [
      { name: "Miles to Nautical Miles", slug: "miles-to-nautical-miles" },
      { name: "Kilometers to Miles", slug: "kilometers-to-miles" },
      { name: "Miles to KM", slug: "miles-to-km" },
      { name: "Meters to Feet", slug: "meters-to-feet" },
    ],
  },
  "feet-to-meters": {
    title: "Feet to Meters Converter",
    fromUnit: "Feet",
    toUnit: "Meters",
    fromSymbol: "ft",
    toSymbol: "m",
    convert: (value: number) => value * 0.3048,
    reverse: (value: number) => value / 0.3048,
    category: "Length",
    relatedConverters: [
      { name: "Meters to Feet", slug: "meters-to-feet" },
      { name: "Inches to CM", slug: "inches-to-cm" },
      { name: "Yards to Meters", slug: "yards-to-meters" },
      { name: "CM to Inches", slug: "cm-to-inches" },
    ],
  },
  "inches-to-cm": {
    title: "Inches to CM Converter",
    fromUnit: "Inches",
    toUnit: "Centimeters",
    fromSymbol: "in",
    toSymbol: "cm",
    convert: (value: number) => value * 2.54,
    reverse: (value: number) => value / 2.54,
    category: "Length",
    relatedConverters: [
      { name: "CM to Inches", slug: "cm-to-inches" },
      { name: "Feet to Meters", slug: "feet-to-meters" },
      { name: "Millimeters to Inches", slug: "millimeters-to-inches" },
      { name: "Meters to Feet", slug: "meters-to-feet" },
    ],
  },
  "miles-to-km": {
    title: "Miles to KM Converter",
    fromUnit: "Miles",
    toUnit: "Kilometers",
    fromSymbol: "mi",
    toSymbol: "km",
    convert: (value: number) => value * 1.60934,
    reverse: (value: number) => value / 1.60934,
    category: "Length",
    relatedConverters: [
      { name: "Kilometers to Miles", slug: "kilometers-to-miles" },
      { name: "Nautical Miles to Miles", slug: "nautical-miles-to-miles" },
      { name: "Meters to Feet", slug: "meters-to-feet" },
      { name: "Feet to Meters", slug: "feet-to-meters" },
    ],
  },

  // Weight conversions
  "kilograms-to-pounds": {
    title: "Kilograms to Pounds Converter",
    fromUnit: "Kilograms",
    toUnit: "Pounds",
    fromSymbol: "kg",
    toSymbol: "lbs",
    convert: (value: number) => value * 2.20462,
    reverse: (value: number) => value / 2.20462,
    category: "Weight",
    relatedConverters: [
      { name: "Pounds to KG", slug: "pounds-to-kg" },
      { name: "Grams to Ounces", slug: "grams-to-ounces" },
      { name: "Stones to Kilograms", slug: "stones-to-kilograms" },
      { name: "Tons to Pounds", slug: "tons-to-pounds" },
    ],
  },
  "grams-to-ounces": {
    title: "Grams to Ounces Converter",
    fromUnit: "Grams",
    toUnit: "Ounces",
    fromSymbol: "g",
    toSymbol: "oz",
    convert: (value: number) => value * 0.035274,
    reverse: (value: number) => value / 0.035274,
    category: "Weight",
    relatedConverters: [
      { name: "Ounces to Grams", slug: "ounces-to-grams" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds" },
      { name: "Pounds to KG", slug: "pounds-to-kg" },
      { name: "Carats to Grams", slug: "carats-to-grams" },
    ],
  },
  "tons-to-pounds": {
    title: "Tons to Pounds Converter",
    fromUnit: "Tons",
    toUnit: "Pounds",
    fromSymbol: "t",
    toSymbol: "lbs",
    convert: (value: number) => value * 2204.62,
    reverse: (value: number) => value / 2204.62,
    category: "Weight",
    relatedConverters: [
      { name: "Pounds to Tons", slug: "pounds-to-tons" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds" },
      { name: "Stones to Kilograms", slug: "stones-to-kilograms" },
      { name: "Grams to Ounces", slug: "grams-to-ounces" },
    ],
  },
  "stones-to-kilograms": {
    title: "Stones to Kilograms Converter",
    fromUnit: "Stones",
    toUnit: "Kilograms",
    fromSymbol: "st",
    toSymbol: "kg",
    convert: (value: number) => value * 6.35029,
    reverse: (value: number) => value / 6.35029,
    category: "Weight",
    relatedConverters: [
      { name: "Kilograms to Stones", slug: "kilograms-to-stones" },
      { name: "Pounds to KG", slug: "pounds-to-kg" },
      { name: "Stones to Pounds", slug: "stones-to-pounds" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds" },
    ],
  },
  "carats-to-grams": {
    title: "Carats to Grams Converter",
    fromUnit: "Carats",
    toUnit: "Grams",
    fromSymbol: "ct",
    toSymbol: "g",
    convert: (value: number) => value * 0.2,
    reverse: (value: number) => value / 0.2,
    category: "Weight",
    relatedConverters: [
      { name: "Grams to Carats", slug: "grams-to-carats" },
      { name: "Grams to Ounces", slug: "grams-to-ounces" },
      { name: "Ounces to Grams", slug: "ounces-to-grams" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds" },
    ],
  },
  "pounds-to-kg": {
    title: "Pounds to KG Converter",
    fromUnit: "Pounds",
    toUnit: "Kilograms",
    fromSymbol: "lbs",
    toSymbol: "kg",
    convert: (value: number) => value * 0.453592,
    reverse: (value: number) => value / 0.453592,
    category: "Weight",
    relatedConverters: [
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds" },
      { name: "Stones to Kilograms", slug: "stones-to-kilograms" },
      { name: "Grams to Ounces", slug: "grams-to-ounces" },
      { name: "Tons to Pounds", slug: "tons-to-pounds" },
    ],
  },
  "ounces-to-grams": {
    title: "Ounces to Grams Converter",
    fromUnit: "Ounces",
    toUnit: "Grams",
    fromSymbol: "oz",
    toSymbol: "g",
    convert: (value: number) => value * 28.3495,
    reverse: (value: number) => value / 28.3495,
    category: "Weight",
    relatedConverters: [
      { name: "Grams to Ounces", slug: "grams-to-ounces" },
      { name: "Pounds to KG", slug: "pounds-to-kg" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds" },
      { name: "Carats to Grams", slug: "carats-to-grams" },
    ],
  },
  "stones-to-pounds": {
    title: "Stones to Pounds Converter",
    fromUnit: "Stones",
    toUnit: "Pounds",
    fromSymbol: "st",
    toSymbol: "lbs",
    convert: (value: number) => value * 14,
    reverse: (value: number) => value / 14,
    category: "Weight",
    relatedConverters: [
      { name: "Pounds to Stones", slug: "pounds-to-stones" },
      { name: "Stones to Kilograms", slug: "stones-to-kilograms" },
      { name: "Kilograms to Pounds", slug: "kilograms-to-pounds" },
      { name: "Pounds to KG", slug: "pounds-to-kg" },
    ],
  },

  // Temperature conversions
  "celsius-to-fahrenheit": {
    title: "Celsius to Fahrenheit Converter",
    fromUnit: "Celsius",
    toUnit: "Fahrenheit",
    fromSymbol: "°C",
    toSymbol: "°F",
    convert: (value: number) => (value * 9) / 5 + 32,
    reverse: (value: number) => ((value - 32) * 5) / 9,
    category: "Temperature",
    relatedConverters: [
      { name: "Fahrenheit to Celsius", slug: "fahrenheit-to-celsius" },
      { name: "Kelvin to Celsius", slug: "kelvin-to-celsius" },
      { name: "Rankine to Fahrenheit", slug: "rankine-to-fahrenheit" },
    ],
  },
  "kelvin-to-celsius": {
    title: "Kelvin to Celsius Converter",
    fromUnit: "Kelvin",
    toUnit: "Celsius",
    fromSymbol: "K",
    toSymbol: "°C",
    convert: (value: number) => value - 273.15,
    reverse: (value: number) => value + 273.15,
    category: "Temperature",
    relatedConverters: [
      { name: "Celsius to Kelvin", slug: "celsius-to-kelvin" },
      { name: "Celsius to Fahrenheit", slug: "celsius-to-fahrenheit" },
      { name: "Fahrenheit to Celsius", slug: "fahrenheit-to-celsius" },
      { name: "Rankine to Fahrenheit", slug: "rankine-to-fahrenheit" },
    ],
  },
  "rankine-to-fahrenheit": {
    title: "Rankine to Fahrenheit Converter",
    fromUnit: "Rankine",
    toUnit: "Fahrenheit",
    fromSymbol: "°R",
    toSymbol: "°F",
    convert: (value: number) => value - 459.67,
    reverse: (value: number) => value + 459.67,
    category: "Temperature",
    relatedConverters: [
      { name: "Fahrenheit to Rankine", slug: "fahrenheit-to-rankine" },
      { name: "Celsius to Fahrenheit", slug: "celsius-to-fahrenheit" },
      { name: "Kelvin to Celsius", slug: "kelvin-to-celsius" },
      { name: "Fahrenheit to Celsius", slug: "fahrenheit-to-celsius" },
    ],
  },
  "fahrenheit-to-celsius": {
    title: "Fahrenheit to Celsius Converter",
    fromUnit: "Fahrenheit",
    toUnit: "Celsius",
    fromSymbol: "°F",
    toSymbol: "°C",
    convert: (value: number) => ((value - 32) * 5) / 9,
    reverse: (value: number) => (value * 9) / 5 + 32,
    category: "Temperature",
    relatedConverters: [
      { name: "Celsius to Fahrenheit", slug: "celsius-to-fahrenheit" },
      { name: "Kelvin to Celsius", slug: "kelvin-to-celsius" },
      { name: "Rankine to Fahrenheit", slug: "rankine-to-fahrenheit" },
    ],
  },

  // Volume conversions
  "liters-to-gallons": {
    title: "Liters to Gallons Converter",
    fromUnit: "Liters",
    toUnit: "Gallons",
    fromSymbol: "L",
    toSymbol: "gal",
    convert: (value: number) => value * 0.264172,
    reverse: (value: number) => value / 0.264172,
    category: "Volume",
    relatedConverters: [
      { name: "Gallons to Liters", slug: "gallons-to-liters" },
      { name: "Milliliters to Fluid Ounces", slug: "milliliters-to-fluid-ounces" },
      { name: "Cups to Milliliters", slug: "cups-to-milliliters" },
      { name: "Pints to Liters", slug: "pints-to-liters" },
    ],
  },
  "milliliters-to-fluid-ounces": {
    title: "Milliliters to Fluid Ounces Converter",
    fromUnit: "Milliliters",
    toUnit: "Fluid Ounces",
    fromSymbol: "mL",
    toSymbol: "fl oz",
    convert: (value: number) => value * 0.033814,
    reverse: (value: number) => value / 0.033814,
    category: "Volume",
    relatedConverters: [
      { name: "Fluid Ounces to ML", slug: "fluid-ounces-to-ml" },
      { name: "Liters to Gallons", slug: "liters-to-gallons" },
      { name: "ML to Fluid Ounces", slug: "ml-to-fluid-ounces" },
      { name: "Cups to ML", slug: "cups-to-ml" },
    ],
  },
  "cubic-meters-to-cubic-feet": {
    title: "Cubic Meters to Cubic Feet Converter",
    fromUnit: "Cubic Meters",
    toUnit: "Cubic Feet",
    fromSymbol: "m³",
    toSymbol: "ft³",
    convert: (value: number) => value * 35.3147,
    reverse: (value: number) => value / 35.3147,
    category: "Volume",
    relatedConverters: [
      { name: "Cubic Feet to Cubic Meters", slug: "cubic-feet-to-cubic-meters" },
      { name: "Liters to Gallons", slug: "liters-to-gallons" },
      { name: "Milliliters to Fluid Ounces", slug: "milliliters-to-fluid-ounces" },
      { name: "Cups to Milliliters", slug: "cups-to-milliliters" },
    ],
  },
  "cups-to-milliliters": {
    title: "Cups to Milliliters Converter",
    fromUnit: "Cups",
    toUnit: "Milliliters",
    fromSymbol: "cup",
    toSymbol: "mL",
    convert: (value: number) => value * 236.588,
    reverse: (value: number) => value / 236.588,
    category: "Volume",
    relatedConverters: [
      { name: "Milliliters to Cups", slug: "milliliters-to-cups" },
      { name: "Cups to ML", slug: "cups-to-ml" },
      { name: "Liters to Gallons", slug: "liters-to-gallons" },
      { name: "ML to Fluid Ounces", slug: "ml-to-fluid-ounces" },
    ],
  },
  "pints-to-liters": {
    title: "Pints to Liters Converter",
    fromUnit: "Pints",
    toUnit: "Liters",
    fromSymbol: "pt",
    toSymbol: "L",
    convert: (value: number) => value * 0.473176,
    reverse: (value: number) => value / 0.473176,
    category: "Volume",
    relatedConverters: [
      { name: "Liters to Pints", slug: "liters-to-pints" },
      { name: "Quarts to Liters", slug: "quarts-to-liters" },
      { name: "Liters to Gallons", slug: "liters-to-gallons" },
      { name: "Cups to Milliliters", slug: "cups-to-milliliters" },
    ],
  },
  "quarts-to-liters": {
    title: "Quarts to Liters Converter",
    fromUnit: "Quarts",
    toUnit: "Liters",
    fromSymbol: "qt",
    toSymbol: "L",
    convert: (value: number) => value * 0.946353,
    reverse: (value: number) => value / 0.946353,
    category: "Volume",
    relatedConverters: [
      { name: "Liters to Quarts", slug: "liters-to-quarts" },
      { name: "Pints to Liters", slug: "pints-to-liters" },
      { name: "Liters to Gallons", slug: "liters-to-gallons" },
      { name: "Gallons to Liters", slug: "gallons-to-liters" },
    ],
  },
  "ml-to-fluid-ounces": {
    title: "ML to Fluid Ounces Converter",
    fromUnit: "Milliliters",
    toUnit: "Fluid Ounces",
    fromSymbol: "mL",
    toSymbol: "fl oz",
    convert: (value: number) => value * 0.033814,
    reverse: (value: number) => value / 0.033814,
    category: "Volume",
    relatedConverters: [
      { name: "Milliliters to Fluid Ounces", slug: "milliliters-to-fluid-ounces" },
      { name: "Fluid Ounces to ML", slug: "fluid-ounces-to-ml" },
      { name: "Cups to ML", slug: "cups-to-ml" },
      { name: "Liters to Gallons", slug: "liters-to-gallons" },
    ],
  },
  "cups-to-ml": {
    title: "Cups to ML Converter",
    fromUnit: "Cups",
    toUnit: "Milliliters",
    fromSymbol: "cup",
    toSymbol: "mL",
    convert: (value: number) => value * 236.588,
    reverse: (value: number) => value / 236.588,
    category: "Volume",
    relatedConverters: [
      { name: "Cups to Milliliters", slug: "cups-to-milliliters" },
      { name: "ML to Cups", slug: "ml-to-cups" },
      { name: "ML to Fluid Ounces", slug: "ml-to-fluid-ounces" },
      { name: "Pints to Liters", slug: "pints-to-liters" },
    ],
  },

  // Area conversions
  "square-meters-to-square-feet": {
    title: "Square Meters to Square Feet Converter",
    fromUnit: "Square Meters",
    toUnit: "Square Feet",
    fromSymbol: "m²",
    toSymbol: "ft²",
    convert: (value: number) => value * 10.7639,
    reverse: (value: number) => value / 10.7639,
    category: "Area",
    relatedConverters: [
      { name: "Square Feet to Square Meters", slug: "square-feet-to-square-meters" },
      { name: "Sq Feet to Sq Meters", slug: "sq-feet-to-sq-meters" },
      { name: "Acres to Square Meters", slug: "acres-to-square-meters" },
      { name: "Hectares to Acres", slug: "hectares-to-acres" },
    ],
  },
  "acres-to-square-meters": {
    title: "Acres to Square Meters Converter",
    fromUnit: "Acres",
    toUnit: "Square Meters",
    fromSymbol: "ac",
    toSymbol: "m²",
    convert: (value: number) => value * 4046.86,
    reverse: (value: number) => value / 4046.86,
    category: "Area",
    relatedConverters: [
      { name: "Square Meters to Acres", slug: "square-meters-to-acres" },
      { name: "Hectares to Acres", slug: "hectares-to-acres" },
      { name: "Acres to Hectares", slug: "acres-to-hectares" },
      { name: "Square Meters to Square Feet", slug: "square-meters-to-square-feet" },
    ],
  },
  "hectares-to-acres": {
    title: "Hectares to Acres Converter",
    fromUnit: "Hectares",
    toUnit: "Acres",
    fromSymbol: "ha",
    toSymbol: "ac",
    convert: (value: number) => value * 2.47105,
    reverse: (value: number) => value / 2.47105,
    category: "Area",
    relatedConverters: [
      { name: "Acres to Hectares", slug: "acres-to-hectares" },
      { name: "Acres to Square Meters", slug: "acres-to-square-meters" },
      { name: "Square Kilometers to Square Miles", slug: "square-kilometers-to-square-miles" },
      { name: "Square Meters to Square Feet", slug: "square-meters-to-square-feet" },
    ],
  },
  "square-kilometers-to-square-miles": {
    title: "Square Kilometers to Square Miles Converter",
    fromUnit: "Square Kilometers",
    toUnit: "Square Miles",
    fromSymbol: "km²",
    toSymbol: "mi²",
    convert: (value: number) => value * 0.386102,
    reverse: (value: number) => value / 0.386102,
    category: "Area",
    relatedConverters: [
      { name: "Square Miles to Square Kilometers", slug: "square-miles-to-square-kilometers" },
      { name: "Hectares to Acres", slug: "hectares-to-acres" },
      { name: "Acres to Square Meters", slug: "acres-to-square-meters" },
      { name: "Square Meters to Square Feet", slug: "square-meters-to-square-feet" },
    ],
  },
  "sq-feet-to-sq-meters": {
    title: "Sq Feet to Sq Meters Converter",
    fromUnit: "Square Feet",
    toUnit: "Square Meters",
    fromSymbol: "ft²",
    toSymbol: "m²",
    convert: (value: number) => value * 0.092903,
    reverse: (value: number) => value / 0.092903,
    category: "Area",
    relatedConverters: [
      { name: "Square Meters to Square Feet", slug: "square-meters-to-square-feet" },
      { name: "Acres to Square Meters", slug: "acres-to-square-meters" },
      { name: "Hectares to Acres", slug: "hectares-to-acres" },
      { name: "Square Kilometers to Square Miles", slug: "square-kilometers-to-square-miles" },
    ],
  },
  "acres-to-hectares": {
    title: "Acres to Hectares Converter",
    fromUnit: "Acres",
    toUnit: "Hectares",
    fromSymbol: "ac",
    toSymbol: "ha",
    convert: (value: number) => value * 0.404686,
    reverse: (value: number) => value / 0.404686,
    category: "Area",
    relatedConverters: [
      { name: "Hectares to Acres", slug: "hectares-to-acres" },
      { name: "Acres to Square Meters", slug: "acres-to-square-meters" },
      { name: "Square Meters to Square Feet", slug: "square-meters-to-square-feet" },
      { name: "Square Kilometers to Square Miles", slug: "square-kilometers-to-square-miles" },
    ],
  },

  // Speed conversions
  "kmh-to-mph": {
    title: "KM/H to MPH Converter",
    fromUnit: "Kilometers per Hour",
    toUnit: "Miles per Hour",
    fromSymbol: "km/h",
    toSymbol: "mph",
    convert: (value: number) => value * 0.621371,
    reverse: (value: number) => value / 0.621371,
    category: "Speed",
    relatedConverters: [
      { name: "MPH to KM/H", slug: "mph-to-kmh" },
      { name: "M/S to FT/S", slug: "ms-to-fts" },
      { name: "Knots to MPH", slug: "knots-to-mph" },
      { name: "Mach to KM/H", slug: "mach-to-kmh" },
    ],
  },
  "ms-to-fts": {
    title: "M/S to FT/S Converter",
    fromUnit: "Meters per Second",
    toUnit: "Feet per Second",
    fromSymbol: "m/s",
    toSymbol: "ft/s",
    convert: (value: number) => value * 3.28084,
    reverse: (value: number) => value / 3.28084,
    category: "Speed",
    relatedConverters: [
      { name: "FT/S to M/S", slug: "fts-to-ms" },
      { name: "KM/H to MPH", slug: "kmh-to-mph" },
      { name: "MPH to KM/H", slug: "mph-to-kmh" },
      { name: "Knots to MPH", slug: "knots-to-mph" },
    ],
  },
  "knots-to-mph": {
    title: "Knots to MPH Converter",
    fromUnit: "Knots",
    toUnit: "Miles per Hour",
    fromSymbol: "kn",
    toSymbol: "mph",
    convert: (value: number) => value * 1.15078,
    reverse: (value: number) => value / 1.15078,
    category: "Speed",
    relatedConverters: [
      { name: "MPH to Knots", slug: "mph-to-knots" },
      { name: "KM/H to MPH", slug: "kmh-to-mph" },
      { name: "M/S to FT/S", slug: "ms-to-fts" },
      { name: "Mach to KM/H", slug: "mach-to-kmh" },
    ],
  },
  "mach-to-kmh": {
    title: "Mach to KM/H Converter",
    fromUnit: "Mach",
    toUnit: "Kilometers per Hour",
    fromSymbol: "Ma",
    toSymbol: "km/h",
    convert: (value: number) => value * 1234.8,
    reverse: (value: number) => value / 1234.8,
    category: "Speed",
    relatedConverters: [
      { name: "KM/H to Mach", slug: "kmh-to-mach" },
      { name: "KM/H to MPH", slug: "kmh-to-mph" },
      { name: "Knots to MPH", slug: "knots-to-mph" },
      { name: "M/S to FT/S", slug: "ms-to-fts" },
    ],
  },
  "mph-to-kmh": {
    title: "MPH to KM/H Converter",
    fromUnit: "Miles per Hour",
    toUnit: "Kilometers per Hour",
    fromSymbol: "mph",
    toSymbol: "km/h",
    convert: (value: number) => value * 1.60934,
    reverse: (value: number) => value / 1.60934,
    category: "Speed",
    relatedConverters: [
      { name: "KM/H to MPH", slug: "kmh-to-mph" },
      { name: "Knots to MPH", slug: "knots-to-mph" },
      { name: "M/S to FT/S", slug: "ms-to-fts" },
      { name: "Mach to KM/H", slug: "mach-to-kmh" },
    ],
  },

  // Pressure conversions
  "pascal-to-psi": {
    title: "Pascal to PSI Converter",
    fromUnit: "Pascal",
    toUnit: "PSI",
    fromSymbol: "Pa",
    toSymbol: "psi",
    convert: (value: number) => value * 0.000145038,
    reverse: (value: number) => value / 0.000145038,
    category: "Pressure",
    relatedConverters: [
      { name: "PSI to Pascal", slug: "psi-to-pascal" },
      { name: "Bar to PSI", slug: "bar-to-psi" },
      { name: "PSI to Bar", slug: "psi-to-bar" },
      { name: "Bar to Atmosphere", slug: "bar-to-atmosphere" },
    ],
  },
  "bar-to-atmosphere": {
    title: "Bar to Atmosphere Converter",
    fromUnit: "Bar",
    toUnit: "Atmosphere",
    fromSymbol: "bar",
    toSymbol: "atm",
    convert: (value: number) => value * 0.986923,
    reverse: (value: number) => value / 0.986923,
    category: "Pressure",
    relatedConverters: [
      { name: "Atmosphere to Bar", slug: "atmosphere-to-bar" },
      { name: "Pascal to PSI", slug: "pascal-to-psi" },
      { name: "PSI to Bar", slug: "psi-to-bar" },
      { name: "Torr to mmHg", slug: "torr-to-mmhg" },
    ],
  },
  "torr-to-mmhg": {
    title: "Torr to mmHg Converter",
    fromUnit: "Torr",
    toUnit: "mmHg",
    fromSymbol: "Torr",
    toSymbol: "mmHg",
    convert: (value: number) => value * 1,
    reverse: (value: number) => value / 1,
    category: "Pressure",
    relatedConverters: [
      { name: "mmHg to Torr", slug: "mmhg-to-torr" },
      { name: "Pascal to PSI", slug: "pascal-to-psi" },
      { name: "Bar to Atmosphere", slug: "bar-to-atmosphere" },
      { name: "PSI to Bar", slug: "psi-to-bar" },
    ],
  },
  "psi-to-bar": {
    title: "PSI to Bar Converter",
    fromUnit: "PSI",
    toUnit: "Bar",
    fromSymbol: "psi",
    toSymbol: "bar",
    convert: (value: number) => value * 0.0689476,
    reverse: (value: number) => value / 0.0689476,
    category: "Pressure",
    relatedConverters: [
      { name: "Bar to PSI", slug: "bar-to-psi" },
      { name: "Pascal to PSI", slug: "pascal-to-psi" },
      { name: "Bar to Atmosphere", slug: "bar-to-atmosphere" },
      { name: "Torr to mmHg", slug: "torr-to-mmhg" },
    ],
  },
  "bar-to-psi": {
    title: "Bar to PSI Converter",
    fromUnit: "Bar",
    toUnit: "PSI",
    fromSymbol: "bar",
    toSymbol: "psi",
    convert: (value: number) => value * 14.5038,
    reverse: (value: number) => value / 14.5038,
    category: "Pressure",
    relatedConverters: [
      { name: "PSI to Bar", slug: "psi-to-bar" },
      { name: "Pascal to PSI", slug: "pascal-to-psi" },
      { name: "Bar to Atmosphere", slug: "bar-to-atmosphere" },
      { name: "Torr to mmHg", slug: "torr-to-mmhg" },
    ],
  },

  // Energy conversions
  "joules-to-calories": {
    title: "Joules to Calories Converter",
    fromUnit: "Joules",
    toUnit: "Calories",
    fromSymbol: "J",
    toSymbol: "cal",
    convert: (value: number) => value * 0.239006,
    reverse: (value: number) => value / 0.239006,
    category: "Energy",
    relatedConverters: [
      { name: "Calories to Joules", slug: "calories-to-joules" },
      { name: "kWh to BTU", slug: "kwh-to-btu" },
      { name: "Watts to Horsepower", slug: "watts-to-horsepower" },
      { name: "BTU to kWh", slug: "btu-to-kwh" },
    ],
  },
  "kwh-to-btu": {
    title: "kWh to BTU Converter",
    fromUnit: "Kilowatt Hours",
    toUnit: "BTU",
    fromSymbol: "kWh",
    toSymbol: "BTU",
    convert: (value: number) => value * 3412.14,
    reverse: (value: number) => value / 3412.14,
    category: "Energy",
    relatedConverters: [
      { name: "BTU to kWh", slug: "btu-to-kwh" },
      { name: "Joules to Calories", slug: "joules-to-calories" },
      { name: "Calories to Joules", slug: "calories-to-joules" },
      { name: "Watts to Horsepower", slug: "watts-to-horsepower" },
    ],
  },
  "watts-to-horsepower": {
    title: "Watts to Horsepower Converter",
    fromUnit: "Watts",
    toUnit: "Horsepower",
    fromSymbol: "W",
    toSymbol: "hp",
    convert: (value: number) => value * 0.00134102,
    reverse: (value: number) => value / 0.00134102,
    category: "Energy",
    relatedConverters: [
      { name: "Horsepower to Watts", slug: "horsepower-to-watts" },
      { name: "Joules to Calories", slug: "joules-to-calories" },
      { name: "kWh to BTU", slug: "kwh-to-btu" },
      { name: "Calories to Joules", slug: "calories-to-joules" },
    ],
  },
  "calories-to-joules": {
    title: "Calories to Joules Converter",
    fromUnit: "Calories",
    toUnit: "Joules",
    fromSymbol: "cal",
    toSymbol: "J",
    convert: (value: number) => value * 4.184,
    reverse: (value: number) => value / 4.184,
    category: "Energy",
    relatedConverters: [
      { name: "Joules to Calories", slug: "joules-to-calories" },
      { name: "kWh to BTU", slug: "kwh-to-btu" },
      { name: "Watts to Horsepower", slug: "watts-to-horsepower" },
      { name: "BTU to kWh", slug: "btu-to-kwh" },
    ],
  },

  // Data Storage conversions
  "bytes-to-bits": {
    title: "Bytes to Bits Converter",
    fromUnit: "Bytes",
    toUnit: "Bits",
    fromSymbol: "B",
    toSymbol: "bit",
    convert: (value: number) => value * 8,
    reverse: (value: number) => value / 8,
    category: "Data Storage",
    relatedConverters: [
      { name: "Bits to Bytes", slug: "bits-to-bytes" },
      { name: "KB to MB", slug: "kb-to-mb" },
      { name: "GB to TB", slug: "gb-to-tb" },
      { name: "MB to KB", slug: "mb-to-kb" },
    ],
  },
  "kb-to-mb": {
    title: "KB to MB Converter",
    fromUnit: "Kilobytes",
    toUnit: "Megabytes",
    fromSymbol: "KB",
    toSymbol: "MB",
    convert: (value: number) => value / 1024,
    reverse: (value: number) => value * 1024,
    category: "Data Storage",
    relatedConverters: [
      { name: "MB to KB", slug: "mb-to-kb" },
      { name: "GB to MB", slug: "gb-to-mb" },
      { name: "GB to TB", slug: "gb-to-tb" },
      { name: "Bytes to Bits", slug: "bytes-to-bits" },
    ],
  },
  "gb-to-tb": {
    title: "GB to TB Converter",
    fromUnit: "Gigabytes",
    toUnit: "Terabytes",
    fromSymbol: "GB",
    toSymbol: "TB",
    convert: (value: number) => value / 1024,
    reverse: (value: number) => value * 1024,
    category: "Data Storage",
    relatedConverters: [
      { name: "TB to GB", slug: "tb-to-gb" },
      { name: "GB to MB", slug: "gb-to-mb" },
      { name: "KB to MB", slug: "kb-to-mb" },
      { name: "MB to KB", slug: "mb-to-kb" },
    ],
  },
  "gb-to-mb": {
    title: "GB to MB Converter",
    fromUnit: "Gigabytes",
    toUnit: "Megabytes",
    fromSymbol: "GB",
    toSymbol: "MB",
    convert: (value: number) => value * 1024,
    reverse: (value: number) => value / 1024,
    category: "Data Storage",
    relatedConverters: [
      { name: "MB to GB", slug: "mb-to-gb" },
      { name: "KB to MB", slug: "kb-to-mb" },
      { name: "GB to TB", slug: "gb-to-tb" },
      { name: "MB to KB", slug: "mb-to-kb" },
    ],
  },
  "mb-to-kb": {
    title: "MB to KB Converter",
    fromUnit: "Megabytes",
    toUnit: "Kilobytes",
    fromSymbol: "MB",
    toSymbol: "KB",
    convert: (value: number) => value * 1024,
    reverse: (value: number) => value / 1024,
    category: "Data Storage",
    relatedConverters: [
      { name: "KB to MB", slug: "kb-to-mb" },
      { name: "GB to MB", slug: "gb-to-mb" },
      { name: "GB to TB", slug: "gb-to-tb" },
      { name: "Bytes to Bits", slug: "bytes-to-bits" },
    ],
  },

  // Time conversions
  "hours-to-minutes": {
    title: "Hours to Minutes Converter",
    fromUnit: "Hours",
    toUnit: "Minutes",
    fromSymbol: "hr",
    toSymbol: "min",
    convert: (value: number) => value * 60,
    reverse: (value: number) => value / 60,
    category: "Time",
    relatedConverters: [
      { name: "Minutes to Hours", slug: "minutes-to-hours" },
      { name: "Days to Hours", slug: "days-to-hours" },
      { name: "Years to Days", slug: "years-to-days" },
      { name: "Hours to Seconds", slug: "hours-to-seconds" },
    ],
  },
  "days-to-hours": {
    title: "Days to Hours Converter",
    fromUnit: "Days",
    toUnit: "Hours",
    fromSymbol: "day",
    toSymbol: "hr",
    convert: (value: number) => value * 24,
    reverse: (value: number) => value / 24,
    category: "Time",
    relatedConverters: [
      { name: "Hours to Days", slug: "hours-to-days" },
      { name: "Hours to Minutes", slug: "hours-to-minutes" },
      { name: "Years to Days", slug: "years-to-days" },
      { name: "Weeks to Days", slug: "weeks-to-days" },
    ],
  },
  "years-to-days": {
    title: "Years to Days Converter",
    fromUnit: "Years",
    toUnit: "Days",
    fromSymbol: "yr",
    toSymbol: "day",
    convert: (value: number) => value * 365.25,
    reverse: (value: number) => value / 365.25,
    category: "Time",
    relatedConverters: [
      { name: "Days to Years", slug: "days-to-years" },
      { name: "Days to Hours", slug: "days-to-hours" },
      { name: "Hours to Minutes", slug: "hours-to-minutes" },
      { name: "Months to Days", slug: "months-to-days" },
    ],
  },
}

export default function ConverterPage({ params }: { params: Promise<{ converter: string }> }) {
  const resolvedParams = use(params)
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [isReversed, setIsReversed] = useState(false)

  const converterData = conversions[resolvedParams.converter as keyof typeof conversions]

  useEffect(() => {
    if (fromValue && !isNaN(Number(fromValue))) {
      const result = isReversed ? converterData.reverse(Number(fromValue)) : converterData.convert(Number(fromValue))
      setToValue(result.toFixed(6).replace(/\.?0+$/, ""))
    } else {
      setToValue("")
    }
  }, [fromValue, isReversed, converterData])

  if (!converterData) {
    return <div className="p-8">Converter not found</div>
  }

  const currentFromUnit = isReversed ? converterData.toUnit : converterData.fromUnit
  const currentToUnit = isReversed ? converterData.fromUnit : converterData.toUnit
  const currentFromSymbol = isReversed ? converterData.toSymbol : converterData.fromSymbol
  const currentToSymbol = isReversed ? converterData.fromSymbol : converterData.toSymbol

  return (
    <div className="max-w-4xl mx-auto p-6">
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">{converterData.title}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">{converterData.title}</h1>

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

      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Related {converterData.category} Converters</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {converterData.relatedConverters.map((converter) => (
            <Link
              key={converter.slug}
              href={`/convert/${converter.slug}`}
              className="block p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center text-sm text-blue-600 hover:text-blue-800"
            >
              {converter.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
