ng add angular-cli-ghpages

Base Href should be left empty in case of using custom domain
ng build --configuration production --output-path=dist/flametofable --base-href=/FlameToFable/

npx angular-cli-ghpages --dir=dist/flametofable/browser
After the above command, re-add the custom domain to the project