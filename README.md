<style>
titleStyle { color: rgb(62, 255, 213) }
subtitleStyle { color: rgb(11, 204, 162) }
subtext { color: rgb(204, 207, 207) }
graytext { color: rgb(141, 141, 141) }

mark {
    background-color :rgb(62, 255, 213);
}
</style>

# <mark>Pocket Scavengers</mark>
#### <subtext> Pocket Scavengers est un jeu ou le but est de récolter des ressources virtuelles tout en explorant Genève.</subtext>
- **Auteur :** santiago.sprg
- **Cours :** Atelier mobile
- **Professeur :** Mr François
- **Date et version :** dd.mm.aaaa, v1.0.0 

## <titleStyle>**Configuration**</titleStyle>

- <subtitleStyle>**Importer la base de données "PocketScavengers" dans mariadb**</subtitleStyle><br>
    **Chemin du fichier :**<graytext> _PocketScavengers/database.sql_</graytext>
- <subtitleStyle>**Créer un utilisateur mariadb pour PocketScavengers**</subtitleStyle>
    - **Nom d'utilisateur :** pocketScavengers_user
    - **Mot de passe :** Super
    - **Hôte :** %
    - **Droits d'accès :** `GRANT SELECT, INSERT, UPDATE, DELETE ON 'PocketScavengers'.* TO 'pocketScavengers_user'@'%';`
- <subtitleStyle>**Une fois l'application démarrée, créer un compte PocketScavengers**</subtitleStyle><br>
- <subtitleStyle>**Accepter que l'application accède aux données de géolocalisation de l'appareil**</subtitleStyle><br>



## <titleStyle>**Liste des points d'intérêts**</titleStyle>
- ### <subtitleStyle>Musée d'art et d'histoire</subtitleStyle>
  #### <subtext>_name_:</subtext> **poi_history-and-art-museum** <subtext> | _lat, long_:</subtext> **46.1993399999998, 6.151609449799484**</subtext>

- ### <subtitleStyle>Rond-point de Rive</subtitleStyle>
  #### <subtext>_name_:</subtext> **poi_rive-rondabout** <subtext> | _lat, long_:</subtext> **46.1201619999999714, 6.153409449799496**</subtext>

- ### <subtitleStyle>Jet d'eau</subtitleStyle>
  #### <subtext>_name_:</subtext> **poi_water-jet** <subtext> | _lat, long_:</subtext> **46.207419999999495, 6.156029449799513**</subtext>

- ### <subtitleStyle>Mur des réformateurs</subtitleStyle>
  #### <subtext>_name_:</subtext> **poi_reformers-wall** <subtext> | _lat, long_:</subtext> **46.2002435, 6.1459101**</subtext>

- ### <subtitleStyle>Cathédrale Saint-Pierre</subtitleStyle>
  #### <subtext>_name_:</subtext> **poi_saint-pierre-cathedral**<subtext> | _lat, long_:</subtext> **46.2010851, 6.1487432**

- ### <subtitleStyle>Bâtiment des forces motrices</subtitleStyle>
  #### <subtext>_name_:</subtext> **poi_motive-power-building**<subtext> | _lat, long_:</subtext> **46.204602, 6.1365861**

- ### <subtitleStyle>Usine (boîte de nuit)</subtitleStyle>
  #### <subtext>_name_:</subtext> **poi_usine-nightclub**<subtext> | _lat, long_:</subtext> **46.204015, 6.136018**

- ### <subtitleStyle>Pointe de la jonction</subtitleStyle>
  #### <subtext>_name_:</subtext> **poi_jonction-riverfront**<subtext> | _lat, long_:</subtext> **46.2014954, 6.1232619**

- ### <subtitleStyle>Centre commercial de balexert</subtitleStyle>
  #### <subtext>_name_:</subtext> **poi_balexert-mall**<subtext> | _lat, long_:</subtext> **46.2188511, 6.1132958**

- ### <subtitleStyle>Aéroport de Genève</subtitleStyle>
  #### <subtext>_name_:</subtext> **poi_airport**<subtext> | _lat, long_:</subtext> **46.2304327, 6.1088849**

- ### <subtitleStyle>Gare Cornavin</subtitleStyle>
  #### <subtext>_name_:</subtext> **poi_motive-power-building**<subtext> | _lat, long_:</subtext> **46.204602, 6.1365861**

- ### <subtitleStyle>TITRE</subtitleStyle>
  #### <subtext>_name_:</subtext> **poi_**<subtext> | _lat, long_:</subtext> **, **

## <titleStyle>**Annexes**</titleStyle>
<mark>**Access token pour mapbox**</mark><br>
<graytext>_pk.eyJ1IjoiYW1hcnVkZXYiLCJhIjoiY201djB3NDU4MDJ1bDJpczZ5YjhvNGo1NiJ9.FSN_HpllufFUxEbTGbQpMA_</graytext>

<mark>**Lien du style de la mapbox**</mark><br>
<graytext>mapbox://styles/amarudev/cm5v18a2l00ov01pldzcw5nr4</graytext>