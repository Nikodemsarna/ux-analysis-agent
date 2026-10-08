// Bank treści ćwiczeń. Słowa kluczowe (`any`, `stems`) zapisuj bez polskich znaków
// i małymi literami — odpowiedzi są normalizowane tak samo przed porównaniem.

export const EMPATHY_QUADRANTS = [
  { id: 'says', label: 'Mówi', hint: 'Dosłowne wypowiedzi z wywiadów' },
  { id: 'thinks', label: 'Myśli', hint: 'Przekonania i obawy, często niewypowiadane' },
  { id: 'does', label: 'Robi', hint: 'Obserwowalne zachowania i działania' },
  { id: 'feels', label: 'Czuje', hint: 'Emocje i stany' },
  { id: 'pains', label: 'Bóle (pains)', hint: 'Przeszkody, ryzyka, frustracje' },
  { id: 'gains', label: 'Zyski (gains)', hint: 'Czego pragnie, co uzna za sukces' },
];

export const PERSONAS = [
  {
    id: 'anna',
    name: 'Anna, 34 lata',
    role: 'Księgowa, mama dwójki dzieci',
    context: 'Robi zakupy spożywcze przez aplikację z dostawą do domu.',
    says: [
      '„Nie mam czasu chodzić po sklepach po pracy.”',
      '„Dostawa nie może kosztować tyle co połowa zakupów.”',
      '„Najważniejsze, żeby warzywa były świeże.”',
    ],
    thinks: [
      'Czy zdążę zamówić, zanim skończą się terminy dostaw na jutro?',
      'Pewnie znowu zastąpią jogurt czymś, czego dzieci nie zjedzą.',
      'W innym sklepie byłoby taniej, ale nie mam siły tego sprawdzać.',
    ],
    does: [
      'Zamawia zakupy wieczorem, gdy dzieci już śpią',
      'Kopiuje listę zakupów z notatek w telefonie',
      'Porównuje ceny tych samych produktów w dwóch aplikacjach',
    ],
    feels: [
      'Frustrację, gdy po złożeniu zamówienia produkt okazuje się niedostępny',
      'Ulgę, gdy dostawa przyjeżdża punktualnie',
      'Niepokój, że przekroczy tygodniowy budżet',
    ],
    pains: [
      'Zamienniki produktów dobierane bez pytania o zgodę',
      'Brak wolnych terminów dostawy w dogodnych godzinach',
    ],
    gains: [
      'Oszczędność kilku godzin w tygodniu',
      'Możliwość powtórzenia poprzedniego zamówienia jednym kliknięciem',
    ],
    painKeywords: [
      { label: 'terminy / czas dostawy', any: ['termin', 'czas', 'dostaw', 'godzin'] },
      { label: 'zamienniki / niedostępne produkty', any: ['zamienn', 'niedostep', 'brak produkt', 'brakuje'] },
      { label: 'koszty / budżet', any: ['cen', 'koszt', 'budzet', 'drog', 'oplat'] },
    ],
  },
  {
    id: 'marek',
    name: 'Pan Marek, 68 lat',
    role: 'Emerytowany nauczyciel',
    context: 'Uczy się korzystać z aplikacji bankowej na smartfonie.',
    says: [
      '„Wolę pójść do oddziału, tam przynajmniej ktoś mi wytłumaczy.”',
      '„Te literki są za małe, nic nie widzę.”',
      '„Wnuczek mi to zainstalował, sam bym nie umiał.”',
    ],
    thinks: [
      'A jeśli kliknę coś źle i pieniądze przepadną?',
      'Czy ten SMS od banku to nie jest jakieś oszustwo?',
      'Nie chcę znowu zawracać głowy wnukowi.',
    ],
    does: [
      'Zapisuje kroki logowania na kartce leżącej przy telefonie',
      'Sprawdza saldo kilka razy dziennie',
      'Powiększa ekran dwoma palcami przy każdym przelewie',
    ],
    feels: [
      'Lęk przed popełnieniem nieodwracalnego błędu',
      'Dumę, gdy samodzielnie opłaci rachunek',
      'Zniecierpliwienie, gdy aplikacja wylogowuje go po minucie',
    ],
    pains: [
      'Zbyt mała czcionka i drobne przyciski',
      'Skomplikowane, często zmieniające się logowanie',
    ],
    gains: [
      'Poczucie bezpieczeństwa i kontroli nad pieniędzmi',
      'Samodzielność bez proszenia rodziny o pomoc',
    ],
    painKeywords: [
      { label: 'czytelność / wielkość elementów', any: ['czcionk', 'tekst', 'mal', 'widz', 'przycisk', 'czyteln'] },
      { label: 'strach przed błędem / oszustwem', any: ['bezpiecz', 'oszust', 'blad', 'bled', 'lek', 'strach', 'obaw', 'pomyl'] },
      { label: 'trudne logowanie', any: ['logow', 'hasl', 'wylogow', 'skomplik', 'trudn'] },
    ],
  },
  {
    id: 'kasia',
    name: 'Kasia, 21 lat',
    role: 'Studentka pierwszego roku',
    context: 'Szuka pokoju do wynajęcia w dużym mieście przez portale z ogłoszeniami.',
    says: [
      '„Ogłoszenia bez zdjęć od razu pomijam.”',
      '„Muszę się zmieścić w 1500 zł razem z opłatami.”',
      '„Chciałabym mieszkać blisko uczelni.”',
    ],
    thinks: [
      'Połowa tych ofert to pewnie dawno nieaktualne ogłoszenia.',
      'Czy właściciel nie okaże się oszustem żądającym kaucji z góry?',
      'Ciekawe, jacy będą moi współlokatorzy.',
    ],
    does: [
      'Codziennie rano przegląda nowe ogłoszenia na trzech portalach',
      'Robi zrzuty ekranu ciekawych ofert',
      'Pisze do właścicieli przez komunikator',
    ],
    feels: [
      'Presję czasu, bo rok akademicki zaczyna się za dwa tygodnie',
      'Rozczarowanie, gdy oferta okazuje się nieaktualna',
      'Ekscytację wizją pierwszego samodzielnego mieszkania',
    ],
    pains: [
      'Nieaktualne i zduplikowane ogłoszenia',
      'Ukryte opłaty doliczane do ceny najmu',
    ],
    gains: [
      'Pewność, że oferta i właściciel są zweryfikowani',
      'Łatwe porównanie całkowitych kosztów mieszkania',
    ],
    painKeywords: [
      { label: 'nieaktualne / zduplikowane oferty', any: ['nieaktual', 'duplik', 'star', 'aktual'] },
      { label: 'koszty / ukryte opłaty', any: ['oplat', 'koszt', 'cen', 'budzet', 'ukryt'] },
      { label: 'zaufanie / oszustwa', any: ['oszust', 'zaufan', 'weryfik', 'bezpiecz', 'kaucj'] },
    ],
  },
  {
    id: 'tomasz',
    name: 'Tomasz, 41 lat',
    role: 'Kierownik zespołu w firmie IT',
    context: 'Wdraża w zespole nowe narzędzie do zarządzania zadaniami.',
    says: [
      '„Nie wiem, kto teraz pracuje nad czym.”',
      '„Kolejne narzędzie? Mamy ich już pięć.”',
      '„Potrzebuję raportu dla zarządu na piątek.”',
    ],
    thinks: [
      'Znowu dowiem się o opóźnieniu w ostatniej chwili.',
      'Zespół i tak nie będzie aktualizował statusów.',
      'Czy to da się połączyć z naszym kalendarzem?',
    ],
    does: [
      'Codziennie pyta na czacie każdą osobę o postępy',
      'Ręcznie kopiuje dane do arkusza kalkulacyjnego',
      'Przełącza się między kilkoma aplikacjami w ciągu godziny',
    ],
    feels: [
      'Stres przed spotkaniami z zarządem',
      'Przytłoczenie liczbą powiadomień',
      'Satysfakcję, gdy projekt kończy się w terminie',
    ],
    pains: [
      'Informacje rozproszone w wielu narzędziach',
      'Ręczne przygotowywanie cotygodniowych raportów',
    ],
    gains: [
      'Jeden widok postępów całego zespołu',
      'Automatycznie generowane raporty',
    ],
    painKeywords: [
      { label: 'ręczne raportowanie', any: ['raport', 'reczn', 'arkusz', 'kopiow'] },
      { label: 'rozproszenie narzędzi', any: ['narzedz', 'rozprosz', 'wiele', 'integrac', 'przelacz', 'aplikac'] },
      { label: 'brak widoczności postępów', any: ['status', 'postep', 'opozn', 'widok', 'przejrzyst', 'kto', 'wiedz'] },
    ],
  },
];

