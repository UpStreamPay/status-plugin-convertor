# StatusConvertor

Programme permettant de convertir un tableau de statuts en JSON.

## Installation

Clone le projet et ensuite mets-toi à la racine:

```bash
npm install
```

Mets le fichier mapping.xlsx dans le dossier assets.

## Format du tableau

Lien vers fichier type à ajouter

## Usage

Sans argument supplémentaire, l'exécution se fait sur le premier onglet

```console
node index.js
```

Si tu mets 2 en argument, l'exécution se fera sur l'onglet 3

```console
node index.js 2
```

Pour formater le fichier output/status.json, tu peux utiliser la commande suivante:

```console
npm run format
```