![Roster master](https://github.com/Devolution-Oy/roster/workflows/Roster%20master/badge.svg?branch=master)

# Roster
Roster on Devolution Oy:n kontribuuttoreiden hallinta systeemi

## Roster

### MVP
- Kirjautuminen
- Tietojen hallinta
- Project manager toiminnot
- Jäsenten kysely GraphQL rajapinnasta
- Project manager pystyy hyväksymään laskut

#### MVP Budjetti
7500e
- Projekti infra 2 pv. (CD pipeline, sis. asetukset, sta.analyysi, ) (1500e)
- Kirjautuminen 1 pv. (Firebase) (300e)
- Tietojen hallinta 2pv (Serverless) (2000e)
- GraphQL Rajapinta 2pv (Serverless) (1000e)
- Projekti hallinta 2pv (React Front, serverless) (2500)

#### Ylläpito
< 20e/kk

#### Jäsenen use caset
Roster jäsenenä, voin nähdä oman profiilini
	GIVEN Jäsen on kirjautunut sisään
	THEN Jäsenen profiili on näkyvissä

Roster jäsenenä, voin selata saamiani maksuja
	GIVEn Jäsen on kirjautunut sisään
	WHEN Jäsen valitsee  "Maksut"
	THEN Jäsen näkee listauksen suoritetuista tehtävistä ja niiden maksuista

Roster jäsenenä, voin nähdä tili historiani
	GIVEN Jäsen on kirjautuneena sisään
	WHEN Jäsen valitsee, "Loki"
	THEN Jäsen näkee kaikki tilin toiminnot

Roster jäsenenä, voin pyytää tilityksen
	GIVEN Jäsen on kirjautuneena sisään
	WHEN Jäsen valitsee, "kotiuta"
	THEN Maksu toimeksianto kirjautuu

Roster jäsenenä, voin mukata profiiliani
	GIVEN Jäsen on kirjatunut sisään
	WHEN Jäsen valitsee, "Muokkaa profiilia"
	THEN Jäsen pystyy muokkaamaan tietojaan

#### Project masterin, use caset
Project masterina, voin lisätä jäseniä projektiini
	GIVEN Project master on kirjutunut sisään
	WHEN Project master valitsee projektin
	THEN Project master voi vetää jäseniä projekti rosteriin

## Roster APP (ei MVP)
Android/iPhone app, jolla käyttäjät voivat tarkastella omia tietojaan sekä Devolution Oy:n KPI:t