// Pięcioetapowy model Digital Customer Journey używany w ćwiczeniach. `theory` wskazuje odpowiedniki
// w modelach z literatury: 5A (Kotler i in., 2016), fazy Lemon i Verhoef (2016), pętla McKinsey (Court i in., 2009).
export const JOURNEY_STAGES = [
  { id: 'aware', label: 'Świadomość', hint: 'Klient dowiaduje się o potrzebie lub ofercie', theory: '5A: Aware · przed zakupem (pre-purchase)' },
  { id: 'consider', label: 'Rozważanie', hint: 'Szuka informacji online, porównuje opcje', theory: '5A: Appeal + Ask · ZMOT · aktywna ewaluacja (McKinsey)' },
  { id: 'decide', label: 'Decyzja / zakup', hint: 'Wybiera i finalizuje transakcję', theory: '5A: Act · zakup (purchase) · moment zakupu (McKinsey)' },
  { id: 'use', label: 'Korzystanie', hint: 'Używa produktu lub usługi', theory: 'po zakupie (post-purchase) · doświadczenie posprzedażowe' },
  { id: 'loyal', label: 'Lojalność', hint: 'Ocenia, wraca, poleca', theory: '5A: Advocate · pętla lojalności (loyalty loop)' },
];

// Teoria Digital Customer Journey — wyświetlana w ściądze i w ramkach „Podstawa teoretyczna” zadań.
export const DCJ_THEORY = [
  { id: 'definition', name: 'Customer journey jako proces', text: 'Customer journey to cały proces, przez który klient przechodzi w relacji z marką: od uświadomienia potrzeby, przez zakup, po doświadczenia posprzedażowe. Lemon i Verhoef dzielą go na trzy fazy: przed zakupem, zakup i po zakupie, a doświadczenie klienta (CX) jest sumą wrażeń ze wszystkich punktów styku.', source: 'Lemon, K. N., Verhoef, P. C. (2016). Understanding Customer Experience Throughout the Customer Journey. Journal of Marketing, 80(6).' },
  { id: 'digital', name: 'Digital Customer Journey', text: 'Digital Customer Journey to ścieżka klienta, w której kluczowe punkty styku są cyfrowe: wyszukiwarka, media społecznościowe, strona, aplikacja, e-mail, czat, płatność online. Ścieżka rzadko jest liniowa — klient przeskakuje między kanałami i urządzeniami (omnichannel), np. szuka online i kupuje offline (ROPO).', source: 'Kotler, P., Kartajaya, H., Setiawan, I. (2016). Marketing 4.0: Moving from Traditional to Digital.' },
  { id: '5a', name: 'Model 5A', text: 'W gospodarce cyfrowej Kotler zastępuje lejek AIDA ścieżką 5A: Aware (świadomość), Appeal (zainteresowanie), Ask (dopytywanie, szukanie opinii), Act (działanie, zakup), Advocate (rekomendowanie). Wpływ innych klientów (opinie, social media) jest w niej równie ważny jak komunikacja marki.', source: 'Kotler, P., Kartajaya, H., Setiawan, I. (2016). Marketing 4.0.' },
  { id: 'mckinsey', name: 'Pętla lojalności (Consumer Decision Journey)', text: 'McKinsey opisał ścieżkę jako koło, a nie lejek: wstępne rozważanie, aktywna ewaluacja, moment zakupu i doświadczenie po zakupie. Zadowolony klient wchodzi w pętlę lojalności i przy kolejnym zakupie pomija etap porównywania.', source: 'Court, D., Elzinga, D., Mulder, S., Vetvik, O. J. (2009). The Consumer Decision Journey. McKinsey Quarterly.' },
  { id: 'zmot', name: 'ZMOT — zerowy moment prawdy', text: 'Zero Moment of Truth to chwila, w której klient przed zakupem szuka informacji online: czyta recenzje, ogląda wideo, porównuje ceny. Poprzedza „pierwszy moment prawdy” (zetknięcie z produktem na półce lub stronie) i „drugi” (używanie produktu).', source: 'Lecinski, J. (2011). Winning the Zero Moment of Truth. Google.' },
  { id: 'touchpoints', name: 'Typy punktów styku', text: 'Punkty styku dzielą się na: należące do marki (brand-owned, np. aplikacja, strona), należące do partnerów (partner-owned, np. kurier, operator płatności, marketplace), należące do klienta (customer-owned, decyzje i działania samego klienta) oraz zewnętrzne/społeczne (social/external, np. niezależne recenzje, opinie znajomych).', source: 'Lemon, K. N., Verhoef, P. C. (2016). Journal of Marketing, 80(6).' },
  { id: 'map', name: 'Mapa customer journey (CJM)', text: 'Mapa customer journey wizualizuje ścieżkę jednej persony w konkretnym scenariuszu. Typowe warstwy to: etapy, działania, punkty styku, myśli i emocje (krzywa emocji), pain pointy oraz szanse (opportunities) na usprawnienia.', source: 'Kaplan, K. (2016). When and How to Create Customer Journey Maps. Nielsen Norman Group.' },
  { id: 'peakend', name: 'Reguła szczytu i końca', text: 'Ludzie oceniają doświadczenie głównie na podstawie momentu najsilniejszych emocji (szczytu) i jego zakończenia, a nie średniej wszystkich chwil. Dlatego na krzywej emocji warto szczególnie zadbać o najgorszy punkt i o finał ścieżki.', source: 'Kahneman, D., Fredrickson, B. L., Schreiber, C. A., Redelmeier, D. A. (1993). Psychological Science, 4(6).' },
  { id: 'blueprint', name: 'Service blueprint', text: 'Service blueprint rozszerza mapę ścieżki o to, czego klient nie widzi: działania pracowników (frontstage i backstage) oraz procesy i systemy wspierające. Pozwala znaleźć przyczyny pain pointów po stronie organizacji.', source: 'Shostack, G. L. (1984). Designing Services That Deliver. Harvard Business Review.' },
];

// Pojęcie → definicja, do zadania dopasowania modeli teoretycznych.
export const DCJ_CONCEPTS = [
  { label: 'ZMOT (Lecinski)', def: 'Moment, w którym klient przed zakupem szuka informacji online: recenzji, wideo, porównań cen.' },
  { label: 'Pętla lojalności (McKinsey)', def: 'Zadowolony klient przy kolejnym zakupie pomija etap porównywania i od razu wraca do marki.' },
  { label: 'Model 5A (Kotler)', def: 'Ścieżka: Aware, Appeal, Ask, Act, Advocate — zastępuje lejek AIDA w gospodarce cyfrowej.' },
  { label: 'Reguła szczytu i końca (Kahneman)', def: 'Doświadczenie oceniamy głównie po najsilniejszym momencie i po zakończeniu, nie po średniej.' },
  { label: 'Service blueprint (Shostack)', def: 'Mapa uzupełniona o niewidoczne dla klienta działania pracowników i procesy zaplecza.' },
  { label: 'Trzy fazy CX (Lemon i Verhoef)', def: 'Podział ścieżki na fazę przed zakupem, zakup i fazę po zakupie.' },
  { label: 'ROPO', def: 'Klient szuka informacji online, a kupuje w sklepie stacjonarnym.' },
];

