const core = require('@actions/core');
const fs = require('fs');

async function lerArquivoEBuscarInformacoes(caminhoArquivo) {
    try {
        // Leitura do conteúdo do arquivo
        const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');

        // Definindo os padrões regex para groupId, artifactId, version e name
        const padraoGroupId = /<groupId>(.*?)<\/groupId>/g;
        const padraoArtifactId = /<artifactId>(.*?)<\/artifactId>/g;
        const padraoVersion = /<version>(.*?)<\/version>/g;
        const padraoName = /<name>(.*?)<\/name>/g;

        // Encontrar todas as ocorrências dos padrões
        const groupIds = [...conteudo.matchAll(padraoGroupId)].map(match => match[1]);
        const artifactIds = [...conteudo.matchAll(padraoArtifactId)].map(match => match[1]);
        const versions = [...conteudo.matchAll(padraoVersion)].map(match => match[1]);
        const names = [...conteudo.matchAll(padraoName)].map(match => match[1]);

        // Organizar as informações encontradas e setar os outputs
        const informacoes = groupIds.map((groupId, index) => ({
            groupId,
            artifactId: artifactIds[index],
            version: versions[index],
            name: names[index]
        }));

        // Usar apenas o primeiro conjunto de informações para o output
        if (informacoes.length > 0) {
            const info = informacoes[0];
            core.setOutput('groupId', info.groupId);
            core.setOutput('artifactId', info.artifactId);
            core.setOutput('version', info.version);
            core.setOutput('name', info.name);
        } else {
            core.warning('Nenhuma informação encontrada no arquivo pom.xml');
        }
    } catch (error) {
        core.setFailed(`Erro ao processar o arquivo: ${error.message}`);
    }
}

// Executar a função principal
const caminhoArquivo = core.getInput('filePath');
lerArquivoEBuscarInformacoes(caminhoArquivo);
