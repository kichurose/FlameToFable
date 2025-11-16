ng add angular-cli-ghpages

ng build --configuration production --output-path=dist/flametofable --base-href=/FlameToFable/
npm i -g angular-cli-ghpages
ng build --configuration production
ng deploy --base-href=https://kichurose.github.io/FlameToFable/

npx angular-cli-ghpages --dir=dist/flametofable/browser
