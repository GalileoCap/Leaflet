// Config file for running Rollup in "normal" mode (non-watch)

const NombreModulo= 'MiApp'; //U: Lo qe define UMD como modulo

import rollupGitVersion from 'rollup-plugin-git-version'
import json from 'rollup-plugin-json'
import gitRev from 'git-rev-sync'
import pkg from '../package.json'

let {version} = pkg;
let release;

// Skip the git branch+rev in the banner when doing a release build
if (process.env.NODE_ENV === 'release') {
	release = true;
} else {
	release = false;
	const branch = gitRev.branch();
	const rev = gitRev.short();
	version += '+' + branch + '.' + rev;
}

const banner = `/* @preserve
 / Esto aparece al principio de todos los archivos en dist/
 / Se configura en build/rollup-config.js
 */
`;

const outro = `/* 
	/ Esto aparece al final de todos los archivos en dist/
	/ Se configura en build/rollup-config.js
	/ Puede ser un buen lugar para definir cosas publicas con
	/ window.MINOMBRE = exports;
	*/`;

console.log("ACA PKG MAIN", pkg.main);

export default {
	input: 'src/'+NombreModulo+'.js',
	output: [
		{
			file: pkg.main,
			format: 'umd',
			name: NombreModulo,
			banner: banner,
			outro: outro,
			sourcemap: true
		},
		{
			file: 'dist/'+NombreModulo.toLowerCase()+'-src.esm.js',
			format: 'es',
			banner: banner,
			sourcemap: true
		}
	],
	legacy: true, // Needed to create files loadable by IE8
	plugins: [
		release ? json() : rollupGitVersion()
	]
};
