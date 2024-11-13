const fs = require('fs');
const outputPath = process.env.GITHUB_OUTPUT;

function lerArquivoEBuscarInformacoes(caminhoArquivo) {
  // Ler o conteúdo do arquivo
  const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');

  // Definir os padrões de regex para groupId, artifactId, version e name
  const padraoGroupId = /<groupId>(.*?)<\/groupId>(?![\s\S]*<\/parent>)/;
  const padraoArtifactId = /<artifactId>(.*?)<\/artifactId>(?![\s\S]*<\/parent>)/;
  const padraoVersion = /<version>(.*?)<\/version>(?![\s\S]*<\/parent>)/;
  const padraoName = /<name>(.*?)<\/name>(?![\s\S]*<\/parent>)/;


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
    fs.appendFileSync(outputPath, `groupId=${groupId}\n`);
    fs.appendFileSync(outputPath, `artifactId=${artifactId}\n`);
    fs.appendFileSync(outputPath, `version=${version}\n`);
    fs.appendFileSync(outputPath, `name=${name}\n`);
  } catch (error) {
    console.error(`Erro ao processar o arquivo: ${error.message}`);
    process.exit(1);
  }
}

run();
