/**
 * Seed script for populating the database with complete menu including drinks
 * This can be run from the Admin Dashboard to initialize the menu
 */

import { projectId, publicAnonKey } from './supabase/info';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  category: string;
  image?: string;
  priceGlass?: string;
  subcategory?: string;
}

export const completeMenuSeedData: MenuItem[] = [
  // ==================== ANTIPASTI ====================
  {
    name: 'Zuppa del Giorno',
    description: 'Denní polévka / Daily soup / Zuppa del giorno',
    price: '75 Kč',
    category: 'antipasti',
  },
  {
    name: 'Bruschetta al Pomodoro con Stracciatella',
    description: 'Pečená rajčata, bazalka, stracciatella, česnek / Roasted tomatoes, basil, stracciatella, garlic / Pomodori arrostiti, basilico, stracciatella, aglio',
    price: '185 Kč',
    category: 'antipasti',
  },
  {
    name: 'Carpaccio di Manzo',
    description: '50g hovězího masa, olivy, cherry rajčata, rukola, parmazán / 50g beef, olives, cherry tomatoes, arugula, parmesan / 50g manzo, olive, pomodorini, rucola, parmigiano',
    price: '255 Kč',
    category: 'antipasti',
  },
  {
    name: 'Tartar di Manzo',
    description: '70g hovězího masa, kapary, dijonská hořčice / 70g beef tartare, capers, Dijon mustard / 70g tartare di manzo, capperi, senape di Digione',
    price: '275 Kč',
    category: 'antipasti',
  },
  {
    name: 'Gamberi al Limone in Padella',
    description: 'Krevety, česnek, citron, chilli / Prawns, garlic, lemon, chilli / Gamberi, aglio, limone, peperoncino',
    price: '295 Kč',
    category: 'antipasti',
  },

  // ==================== INSALATE ====================
  {
    name: 'Insalata di Pollo e Avocado',
    description: 'Mix salátů, grilované kuřecí prso, avokado, cherry rajčata, medovo-hořčičný dressing / Mixed salads, grilled chicken breast, avocado, cherry tomatoes, honey-mustard dressing / Insalate miste, petto di pollo grigliato, avocado, pomodorini, condimento miele-senape',
    price: '265 Kč',
    category: 'insalate',
  },
  {
    name: 'Insalata Frutti di Mare',
    description: 'Mix salátů, mořské plody, česnek, citrónový dressing / Mixed salads, seafood, garlic, lemon dressing / Insalate miste, frutti di mare, aglio, condimento al limone',
    price: '295 Kč',
    category: 'insalate',
  },
  {
    name: 'Insalata con Formaggio di Capra',
    description: 'Mix salátů, grilovaný kozí sýr, vlašské ořechy, granátové jablko, balsamikový krém / Mixed salads, grilled goat cheese, walnuts, pomegranate, balsamic cream / Insalate miste, formaggio di capra grigliato, noci, melograno, crema balsamica',
    price: '275 Kč',
    category: 'insalate',
  },

  // ==================== PASTA FRESCA ====================
  {
    name: 'Spaghetti alla Carbonara',
    description: 'Vejce, guanciale, pecorino / Eggs, guanciale, pecorino / Uova, guanciale, pecorino',
    price: '245 Kč',
    category: 'primi',
    image: 'https://images.unsplash.com/photo-1676300184847-4ee4030409c0?w=1080',
  },
  {
    name: 'Spaghetti Aglio, Olio e Peperoncino',
    description: 'Česnek, olivový olej, chilli / Garlic, olive oil, chilli / Aglio, olio d\'oliva, peperoncino',
    price: '225 Kč',
    category: 'primi',
  },
  {
    name: 'Spaghetti Aglio, Olio e Peperoncino con Pancetta',
    description: 'Česnek, olivový olej, chilli, pancetta / Garlic, olive oil, chilli, pancetta / Aglio, olio d\'oliva, peperoncino, pancetta',
    price: '245 Kč',
    category: 'primi',
  },
  {
    name: 'Spaghetti Aglio, Olio e Peperoncino con Gamberi',
    description: 'Česnek, olivový olej, chilli, krevety / Garlic, olive oil, chilli, prawns / Aglio, olio d\'oliva, peperoncino, gamberi',
    price: '275 Kč',
    category: 'primi',
  },
  {
    name: 'Spaghetti all\'Amatriciana',
    description: 'Guanciale, san Marzano, pecorino romano, chilli / Guanciale, san Marzano tomatoes, pecorino romano, chilli / Guanciale, pomodori san Marzano, pecorino romano, peperoncino',
    price: '255 Kč',
    category: 'primi',
  },
  {
    name: 'Lasagne Napoletane',
    description: 'Tradiční lasagne / Traditional lasagne / Lasagne tradizionali',
    price: '295 Kč',
    category: 'primi',
  },
  {
    name: 'Rigatoni alla Boscaiola',
    description: 'Hříbky, pancetta, smetana, česnek, parmazán / Porcini mushrooms, pancetta, cream, garlic, parmesan / Funghi porcini, pancetta, panna, aglio, parmigiano',
    price: '265 Kč',
    category: 'primi',
  },
  {
    name: 'Rigatoni Burrata, Pomodoro e Basilico',
    description: 'San Marzano, burrata, bazalka / San Marzano tomatoes, burrata, basil / Pomodori san Marzano, burrata, basilico',
    price: '255 Kč',
    category: 'primi',
  },
  {
    name: 'Tagliatelle Salsiccia e Rosmarino',
    description: 'Salsiccia, červené víno, česnek, rozmarýn / Salsiccia, red wine, garlic, rosemary / Salsiccia, vino rosso, aglio, rosmarino',
    price: '265 Kč',
    category: 'primi',
  },
  {
    name: 'Tagliatelle al Tartufo',
    description: 'Černý lanýž, lanýžové máslo / Black truffle, truffle butter / Tartufo nero, burro al tartufo',
    price: '295 Kč',
    category: 'primi',
  },
  {
    name: 'Risotto Frutti di Mare',
    description: 'Mořské plody, víno, cherry rajčata, česnek / Seafood, wine, cherry tomatoes, garlic / Frutti di mare, vino, pomodorini, aglio',
    price: '325 Kč',
    category: 'primi',
  },

  // ==================== PIZZA ====================
  {
    name: 'Pizza Margherita',
    description: 'Rajčata san Marzano, mozzarella fior di latte, grana Padano, bazalka / San Marzano tomatoes, mozzarella fior di latte, grana Padano, basil / Pomodori san Marzano, mozzarella fior di latte, grana Padano, basilico',
    price: '255 Kč',
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1680405620826-83b0f0f61b28?w=1080',
  },
  {
    name: 'Pizza Diavola',
    description: 'Rajčata san Marzano, mozzarella fior di latte, grana Padano, pikantní salám ventricina, bazalka / San Marzano tomatoes, mozzarella fior di latte, grana Padano, spicy salami ventricina, basil / Pomodori san Marzano, mozzarella fior di latte, grana Padano, salame piccante ventricina, basilico',
    price: '275 Kč',
    category: 'pizza',
  },
  {
    name: 'Pizza La Provola Napoletana e Salsiccia',
    description: 'Rajčata san Marzano, uzený sýr provola affumicata, pecorino romano, grana Padano / San Marzano tomatoes, smoked provola cheese, pecorino romano, grana Padano / Pomodori san Marzano, provola affumicata, pecorino romano, grana Padano',
    price: '295 Kč',
    category: 'pizza',
  },
  {
    name: 'Pizza Quattro Formaggi',
    description: 'Mozzarella fior di latte, taleggio, uzený sýr provola affumicata, gorgonzola, pecorino romano, grana Padano / Mozzarella fior di latte, taleggio, smoked provola, gorgonzola, pecorino romano, grana Padano / Mozzarella fior di latte, taleggio, provola affumicata, gorgonzola, pecorino romano, grana Padano',
    price: '285 Kč',
    category: 'pizza',
  },
  {
    name: 'Pizza Nduja Calabrese',
    description: 'Rajčata san Marzano, Nduja spillinga, žlutá rajčata Vesuvio, mozzarella fior di latte, stracciatella, grana Padano, bazalka / San Marzano tomatoes, Nduja spillinga, yellow Vesuvio tomatoes, mozzarella fior di latte, stracciatella, grana Padano, basil / Pomodori san Marzano, Nduja spillinga, pomodori gialli Vesuvio, mozzarella fior di latte, stracciatella, grana Padano, basilico',
    price: '285 Kč',
    category: 'pizza',
  },
  {
    name: 'Pizza Salame Napoli',
    description: 'Rajčata san Marzano, mozzarella fior di latte, salame Napoli, grana Padano, bazalka / San Marzano tomatoes, mozzarella fior di latte, Napoli salami, grana Padano, basil / Pomodori san Marzano, mozzarella fior di latte, salame Napoli, grana Padano, basilico',
    price: '265 Kč',
    category: 'pizza',
  },
  {
    name: 'Pizza Capricciosa',
    description: 'Rajčata san Marzano, mozzarella fior di latte, šunka, houby, grana Padano, bazalka / San Marzano tomatoes, mozzarella fior di latte, ham, mushrooms, grana Padano, basil / Pomodori san Marzano, mozzarella fior di latte, prosciutto, funghi, grana Padano, basilico',
    price: '285 Kč',
    category: 'pizza',
  },
  {
    name: 'Pizza Mortadella e Pistacchio',
    description: 'Mozzarella fior di latte, mortadella, pistácie, grana Padano, bazalka / Mozzarella fior di latte, mortadella, pistachios, grana Padano, basil / Mozzarella fior di latte, mortadella, pistacchi, grana Padano, basilico',
    price: '295 Kč',
    category: 'pizza',
  },
  {
    name: 'Pizza Bufala di Campania',
    description: 'Rajčata san Marzano, mozzarella fior di latte, grana Padano, bazalka / San Marzano tomatoes, buffalo mozzarella, grana Padano, basil / Pomodori san Marzano, mozzarella di bufala, grana Padano, basilico',
    price: '295 Kč',
    category: 'pizza',
  },
  {
    name: 'Pizza Napoletana',
    description: 'Rajčata san Marzano, mozzarella fior di latte, ančovičky, olivy taggiasche, grana Padano, oregáno / San Marzano tomatoes, mozzarella fior di latte, anchovies, taggiasche olives, grana Padano, oregano / Pomodori san Marzano, mozzarella fior di latte, acciughe, olive taggiasche, grana Padano, origano',
    price: '285 Kč',
    category: 'pizza',
  },

  // ==================== SECONDI ====================
  {
    name: 'Petto di Pollo in Crosta di Parmigiano con Spaghetti al Pomodoro',
    description: '200g kuřecí prsa v parmazánové krustě, spaghetti s rajčatovou omáčkou san Marzano / 200g chicken breast in parmesan crust, spaghetti with san Marzano tomato sauce / 200g petto di pollo in crosta di parmigiano, spaghetti con salsa di pomodoro san Marzano',
    price: '325 Kč',
    category: 'secondi',
  },
  {
    name: 'Filetto di Maiale alla Griglia con Gnocchi, Rucola e Salsa al Pepe Verde',
    description: '200g grilované vepřové panenky, gnocchi, rukola, omáčka ze zeleného pepře / 200g grilled pork tenderloin, gnocchi, arugula, green pepper sauce / 200g filetto di maiale grigliato, gnocchi, rucola, salsa al pepe verde',
    price: '375 Kč',
    category: 'secondi',
  },
  {
    name: 'Lombo di Vitello con Salsa al Tartufo, Grenaille e Verdure Grigliate',
    description: '200g telecí karé, lanýžová omáčka, pečené grenaille, grilovaná zelenina / 200g veal loin, truffle sauce, roasted grenaille potatoes, grilled vegetables / 200g lombo di vitello, salsa al tartufo, patate grenaille arrosto, verdure grigliate',
    price: '485 Kč',
    category: 'secondi',
  },
  {
    name: 'Flap Steak alla Griglia con Salsa Chimichurri e Patate alle Verdure',
    description: '200g flap steak, omáčka Chimichurri, zeleninové brambory / 200g grilled flap steak, Chimichurri sauce, vegetable potatoes / 200g flap steak alla griglia, salsa Chimichurri, patate alle verdure',
    price: '425 Kč',
    category: 'secondi',
  },

  // ==================== DOLCI ====================
  {
    name: 'Tiramisu',
    description: 'Tradiční italský dezert / Traditional Italian dessert / Dolce tradizionale italiano',
    price: '145 Kč',
    category: 'dolci',
    image: 'https://images.unsplash.com/photo-1594356225191-e9b58190cb3a?w=1080',
  },
  {
    name: 'Tiramisù al Pistacchio',
    description: 'Naše pistáciové tiramisu / Our pistachio tiramisu / Il nostro tiramisù al pistacchio',
    price: '185 Kč',
    category: 'dolci',
  },
  {
    name: 'Cannoli Fatti in Casa',
    description: 'Naše cannoli plněné ricottou, pistáciové oříšky, čokoláda / Our cannoli filled with ricotta, pistachios, chocolate / I nostri cannoli ripieni di ricotta, pistacchi, cioccolato',
    price: '165 Kč',
    category: 'dolci',
  },
  {
    name: 'Brownie al Caramello Salato, Pecan Noci e Gelato alla Vaniglia',
    description: 'Brownie se slaným karamelem, pekanové ořechy, vanilková zmrzlina / Brownie with salted caramel, pecan nuts, vanilla ice cream / Brownie con caramello salato, noci pecan, gelato alla vaniglia',
    price: '175 Kč',
    category: 'dolci',
  },
  {
    name: 'Gelato',
    description: 'Zmrzlina dle denní nabídky / Ice cream according to daily offer / Gelato secondo l\'offerta del giorno',
    price: '85 Kč',
    category: 'dolci',
  },

  // ==================== WINES - PROSECCO & SPARKLING ====================
  {
    name: 'Asolo Superiore DOCG Astoria 0,1L',
    description: 'Prémiové prosecco / Premium prosecco / Prosecco premium',
    price: '95 Kč',
    category: 'wines_sparkling',
    subcategory: 'sparkling',
  },
  {
    name: 'Asolo Superiore DOCG Astoria',
    description: 'Prémiové prosecco / Premium prosecco / Prosecco premium',
    price: '650 Kč',
    priceGlass: '95 Kč',
    category: 'wines_sparkling',
    subcategory: 'sparkling',
  },
  {
    name: 'Franciacorta Brut DOCG Castaldi',
    description: 'Italské šampanské / Italian champagne / Spumante italiano',
    price: '1200 Kč',
    category: 'wines_sparkling',
    subcategory: 'sparkling',
  },

  // ==================== WINES - WHITE ====================
  {
    name: 'Pinot Grigio IGT Gorgo 0,15L',
    description: 'Svěží bílé víno / Fresh white wine / Vino bianco fresco',
    price: '105 Kč',
    category: 'wines_white',
    subcategory: 'white',
  },
  {
    name: 'Pinot Grigio IGT Gorgo',
    description: 'Svěží bílé víno / Fresh white wine / Vino bianco fresco',
    price: '490 Kč',
    priceGlass: '105 Kč',
    category: 'wines_white',
    subcategory: 'white',
  },
  {
    name: 'Vermentino IGP Salento Timo 0,15L',
    description: 'Minerální bílé víno / Mineral white wine / Vino bianco minerale',
    price: '100 Kč',
    category: 'wines_white',
    subcategory: 'white',
  },
  {
    name: 'Vermentino IGP Salento Timo',
    description: 'Minerální bílé víno / Mineral white wine / Vino bianco minerale',
    price: '470 Kč',
    priceGlass: '100 Kč',
    category: 'wines_white',
    subcategory: 'white',
  },
  {
    name: 'Chardonnay DOC Langhe Piemonte',
    description: 'Plné bílé víno z Piemontu / Full-bodied white wine from Piedmont / Vino bianco corposo del Piemonte',
    price: '560 Kč',
    category: 'wines_white',
    subcategory: 'white',
  },
  {
    name: 'Satrico IGT',
    description: 'Elegantní bílé víno / Elegant white wine / Vino bianco elegante',
    price: '640 Kč',
    category: 'wines_white',
    subcategory: 'white',
  },
  {
    name: 'Lugana Prestige D.O.P.',
    description: 'Prémiové bílé víno / Premium white wine / Vino bianco premium',
    price: '690 Kč',
    category: 'wines_white',
    subcategory: 'white',
  },

  // ==================== WINES - ROSÉ ====================
  {
    name: 'Merlot Calalenta Fantini 0,15L',
    description: 'Svěží růžové víno / Fresh rosé wine / Vino rosato fresco',
    price: '125 Kč',
    category: 'wines_rose',
    subcategory: 'rose',
  },
  {
    name: 'Merlot Calalenta Fantini',
    description: 'Svěží růžové víno / Fresh rosé wine / Vino rosato fresco',
    price: '590 Kč',
    priceGlass: '125 Kč',
    category: 'wines_rose',
    subcategory: 'rose',
  },

  // ==================== WINES - RED ====================
  {
    name: 'Primitivo Puglia IGT San M. Pumo 0,15L',
    description: 'Ovocné červené víno / Fruity red wine / Vino rosso fruttato',
    price: '100 Kč',
    category: 'wines_red',
    subcategory: 'red',
  },
  {
    name: 'Primitivo Puglia IGT San M. Pumo',
    description: 'Ovocné červené víno / Fruity red wine / Vino rosso fruttato',
    price: '480 Kč',
    priceGlass: '100 Kč',
    category: 'wines_red',
    subcategory: 'red',
  },
  {
    name: 'Montecucco DOC Rigoletto 0,15L',
    description: 'Toskánské červené víno / Tuscan red wine / Vino rosso toscano',
    price: '120 Kč',
    category: 'wines_red',
    subcategory: 'red',
  },
  {
    name: 'Cannonau Sardegna DOC',
    description: 'Sardské červené víno / Sardinian red wine / Vino rosso sardo',
    price: '510 Kč',
    category: 'wines_red',
    subcategory: 'red',
  },
  {
    name: 'Montecucco DOC Rigoletto',
    description: 'Toskánské červené víno / Tuscan red wine / Vino rosso toscano',
    price: '540 Kč',
    priceGlass: '120 Kč',
    category: 'wines_red',
    subcategory: 'red',
  },
  {
    name: 'Barbera Asti DOCG',
    description: 'Piemontské červené víno / Piedmont red wine / Vino rosso piemontese',
    price: '600 Kč',
    category: 'wines_red',
    subcategory: 'red',
  },
  {
    name: 'Sangiovese Don Camillo',
    description: 'Klasické italské červené víno / Classic Italian red wine / Vino rosso italiano classico',
    price: '690 Kč',
    category: 'wines_red',
    subcategory: 'red',
  },

  // ==================== COFFEE ====================
  {
    name: 'Espresso',
    description: 'Káva z rodinné pražírny Coffee Limit / Coffee from family roastery Coffee Limit / Caffè dalla torrefazione familiare Coffee Limit',
    price: '58 Kč',
    category: 'coffee',
  },
  {
    name: 'Ristretto',
    description: 'Silné espresso / Strong espresso / Espresso forte',
    price: '58 Kč',
    category: 'coffee',
  },
  {
    name: 'Espresso Doppio',
    description: 'Dvojité espresso / Double espresso / Espresso doppio',
    price: '78 Kč',
    category: 'coffee',
  },
  {
    name: 'Espresso Macchiato',
    description: 'Espresso s kapkou mléka / Espresso with a dash of milk / Espresso con una goccia di latte',
    price: '68 Kč',
    category: 'coffee',
  },
  {
    name: 'Cappuccino',
    description: 'Espresso s mléčnou pěnou / Espresso with milk foam / Espresso con schiuma di latte',
    price: '75 Kč',
    category: 'coffee',
  },
  {
    name: 'Caffè Latte',
    description: 'Espresso s mlékem / Espresso with milk / Espresso con latte',
    price: '85 Kč',
    category: 'coffee',
  },
  {
    name: 'Čaj Harney & Sons',
    description: 'Prémiový čaj / Premium tea / Tè premium',
    price: '68 Kč',
    category: 'coffee',
  },
  {
    name: 'Čaj Čerstvý',
    description: 'Zázvorový nebo mátový / Ginger or mint / Zenzero o menta',
    price: '78 Kč',
    category: 'coffee',
  },

  // ==================== NON-ALCOHOLIC DRINKS ====================
  {
    name: 'Coca Cola / Zero 0,2L',
    description: 'Coca Cola / Coca Cola / Coca Cola',
    price: '75 Kč',
    category: 'nonalcoholic',
  },
  {
    name: 'Tonic Thomas Henry 0,2L',
    description: 'Prémiový tonik / Premium tonic / Tonica premium',
    price: '78 Kč',
    category: 'nonalcoholic',
  },
  {
    name: 'Domácí Limonády 0,3L',
    description: 'Denní nabídka / Daily offer / Offerta del giorno',
    price: '85 Kč',
    category: 'nonalcoholic',
  },
  {
    name: 'Voda Filtrovaná 0,7L',
    description: 'Perlivá, neperlivá, jemně perlivá / Sparkling, still, gently sparkling / Frizzante, naturale, leggermente frizzante',
    price: '65 Kč',
    category: 'nonalcoholic',
  },

  // ==================== BEERS ====================
  {
    name: 'Pilsner Urquell 0,33L',
    description: 'České pivo / Czech beer / Birra ceca',
    price: '75 Kč',
    category: 'beers',
  },
  {
    name: 'Birell Světlý Nealko 0,33L',
    description: 'Nealkoholické pivo / Non-alcoholic beer / Birra analcolica',
    price: '55 Kč',
    category: 'beers',
  },

  // ==================== APERITIVI ====================
  {
    name: 'Crodino Nealko',
    description: 'Italský aperitiv bez alkoholu / Italian non-alcoholic aperitif / Aperitivo italiano analcolico',
    price: '85 Kč',
    category: 'aperitivi',
  },
  {
    name: 'Campari 0,04L',
    description: 'Italský hořký aperitiv / Italian bitter aperitif / Aperitivo amaro italiano',
    price: '95 Kč',
    category: 'aperitivi',
  },
  {
    name: 'Aperol 0,04L',
    description: 'Italský aperitiv / Italian aperitif / Aperitivo italiano',
    price: '95 Kč',
    category: 'aperitivi',
  },
  {
    name: 'Aperol Spritz',
    description: 'Aperol, Prosecco, soda / Aperol, Prosecco, soda / Aperol, Prosecco, soda',
    price: '150 Kč',
    category: 'aperitivi',
  },
  {
    name: 'Limoncello Spritz',
    description: 'Limoncello, Prosecco, soda / Limoncello, Prosecco, soda / Limoncello, Prosecco, soda',
    price: '150 Kč',
    category: 'aperitivi',
  },
  {
    name: 'Negroni',
    description: 'Gin, Campari, vermut / Gin, Campari, vermouth / Gin, Campari, vermouth',
    price: '165 Kč',
    category: 'aperitivi',
  },
  {
    name: 'Bob Gimlet',
    description: 'Gin, limetka, cukr / Gin, lime, sugar / Gin, lime, zucchero',
    price: '175 Kč',
    category: 'aperitivi',
  },
  {
    name: 'Gin Tonic',
    description: 'Gin, tonic / Gin, tonic / Gin, tonica',
    price: '185 Kč',
    category: 'aperitivi',
  },
  {
    name: 'Blue Gin Tonic',
    description: 'Gin, blue curaçao, tonic / Gin, blue curaçao, tonic / Gin, blue curaçao, tonica',
    price: '195 Kč',
    category: 'aperitivi',
  },
  {
    name: 'Vodka Soda Limeta',
    description: 'Vodka, soda, limeta / Vodka, soda, lime / Vodka, soda, lime',
    price: '185 Kč',
    category: 'aperitivi',
  },

  // ==================== DIGESTIVI ====================
  {
    name: 'Limoncello Bacio delle Muse 0,04L',
    description: 'Italský citrusový likér / Italian citrus liqueur / Liquore italiano agli agrumi',
    price: '75 Kč',
    category: 'digestivi',
  },
  {
    name: 'Sambuca Lazzaroni 0,04L',
    description: 'Italský anýzový likér / Italian anise liqueur / Liquore italiano all\'anice',
    price: '85 Kč',
    category: 'digestivi',
  },
  {
    name: 'Amaro Montenegro 0,04L',
    description: 'Italský bylinný likér / Italian herbal liqueur / Liquore italiano alle erbe',
    price: '115 Kč',
    category: 'digestivi',
  },
  {
    name: 'Gloria - Kávový Likér 0,04L',
    description: 'Kávový likér / Coffee liqueur / Liquore al caffè',
    price: '155 Kč',
    category: 'digestivi',
  },
  {
    name: 'Williams Hruška Riserva 0,04L',
    description: 'Hruškovice / Pear brandy / Acquavite di pera',
    price: '150 Kč',
    category: 'digestivi',
  },
  {
    name: 'Fassbind Malinovice 0,04L',
    description: 'Malinový destilát / Raspberry brandy / Acquavite di lampone',
    price: '145 Kč',
    category: 'digestivi',
  },
  {
    name: 'Vodka Beluga Celebration 0,04L',
    description: 'Prémiová vodka / Premium vodka / Vodka premium',
    price: '145 Kč',
    category: 'digestivi',
  },
  {
    name: 'Náš Výběr Rumů 0,04L',
    description: 'Výběr z našich rumů / Selection of our rums / Selezione dei nostri rum',
    price: '140 Kč',
    category: 'digestivi',
  },

  // ==================== GRAPPA ====================
  {
    name: 'Grappa Riserva Bacio delle Muse 0,04L',
    description: 'Vyzrálá grappa / Aged grappa / Grappa invecchiata',
    price: '85 Kč',
    category: 'grappa',
  },
  {
    name: 'Grappa Moscato Bacio delle Muse 0,04L',
    description: 'Grappa z muškatových hroznů / Grappa from muscat grapes / Grappa da uve moscato',
    price: '85 Kč',
    category: 'grappa',
  },
];

/**
 * Function to seed the database with complete menu
 */
export async function seedCompleteMenu(): Promise<{ success: boolean; message: string; count?: number }> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-d880a0b3/menu/seed`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ menuItems: completeMenuSeedData }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to seed menu');
    }

    return {
      success: true,
      message: `Successfully added ${data.count || completeMenuSeedData.length} menu items`,
      count: data.count,
    };
  } catch (error) {
    console.error('Error seeding menu:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}