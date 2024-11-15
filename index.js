const fs = require('fs');
const outputPath = process.env.GITHUB_OUTPUT;

function lerArquivoEBuscarInformacoes(caminhoArquivo) {
  // Ler o conteúdo do arquivo
  const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');

  if (caminhoArquivo.endsWith('build.gradle')) {
    // Regex para arquivos Gradle
    const padraoGroup = /group\s*=\s*['"](.+?)['"]/;
    const padraoVersion = /version\s*=\s*['"](.+?)['"]/;

    // Buscar as informações
    const groupId = conteudo.match(padraoGroup)?.[1] || 'Não encontrado';
    const version = conteudo.match(padraoVersion)?.[1] || 'Não encontrado';

    return { groupId, artifactId: 'Não aplicável', version, name: 'Não aplicável' };
  } else if (caminhoArquivo.endsWith('pom.xml')) {
    // Regex para arquivos Maven (pom.xml)
    const padraoGroupId = /<groupId>(.*?)<\/groupId>(?![\s\S]*<\/parent>)/;
    const padraoArtifactId = /<artifactId>(.*?)<\/artifactId>(?![\s\S]*<\/parent>)/;
    const padraoVersion = /<version>(.*?)<\/version>(?![\s\S]*<\/parent>)/;
    const padraoName = /<name>(.*?)<\/name>(?![\s\S]*<\/parent>)/;

    // Buscar as informações
    const groupId = conteudo.match(padraoGroupId)?.[1] || 'Não encontrado';
    const artifactId = conteudo.match(padraoArtifactId)?.[1] || 'Não encontrado';
    const version = conteudo.match(padraoVersion)?.[1] || 'Não encontrado';
    const name = conteudo.match(padraoName)?.[1] || 'Não encontrado';

    return { groupId, artifactId, version, name };
  } else {
    throw new Error('Tipo de arquivo não suportado. Use build.gradle ou pom.xml.');
  }
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
