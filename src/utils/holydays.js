const year = new Date().getFullYear(); // Obtenez l'année en cours

const JOURS_FERIES = [
  `${year}-01-01`, // Nouvel An
  `${year}-05-01`, // Fête du Travail
  `${year}-05-08`, // Victoire 1945
  `${year}-07-14`, // Fête Nationale
  `${year}-08-15`, // Assomption
  `${year}-11-01`, // Toussaint
  `${year}-11-11`, // Armistice
  `${year}-12-25`, // Noël
];

export const isHoliday = (date) => {
  return JOURS_FERIES.includes(date.toISOString().split('T')[0]);
};