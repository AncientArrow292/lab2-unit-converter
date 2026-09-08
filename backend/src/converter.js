const units = {
  length: {
    label: 'Length',
    units: {
      feet: { label: 'Feet', short: 'ft', toBase: (value) => value * 0.3048, fromBase: (value) => value / 0.3048 },
      meters: { label: 'Meters', short: 'm', toBase: (value) => value, fromBase: (value) => value },
      inches: { label: 'Inches', short: 'in', toBase: (value) => value * 0.0254, fromBase: (value) => value / 0.0254 },
      kilometers: { label: 'Kilometers', short: 'km', toBase: (value) => value * 1000, fromBase: (value) => value / 1000 },
      miles: { label: 'Miles', short: 'mi', toBase: (value) => value * 1609.344, fromBase: (value) => value / 1609.344 }
    }
  },
  volume: {
    label: 'Volume',
    units: {
      liters: { label: 'Liters', short: 'L', toBase: (value) => value, fromBase: (value) => value },
      gallons: { label: 'US gallons', short: 'gal', toBase: (value) => value * 3.785411784, fromBase: (value) => value / 3.785411784 },
      milliliters: { label: 'Milliliters', short: 'mL', toBase: (value) => value / 1000, fromBase: (value) => value * 1000 },
      cups: { label: 'US cups', short: 'cup', toBase: (value) => value * 0.2365882365, fromBase: (value) => value / 0.2365882365 }
    }
  },
  weight: {
    label: 'Weight',
    units: {
      kilograms: { label: 'Kilograms', short: 'kg', toBase: (value) => value, fromBase: (value) => value },
      pounds: { label: 'Pounds', short: 'lb', toBase: (value) => value * 0.45359237, fromBase: (value) => value / 0.45359237 },
      grams: { label: 'Grams', short: 'g', toBase: (value) => value / 1000, fromBase: (value) => value * 1000 },
      ounces: { label: 'Ounces', short: 'oz', toBase: (value) => value * 0.028349523125, fromBase: (value) => value / 0.028349523125 }
    }
  },
  temperature: {
    label: 'Temperature',
    units: {
      celsius: { label: 'Celsius', short: '°C', toBase: (value) => value, fromBase: (value) => value },
      fahrenheit: { label: 'Fahrenheit', short: '°F', toBase: (value) => (value - 32) * 5 / 9, fromBase: (value) => value * 9 / 5 + 32 },
      kelvin: { label: 'Kelvin', short: 'K', toBase: (value) => value - 273.15, fromBase: (value) => value + 273.15 }
    }
  }
};

export function getUnitCatalog() {
  return Object.entries(units).map(([key, category]) => ({
    key,
    label: category.label,
    units: Object.entries(category.units).map(([unitKey, unit]) => ({ key: unitKey, label: unit.label, short: unit.short }))
  }));
}

export function convert({ category, from, to, value }) {
  const categoryData = units[category];
  const fromUnit = categoryData?.units[from];
  const toUnit = categoryData?.units[to];
  if (!categoryData || !fromUnit || !toUnit || !Number.isFinite(value)) throw new Error('Invalid conversion request');
  return toUnit.fromBase(fromUnit.toBase(value));
}
