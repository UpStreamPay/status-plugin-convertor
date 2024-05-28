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

Sans argument supplémentaire, l'exécution se fait sur le premier onglet du fichier nommé mapping.xlsx dans le dossier assets :

```console
node index.js
```

Pour exécuter sur un fichier spécificique et sur un onglet spécifique, tu peux ajouter deux arguments supplémentaires :

```console
node index.js tab=2 path="./chemin/du/fichier.xlsx"
```