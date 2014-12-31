Copa Minerva - API
=============

## Entidades

+ Times
+ Campeonatos
+ Partidas
+ Notícias (?)
+ Guias (?)
+ Projetos da Comunidade (?)


## Times

### O que quero saber?

+ Nome
+ Sigla
+ Membros
+ Capitão
+ Estatísticas
    - Número de partidas vencidas/perdidas
    - Uso de heróis (?)
+ Partidas
    - Link para últimas partidas
    
### Modelo

```javascript
{
    nome: String,
    sigla: String,
    capitao: String,
    membros: [String],
    hifenizado: String // para ter urls bonitinhas
}
```

### Endpoints

#### `GET /times`
__Descrição:__ Visualizar todos os times cadastrados.

Exemplo de resposta:

```javascript
	// nada ainda
```

#### `GET /times/:hifenizado`
__Descrição:__ Visualizar um time específico. O parâmetro _hifenizado_ refere-se ao nome do time em formato hifenizado (trocando os espaços em branco por hífens).
__Observação:__ O parâmetro _hifenizado_ é case-insensitive.

Exemplo de resposta:

```javascript
	// nada ainda
```
    
    
## Campeonatos

### O que quero saber?

+ Número da edição
+ Times participantes
+ Campeão
+ Vice-campeão
+ Casters
+ Data de início
+ Data de término
+ Lista de partidas
+ Um campeonato pode ter mais de uma fase, incluindo fase de grupos

### Modelo

```javascript
{
    id: number,
    nome: string,
    edicao: number,
    campeao: nome-campeao-hifenizado,
    vice-campeao: nome-vice-hifenizado,
    casters: string[],
    inicio: string,
    fim: string,
    times-inscritos: Time[],
    fase: Fase[]
}
```

### Endpoints

#### Listar todas as edições: `GET /campeonatos`
Retorna um JSON com uma lista contendo todas as edições da Copa Minerva
    
#### Visualizar uma edição: `GET /campeonatos/:id`
Parâmetro `id` deve ser um inteiro.

Retorna um JSON contendo uma edição da Copa Minerva
    

## Fases

### O que quero saber?

+ Campeonato
+ Edição
+ Tipo de fase (grupos ou playoffs)
+ Grupos (se aplicável)
+ Partidas

### Modelo

```javascript
Fase: {
    id: number,
    campeonato: string,
    edicao: number,
    nome: string,
    tipo: string,
    concluida: boolean,
    grupos: Grupo[],
    partidas: Partida[]
}

Grupo: {
    nome: string,
    quantos_times_passam: number,
    times: Time[]
}
```

### Endpoints

#### Criar uma nova fase: `POST /campeonatos/:id_campeonato/fase/nova`
WARNING: Requer autenticação.

Cria uma fase nova no campeonato `id_campeonato`.

Obs.: Para descobrir o id do campeonato, é possível fazer primeiro um GET em `/campeonatos`

Parâmetros esperados:

```javascript
{
    nome: string,
    tipo: string ('GRUPOS' ou 'PLAYOFFS')
}
```

O retorno é um objeto com apenas um campo _booleano_, que diz se a fase foi criada com sucesso ou não.

```javascript
{
    result: boolean
}
```

#### Concluir uma fase: `GET /fase/:id_fase/concluir`
WARNING: Requer autenticação.

Conclui a fase definida por `id_fase`. Não é estritamente necessário concluir uma fase, mas pode ser útil no futuro.

## Partidas

### O que quero saber?

+ Times que participaram
+ Válida por qual edição da copa
+ Time que venceu
+ Picks
+ Bans
+ Data
+ MatchID (?)
+ Casters
+ VOD
+ Formato
+ Fase do campeonato

### Modelo

```javascript
{
    matchID: number,
    campeonato: string,
    edicao: number,
    fase: number,
    formato: string,
    radiant: {
        time: Time,
        picks: string[],
        bans: string[]
    },
    dire: {
        time: Time,
        picks: string[],
        bans: string[]
    },
    vencedor: Time,
    data: string,
    casters: string[],
    vods: string[]
}
```

### Endpoints

#### Listar todas as partidas: `GET /partidas`
Retorna um JSON com a lista de todas as partidas cadastradas
    
#### Listar as partidas em um intervalo de datas (DD/MM/YYYY): `GET? /partidas/???`
Retorna um JSON com a lista de todas as partidas que ocorreram no intervalo dado

#### Listar as partidas futuras: `GET /partidas/futuras`
Retorna um JSON com a lista das partidas cadastradas que ainda irão ocorrer
    
#### Listar todas as partidas de um campeonato: `GET /partidas/campeonato/:id_campeonato`
Retorna um JSON com a lista das partidas do campeonato pedido.

Parâmetro `id_campeonato` deve ser inteiro.

#### Listar todas as partidas de uma fase de um campeonato: `GET /partidas/fase/:id_fase`
Retorna um JSON com todas as partidas da fase solicitada.

Parâmetro `id_fase` deve ser inteiro.
    
#### Listar todas as partidas de um time: `GET /partidas/time/:id_time`
Parâmetro `id_time` deve ser um inteiro.

Retorna um JSON com a lista das partidas do time pedido
    
#### Visualizar uma partida: `GET /partidas/:matchID`
Retorna um JSON com a partida solicitada
    
#### Adicionar uma partida: `POST /partidas/nova`
WARNING: Precisa de autenticação

Parâmetros do POST (a ordem dos atributos não é importante):

```javascript
{
    data: string,
    casters: string[],
    vods: string[],
    matchID: number,
    campeonato: string,
    edicao: number,
    fase: number,
    formato: string,
    radiant: Time,
    dire: Time
}
```

WARNING: Se a partida já foi realizada, é **obrigatório** o matchID preenchido no requisito

Retorna um JSON com o status da criação (`true` se for criada com sucesso, `false` de modo contrário)

```javascript
{
    result: boolean
}
```