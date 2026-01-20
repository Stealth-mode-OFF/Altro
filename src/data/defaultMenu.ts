// Shared default menu data - used by both server and admin panel
// This ensures consistency between backend initialization and frontend reset

export interface LocalizedString {
  cs: string;
  en: string;
  it: string;
}

export interface MenuItem {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  price: string;
  category: 'antipasti' | 'insalate' | 'pasta' | 'pizza' | 'secondi' | 'dolci' | 'wines_white' | 'wines_red' | 'wines_rose' | 'wines_sparkling' | 'beers' | 'aperitivi' | 'digestivi' | 'grappa' | 'coffee' | 'nonalcoholic';
  image?: string;
  priceGlass?: string;
  subcategory?: string;
  hidden?: boolean;
}

export function getDefaultMenuItems(): MenuItem[] {
  return [
    // ===== ANTIPASTI – PŘEDKRMY =====
    { 
      id: 'antipasti-1', 
      name: { cs: 'ZUPPA DEL GIORNO', en: 'ZUPPA DEL GIORNO', it: 'ZUPPA DEL GIORNO' }, 
      description: { cs: 'denní polévka', en: 'soup of the day', it: 'zuppa del giorno' }, 
      price: '75 Kč', 
      category: 'antipasti' 
    },
    { 
      id: 'antipasti-2', 
      name: { cs: 'BRUSCHETTA AL POMODORO CON STRACCIATELLA', en: 'BRUSCHETTA AL POMODORO CON STRACCIATELLA', it: 'BRUSCHETTA AL POMODORO CON STRACCIATELLA' }, 
      description: { cs: 'pečená rajčata, bazalka, stracciatella, česnek', en: 'roasted tomatoes, basil, stracciatella, garlic', it: 'pomodorini arrosto, basilico, stracciatella, aglio' }, 
      price: '185 Kč', 
      category: 'antipasti' 
    },
    { 
      id: 'antipasti-3', 
      name: { cs: 'CARPACCIO DI MANZO', en: 'CARPACCIO DI MANZO', it: 'CARPACCIO DI MANZO' }, 
      description: { cs: '50g hovězího masa, olivy, cherry rajčata, rukola, parmazán', en: '50g beef, olives, cherry tomatoes, arugula, parmesan', it: '50g di manzo, olive, pomodorini, rucola, parmigiano' }, 
      price: '255 Kč', 
      category: 'antipasti' 
    },
    { 
      id: 'antipasti-4', 
      name: { cs: 'TARTAR DI MANZO', en: 'TARTAR DI MANZO', it: 'TARTAR DI MANZO' }, 
      description: { cs: '70g hovězího masa, kapary, dijonská hořčice', en: '70g beef, capers, Dijon mustard', it: '70g di manzo, capperi, senape di Digione' }, 
      price: '275 Kč', 
      category: 'antipasti' 
    },
    { 
      id: 'antipasti-5', 
      name: { cs: 'GAMBERI AL LIMONE IN PADELLA', en: 'GAMBERI AL LIMONE IN PADELLA', it: 'GAMBERI AL LIMONE IN PADELLA' }, 
      description: { cs: 'krevety, česnek, citron, chilli', en: 'shrimp, garlic, lemon, chilli', it: 'gamberi, aglio, limone, peperoncino' }, 
      price: '295 Kč', 
      category: 'antipasti' 
    },
    
    // ===== INSALATE – SALÁTY =====
    { 
      id: 'insalate-1', 
      name: { cs: 'INSALATA DI POLLO E AVOCADO', en: 'INSALATA DI POLLO E AVOCADO', it: 'INSALATA DI POLLO E AVOCADO' }, 
      description: { cs: 'mix salátů, grilované kuřecí prso, avokado, cherry rajčata, medovo-hořčičný dressing', en: 'mixed salad, grilled chicken breast, avocado, cherry tomatoes, honey-mustard dressing', it: 'insalata mista, petto di pollo grigliato, avocado, pomodorini, condimento miele e senape' }, 
      price: '265 Kč', 
      category: 'insalate' 
    },
    { 
      id: 'insalate-2', 
      name: { cs: 'INSALATA FRUTTI DI MARE', en: 'INSALATA FRUTTI DI MARE', it: 'INSALATA FRUTTI DI MARE' }, 
      description: { cs: 'mix salátů, mořské plody, česnek, citrónový dressing', en: 'mixed salad, seafood, garlic, lemon dressing', it: 'insalata mista, frutti di mare, aglio, condimento al limone' }, 
      price: '295 Kč', 
      category: 'insalate' 
    },
    { 
      id: 'insalate-3', 
      name: { cs: 'INSALATA CON FORMAGGIO DI CAPRA', en: 'INSALATA CON FORMAGGIO DI CAPRA', it: 'INSALATA CON FORMAGGIO DI CAPRA' }, 
      description: { cs: 'mix salátů, grilovaný kozí sýr, vlašské ořechy, granátové jablko, balsamikový krém', en: 'mixed salad, grilled goat cheese, walnuts, pomegranate, balsamic cream', it: 'insalata mista, formaggio di capra grigliato, noci, melograno, crema di balsamico' }, 
      price: '275 Kč', 
      category: 'insalate' 
    },
    
    // ===== PASTA FRESCA – ČERSTVÉ TĚSTOVINY =====
    { 
      id: 'pasta-1', 
      name: { cs: 'SPAGHETTI ALLA CARBONARA', en: 'SPAGHETTI ALLA CARBONARA', it: 'SPAGHETTI ALLA CARBONARA' }, 
      description: { cs: 'vejce, guanciale, pecorino', en: 'eggs, guanciale, pecorino', it: 'uova, guanciale, pecorino' }, 
      price: '245 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-2', 
      name: { cs: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO', en: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO', it: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO' }, 
      description: { cs: 'olivový olej, česnek, chilli papričky', en: 'olive oil, garlic, chilli peppers', it: 'olio d\'oliva, aglio, peperoncino' }, 
      price: '225 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-3', 
      name: { cs: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO - s pancettou', en: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO - with pancetta', it: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO - con pancetta' }, 
      description: { cs: 'olivový olej, česnek, chilli papričky, pancetta', en: 'olive oil, garlic, chilli peppers, pancetta', it: 'olio d\'oliva, aglio, peperoncino, pancetta' }, 
      price: '245 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-4', 
      name: { cs: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO - s krevetami', en: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO - with shrimps', it: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO - con gamberi' }, 
      description: { cs: 'olivový olej, česnek, chilli papričky, krevety', en: 'olive oil, garlic, chilli peppers, shrimps', it: 'olio d\'oliva, aglio, peperoncino, gamberi' }, 
      price: '275 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-5', 
      name: { cs: 'SPAGHETTI ALL´AMATRICIANA', en: 'SPAGHETTI ALL´AMATRICIANA', it: 'SPAGHETTI ALL´AMATRICIANA' }, 
      description: { cs: 'guanciale, san Marzano, pecorino romano, chilli', en: 'guanciale, san Marzano, pecorino romano, chilli', it: 'guanciale, san Marzano, pecorino romano, peperoncino' }, 
      price: '255 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-6', 
      name: { cs: 'LASAGNE NAPOLETANE', en: 'LASAGNE NAPOLETANE', it: 'LASAGNE NAPOLETANE' }, 
      description: { cs: 'hovězí a vepřové ragú, ricotta, mozzarella, vejce', en: 'beef and pork ragout, ricotta, mozzarella, eggs', it: 'ragù di manzo e maiale, ricotta, mozzarella, uova' }, 
      price: '295 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-7', 
      name: { cs: 'RIGATONI ALLA BOSCAIOLA', en: 'RIGATONI ALLA BOSCAIOLA', it: 'RIGATONI ALLA BOSCAIOLA' }, 
      description: { cs: 'hříbky, pancetta, smetana, česnek, parmazán', en: 'porcini mushrooms, pancetta, cream, garlic, parmesan', it: 'funghi porcini, pancetta, panna, aglio, parmigiano' }, 
      price: '265 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-8', 
      name: { cs: 'RIGATONI BURRATA, POMODORO E BASILICO', en: 'RIGATONI BURRATA, POMODORO E BASILICO', it: 'RIGATONI BURRATA, POMODORO E BASILICO' }, 
      description: { cs: 'san Marzano, burrata, bazalka', en: 'san Marzano, burrata, basil', it: 'san Marzano, burrata, basilico' }, 
      price: '255 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-9', 
      name: { cs: 'TAGLIATELLE SALSICCIA E ROSMARINO', en: 'TAGLIATELLE SALSICCIA E ROSMARINO', it: 'TAGLIATELLE SALSICCIA E ROSMARINO' }, 
      description: { cs: 'salsiccia, červené víno, česnek, rozmarýn', en: 'salsiccia, red wine, garlic, rosemary', it: 'salsiccia, vino rosso, aglio, rosmarino' }, 
      price: '265 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-10', 
      name: { cs: 'TAGLIATELLE AL TARTUFO', en: 'TAGLIATELLE AL TARTUFO', it: 'TAGLIATELLE AL TARTUFO' }, 
      description: { cs: 'černý lanýž, lanýžové máslo', en: 'black truffle, truffle butter', it: 'tartufo nero, burro al tartufo' }, 
      price: '295 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-11', 
      name: { cs: 'RISOTTO FRUTTI DI MARE', en: 'RISOTTO FRUTTI DI MARE', it: 'RISOTTO FRUTTI DI MARE' }, 
      description: { cs: 'mořské plody, víno, cherry rajčata, česnek', en: 'seafood, wine, cherry tomatoes, garlic', it: 'frutti di mare, vino, pomodorini, aglio' }, 
      price: '325 Kč', 
      category: 'pasta' 
    },
    
    // ===== PIZZA =====
    { 
      id: 'pizza-1', 
      name: { cs: 'MARGHERITA', en: 'MARGHERITA', it: 'MARGHERITA' }, 
      description: { cs: 'rajčata san Marzano, mozzarella fior di latte, grana Padano, bazalka', en: 'san Marzano tomatoes, mozzarella fior di latte, grana Padano, basil', it: 'pomodori san Marzano, mozzarella fior di latte, grana Padano, basilico' }, 
      price: '255 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-2', 
      name: { cs: 'DIAVOLA', en: 'DIAVOLA', it: 'DIAVOLA' }, 
      description: { cs: 'rajčata san Marzano, mozzarella fior di latte, grana Padano, pikantní salám ventricina, bazalka', en: 'san Marzano tomatoes, mozzarella fior di latte, grana Padano, spicy ventricina salami, basil', it: 'pomodori san Marzano, mozzarella fior di latte, grana Padano, salame ventricina piccante, basilico' }, 
      price: '275 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-3', 
      name: { cs: 'LA PROVOLA NAPOLETANA E SALSICCIA', en: 'LA PROVOLA NAPOLETANA E SALSICCIA', it: 'LA PROVOLA NAPOLETANA E SALSICCIA' }, 
      description: { cs: 'rajčata san Marzano, uzený sýr provola affumicata, pecorino romano, grana Padano', en: 'san Marzano tomatoes, smoked provola affumicata cheese, pecorino romano, grana Padano', it: 'pomodori san Marzano, provola affumicata, pecorino romano, grana Padano' }, 
      price: '295 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-4', 
      name: { cs: 'QUATTRO FORMAGGI', en: 'QUATTRO FORMAGGI', it: 'QUATTRO FORMAGGI' }, 
      description: { cs: 'mozzarella fior di latte, taleggio, uzený sýr provola affumicata, gorgonzola, pecorino romano, grana Padano', en: 'mozzarella fior di latte, taleggio, smoked provola affumicata cheese, gorgonzola, pecorino romano, grana Padano', it: 'mozzarella fior di latte, taleggio, provola affumicata, gorgonzola, pecorino romano, grana Padano' }, 
      price: '285 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-5', 
      name: { cs: 'NDUJA CALABRESE', en: 'NDUJA CALABRESE', it: 'NDUJA CALABRESE' }, 
      description: { cs: 'rajčata san Marzano, Nduja spillinga, žlutá rajčata Vesuvio, mozzarella fior di latte, stracciatella, grana Padano, bazalka', en: 'san Marzano tomatoes, Nduja spillinga, yellow Vesuvio tomatoes, mozzarella fior di latte, stracciatella, grana Padano, basil', it: 'pomodori san Marzano, Nduja spillinga, pomodorini gialli del Vesuvio, mozzarella fior di latte, stracciatella, grana Padano, basilico' }, 
      price: '285 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-6', 
      name: { cs: 'SALAME NAPOLI', en: 'SALAME NAPOLI', it: 'SALAME NAPOLI' }, 
      description: { cs: 'rajčata san Marzano, mozzarella fior di latte, salame Napoli, grana Padano, bazalka', en: 'san Marzano tomatoes, mozzarella fior di latte, salame Napoli, grana Padano, basil', it: 'pomodori san Marzano, mozzarella fior di latte, salame Napoli, grana Padano, basilico' }, 
      price: '265 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-7', 
      name: { cs: 'CAPRICCIOSA', en: 'CAPRICCIOSA', it: 'CAPRICCIOSA' }, 
      description: { cs: 'rajčata san Marzano, mozzarella fior di latte, šunka, houby, grana Padano, bazalka', en: 'san Marzano tomatoes, mozzarella fior di latte, ham, mushrooms, grana Padano, basil', it: 'pomodori san Marzano, mozzarella fior di latte, prosciutto, funghi, grana Padano, basilico' }, 
      price: '285 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-8', 
      name: { cs: 'MORTADELLA E PISTACCHIO', en: 'MORTADELLA E PISTACCHIO', it: 'MORTADELLA E PISTACCHIO' }, 
      description: { cs: 'mozzarella fior di latte, mortadella, pistácie, grana Padano, bazalka', en: 'mozzarella fior di latte, mortadella, pistachios, grana Padano, basil', it: 'mozzarella fior di latte, mortadella, pistacchi, grana Padano, basilico' }, 
      price: '295 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-9', 
      name: { cs: 'BUFALA DI CAMPAGNIA', en: 'BUFALA DI CAMPAGNIA', it: 'BUFALA DI CAMPAGNIA' }, 
      description: { cs: 'rajčata san Marzano, mozzarella fior di latte, grana Padano, bazalka', en: 'san Marzano tomatoes, mozzarella fior di latte, grana Padano, basil', it: 'pomodori san Marzano, mozzarella fior di latte, grana Padano, basilico' }, 
      price: '295 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-10', 
      name: { cs: 'NAPOLETANA', en: 'NAPOLETANA', it: 'NAPOLETANA' }, 
      description: { cs: 'rajčata san Marzano, mozzarella fior di latte, ančovičky, olivy taggiasche, grana Padano, oregáno', en: 'san Marzano tomatoes, mozzarella fior di latte, anchovies, Taggiasca olives, grana Padano, oregano', it: 'pomodori san Marzano, mozzarella fior di latte, acciughe, olive taggiasche, grana Padano, origano' }, 
      price: '285 Kč', 
      category: 'pizza' 
    },
    
    // ===== SECONDI – HLAVNÍ JÍDLA =====
    { 
      id: 'secondi-1', 
      name: { cs: 'PETTO DI POLLO IN CROSTA DI PARMIGIANO CON SPAGHETTI AL POMODORO', en: 'PETTO DI POLLO IN CROSTA DI PARMIGIANO CON SPAGHETTI AL POMODORO', it: 'PETTO DI POLLO IN CROSTA DI PARMIGIANO CON SPAGHETTI AL POMODORO' }, 
      description: { cs: '200g kuřecí prsa v parmazánové krustě, spaghetti s rajčatovou omáčkou san Marzano', en: '200g chicken breast in parmesan crust, spaghetti with san Marzano tomato sauce', it: '200g petto di pollo in crosta di parmigiano, spaghetti al pomodoro san Marzano' }, 
      price: '325 Kč', 
      category: 'secondi' 
    },
    { 
      id: 'secondi-2', 
      name: { cs: 'FILETTO DI MAIALE ALLA GRIGLIA CON GNOCCHI, RUCOLA E SALSA AL PEPE VERDE', en: 'FILETTO DI MAIALE ALLA GRIGLIA CON GNOCCHI, RUCOLA E SALSA AL PEPE VERDE', it: 'FILETTO DI MAIALE ALLA GRIGLIA CON GNOCCHI, RUCOLA E SALSA AL PEPE VERDE' }, 
      description: { cs: '200g grilované vepřové panenky, gnocchi, rukola, omáčka ze zeleného pepře', en: '200g grilled pork tenderloin, gnocchi, arugula, green pepper sauce', it: '200g filetto di maiale alla griglia, gnocchi, rucola, salsa al pepe verde' }, 
      price: '375 Kč', 
      category: 'secondi' 
    },
    { 
      id: 'secondi-3', 
      name: { cs: 'LOMBO DI VITELLO CON SALSA AL TARTUFO, GRENAILE E VERDURE GRIGLIATE', en: 'LOMBO DI VITELLO CON SALSA AL TARTUFO, GRENAILE E VERDURE GRIGLIATE', it: 'LOMBO DI VITELLO CON SALSA AL TARTUFO, GRENAILE E VERDURE GRIGLIATE' }, 
      description: { cs: '200g telecí karé, lanýžová omáčka, pečené grenaile, grilovaná zelenina', en: '200g veal loin, truffle sauce, roasted grenaille potatoes, grilled vegetables', it: '200g lombo di vitello, salsa al tartufo, patate grenaille, verdure grigliate' }, 
      price: '485 Kč', 
      category: 'secondi' 
    },
    { 
      id: 'secondi-4', 
      name: { cs: 'FLAP STEAK ALLA GRIGLIA CON SALSA CHIMICHURRI E PATATE ALLE VERDURE', en: 'FLAP STEAK ALLA GRIGLIA CON SALSA CHIMICHURRI E PATATE ALLE VERDURE', it: 'FLAP STEAK ALLA GRIGLIA CON SALSA CHIMICHURRI E PATATE ALLE VERDURE' }, 
      description: { cs: '200g flap steak, omáčka Chimichurri, zeleninové brambory', en: '200g flap steak, Chimichurri sauce, vegetable potatoes', it: '200g flap steak, salsa Chimichurri, patate alle verdure' }, 
      price: '425 Kč', 
      category: 'secondi' 
    },
    
    // ===== DOLCI – DEZERTY =====
    { 
      id: 'dolci-1', 
      name: { cs: 'TIRAMISÚ', en: 'TIRAMISÚ', it: 'TIRAMISÚ' }, 
      description: { cs: 'tradiční italský dezert s mascarpone a kávou', en: 'traditional Italian dessert with mascarpone and coffee', it: 'dolce tradizionale italiano con mascarpone e caffè' }, 
      price: '145 Kč', 
      category: 'dolci' 
    },
    { 
      id: 'dolci-2', 
      name: { cs: 'CANNOLLI FATTI IN CASA', en: 'CANNOLLI FATTI IN CASA', it: 'CANNOLLI FATTI IN CASA' }, 
      description: { cs: 'Naše Cannolli plněné ricottou, pistáciové oříšky, čokoláda', en: 'Our homemade Cannoli filled with ricotta, pistachios, chocolate', it: 'I nostri Cannoli fatti in casa ripieni di ricotta, pistacchi, cioccolato' }, 
      price: '165 Kč', 
      category: 'dolci' 
    },
    { 
      id: 'dolci-3', 
      name: { cs: 'BROWNIE AL CARAMELLO SALATO, PECAN NOCI E GELATO ALLA VANIGLIA', en: 'BROWNIE AL CARAMELLO SALATO, PECAN NOCI E GELATO ALLA VANIGLIA', it: 'BROWNIE AL CARAMELLO SALATO, PECAN NOCI E GELATO ALLA VANIGLIA' }, 
      description: { cs: 'Brownie se slaným karamelem, pekanové ořechy, vanilková zmrzlina', en: 'Salted caramel brownie, pecans, vanilla ice cream', it: 'Brownie al caramello salato, noci pecan, gelato alla vaniglia' }, 
      price: '175 Kč', 
      category: 'dolci' 
    },
    { 
      id: 'dolci-4', 
      name: { cs: 'GELATO', en: 'GELATO', it: 'GELATO' }, 
      description: { cs: 'zmrzlina dle denní nabídky', en: 'ice cream of the day', it: 'gelato del giorno' }, 
      price: '85 Kč', 
      category: 'dolci' 
    },
    { 
      id: 'dolci-5', 
      name: { cs: 'TIRAMISÚ AL PISTACCHIO', en: 'TIRAMISÚ AL PISTACCHIO', it: 'TIRAMISÚ AL PISTACCHIO' }, 
      description: { cs: 'Naše pistáciové tiramisú (SPECIALE ALTRO DA TONY)', en: 'Our pistachio tiramisu (SPECIALE ALTRO DA TONY)', it: 'Il nostro tiramisù al pistacchio (SPECIALE ALTRO DA TONY)' }, 
      price: '185 Kč', 
      category: 'dolci' 
    },
    
    // ===== PROSECCO =====
    { 
      id: 'prosecco-1', 
      name: { cs: 'ASOLO SUPERIORE DOCG ASTORIA', en: 'ASOLO SUPERIORE DOCG ASTORIA', it: 'ASOLO SUPERIORE DOCG ASTORIA' }, 
      description: { cs: '0,1L', en: '0,1L', it: '0,1L' }, 
      price: '95 Kč', 
      category: 'wines_sparkling' 
    },
    { 
      id: 'prosecco-2', 
      name: { cs: 'ASOLO SUPERIORE DOCG ASTORIA', en: 'ASOLO SUPERIORE DOCG ASTORIA', it: 'ASOLO SUPERIORE DOCG ASTORIA' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '650 Kč', 
      category: 'wines_sparkling' 
    },
    { 
      id: 'prosecco-3', 
      name: { cs: 'FRANCIACORTA BRUT DOCG CASTALDI', en: 'FRANCIACORTA BRUT DOCG CASTALDI', it: 'FRANCIACORTA BRUT DOCG CASTALDI' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '1200 Kč', 
      category: 'wines_sparkling' 
    },
    
    // ===== BÍLÁ VÍNA =====
    { 
      id: 'wine-white-1', 
      name: { cs: 'PINOT GRIGIO IGT GORGO', en: 'PINOT GRIGIO IGT GORGO', it: 'PINOT GRIGIO IGT GORGO' }, 
      description: { cs: '0,15L', en: '0,15L', it: '0,15L' }, 
      price: '105 Kč', 
      category: 'wines_white' 
    },
    { 
      id: 'wine-white-2', 
      name: { cs: 'PINOT GRIGIO IGT GORGO', en: 'PINOT GRIGIO IGT GORGO', it: 'PINOT GRIGIO IGT GORGO' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '490 Kč', 
      category: 'wines_white' 
    },
    { 
      id: 'wine-white-3', 
      name: { cs: 'VERMENTINO IGP SALENTO TIMO', en: 'VERMENTINO IGP SALENTO TIMO', it: 'VERMENTINO IGP SALENTO TIMO' }, 
      description: { cs: '0,15L', en: '0,15L', it: '0,15L' }, 
      price: '100 Kč', 
      category: 'wines_white' 
    },
    { 
      id: 'wine-white-4', 
      name: { cs: 'VERMENTINO IGP SALENTO TIMO', en: 'VERMENTINO IGP SALENTO TIMO', it: 'VERMENTINO IGP SALENTO TIMO' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '470 Kč', 
      category: 'wines_white' 
    },
    { 
      id: 'wine-white-5', 
      name: { cs: 'CHARDONNAY DOC LANGHE PIEMONTE', en: 'CHARDONNAY DOC LANGHE PIEMONTE', it: 'CHARDONNAY DOC LANGHE PIEMONTE' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '560 Kč', 
      category: 'wines_white' 
    },
    { 
      id: 'wine-white-6', 
      name: { cs: 'SATRICO IGT', en: 'SATRICO IGT', it: 'SATRICO IGT' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '640 Kč', 
      category: 'wines_white' 
    },
    { 
      id: 'wine-white-7', 
      name: { cs: 'LUGANA PRESTIGE D.O.P.', en: 'LUGANA PRESTIGE D.O.P.', it: 'LUGANA PRESTIGE D.O.P.' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '690 Kč', 
      category: 'wines_white' 
    },
    
    // ===== RŮŽOVÉ VÍNO =====
    { 
      id: 'wine-rose-1', 
      name: { cs: 'MERLOT CALALENTA FANTINI', en: 'MERLOT CALALENTA FANTINI', it: 'MERLOT CALALENTA FANTINI' }, 
      description: { cs: '0,15L', en: '0,15L', it: '0,15L' }, 
      price: '125 Kč', 
      category: 'wines_rose' 
    },
    { 
      id: 'wine-rose-2', 
      name: { cs: 'MERLOT CALALENTA FANTINI', en: 'MERLOT CALALENTA FANTINI', it: 'MERLOT CALALENTA FANTINI' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '590 Kč', 
      category: 'wines_rose' 
    },
    
    // ===== ČERVENÁ VÍNA =====
    { 
      id: 'wine-red-1', 
      name: { cs: 'PRIMITIVO PUGLIA IGT SAN M. PUMO', en: 'PRIMITIVO PUGLIA IGT SAN M. PUMO', it: 'PRIMITIVO PUGLIA IGT SAN M. PUMO' }, 
      description: { cs: '0,15L', en: '0,15L', it: '0,15L' }, 
      price: '100 Kč', 
      category: 'wines_red' 
    },
    { 
      id: 'wine-red-2', 
      name: { cs: 'PRIMITIVO PUGLIA IGT SAN M. PUMO', en: 'PRIMITIVO PUGLIA IGT SAN M. PUMO', it: 'PRIMITIVO PUGLIA IGT SAN M. PUMO' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '480 Kč', 
      category: 'wines_red' 
    },
    { 
      id: 'wine-red-3', 
      name: { cs: 'MONTECUCCO DOC RIGOLETTO', en: 'MONTECUCCO DOC RIGOLETTO', it: 'MONTECUCCO DOC RIGOLETTO' }, 
      description: { cs: '0,15L', en: '0,15L', it: '0,15L' }, 
      price: '120 Kč', 
      category: 'wines_red' 
    },
    { 
      id: 'wine-red-4', 
      name: { cs: 'CANNONAU SARDEGNA DOC', en: 'CANNONAU SARDEGNA DOC', it: 'CANNONAU SARDEGNA DOC' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '510 Kč', 
      category: 'wines_red' 
    },
    { 
      id: 'wine-red-5', 
      name: { cs: 'MONTECUCCO DOC RIGOLETTO', en: 'MONTECUCCO DOC RIGOLETTO', it: 'MONTECUCCO DOC RIGOLETTO' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '540 Kč', 
      category: 'wines_red' 
    },
    { 
      id: 'wine-red-6', 
      name: { cs: 'BARBERA ASTI DOCG', en: 'BARBERA ASTI DOCG', it: 'BARBERA ASTI DOCG' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '600 Kč', 
      category: 'wines_red' 
    },
    { 
      id: 'wine-red-7', 
      name: { cs: 'SANGIOVESE DON CAMILLO', en: 'SANGIOVESE DON CAMILLO', it: 'SANGIOVESE DON CAMILLO' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '690 Kč', 
      category: 'wines_red' 
    },
    
    // ===== KÁVA - TEPLÉ NÁPOJE =====
    { 
      id: 'coffee-1', 
      name: { cs: 'ESPRESSO', en: 'ESPRESSO', it: 'ESPRESSO' }, 
      description: { cs: 'KÁVU MÁME Z RODINNÉ PRAŽÍRNY COFFEE LIMIT', en: 'We serve coffee from the family roastery Coffee Limit', it: 'Serviamo caffè della torrefazione di famiglia Coffee Limit' }, 
      price: '58 Kč', 
      category: 'coffee' 
    },
    { 
      id: 'coffee-2', 
      name: { cs: 'RISTRETTO', en: 'RISTRETTO', it: 'RISTRETTO' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '58 Kč', 
      category: 'coffee' 
    },
    { 
      id: 'coffee-3', 
      name: { cs: 'ESPRESSO DOPPIO', en: 'ESPRESSO DOPPIO', it: 'ESPRESSO DOPPIO' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '78 Kč', 
      category: 'coffee' 
    },
    { 
      id: 'coffee-4', 
      name: { cs: 'ESPRESSO MACHIATO', en: 'ESPRESSO MACHIATO', it: 'ESPRESSO MACHIATO' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '68 Kč', 
      category: 'coffee' 
    },
    { 
      id: 'coffee-5', 
      name: { cs: 'CAPPUCCINO', en: 'CAPPUCCINO', it: 'CAPPUCCINO' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '75 Kč', 
      category: 'coffee' 
    },
    { 
      id: 'coffee-6', 
      name: { cs: 'CAFFÉ LATTE', en: 'CAFFÉ LATTE', it: 'CAFFÉ LATTE' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '85 Kč', 
      category: 'coffee' 
    },
    { 
      id: 'coffee-7', 
      name: { cs: 'ČAJ HARNEY & SONS', en: 'TEA HARNEY & SONS', it: 'TÈ HARNEY & SONS' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '68 Kč', 
      category: 'coffee' 
    },
    { 
      id: 'coffee-8', 
      name: { cs: 'ČAJ ČERSTVÝ (ZÁZVOROVÝ, MÁTOVÝ)', en: 'FRESH TEA (GINGER, MINT)', it: 'TÈ FRESCO (ZENZERO, MENTA)' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '78 Kč', 
      category: 'coffee' 
    },
    
    // ===== NEALKO =====
    { 
      id: 'nonalc-1', 
      name: { cs: 'COCA COLA / ZERO', en: 'COCA COLA / ZERO', it: 'COCA COLA / ZERO' }, 
      description: { cs: '0,2L', en: '0,2L', it: '0,2L' }, 
      price: '75 Kč', 
      category: 'nonalcoholic' 
    },
    { 
      id: 'nonalc-2', 
      name: { cs: 'TONIC THOMAS HENRY', en: 'TONIC THOMAS HENRY', it: 'TONIC THOMAS HENRY' }, 
      description: { cs: '0,2L', en: '0,2L', it: '0,2L' }, 
      price: '78 Kč', 
      category: 'nonalcoholic' 
    },
    { 
      id: 'nonalc-3', 
      name: { cs: 'DOMÁCÍ LIMONÁDY (DENNÍ NABÍDKA)', en: 'HOMEMADE LEMONADES (DAILY OFFER)', it: 'LIMONATE FATTE IN CASA (OFFERTA GIORNALIERA)' }, 
      description: { cs: '0,3L', en: '0,3L', it: '0,3L' }, 
      price: '85 Kč', 
      category: 'nonalcoholic' 
    },
    { 
      id: 'nonalc-4', 
      name: { cs: 'VODA FILTROVANÁ (PERLIVÁ, NEPERLIVÁ, JEMNĚ PERLIVÁ)', en: 'FILTERED WATER (SPARKLING, STILL, GENTLY SPARKLING)', it: 'ACQUA FILTRATA (FRIZZANTE, NATURALE, LEGGERMENTE FRIZZANTE)' }, 
      description: { cs: '0,7L', en: '0,7L', it: '0,7L' }, 
      price: '65 Kč', 
      category: 'nonalcoholic' 
    },
    
    // ===== PIVO =====
    { 
      id: 'beer-1', 
      name: { cs: 'PILSNER URQUELL', en: 'PILSNER URQUELL', it: 'PILSNER URQUELL' }, 
      description: { cs: '0,33L', en: '0,33L', it: '0,33L' }, 
      price: '75 Kč', 
      category: 'beers' 
    },
    { 
      id: 'beer-2', 
      name: { cs: 'BIRELL SVĚTLÝ NEALKO', en: 'BIRELL NON-ALCOHOLIC', it: 'BIRELL ANALCOLICA' }, 
      description: { cs: '0,33L', en: '0,33L', it: '0,33L' }, 
      price: '55 Kč', 
      category: 'beers' 
    },
    
    // ===== APERITIVY/MÍCHANÉ NÁPOJE =====
    { 
      id: 'aperitivo-1', 
      name: { cs: 'CRODINO NEALKO', en: 'CRODINO NON-ALCOHOLIC', it: 'CRODINO ANALCOLICO' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '85 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-2', 
      name: { cs: 'CAMPARI', en: 'CAMPARI', it: 'CAMPARI' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '95 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-3', 
      name: { cs: 'APEROL', en: 'APEROL', it: 'APEROL' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '95 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-4', 
      name: { cs: 'APEROL SPRITZ', en: 'APEROL SPRITZ', it: 'APEROL SPRITZ' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '150 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-5', 
      name: { cs: 'LIMONCELLO SPRITZ', en: 'LIMONCELLO SPRITZ', it: 'LIMONCELLO SPRITZ' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '150 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-6', 
      name: { cs: 'NEGRONI', en: 'NEGRONI', it: 'NEGRONI' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '165 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-7', 
      name: { cs: 'BOB GIMLET', en: 'BOB GIMLET', it: 'BOB GIMLET' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '175 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-8', 
      name: { cs: 'GIN TONIC', en: 'GIN TONIC', it: 'GIN TONIC' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '185 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-9', 
      name: { cs: 'BLUE GIN TONIC', en: 'BLUE GIN TONIC', it: 'BLUE GIN TONIC' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '185 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-10', 
      name: { cs: 'MIMOSA', en: 'MIMOSA', it: 'MIMOSA' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '135 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-11', 
      name: { cs: 'MARTINI BIANCO/DRY/ROSSO', en: 'MARTINI BIANCO/DRY/ROSSO', it: 'MARTINI BIANCO/DRY/ROSSO' }, 
      description: { cs: '0,1L', en: '0,1L', it: '0,1L' }, 
      price: '75 Kč', 
      category: 'aperitivi' 
    },
    
    // ===== DIGESTIVI / DESTILÁTY =====
    { 
      id: 'digestivo-1', 
      name: { cs: 'GRAPPA (Dle nabídky)', en: 'GRAPPA (Daily offer)', it: 'GRAPPA (Offerta giornaliera)' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '90 - 250 Kč', 
      category: 'grappa' 
    },
    { 
      id: 'digestivo-2', 
      name: { cs: 'AMARO DEL CAPO', en: 'AMARO DEL CAPO', it: 'AMARO DEL CAPO' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '85 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-3', 
      name: { cs: 'AVERNA', en: 'AVERNA', it: 'AVERNA' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '85 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-4', 
      name: { cs: 'MONTENEGRO', en: 'MONTENEGRO', it: 'MONTENEGRO' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '85 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-5', 
      name: { cs: 'FERNET BRANCA', en: 'FERNET BRANCA', it: 'FERNET BRANCA' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '85 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-6', 
      name: { cs: 'JÄGERMEISTER', en: 'JÄGERMEISTER', it: 'JÄGERMEISTER' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '85 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-7', 
      name: { cs: 'BECHEROVKA', en: 'BECHEROVKA', it: 'BECHEROVKA' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '75 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-8', 
      name: { cs: 'VODKA ABSOLUT', en: 'VODKA ABSOLUT', it: 'VODKA ABSOLUT' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '85 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-9', 
      name: { cs: 'GIN MALFY', en: 'GIN MALFY', it: 'GIN MALFY' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '95 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-10', 
      name: { cs: 'GIN OMFG (ŽUFÁNEK)', en: 'GIN OMFG (ŽUFÁNEK)', it: 'GIN OMFG (ŽUFÁNEK)' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '145 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-11', 
      name: { cs: 'RUM DIPLOMATICO', en: 'RUM DIPLOMATICO', it: 'RUM DIPLOMATICO' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '135 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-12', 
      name: { cs: 'RUM ZACAPA 23', en: 'RUM ZACAPA 23', it: 'RUM ZACAPA 23' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '165 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-13', 
      name: { cs: 'BRANDY VECCHIA ROMAGNA', en: 'BRANDY VECCHIA ROMAGNA', it: 'BRANDY VECCHIA ROMAGNA' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '95 Kč', 
      category: 'digestivi' 
    }
  ];
}