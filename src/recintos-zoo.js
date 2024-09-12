class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        // Dados dos recintos e animais permitidos
        const recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animasExist: { macaco: 3 } },
            { numero: 2, bioma: 'floresta', tamanho: 5, animasExist: {} },
            { numero: 3, bioma: 'savanaRio', tamanho: 7, animasExist: { gazela: 1 } },
            { numero: 4, bioma: 'rio', tamanho: 8, animasExist: {} },
            { numero: 5, bioma: 'savana', tamanho: 9, animasExist: { leao: 1 } }
        ];

        const animaisPermitidos = [
            { animal: 'leao', tamanho: 3, bioma: 'savana', carnivoro: true },
            { animal: 'leopardo', tamanho: 2, bioma: 'savana', carnivoro: true },
            { animal: 'crocodilo', tamanho: 3, bioma: 'rio', carnivoro: true },
            { animal: 'macaco', tamanho: 1, bioma1: 'savana', bioma2: 'floresta', carnivoro: false },
            { animal: 'gazela', tamanho: 2, bioma: 'savana', carnivoro: false },
            { animal: 'hipopotamo', tamanho: 4, bioma1: 'savana', bioma2: 'rio', carnivoro: false }
        ];

        // Verifica se o animal é permitido
        const animalPermitido = animaisPermitidos.find(a => a.animal === animal.toLowerCase());
        if (!animalPermitido) return { erro: "Animal inválido" };
        if (quantidade <= 0) return { erro: "Quantidade inválida" };

        const recintosViaveis = recintos.filter(recinto => {
            const biomasPermitidos = [animalPermitido.bioma, animalPermitido.bioma1, animalPermitido.bioma2];
            if (!biomasPermitidos.includes(recinto.bioma)) return false;

            const totalEspacoNecessario = quantidade * animalPermitido.tamanho;
            const espacoOcupado = Object.keys(recinto.animasExist).reduce((acc, key) => {
                const animalExistente = animaisPermitidos.find(a => a.animal === key);
                return acc + (recinto.animasExist[key] * animalExistente.tamanho);
            }, 0);

            const espacoDisponivel = recinto.tamanho - espacoOcupado;

            if (animalPermitido.carnivoro && Object.keys(recinto.animasExist).some(species => species !== animal.toLowerCase())) {
                return false;
            }

            if (animal === 'macaco' && (Object.keys(recinto.animasExist).length === 0 || (Object.keys(recinto.animasExist).length === 1 && recinto.animasExist['macaco'] > 0))) {
                return false;
            }

            if (animal === 'hipopotamo' && !['savana', 'rio'].includes(recinto.bioma)) {
                return false;
            }

            return espacoDisponivel >= totalEspacoNecessario;
        }).map(recinto => `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanho - (recinto.tamanho - espacoOcupado)} total: ${recinto.tamanho})`);

        if (recintosViaveis.length === 0) return { erro: "Não há recinto viável" };
        return { recintosViaveis };
    }
}

export { RecintosZoo };