export const TOUCHPOINT_TYPES = [
  { id: 'brand', label: 'Należące do marki', hint: 'brand-owned — marka je projektuje i kontroluje' },
  { id: 'partner', label: 'Należące do partnerów', hint: 'partner-owned — współtworzone z partnerami' },
  { id: 'customer', label: 'Należące do klienta', hint: 'customer-owned — decyzje i działania samego klienta' },
  { id: 'social', label: 'Zewnętrzne / społeczne', hint: 'social/external — poza kontrolą marki' },
];

export const TOUCHPOINT_ITEMS = {
  brand: ['Aplikacja mobilna sklepu', 'Newsletter wysyłany przez markę', 'Karta produktu na stronie sklepu', 'Czat z konsultantem na stronie marki'],
  partner: ['Dostawa realizowana przez firmę kurierską', 'Płatność przez zewnętrznego operatora płatności', 'Oferta marki na platformie marketplace', 'Program punktowy prowadzony z partnerem'],
  customer: ['Klient sam wybiera, czy płaci kartą, czy BLIK-iem', 'Klient tworzy własną listę porównawczą w arkuszu', 'Klient sam konfiguruje ustawienia produktu w domu', 'Klient zapisuje zrzuty ekranu ofert do późniejszej decyzji'],
  social: ['Recenzja niezależnego twórcy na YouTube', 'Opinie użytkowników na forum internetowym', 'Rekomendacja znajomego w komunikatorze', 'Ranking w niezależnej porównywarce cen'],
};

export const JOURNEYS = [
  {
    id: 'hotel',
    title: 'Rezerwacja hotelu na wakacje',
    persona: 'Ola, 29 lat, planuje tygodniowy wyjazd nad morze.',
    actions: {
      aware: ['Widzi zdjęcia hotelu na Instagramie znajomej', 'Trafia na reklamę promocji last minute'],
      consider: ['Porównuje ceny i opinie w trzech serwisach', 'Sprawdza na mapie odległość od plaży'],
      decide: ['Wybiera termin i płaci kartą', 'Otrzymuje e-mail z potwierdzeniem rezerwacji'],
      use: ['Melduje się w recepcji', 'Korzysta z basenu i restauracji hotelowej'],
      loyal: ['Wystawia opinię po powrocie', 'Poleca hotel siostrze i zapisuje się do newslettera'],
    },
    pain: {
      stage: 'decide',
      steps: {
        aware: ['Zobaczyła piękne zdjęcia hotelu w mediach społecznościowych.', 'ciekawość'],
        consider: ['Szybko znalazła hotel w porównywarce, opinie są bardzo dobre.', 'entuzjazm'],
        decide: ['Formularz rezerwacji ma 4 ekrany, po błędzie w numerze karty wszystkie dane znikają, a cena wzrasta o „opłatę serwisową”.', 'frustracja i złość'],
        use: ['Pobyt przebiega bez zarzutu, obsługa jest miła.', 'zadowolenie'],
        loyal: ['Dostaje prośbę o opinię, wystawia 4 gwiazdki.', 'umiarkowane zadowolenie'],
      },
      keywords: [
        { label: 'skrócenie / uproszczenie formularza', any: ['skroc', 'uprosc', 'jeden ekran', 'mniej krok', 'mniej pol', 'krok'] },
        { label: 'zachowanie danych po błędzie', any: ['zachow', 'zapamiet', 'nie znik', 'nie kasow', 'pozostaw', 'walidac'] },
        { label: 'przejrzysta cena od początku', any: ['cen', 'oplat', 'koszt', 'transparent', 'przejrzyst', 'ukryt'] },
      ],
      model: 'Skrócić formularz do jednego ekranu, walidować numer karty na bieżąco i zachowywać wpisane dane po błędzie, a pełną cenę z opłatami pokazywać od pierwszego kroku.',
    },
  },
  {
    id: 'headphones',
    title: 'Zakup słuchawek bezprzewodowych w sklepie internetowym',
    persona: 'Bartek, 24 lata, szuka słuchawek do biegania.',
    actions: {
      aware: ['Słyszy w podcaście rekomendację nowego modelu', 'Jego stare słuchawki przestają działać'],
      consider: ['Ogląda recenzje wideo na YouTube', 'Filtruje produkty po cenie i odporności na wodę'],
      decide: ['Dodaje słuchawki do koszyka i płaci BLIK-iem', 'Wybiera dostawę do paczkomatu'],
      use: ['Paruje słuchawki z telefonem', 'Biega w nich kilka razy w tygodniu'],
      loyal: ['Zostawia recenzję ze zdjęciem', 'Kupuje w tym samym sklepie etui ze zniżką dla stałych klientów'],
    },
    pain: {
      stage: 'use',
      steps: {
        aware: ['Usłyszał o słuchawkach w ulubionym podcaście.', 'zaciekawienie'],
        consider: ['Filtry w sklepie pozwoliły szybko zawęzić wybór.', 'zadowolenie'],
        decide: ['Płatność BLIK zajęła kilka sekund.', 'satysfakcja'],
        use: ['Słuchawki nie chcą się sparować z telefonem, instrukcja to mała karteczka po angielsku, a infolinia nie odbiera.', 'bezradność i irytacja'],
        loyal: ['Po kilku dniach w końcu działa, ale nie zostawia opinii.', 'obojętność'],
      },
      keywords: [
        { label: 'czytelna instrukcja / poradnik', any: ['instrukc', 'poradnik', 'przewodnik', 'wideo', 'film', 'krok po kroku', 'samouczek', 'polsk'] },
        { label: 'wsparcie / kontakt', any: ['wsparc', 'czat', 'infolini', 'kontakt', 'pomoc', 'konsultant'] },
        { label: 'łatwiejsze parowanie', any: ['parow', 'automat', 'aplikac', 'qr', 'nfc', 'uprosc'] },
      ],
      model: 'Dołączyć do zamówienia link (np. kod QR) do krótkiego poradnika wideo po polsku o parowaniu oraz uruchomić czat wsparcia dostępny po zakupie.',
    },
  },
  {
    id: 'gym',
    title: 'Wykupienie karnetu na siłownię',
    persona: 'Magda, 31 lat, chce wrócić do regularnych ćwiczeń.',
    actions: {
      aware: ['Widzi w mediach społecznościowych reklamę nowej siłowni na osiedlu', 'Aplikacja zdrowotna w telefonie pokazuje jej spadek aktywności'],
      consider: ['Porównuje cenniki trzech klubów na ich stronach', 'Rezerwuje online darmowe wejście próbne'],
      decide: ['Kupuje karnet roczny w aplikacji klubu', 'Dodaje cyfrową kartę członkowską do portfela w telefonie'],
      use: ['Zapisuje się w aplikacji na zajęcia jogi', 'Ćwiczy z trenerem personalnym'],
      loyal: ['Przedłuża karnet w aplikacji na kolejny rok', 'Wysyła koleżance link polecający z aplikacji'],
    },
    pain: {
      stage: 'consider',
      steps: {
        aware: ['Reklama z promocją na otwarcie w mediach społecznościowych przyciąga jej uwagę.', 'zaciekawienie'],
        consider: ['Na stronie klubu nie ma cennika — trzeba zadzwonić, a konsultant naciska na umowę roczną.', 'nieufność i zniecierpliwienie'],
        decide: ['W końcu kupuje karnet w aplikacji, aktywacja cyfrowej karty trwa chwilę.', 'ulga'],
        use: ['Zajęcia są świetne, zapisy w aplikacji działają sprawnie.', 'radość'],
        loyal: ['Myśli o przedłużeniu karnetu.', 'zadowolenie'],
      },
      keywords: [
        { label: 'cennik dostępny online', any: ['cennik', 'cen', 'online', 'stron', 'opublik', 'jawn', 'przejrzyst'] },
        { label: 'porównanie / wybór wariantów', any: ['porown', 'wariant', 'pakiet', 'kalkulator', 'opcj', 'miesiecz'] },
        { label: 'brak presji sprzedażowej', any: ['presj', 'nacisk', 'bez rozmow', 'bez dzwon', 'samodziel', 'zakup online', 'kup online'] },
      ],
      model: 'Opublikować przejrzysty cennik na stronie z porównaniem wariantów (miesięczny, roczny) i umożliwić samodzielny zakup online bez rozmowy z konsultantem.',
    },
  },
  {
    id: 'course',
    title: 'Zapis na kurs online z projektowania UX',
    persona: 'Piotr, 35 lat, przebranżawia się z księgowości do UX.',
    actions: {
      aware: ['Czyta na LinkedInie post o zarobkach projektantów UX', 'Kolega poleca mu platformę z kursami'],
      consider: ['Ogląda bezpłatną lekcję próbną', 'Czyta sylabus i opinie absolwentów'],
      decide: ['Kupuje kurs w ratach', 'Zakłada konto i ustawia profil'],
      use: ['Ogląda lekcje wieczorami i robi zadania', 'Zadaje pytania mentorowi na forum'],
      loyal: ['Udostępnia certyfikat na LinkedInie', 'Kupuje kolejny, zaawansowany kurs'],
    },
    pain: {
      stage: 'use',
      steps: {
        aware: ['Post na LinkedInie zainspirował go do zmiany zawodu.', 'nadzieja'],
        consider: ['Lekcja próbna była konkretna i dobrze zrealizowana.', 'entuzjazm'],
        decide: ['Zakup w ratach przebiegł bez problemu.', 'ekscytacja'],
        use: ['Na odpowiedź mentora czeka tydzień, nie wie, czy jego zadania są poprawne, a kolejne moduły odblokowują się dopiero po ocenie.', 'zniechęcenie i zwątpienie'],
        loyal: ['Kończy kurs z opóźnieniem, waha się, czy polecić go innym.', 'mieszane uczucia'],
      },
      keywords: [
        { label: 'szybsza informacja zwrotna', any: ['feedback', 'informac', 'zwrotn', 'szybs', 'czas odpowiedz', '24', '48', 'sla'] },
        { label: 'automatyczna / koleżeńska ocena', any: ['automat', 'samoocen', 'kolezen', 'peer', 'spolecznosc', 'przyklad', 'checklist'] },
        { label: 'nieblokowanie postępów', any: ['odblok', 'nie blokow', 'kontynu', 'dostep', 'swobod'] },
      ],
      model: 'Zagwarantować informację zwrotną od mentora w ciągu 48 h, dodać checklisty do samooceny i przykładowe rozwiązania oraz nie blokować kolejnych modułów do czasu oceny.',
    },
  },
  {
    id: 'telemed',
    title: 'Konsultacja lekarska przez aplikację (telemedycyna)',
    persona: 'Ewa, 45 lat, potrzebuje szybkiej porady z powodu infekcji.',
    actions: {
      aware: ['Dowiaduje się od pracodawcy, że pakiet medyczny obejmuje e-wizyty', 'Budzi się z gorączką i nie może wyjść z domu'],
      consider: ['Sprawdza w aplikacji dostępnych lekarzy i terminy', 'Czyta, jak przebiega wideokonsultacja'],
      decide: ['Rezerwuje wizytę na dziś po południu', 'Wypełnia krótką ankietę o objawach'],
      use: ['Rozmawia z lekarzem przez wideo', 'Otrzymuje e-receptę kodem SMS'],
      loyal: ['Ocenia lekarza w aplikacji', 'Umawia kolejną wizytę kontrolną w tej samej aplikacji'],
    },
    pain: {
      stage: 'aware',
      steps: {
        aware: ['Nie wie, że jej pakiet obejmuje e-wizyty — informacja jest ukryta w regulaminie PDF, więc najpierw próbuje dodzwonić się do przychodni.', 'bezradność i zmęczenie'],
        consider: ['Gdy już znajduje aplikację, wybór lekarza jest prosty.', 'nadzieja'],
        decide: ['Rezerwacja zajmuje minutę.', 'ulga'],
        use: ['Konsultacja jest rzeczowa, e-recepta przychodzi od razu.', 'zadowolenie'],
        loyal: ['Chętnie ocenia lekarza i poleca usługę.', 'wdzięczność'],
      },
      keywords: [
        { label: 'aktywna komunikacja oferty', any: ['komunikac', 'informowa', 'powiadom', 'mail', 'sms', 'kampan', 'onboarding', 'powital'] },
        { label: 'widoczność w kanałach (np. przychodnia, infolinia)', any: ['infolini', 'przychodn', 'kanal', 'automat', 'nagran', 'przekier', 'stron'] },
        { label: 'zrozumiały opis zamiast PDF', any: ['pdf', 'regulamin', 'prost', 'jasn', 'zrozumial', 'przejrzyst', 'widoczn'] },
      ],
      model: 'Aktywnie informować o e-wizytach (mail powitalny, SMS, komunikat na infolinii przychodni z przekierowaniem do aplikacji) i opisać pakiet prostym językiem zamiast w regulaminie PDF.',
    },
  },
];

