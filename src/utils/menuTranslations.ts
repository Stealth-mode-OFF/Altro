// Menu translation mapper - maps dish names to translation keys
export const menuItemTranslations: Record<string, { nameKey: string; descKey: string }> = {
  // Antipasti
  'Bruschetta al Pomodoro': { nameKey: 'item.bruschetta.name', descKey: 'item.bruschetta.desc' },
  'Carpaccio di Manzo': { nameKey: 'item.carpaccio.name', descKey: 'item.carpaccio.desc' },
  'Prosciutto e Melone': { nameKey: 'item.prosciutto_melone.name', descKey: 'item.prosciutto_melone.desc' },
  'Caprese': { nameKey: 'item.caprese.name', descKey: 'item.caprese.desc' },
  'Burrata con Pomodorini': { nameKey: 'item.burrata.name', descKey: 'item.burrata.desc' },
  
  // Primi (Pasta)
  'Spaghetti Carbonara': { nameKey: 'item.carbonara.name', descKey: 'item.carbonara.desc' },
  'Spaghetti Aglio e Olio': { nameKey: 'item.aglio_olio.name', descKey: 'item.aglio_olio.desc' },
  "Penne all'Arrabbiata": { nameKey: 'item.arrabbiata.name', descKey: 'item.arrabbiata.desc' },
  'Tagliatelle al Ragù': { nameKey: 'item.tagliatelle_ragu.name', descKey: 'item.tagliatelle_ragu.desc' },
  'Risotto ai Funghi': { nameKey: 'item.risotto_funghi.name', descKey: 'item.risotto_funghi.desc' },
  'Gnocchi al Gorgonzola': { nameKey: 'item.gnocchi_gorgonzola.name', descKey: 'item.gnocchi_gorgonzola.desc' },
  
  // Pizza
  'Pizza Margherita': { nameKey: 'item.margherita.name', descKey: 'item.margherita.desc' },
  'Pizza Quattro Formaggi': { nameKey: 'item.quattro_formaggi.name', descKey: 'item.quattro_formaggi.desc' },
  'Pizza Prosciutto e Funghi': { nameKey: 'item.prosciutto_funghi.name', descKey: 'item.prosciutto_funghi.desc' },
  'Pizza Diavola': { nameKey: 'item.diavola.name', descKey: 'item.diavola.desc' },
  
  // Secondi
  'Scaloppine al Limone': { nameKey: 'item.scaloppine.name', descKey: 'item.scaloppine.desc' },
  'Pollo alla Milanese': { nameKey: 'item.pollo_milanese.name', descKey: 'item.pollo_milanese.desc' },
  'Ossobuco': { nameKey: 'item.ossobuco.name', descKey: 'item.ossobuco.desc' },
  'Branzino al Forno': { nameKey: 'item.branzino.name', descKey: 'item.branzino.desc' },
  
  // Dolci
  'Tiramisù': { nameKey: 'item.tiramisu.name', descKey: 'item.tiramisu.desc' },
  'Tiramisu': { nameKey: 'item.tiramisu.name', descKey: 'item.tiramisu.desc' },
  'Panna Cotta': { nameKey: 'item.panna_cotta.name', descKey: 'item.panna_cotta.desc' },
  'Cannoli Siciliani': { nameKey: 'item.cannoli.name', descKey: 'item.cannoli.desc' },
  'Gelato Artigianale': { nameKey: 'item.gelato.name', descKey: 'item.gelato.desc' },
};

// Helper function to get translated name and description
export function getTranslatedMenuItem(
  originalName: string,
  originalDesc: string,
  t: (key: string) => string
): { name: string; description: string } {
  const translation = menuItemTranslations[originalName];
  
  if (translation && t(translation.nameKey) !== translation.nameKey) {
    // Translation exists
    return {
      name: t(translation.nameKey),
      description: t(translation.descKey),
    };
  }
  
  // No translation, return original
  return {
    name: originalName,
    description: originalDesc,
  };
}
