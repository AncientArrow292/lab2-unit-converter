import { useEffect, useMemo, useState } from 'react';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import HistoryIcon from '@mui/icons-material/History';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Alert, Box, Button, Card, CardContent, Chip, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';

const fallbackCatalog = [
  { key: 'length', label: 'Length', units: [{ key: 'feet', label: 'Feet', short: 'ft' }, { key: 'meters', label: 'Meters', short: 'm' }, { key: 'inches', label: 'Inches', short: 'in' }, { key: 'miles', label: 'Miles', short: 'mi' }] },
  { key: 'volume', label: 'Volume', units: [{ key: 'liters', label: 'Liters', short: 'L' }, { key: 'gallons', label: 'US gallons', short: 'gal' }, { key: 'milliliters', label: 'Milliliters', short: 'mL' }] },
  { key: 'weight', label: 'Weight', units: [{ key: 'kilograms', label: 'Kilograms', short: 'kg' }, { key: 'pounds', label: 'Pounds', short: 'lb' }] },
  { key: 'temperature', label: 'Temperature', units: [{ key: 'celsius', label: 'Celsius', short: '°C' }, { key: 'fahrenheit', label: 'Fahrenheit', short: '°F' }] }
];

const theme = createTheme({ palette: { primary: { main: '#c9f36b' }, background: { default: '#f7f8f3' }, text: { primary: '#172018', secondary: '#6d756b' } }, typography: { fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }, shape: { borderRadius: 14 } });

export default function App() {
  const [catalog, setCatalog] = useState(fallbackCatalog);
  const [category, setCategory] = useState('length');
  const [from, setFrom] = useState('feet');
  const [to, setTo] = useState('meters');
  const [value, setValue] = useState('10');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const currentCategory = useMemo(() => catalog.find((item) => item.key === category) || catalog[0], [catalog, category]);

  useEffect(() => { fetch('/api/units').then((response) => response.ok ? response.json() : Promise.reject()).then(setCatalog).catch(() => {}); }, []);
  useEffect(() => { const first = currentCategory.units[0]?.key; const second = currentCategory.units[1]?.key || first; setFrom(first); setTo(second); setResult(null); }, [category]);

  async function handleConvert(event) {
    event.preventDefault(); setError('');
    try {
      const response = await fetch('/api/convert', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ category, from, to, value }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      const entry = { ...data, input: Number(value), output: data.result, fromLabel: currentCategory.units.find((unit) => unit.key === from)?.label, toLabel: currentCategory.units.find((unit) => unit.key === to)?.label };
      setResult(entry); setHistory((items) => [entry, ...items].slice(0, 4));
    } catch (conversionError) { setError(conversionError.message || 'Unable to connect to the conversion service.'); }
  }
  function swapUnits() { setFrom(to); setTo(from); setResult(null); }
  const format = (number) => Number(number).toLocaleString(undefined, { maximumFractionDigits: 8 });
  return <ThemeProvider theme={theme}><Box className="page"><Container maxWidth="md"><header className="header"><Box className="brand"><Box className="logo"><CalculateOutlinedIcon /></Box><Typography variant="h6" fontWeight={800}>Convertly</Typography></Box><Chip icon={<Box className="status-dot" />} label="API connected" className="status" /></header><main><Typography className="eyebrow">SIMPLE, PRECISE, INSTANT</Typography><Typography variant="h2" className="hero-title">Convert anything.<br /><span>Understand everything.</span></Typography><Typography className="subtitle">A focused unit converter for the measurements you use every day.</Typography><Card className="converter-card"><CardContent><Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}><Box><Typography variant="h5" fontWeight={800}>Unit converter</Typography><Typography color="text.secondary">Choose a category and enter a value to get started.</Typography></Box><Chip label={currentCategory.label} className="category-chip" /></Stack><Box component="form" onSubmit={handleConvert}><FormControl fullWidth size="small" sx={{ mb: 2 }}><InputLabel>Category</InputLabel><Select value={category} label="Category" onChange={(event) => setCategory(event.target.value)}>{catalog.map((item) => <MenuItem value={item.key} key={item.key}>{item.label}</MenuItem>)}</Select></FormControl><Box className="unit-row"><TextField label="From" type="number" value={value} onChange={(event) => setValue(event.target.value)} fullWidth required inputProps={{ step: 'any' }} /><FormControl fullWidth><InputLabel>Unit</InputLabel><Select value={from} label="Unit" onChange={(event) => setFrom(event.target.value)}>{currentCategory.units.map((unit) => <MenuItem value={unit.key} key={unit.key}>{unit.label} ({unit.short})</MenuItem>)}</Select></FormControl><Button onClick={swapUnits} className="swap-button" aria-label="Swap units"><SwapHorizIcon /></Button><FormControl fullWidth><InputLabel>Convert to</InputLabel><Select value={to} label="Convert to" onChange={(event) => setTo(event.target.value)}>{currentCategory.units.map((unit) => <MenuItem value={unit.key} key={unit.key}>{unit.label} ({unit.short})</MenuItem>)}</Select></FormControl></Box>{error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}<Button type="submit" variant="contained" fullWidth className="convert-button">Convert now <span>→</span></Button></Box>{result && <Box className="result"><Typography variant="caption" color="text.secondary">RESULT</Typography><Typography className="result-number">{format(result.output)} <small>{currentCategory.units.find((u) => u.key === to)?.short}</small></Typography><Typography color="text.secondary">{format(result.input)} {result.fromLabel} equals <b>{format(result.output)} {result.toLabel}</b></Typography></Box>}</CardContent></Card><Box className="history-head"><Typography variant="h6" fontWeight={800}><HistoryIcon fontSize="small" /> Recent conversions</Typography><Typography variant="body2" color="text.secondary">{history.length ? `${history.length} saved locally` : 'Your latest results will appear here'}</Typography></Box>{history.length > 0 && <Stack spacing={1}>{history.map((item, index) => <Box className="history-item" key={`${item.input}-${item.output}-${index}`}><Box><Typography fontWeight={700}>{format(item.input)} {item.fromLabel}</Typography><Typography variant="body2" color="text.secondary">{item.category} conversion</Typography></Box><Typography fontWeight={800}>→ {format(item.output)} {item.toLabel}</Typography></Box>)}</Stack>} </main><footer>Built for quick answers <span>•</span> Accurate conversions powered by your local API</footer></Container></Box></ThemeProvider>;
}