export const JOURNEY_MAP_LAYERS = [
  { id: 'action', label: 'Działanie', hint: 'Co robi klient' },
  { id: 'touchpoint', label: 'Punkt styku', hint: 'Gdzie styka się z marką' },
  { id: 'emotion', label: 'Emocja', hint: 'Co czuje' },
  { id: 'pain', label: 'Pain point', hint: 'Problem, przeszkoda' },
  { id: 'opportunity', label: 'Szansa', hint: 'Pomysł na usprawnienie' },
];

export const JOURNEY_MAP_ITEMS = {
  action: [
    'Dodaje produkt do koszyka',
    'Dzwoni na infolinię w sprawie zwrotu',
    'Czyta opinie innych klientów',
    'Wpisuje dane adresowe w formularzu',
    'Rozpakowuje przesyłkę',
  ],
  touchpoint: [
    'Aplikacja mobilna sklepu',
    'E-mail z potwierdzeniem zamówienia',
    'Kurier',
    'Czat z konsultantem na stronie',
    'Strona produktu',
  ],
  emotion: [
    'Ekscytacja nowym zakupem',
    'Zniecierpliwienie podczas oczekiwania',
    'Niepewność, czy rozmiar będzie dobry',
    'Ulga po otrzymaniu zwrotu pieniędzy',
  ],
  pain: [
    'Długi czas oczekiwania na połączenie z konsultantem',
    'Brak informacji o terminie dostawy',
    'Konieczność ponownego wpisywania tych samych danych',
    'Koszt zwrotu ukryty w regulaminie',
  ],
  opportunity: [
    'Wprowadzić śledzenie przesyłki w czasie rzeczywistym',
    'Dodać tabelę rozmiarów z kalkulatorem dopasowania',
    'Umożliwić zapisanie adresu w profilu klienta',
    'Pokazywać koszt zwrotu już na karcie produktu',
  ],
};

