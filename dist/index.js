/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const fs = __nccwpck_require__(147);

function lerArquivoEBuscarInformacoes(caminhoArquivo) {
  // Ler o conteúdo do arquivo
  const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');

  // Definir os padrões de regex para groupId, artifactId, version e name
  const padraoGroupId = /<groupId>(.*?)<\/groupId>/;
  const padraoArtifactId = /<artifactId>(.*?)<\/artifactId>/;
  const padraoVersion = /<version>(.*?)<\/version>/;
  const padraoName = /<name>(.*?)<\/name>/;

  // Encontrar a primeira ocorrência dos padrões
  const groupId = conteudo.match(padraoGroupId)?.[1] || '';
  const artifactId = conteudo.match(padraoArtifactId)?.[1] || '';
  const version = conteudo.match(padraoVersion)?.[1] || '';
  const name = conteudo.match(padraoName)?.[1] || '';

  return { groupId, artifactId, version, name };
}

// Função principal da action
function run() {
  try {
    const caminhoArquivo = process.env.INPUT_PATH || 'pom.xml';
    const { groupId, artifactId, version, name } = lerArquivoEBuscarInformacoes(caminhoArquivo);

    // Exibir as informações encontradas no log
    console.log(`groupId: ${groupId}`);
    console.log(`artifactId: ${artifactId}`);
    console.log(`version: ${version}`);
    console.log(`name: ${name}\n`);

    // Configurar outputs
    console.log(`::set-output name=groupId::${groupId}`);
    console.log(`::set-output name=artifactId::${artifactId}`);
    console.log(`::set-output name=version::${version}`);
    console.log(`::set-output name=name::${name}`);
  } catch (error) {
    console.error(`Erro ao processar o arquivo: ${error.message}`);
    process.exit(1);
  }
}

run();

})();

module.exports = __webpack_exports__;
/******/ })()
;