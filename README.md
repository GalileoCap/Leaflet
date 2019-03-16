Objetivo: Construir dist/miapp.js con todo, listo para el browser y minificado

Se configura poniendo el name en package.json

Los fuentes se pegan con rollup usando 'npm run build'
	Estan en src/
	Se configura en build/rollup-config.js

Para testear: Esta incluido en spec/index.html como lo carga el browser (sin import ni cosas raras)
	index.html carga otros js con los tests
	Se ejecuta con MOCHA y KARMA
	Podemos usar 'npm run test -- -- --cov' y generar coverage/
