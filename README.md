# Roster
Roster on tuottajien hallinta systeemi. Systeemi tarjoaa GraphQL rajapinnan, josta eri tyˆkalut voivat kysell‰ tuottaja tietoja

## Roster APP
React Native app, jolla n‰kee omatß
## J‰senen use caset
Roster j‰senen‰, voin n‰hd‰ oman profiilini
	GIVEN J‰sen on kirjautunut sis‰‰n
	THEN J‰senen profiili on n‰kyviss‰

Roster j‰senen‰, voin selata saamiani maksuja
	GIVEn J‰sen on kirjautunut sis‰‰n
	WHEN J‰sen valitsee  "Maksut"
	THEN J‰sen n‰kee listauksen suoritetuista teht‰vist‰ ja niiden maksuista

Roster j‰senen‰, voin n‰hd‰ tili historiani
	GIVEN J‰sen on kirjautuneena sis‰‰n
	WHEN J‰sen valitsee, "Loki"
	THEN J‰sen n‰kee kaikki tilin toiminnot

Roster j‰senen‰, voin pyyt‰‰ tilityksen
	GIVEN J‰sen on kirjautuneena sis‰‰n
	WHEN J‰sen valitsee, "kotiuta"
	THEN Maksu toimeksianto kirjautuu

Roster j‰senen‰, voin mukata profiiliani
	GIVEN J‰sen on kirjatunut sis‰‰n
	WHEN J‰sen valitsee, "Muokkaa profiilia"
	THEN J‰sen pystyy muokkaamaan tietojaan

## Project masterin, use caset
Project masterina, voin lis‰t‰ j‰seni‰ projektiini
	GIVEN Project master on kirjutunut sis‰‰n
	WHEN Project master valitsee projektin
	THEN Project master voi vet‰‰ j‰seni‰ projekti rosteriin

## GraphQL Rajapinta toiminnot
Projektin j‰senet

## MVP
- Kirjautuminen
- Tietojen hallinta
- Project manager toiminnot
- J‰senten kysely GraphQL rajapinnasta
- Project manager pystyy hyv‰ksym‰‰n laskut

### MVP Budjetti
7500e
- Projekti infra 2 pv. (CD pipeline, sis. asetukset, sta.analyysi, ) (1500e)
- Kirjautuminen 1 pv. (Firebase) (300e)
- Tietojen hallinta 2pv (Serverless) (2000e)
- GraphQL Rajapinta 2pv (Serverless) (1000e)
- Projekti hallinta 2pv (React Front, serverless) (2500)

### Yll‰pito
< 20e/kk