export const HEURISTICS = [
  { n: 1, name: 'Widoczność stanu systemu', desc: 'System informuje użytkownika, co się dzieje, przez odpowiednią informację zwrotną w rozsądnym czasie.', nameKeys: [['widocz'], ['stan', 'status']] },
  { n: 2, name: 'Zgodność systemu ze światem rzeczywistym', desc: 'Język, pojęcia i konwencje są znane użytkownikowi, a nie wewnętrzne dla systemu.', nameKeys: [['zgodn', 'dopasow', 'odzwierc'], ['swiat', 'rzeczywist', 'realn']] },
  { n: 3, name: 'Kontrola i swoboda użytkownika', desc: 'Użytkownik ma „wyjście awaryjne”: cofnij, ponów, anuluj, zamknij.', nameKeys: [['kontrol'], ['swobod', 'wolnos']] },
  { n: 4, name: 'Spójność i standardy', desc: 'Te same rzeczy wyglądają i działają tak samo; interfejs trzyma się konwencji platformy.', nameKeys: [['spojn', 'konsekw'], ['standard']] },
  { n: 5, name: 'Zapobieganie błędom', desc: 'Lepiej nie dopuścić do błędu niż dobrze go komunikować: ograniczenia, potwierdzenia, dobre domyślne wartości.', nameKeys: [['zapobieg', 'prewenc', 'unik'], ['blad', 'bled']] },
  { n: 6, name: 'Rozpoznawanie zamiast przypominania', desc: 'Opcje i informacje są widoczne, użytkownik nie musi ich pamiętać między ekranami.', nameKeys: [['rozpozn'], ['przypom', 'pamiet']] },
  { n: 7, name: 'Elastyczność i efektywność użycia', desc: 'Skróty i przyspieszenia dla zaawansowanych, personalizacja częstych czynności.', nameKeys: [['elastycz'], ['efektyw', 'wydajn']] },
  { n: 8, name: 'Estetyka i minimalizm', desc: 'Interfejs zawiera tylko to, co istotne; każdy zbędny element konkuruje o uwagę.', nameKeys: [['estety'], ['minimal']] },
  { n: 9, name: 'Pomoc w rozpoznawaniu, diagnozowaniu i naprawianiu błędów', desc: 'Komunikaty błędów prostym językiem wskazują problem i proponują rozwiązanie.', nameKeys: [['blad', 'bled'], ['rozpozn', 'diagno', 'napraw', 'wychodz']] },
  { n: 10, name: 'Pomoc i dokumentacja', desc: 'Łatwa do przeszukania, kontekstowa pomoc skupiona na zadaniach użytkownika.', nameKeys: [['pomoc'], ['dokumentac']] },
];

