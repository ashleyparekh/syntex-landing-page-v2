export type CountryInfo = {
  name: string;
  idType: string;
  regulator: string;
  corridor?: boolean;
  /** Approximate geographic centroid [lat, lng] — secondary hint only */
  centroid: [number, number];
};

/** ISO 3166-1 numeric IDs (world-atlas) → tooltip data */
export const COUNTRY_INFO: Record<string, CountryInfo> = {
  // North America
  "840": {
    name: "United States",
    idType: "SSN / EIN",
    regulator: "FinCEN",
    corridor: true,
    centroid: [39.8, -98.5],
  },
  "484": {
    name: "Mexico",
    idType: "CURP / RFC",
    regulator: "Banxico",
    corridor: true,
    centroid: [23.6, -102.5],
  },
  "124": {
    name: "Canada",
    idType: "SIN",
    regulator: "FINTRAC",
    centroid: [56.1, -106.3],
  },

  // South America
  "76": {
    name: "Brazil",
    idType: "CPF",
    regulator: "Banco Central do Brasil",
    centroid: [-10.8, -52.9],
  },
  "170": {
    name: "Colombia",
    idType: "Cédula de Ciudadanía",
    regulator: "Superintendencia Financiera",
    centroid: [4.6, -74.1],
  },

  // Europe
  "276": {
    name: "Germany",
    idType: "Personalausweis",
    regulator: "BaFin",
    centroid: [51.2, 10.4],
  },
  "826": {
    name: "United Kingdom",
    idType: "Passport / driving licence",
    regulator: "FCA",
    centroid: [54.0, -2.5],
  },

  // Africa
  "566": {
    name: "Nigeria",
    idType: "NIN",
    regulator: "CBN",
    centroid: [9.1, 8.7],
  },
  "404": {
    name: "Kenya",
    idType: "Huduma Namba",
    regulator: "CBK",
    centroid: [0.0, 37.9],
  },

  // Middle East
  "784": {
    name: "United Arab Emirates",
    idType: "Emirates ID",
    regulator: "CBUAE",
    centroid: [23.4, 53.8],
  },
  "682": {
    name: "Saudi Arabia",
    idType: "Iqama / National ID",
    regulator: "SAMA",
    centroid: [23.9, 45.1],
  },

  // Asia
  "356": {
    name: "India",
    idType: "Aadhaar",
    regulator: "RBI",
    corridor: true,
    centroid: [21.1, 78.9],
  },
  "586": {
    name: "Pakistan",
    idType: "CNIC",
    regulator: "SBP",
    centroid: [30.4, 69.3],
  },
  "702": {
    name: "Singapore",
    idType: "NRIC",
    regulator: "MAS",
    centroid: [1.35, 103.8],
  },
  "360": {
    name: "Indonesia",
    idType: "KTP",
    regulator: "OJK",
    centroid: [-2.5, 118.0],
  },
  "608": {
    name: "Philippines",
    idType: "PhilSys",
    regulator: "BSP",
    corridor: true,
    centroid: [12.9, 121.8],
  },
  "704": {
    name: "Vietnam",
    idType: "CCCD",
    regulator: "SBV",
    centroid: [16.0, 106.0],
  },

  // Oceania
  "36": {
    name: "Australia",
    idType: "Tax File Number",
    regulator: "AUSTRAC",
    centroid: [-25.3, 133.8],
  },
  "554": {
    name: "New Zealand",
    idType: "No single national ID",
    regulator: "FMA",
    centroid: [-41.5, 172.8],
  },
};

export const CORRIDORS: {
  from: [number, number];
  to: [number, number];
  label: string;
}[] = [
  {
    from: [39.8, -98.5],
    to: [20.6, 78.9],
    label: "US → India",
  },
  {
    from: [39.8, -98.5],
    to: [23.6, -102.5],
    label: "US → Mexico",
  },
  {
    from: [39.8, -98.5],
    to: [12.9, 121.8],
    label: "US → Philippines",
  },
];
