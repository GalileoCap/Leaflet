Objetivo: Construir dist/miapp.js con todo, listo para el browser y minificado

Se configura poniendo el name en package.json

Los fuentes se pegan con rollup usando 'npm run build'
	Estan en src/
	Se configura en build/rollup-config.js

Para testear: Esta incluido en spec/index.html como lo carga el browser (sin import ni cosas raras)
	index.html carga otros js con los tests
	Se ejecuta con MOCHA y KARMA
	Podemos usar 'npm run test -- -- --cov' y generar coverage/
	
	Si hay problemas con KARMA:
		npx karma --log-level debug --singleRun true --no-browsers --port 8080 start ./spec/karma.conf.js
	(conectarse con el browser http://127.0.0.1:8080/ o http://127.0.0.1:18080/ si estas desde Vagrant)

	Genera reportes en coverage/