// Każdy scenariusz narusza jedną heurystykę (h). `fix` — grupy pojęć oczekiwanych w propozycji poprawki.
export const HEURISTIC_SCENARIOS = [
  { id: 'h1a', h: 1, text: 'Po kliknięciu „Wyślij” w formularzu kontaktowym przez 8 sekund nic się nie dzieje — brak animacji i komunikatu. Użytkownicy klikają kilka razy i wysyłają duplikaty.',
    fix: [{ label: 'wskaźnik ładowania', any: ['wskaznik', 'spinner', 'animac', 'loader', 'ladowan', 'postep'] }, { label: 'komunikat potwierdzenia', any: ['komunikat', 'potwierdz', 'informac', 'status'] }, { label: 'blokada ponownego kliknięcia', any: ['zablok', 'nieaktyw', 'disable', 'wylacz', 'ponown'] }],
    model: 'Po kliknięciu pokazać wskaźnik ładowania i zablokować przycisk, a po wysłaniu wyświetlić komunikat potwierdzający.' },
  { id: 'h1b', h: 1, text: 'Przesyłanie dużego pliku do chmury nie pokazuje paska postępu ani szacowanego czasu do końca.',
    fix: [{ label: 'pasek postępu / procent', any: ['pasek', 'postep', 'procent', '%'] }, { label: 'szacowany czas', any: ['czas', 'szacow', 'pozostal', 'minut'] }, { label: 'możliwość anulowania / wstrzymania', any: ['anul', 'przerw', 'wstrzym', 'pauz'] }],
    model: 'Dodać pasek postępu z procentem i szacowanym pozostałym czasem oraz przycisk anulowania przesyłania.' },
  { id: 'h1c', h: 1, text: 'W aplikacji do zamawiania jedzenia po złożeniu zamówienia użytkownik nie wie, czy restauracja je przyjęła ani kiedy przyjedzie kurier.',
    fix: [{ label: 'status / etapy zamówienia', any: ['status', 'etap', 'sledz', 'tracking', 'mapa'] }, { label: 'powiadomienia', any: ['powiadom', 'notyfik', 'push', 'sms'] }, { label: 'szacowany czas dostawy', any: ['czas', 'godzin', 'szacow', 'minut'] }],
    model: 'Pokazać status zamówienia z etapami (przyjęte, w przygotowaniu, w drodze), szacowany czas dostawy i wysyłać powiadomienia push o zmianach.' },

  { id: 'h2a', h: 2, text: 'Aplikacja banku nazywa zwykły przelew „dyspozycją transakcyjną typu SEPA-INT”, a konto oszczędnościowe „produktem depozytowym ROR-2”.',
    fix: [{ label: 'prosty, codzienny język', any: ['jezyk', 'slow', 'zrozumial', 'prost', 'codzien', 'potoczn'] }, { label: 'nazwy znane użytkownikom', any: ['przelew', 'oszczednos', 'nazw', 'termin', 'pojec'] }, { label: 'perspektywa użytkownika / badania', any: ['uzytkownik', 'klient', 'bada', 'test'] }],
    model: 'Zastąpić żargon prostym językiem znanym użytkownikom: „Przelew”, „Konto oszczędnościowe”; nazwy sprawdzić w testach z klientami.' },
  { id: 'h2b', h: 2, text: 'Kalendarz skierowany do polskich użytkowników zaczyna tydzień od niedzieli i zapisuje daty w formacie MM/DD/RRRR.',
    fix: [{ label: 'tydzień od poniedziałku', any: ['poniedzial'] }, { label: 'lokalny format daty', any: ['format', 'dd', 'lokal', 'polsk', 'konwencj', 'region'] }],
    need: 2,
    model: 'Dostosować kalendarz do polskich konwencji: tydzień od poniedziałku i format daty DD.MM.RRRR (lokalizacja według ustawień regionalnych).' },
  { id: 'h2c', h: 2, text: 'Sklep odzieżowy wyświetla rozmiary w kolejności alfabetycznej: L, M, S, XL, XS.',
    fix: [{ label: 'naturalna kolejność', any: ['kolejn', 'rosnac', 'najmniejsz', 'logiczn', 'naturaln', 'posortow', 'sortow'] }, { label: 'od XS do XL', any: ['xs', 'rozmiar', 'wielkos'] }],
    need: 2,
    model: 'Sortować rozmiary w naturalnej kolejności rosnącej, od najmniejszego: XS, S, M, L, XL.' },

  { id: 'h3a', h: 3, text: 'Po usunięciu wiadomości e-mail nie ma możliwości jej przywrócenia ani opcji „Cofnij”.',
    fix: [{ label: 'opcja „Cofnij”', any: ['cofnij', 'cofn', 'undo', 'przywroc', 'odwrac'] }, { label: 'kosz / archiwum', any: ['kosz', 'archiw', 'tymczas', 'dni'] }],
    need: 2,
    model: 'Po usunięciu pokazać komunikat z przyciskiem „Cofnij”, a usunięte wiadomości przenosić do kosza na 30 dni z możliwością przywrócenia.' },
  { id: 'h3b', h: 3, text: 'Pięciokrokowy kreator zakładania konta nie pozwala wrócić do poprzedniego kroku — jedyne wyjście to zacząć od nowa.',
    fix: [{ label: 'przycisk „Wstecz”', any: ['wstecz', 'powrot', 'wroc', 'poprzedni', 'cofn'] }, { label: 'zachowanie wpisanych danych', any: ['zachow', 'zapis', 'dane', 'nie trac'] }, { label: 'swobodna edycja kroków', any: ['edyt', 'zmien', 'nawigac', 'dowoln', 'krok'] }],
    model: 'Dodać przycisk „Wstecz” i nawigację po krokach, zachowując wpisane dane, tak by można było edytować dowolny krok.' },
  { id: 'h3c', h: 3, text: 'Pełnoekranowe okno z promocją nie ma przycisku zamknięcia — znika dopiero po 15 sekundach.',
    fix: [{ label: 'widoczny przycisk zamknięcia', any: ['zamkn', 'krzyzyk', 'pomin', 'wyjsc', 'przycisk'] }, { label: 'inne sposoby zamknięcia (Esc, kliknięcie w tło)', any: ['esc', 'poza', 'tlo', 'tla', 'gest'] }, { label: 'natychmiastowa kontrola', any: ['natychmiast', 'od razu', 'w kazdej chwili', 'kontrol'] }],
    model: 'Dodać widoczny przycisk zamknięcia (krzyżyk) działający od razu oraz zamykanie klawiszem Esc i kliknięciem w tło.' },

  { id: 'h4a', h: 4, text: 'Na jednych ekranach przycisk główny jest zielony i po prawej, na innych szary i po lewej. Raz brzmi „Zapisz”, raz „Zatwierdź”, raz „OK”.',
    fix: [{ label: 'ujednolicenie', any: ['spojn', 'jednolit', 'ujednolic', 'konsekwent', 'tak samo', 'zawsze'] }, { label: 'design system / komponenty', any: ['design system', 'system projekt', 'przewodnik', 'styleguide', 'komponent', 'bibliotek', 'wytyczn'] }, { label: 'kolor, położenie, etykieta', any: ['nazw', 'etykiet', 'kolor', 'polozen', 'miejsc'] }],
    model: 'Ujednolicić przycisk główny: zawsze ten sam kolor, położenie i etykieta (np. „Zapisz”), zdefiniowane jako komponent w design systemie.' },
  { id: 'h4b', h: 4, text: 'Kliknięcie logo w lewym górnym rogu nie prowadzi do strony głównej, a koszyk umieszczono w lewym dolnym rogu ekranu.',
    fix: [{ label: 'konwencje znane z innych sklepów', any: ['konwencj', 'standard', 'przyzwycz', 'oczekiw', 'inn'] }, { label: 'logo → strona główna', any: ['logo', 'glown'] }, { label: 'koszyk w prawym górnym rogu', any: ['koszyk', 'prawy', 'prawym', 'gorny', 'gornym'] }],
    model: 'Trzymać się konwencji e-commerce: logo prowadzi do strony głównej, a koszyk jest w prawym górnym rogu, tam gdzie użytkownicy go oczekują.' },
  { id: 'h4c', h: 4, text: 'W treści artykułu podkreślony niebieski tekst nie jest linkiem, a prawdziwe linki wyglądają jak zwykły tekst.',
    fix: [{ label: 'linki', any: ['link', 'odnosni', 'hiperlacz'] }, { label: 'wyróżnienie wizualne', any: ['wyroz', 'odroz', 'podkresl', 'kolor', 'styl'] }, { label: 'konwencja / spójność', any: ['standard', 'konwencj', 'spojn', 'tylko', 'jednolit'] }],
    model: 'Stosować spójną konwencję: tylko linki są niebieskie i podkreślone, a zwykły tekst nie używa tego stylu.' },

  { id: 'h5a', h: 5, text: 'Pole „Data urodzenia” przyjmuje dowolny tekst, a błąd formatu pojawia się dopiero po wysłaniu całego formularza.',
    fix: [{ label: 'kontrolka daty / maska', any: ['kalendarz', 'date picker', 'datepicker', 'wybierak', 'selektor', 'mask', 'list'] }, { label: 'walidacja na bieżąco', any: ['walidac', 'biezac', 'inline', 'od razu', 'natychmiast', 'w trakcie'] }, { label: 'podpowiedź formatu', any: ['format', 'przyklad', 'podpowied', 'placeholder', 'dd.mm'] }],
    model: 'Użyć maski lub kontrolki wyboru daty z podpowiedzią formatu (DD.MM.RRRR) i walidować pole na bieżąco, zanim użytkownik wyśle formularz.' },
  { id: 'h5b', h: 5, text: 'Przycisk „Usuń konto” znajduje się tuż obok „Zapisz zmiany”, ma ten sam kolor i nie wymaga potwierdzenia.',
    fix: [{ label: 'potwierdzenie akcji', any: ['potwierdz', 'dialog', 'modal', 'wpisz', 'upewn'] }, { label: 'oddzielenie przycisków', any: ['oddziel', 'odsun', 'odleglos', 'inne miejsce', 'separ', 'osobn', 'strefa'] }, { label: 'wyróżnienie akcji destrukcyjnej', any: ['kolor', 'czerwon', 'wyroz', 'destrukc', 'ostrzez'] }],
    model: 'Przenieść „Usuń konto” w osobne miejsce (strefa niebezpieczna), wyróżnić kolorem czerwonym i wymagać potwierdzenia w oknie dialogowym.' },
  { id: 'h5c', h: 5, text: 'Wyszukiwarka lotów pozwala wybrać datę powrotu wcześniejszą niż data wylotu.',
    fix: [{ label: 'zablokowanie niepoprawnych dat', any: ['zablok', 'nieaktyw', 'wyszarz', 'uniemozliw', 'ogranicz', 'nie pozwal'] }, { label: 'kalendarz zakresu dat', any: ['kalendarz', 'zakres', 'dat'] }],
    need: 2,
    model: 'W kalendarzu zakresu dat zablokować (wyszarzyć) dni wcześniejsze niż data wylotu, tak by nie dało się wybrać niepoprawnego powrotu.' },

  { id: 'h6a', h: 6, text: 'Kod rabatowy przyszedł mailem, ale na etapie płatności nie ma żadnej informacji o dostępnych kodach — użytkownik musi go pamiętać.',
    fix: [{ label: 'pokazanie dostępnych kodów', any: ['pokaz', 'wyswietl', 'widoc', 'list', 'dostepn'] }, { label: 'automatyczne zastosowanie / podpowiedź', any: ['automat', 'zastosuj', 'podpowied', 'sugest', 'jednym klik'] }, { label: 'kod rabatowy', any: ['kod', 'rabat', 'kupon'] }],
    model: 'Wyświetlić na etapie płatności listę kodów rabatowych dostępnych dla klienta i umożliwić ich zastosowanie jednym kliknięciem (lub automatycznie).' },
  { id: 'h6b', h: 6, text: 'Edytor graficzny ukrywa wszystkie narzędzia — nie ma paska narzędzi, trzeba znać skróty klawiszowe.',
    fix: [{ label: 'widoczny pasek / menu narzędzi', any: ['pasek', 'menu', 'ikon', 'widoczn', 'panel', 'przybor'] }, { label: 'etykiety i podpowiedzi', any: ['etykiet', 'podpowied', 'tooltip', 'opis', 'nazw'] }, { label: 'skróty jako dodatek', any: ['skrot', 'dodatk', 'zaawans'] }],
    model: 'Dodać widoczny pasek narzędzi z ikonami i podpowiedziami (tooltip) pokazującymi nazwę narzędzia i jego skrót klawiszowy.' },
  { id: 'h6c', h: 6, text: 'Na drugim kroku formularza zamówienia trzeba wpisać numer produktu, który był widoczny tylko na pierwszym ekranie.',
    fix: [{ label: 'podsumowanie / informacje widoczne na ekranie', any: ['podsumow', 'pokaz', 'wyswietl', 'widoczn'] }, { label: 'automatyczne przeniesienie danych', any: ['automat', 'przenies', 'wypelni', 'zapamiet', 'nie wpis'] }, { label: 'produkt (nazwa, zdjęcie)', any: ['produkt', 'nazw', 'zdjec'] }],
    model: 'Automatycznie przenieść wybrany produkt do kolejnego kroku i pokazać jego podsumowanie (nazwa, zdjęcie), zamiast kazać wpisywać numer.' },

  { id: 'h7a', h: 7, text: 'Doświadczeni księgowi przy każdej fakturze muszą przeklikać 6 ekranów, choć 90% faktur ma identyczne dane.',
    fix: [{ label: 'szablony / duplikowanie', any: ['szablon', 'powiel', 'duplik', 'kopi', 'wzor'] }, { label: 'skróty / tryb ekspresowy', any: ['skrot', 'szybk', 'ekspres', 'zaawans', 'jeden ekran'] }, { label: 'domyślne / zapamiętane wartości', any: ['domysl', 'automat', 'pamiet', 'zapis'] }],
    model: 'Dodać szablony i opcję „powiel fakturę” z zapamiętanymi danymi oraz tryb ekspresowy na jednym ekranie ze skrótami klawiszowymi dla zaawansowanych.' },
  { id: 'h7b', h: 7, text: 'Sklep nie zapamiętuje adresu dostawy ani metody płatności — stały klient wpisuje je przy każdym zamówieniu.',
    fix: [{ label: 'zapamiętanie danych w profilu', any: ['zapamiet', 'zapis', 'profil', 'konto'] }, { label: 'szybki zakup / ponowienie', any: ['jednym klik', '1-click', 'szybk', 'ekspres', 'ponow', 'powtorz'] }, { label: 'domyślne wartości / autouzupełnianie', any: ['domysl', 'autouzupel', 'autofill', 'automat'] }],
    model: 'Zapamiętywać adres i metodę płatności w profilu klienta, ustawiać je domyślnie i umożliwić szybki zakup lub powtórzenie zamówienia jednym kliknięciem.' },
  { id: 'h7c', h: 7, text: 'Aplikacja do zarządzania zadaniami nie ma skrótów klawiszowych ani możliwości zaznaczenia wielu zadań naraz.',
    fix: [{ label: 'skróty klawiszowe', any: ['skrot', 'klawisz'] }, { label: 'operacje masowe', any: ['wiele', 'masow', 'zaznacz', 'grup', 'zbior', 'kilka'] }, { label: 'dla zaawansowanych / personalizacja', any: ['zaawans', 'eksper', 'doswiadcz', 'personaliz', 'dostosow'] }],
    model: 'Dodać skróty klawiszowe dla zaawansowanych użytkowników oraz zaznaczanie wielu zadań naraz z operacjami masowymi (przenieś, zamknij, przypisz).' },

  { id: 'h8a', h: 8, text: 'Strona główna banku zawiera 14 banerów, 3 karuzele i 40 linków; przycisk logowania ginie w tłumie.',
    fix: [{ label: 'ograniczenie treści', any: ['ogranicz', 'usun', 'redukc', 'mniej', 'uprosc'] }, { label: 'hierarchia i priorytety', any: ['priorytet', 'hierarch', 'wyroz', 'najwazniejsz', 'glown'] }, { label: 'eksponowane logowanie', any: ['logow'] }],
    model: 'Ograniczyć liczbę banerów i linków do najważniejszych, zbudować wyraźną hierarchię i wyróżnić przycisk logowania jako główną akcję.' },
  { id: 'h8b', h: 8, text: 'Ekran płatności wyświetla obok formularza pełny regulamin, historię firmy i aktualności z bloga.',
    fix: [{ label: 'usunięcie zbędnych treści', any: ['usun', 'ukry', 'przenies', 'ogranicz', 'link', 'zwin'] }, { label: 'skupienie na zadaniu', any: ['skup', 'istotn', 'niezbedn', 'najwazniejsz', 'minim', 'rozprasz'] }, { label: 'formularz płatności', any: ['platn', 'formularz'] }],
    model: 'Usunąć z ekranu płatności historię firmy i bloga, a regulamin zastąpić linkiem — ekran ma skupiać uwagę wyłącznie na formularzu płatności.' },
  { id: 'h8c', h: 8, text: 'Karta produktu używa 6 różnych krojów pisma, 9 kolorów i migających animacji przy każdym elemencie.',
    fix: [{ label: 'redukcja', any: ['ogranicz', 'mniej', 'redukc', 'uprosc', 'usun'] }, { label: 'spójna paleta i typografia', any: ['spojn', 'palet', 'typograf', 'kroj', 'font', 'kolor'] }, { label: 'animacje tylko gdy potrzebne', any: ['animac', 'migaj', 'rozprasz', 'ruch'] }],
    model: 'Ograniczyć typografię do 1–2 krojów i spójnej palety kilku kolorów, a migające animacje usunąć lub zostawić tylko tam, gdzie wspierają zadanie.' },

  { id: 'h9a', h: 9, text: 'Po nieudanej płatności pojawia się komunikat: „Błąd 402. Operacja nie powiodła się.”',
    fix: [{ label: 'prosty język zamiast kodu', any: ['jasn', 'zrozumial', 'prost', 'ludzk', 'bez kod', 'jezyk'] }, { label: 'przyczyna błędu', any: ['przyczyn', 'powod', 'dlaczego', 'co sie stalo', 'srodk', 'odrzuc'] }, { label: 'sposób naprawy', any: ['rozwiaz', 'co zrobic', 'sprobuj', 'inna karta', 'inn', 'instrukc', 'krok', 'napraw'] }],
    model: 'Napisać komunikat prostym językiem, który podaje przyczynę (np. karta odrzucona przez bank) i proponuje rozwiązanie: spróbuj ponownie lub wybierz inną metodę płatności.' },
  { id: 'h9b', h: 9, text: 'Formularz rejestracji po błędzie czyści wszystkie pola i wyświetla u góry napis „Niepoprawne dane”.',
    fix: [{ label: 'zachowanie wpisanych danych', any: ['zachow', 'nie czysc', 'pozostaw', 'zapamiet', 'nie kasow'] }, { label: 'komunikat przy konkretnym polu', any: ['pole', 'pola', 'przy', 'wskaz', 'zaznacz', 'podswiet'] }, { label: 'co i jak poprawić', any: ['konkret', 'ktore', 'dlaczego', 'przyczyn', 'jak poprawic', 'wyjasn'] }],
    model: 'Zachować wpisane dane i przy konkretnym polu wskazać, co jest błędne i jak to poprawić (np. „Hasło musi mieć co najmniej 8 znaków”).' },
  { id: 'h9c', h: 9, text: 'Przy zbyt słabym haśle aplikacja wyświetla jedynie czerwoną ramkę wokół pola, bez żadnego tekstu.',
    fix: [{ label: 'komunikat tekstowy', any: ['komunikat', 'tekst', 'opis', 'informac', 'napis'] }, { label: 'wymagania hasła', any: ['wymagan', 'zasad', 'kryteri', 'dlugosc', 'znak', 'cyfr'] }, { label: 'wskaźnik siły hasła na bieżąco', any: ['wskaznik', 'sila', 'sily', 'miernik', 'biezac'] }],
    model: 'Dodać komunikat tekstowy wyjaśniający wymagania hasła (długość, cyfry, znaki) i wskaźnik siły hasła aktualizowany na bieżąco.' },

  { id: 'h10a', h: 10, text: 'Zaawansowany program do analizy danych nie ma żadnej pomocy, a sekcja FAQ zawiera wyłącznie pytania o cennik.',
    fix: [{ label: 'baza wiedzy / dokumentacja', any: ['pomoc', 'dokumentac', 'instrukc', 'przewodnik', 'baza wiedzy', 'faq'] }, { label: 'wyszukiwanie', any: ['wyszuk', 'szuk'] }, { label: 'pomoc kontekstowa / samouczki', any: ['kontekst', 'podpowied', 'tooltip', 'samouczek', 'tutorial', 'onboarding', 'przyklad'] }],
    model: 'Stworzyć przeszukiwalną bazę wiedzy z instrukcjami krok po kroku dla typowych zadań oraz pomoc kontekstową (podpowiedzi, samouczki) przy zaawansowanych funkcjach.' },
  { id: 'h10b', h: 10, text: 'Formularz zeznania podatkowego online używa pojęć „przychód”, „dochód” i „ulga” bez żadnych objaśnień.',
    fix: [{ label: 'objaśnienia / podpowiedzi', any: ['podpowied', 'tooltip', 'ikon', 'objasn', 'wyjasn', 'definic'] }, { label: 'w kontekście pola', any: ['kontekst', 'przy pol', 'obok', 'przy kazd'] }, { label: 'przykłady / link do pomocy', any: ['przyklad', 'link', 'dokumentac', 'pomoc'] }],
    model: 'Przy każdym polu dodać ikonę pomocy z krótkim objaśnieniem pojęcia i przykładem oraz link do szczegółowej dokumentacji.' },
  { id: 'h10c', h: 10, text: 'Pomoc w aplikacji to 120-stronicowy PDF bez spisu treści i bez wyszukiwarki.',
    fix: [{ label: 'wyszukiwarka', any: ['wyszuk', 'szuk'] }, { label: 'struktura, krótkie artykuły', any: ['spis', 'struktur', 'kategori', 'podziel', 'krotk', 'artykul'] }, { label: 'zorientowanie na zadania / kontekst', any: ['zadani', 'krok', 'instrukc', 'faq', 'kontekst'] }],
    model: 'Zamienić PDF na podzieloną na kategorie bazę krótkich artykułów z wyszukiwarką, opisujących konkretne zadania krok po kroku.' },
];

