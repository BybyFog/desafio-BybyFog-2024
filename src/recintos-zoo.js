import { Recinto } from "./recinto";
import { Animal } from "./animal";


// O programa deve receber tipo e quantidade de animal (nessa ordem)
class RecintosZoo {


    analisaRecintos(animal, quantidade) {

        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida' }
        }

        const recintosExistentes = [
            new Recinto(1, 'savana', 10, 3, 'MACACO'),
            new Recinto(2, 'floresta', 5, 0, ''), /**o vazio esta sem animal */
            new Recinto(3, 'savana e rio', 7, 1, 'GAZELA'),
            new Recinto(4, 'rio', 8, 0, ''),
            new Recinto(5, 'savana', 9, 1, 'LEAO'),
        ];

        // O tipo de animal precisa ser checado contra uma lista de animais válidos (ou um banco de dados). 
        const animais = [

            new Animal('LEAO', 3, 'savana', 'CARNIVORO'),
            new Animal('LEOPARDO', 2, 'savana', 'CARNIVORO'),
            new Animal('CROCODILO', 3, 'rio', 'CARNIVORO'),
            new Animal('MACACO', 1, 'savana ou floresta', 'ONIVORO'),
            new Animal('GAZELA', 2, 'savana', 'HERBIVORO'),
            new Animal('HIPOPOTAMO', 4, 'savana ou rio', 'HERBIVORO'),

        ];


        let animalEncontrado = this.verificaAnimalNaLista(animal, animais);

        if (animalEncontrado.erro != undefined) {
            return animalEncontrado;
        }
        return this.verificaRecintoDisponivel(recintosExistentes, animalEncontrado, animais, quantidade);
    }

    verificaAnimalNaLista(animal, animais) {

        let boll = false;
        let animalEncontrado;

        for (let obj of animais) {

            if (animal == obj.especie) {
                boll = true;
                animalEncontrado = obj;
                break;
            }
        }

        if (boll == false) {
            return { erro: "Animal inválido" };
        }

        return animalEncontrado;
    }


    verificaRecintoDisponivel(recintosExistentes, animalEncontrado, animais, quantidade) {

        let biomasCompativeis = []; /**lista para os animais que tiverem biomas compativeis */

        for (let obj of recintosExistentes) {   /**laço vai percorrer a lista */

            if (animalEncontrado.bioma.includes(obj.bioma)) {   //verifica se o animal pertence ao seu bioma especifico/
                if (animalEncontrado.tipoDeAlimento == 'CARNIVORO' && animalEncontrado.especie == obj.animaisExistentes) {
                    biomasCompativeis.push(obj);
                }

                if(animalEncontrado.tipoDeAlimento != 'CARNIVORO' ){                    
                    biomasCompativeis.push(obj);
                }
            }
        }

        if (biomasCompativeis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        let recintosViaveis = [];
        for (let obj of biomasCompativeis) {  /**for of para inteirar sobre o obj do array não o oposto */

            let result;
            for (let objAnimal of animais) {

                if (obj.animaisExistentes == objAnimal.especie) {
                    result = objAnimal.tamanho * obj.quantidadeAnimal;
                    break;
                }
            }


            let valortotal = obj.tamanhoTotal - (animalEncontrado.tamanho * quantidade) - result;

            if (valortotal >= 0) {
                recintosViaveis.push(`Recinto ${obj.numero} (espaço livre: ${valortotal} total: ${obj.tamanhoTotal})`)
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }
        else {
            return { recintosViaveis };
        }

    }

}




export { RecintosZoo as RecintosZoo };


// 
// A quantidade deve ser validada para garantir que seja um número positivo e adequado. 
// Se não for, deve ser exibida a mensagem de erro correspondente ("Quantidade inválida").  


/** entradas e saidas */
// O programa deve receber tipo e quantidade de animal (nessa ordem)
// O programa deve receber tipo e quantidade de animal (nessa ordem)
// O programa deve retornar uma estrutura contendo a lista de todos os recintos viáveis ordenada pelo número do recinto (caso existam) e a mensagem de erro (caso exista)
// A lista de recintos viáveis deve indicar o espaço livre que restaria após a inclusão do(s) animal(is) e o espaço total, no formato "Recinto nro (espaço livre: valorlivre total: valortotal)"
// Caso animal informado seja inválido, apresentar erro "Animal inválido"
// Caso quantidade informada seja inválida, apresentar erro "Quantidade inválida"
// Caso não haja recinto possível, apresentar erro "Não há recinto viável"
