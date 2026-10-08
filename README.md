# Zeszyt ćwiczeń UX

Przeglądarkowy zeszyt ćwiczeń dla studentów uczących się UX. Aplikacja losuje zadania z trzech obszarów:

- **Mapa empatii**: przyporządkowanie notatek z badań do ćwiartek (także wersja rozszerzona z bólami i zyskami), rozpoznawanie ćwiartek, przejście od mapy do pytania „Jak moglibyśmy…?”.
- **Digital Customer Journey**: układanie kroków ścieżki w kolejności, przypisywanie działań do etapów, warstwy mapy customer journey (działanie, punkt styku, emocja, pain point, szansa), typy punktów styku według Lemon i Verhoef, dopasowywanie pojęć z teorii (5A, ZMOT, pętla lojalności, reguła szczytu i końca, service blueprint), znajdowanie pain pointów i proponowanie usprawnień. Zadania mają ramkę „Podstawa teoretyczna” ze źródłami, a ściąga na stronie startowej zawiera przegląd teorii.
- **Heurystyki Nielsena**: dopasowanie problemów do heurystyk, diagnoza naruszonej heurystyki, nazwy heurystyk, rekomendacje poprawek.

Rodzaje zadań:

| Rodzaj | Jak się rozwiązuje | Jak jest oceniane |
| --- | --- | --- |
| Przeciągnij i upuść | przeciąganie myszką albo kliknięcie elementu, a potem pola (działa na telefonie i z klawiatury) | odsetek poprawnie umieszczonych elementów |
| Uzupełnij | listy wyboru i luki w tekście | dokładna odpowiedź; w lukach tolerowane są literówki i odmiana |
| Wyjaśnij | odpowiedź opisowa | wyszukiwanie kluczowych pojęć, ocena częściowa, odpowiedź wzorcowa do porównania |

Na koniec sesji pokazywany jest wynik procentowy, ocena w skali 2–5 i wynik dla każdego tematu. Ostatnie wyniki zapisują się lokalnie w przeglądarce.

## Uruchomienie lokalne

Potrzebny jest Node.js 18+. Projekt nie ma zależności.

```bash
npm start        # http://localhost:3000
npm test         # testy silnika zadań
```

## Wdrożenie na Railway

1. W Railway wybierz **New Project → Deploy from GitHub repo** i wskaż to repozytorium (gałąź z aplikacją).
2. Railway sam rozpozna projekt Node (`package.json`) i uruchomi `npm start`; port bierze ze zmiennej `PORT`.
3. W ustawieniach serwisu: **Settings → Networking → Generate Domain**, żeby dostać publiczny link.

`railway.json` ustawia komendę startową i healthcheck (`/health`).

## Struktura

```
server.js            serwer statyczny bez zależności
public/index.html    strona aplikacji
public/styles.css    style
public/js/data.js    bank treści: persony, ścieżki DCJ, teoria, scenariusze, pytania
public/js/engine.js  losowanie zadań i ocenianie
public/js/app.js     interfejs
test/                testy (node --test)
```

Nowe treści dodaje się w `public/js/data.js`. Testy sprawdzają, czy odpowiedź wzorcowa każdego wylosowanego zadania dostaje 100%. Dzięki temu po dodaniu nowego scenariusza od razu widać, czy słowa kluczowe pasują do odpowiedzi wzorcowej.

Plik `index.html` w katalogu głównym to wcześniejsze, osobne narzędzie („UX Analysis Agent”). Serwer go nie udostępnia.