// Pytania z lukami. `accept` — dokładne formy, `stems` — początek dowolnego słowa odpowiedzi.
export const THEORY = {
  empathy: [
    { text: 'Klasyczna mapa empatii dzieli się na cztery ćwiartki: Mówi, Myśli, Robi i ___.', accept: ['czuje', 'odczuwa'], stems: ['czuj', 'uczuc', 'emocj', 'odczuw'], answer: 'Czuje' },
    { text: 'Rozszerzona mapa empatii zawiera dodatkowo sekcje Bóle (pains) i ___ (gains).', stems: ['zysk', 'korzys', 'gain'], answer: 'Zyski' },
    { text: 'Mapę empatii tworzy się na podstawie ___ z użytkownikami, a nie wyobrażeń zespołu.', stems: ['bada', 'wywiad', 'obserwac', 'rozmow', 'danych', 'dane'], answer: 'badań (wywiadów, obserwacji)' },
    { text: 'Jedna mapa empatii opisuje zwykle jedną ___ lub jeden segment użytkowników.', stems: ['person'], answer: 'personę' },
    { text: 'Sekcja „Mówi” powinna zawierać dosłowne ___ z wywiadów.', stems: ['cytat', 'wypowiedz', 'slowa'], answer: 'cytaty' },
    { text: 'Porównanie ćwiartek Mówi i Myśli pozwala wychwycić ___ między deklaracjami a przekonaniami użytkownika.', stems: ['sprzecz', 'rozbiez', 'niespojn', 'konflikt', 'roznic', 'napiec'], answer: 'sprzeczności (rozbieżności)' },
    { text: 'Mapa empatii jest narzędziem pierwszego etapu Design Thinking, który nazywa się ___.', stems: ['empat', 'zrozum', 'empathi'], answer: 'Empatia (Empathize)' },
  ],
  journey: [
    { text: 'Mapa customer journey przedstawia doświadczenie klienta w podziale na kolejne ___.', stems: ['etap', 'faz', 'krok'], answer: 'etapy' },
    { text: 'Miejsce kontaktu klienta z marką (np. e-mail, czat, aplikacja) to punkt ___.', stems: ['styk', 'kontakt', 'touch'], answer: 'styku (touchpoint)' },
    { text: 'Krzywa ___ na mapie customer journey pokazuje, jak zmienia się nastrój klienta na kolejnych etapach.', stems: ['emocj', 'nastroj', 'uczuc'], answer: 'emocji' },
    { text: 'Moment, w którym klient doświadcza problemu lub frustracji, to tzw. pain ___.', accept: ['point', 'pointy', 'points', 'pointem'], answer: 'point' },
    { text: 'Pierwszy etap Digital Customer Journey, w którym klient dowiaduje się o produkcie, to ___.', stems: ['swiadom', 'awareness', 'odkryw', 'uswiadom'], answer: 'Świadomość (Awareness)' },
    { text: 'Na podstawie zidentyfikowanych problemów zespół formułuje ___, czyli możliwości usprawnień.', stems: ['szans', 'okazj', 'opportun', 'mozliwos'], answer: 'szanse (opportunities)' },
    { text: 'Mapa customer journey opisuje doświadczenie konkretnej ___, dlatego jej tworzenie zaczyna się od jej wyboru.', stems: ['person'], answer: 'persony' },
    { text: 'Rozszerzenie mapy customer journey o działania pracowników i procesy zaplecza (Shostack, 1984) to service ___.', stems: ['blueprint'], answer: 'blueprint' },
    { text: 'Lemon i Verhoef (2016) dzielą customer journey na trzy fazy: przed zakupem, zakup i ___ zakupie.', accept: ['po', 'post', 'post-purchase'], stems: ['posprzed', 'pozakup'], answer: 'po (post-purchase)' },
    { text: 'Moment, w którym klient szuka opinii i porównań online przed zakupem, Google nazwał zerowym momentem ___ (ZMOT).', stems: ['prawd', 'truth'], answer: 'prawdy (Zero Moment of Truth)' },
    { text: 'W modelu 5A Kotlera ostatni etap, w którym klient poleca markę innym, to ___.', stems: ['advoca', 'rekomend', 'polec', 'adwok', 'rzecznic'], answer: 'Advocate (rekomendowanie)' },
    { text: 'W modelu McKinsey zadowolony klient przy kolejnym zakupie wchodzi w pętlę ___ i pomija etap porównywania.', stems: ['lojaln', 'loyal'], answer: 'lojalności (loyalty loop)' },
    { text: 'Strategia, w której klient szuka informacji online, a kupuje offline, to ___ (research online, purchase offline).', accept: ['ropo'], answer: 'ROPO' },
    { text: 'Według reguły szczytu i ___ (Kahneman) ocenę doświadczenia najmocniej kształtuje najsilniejszy moment i finał.', stems: ['konc', 'kres', 'end', 'finał', 'final'], answer: 'końca (peak-end rule)' },
  ],
  heuristics: [
    { text: 'Jakob ___ sformułował 10 heurystyk użyteczności (wersja z 1994 r.).', accept: ['nielsen'], answer: 'Nielsen' },
    { text: 'Ocenę heurystyczną przeprowadzają ___, a nie realni użytkownicy.', stems: ['ekspert', 'specjali', 'projektan', 'badacz', 'oceniajac', 'ewaluator'], answer: 'eksperci (ewaluatorzy)' },
    { text: 'Nielsen zaleca, by ocenę heurystyczną przeprowadzało od 3 do ___ niezależnych ewaluatorów.', accept: ['5', 'piec', 'pieciu'], answer: '5' },
    { text: 'Każdemu znalezionemu problemowi przypisuje się stopień ___ w skali od 0 do 4.', stems: ['wag', 'powag', 'istotn', 'krytycz', 'dotkliw', 'severity'], answer: 'ważności (powagi)' },
    { text: 'Przycisk „Cofnij” realizuje heurystykę „Kontrola i ___ użytkownika”.', stems: ['swobod', 'wolnos'], answer: 'swoboda' },
    { text: 'Pasek postępu przy przesyłaniu pliku realizuje heurystykę „Widoczność ___ systemu”.', stems: ['stan', 'status'], answer: 'stanu' },
    { text: 'Autouzupełnianie i lista ostatnio oglądanych wspierają heurystykę „___ zamiast przypominania”.', stems: ['rozpozn'], answer: 'Rozpoznawanie' },
    { text: 'Dialog „Czy na pewno chcesz usunąć?” to przykład realizacji heurystyki „___ błędom”.', stems: ['zapobieg'], answer: 'Zapobieganie' },
  ],
};
