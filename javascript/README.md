## Curso JavaScript avançado I, II e III   : ES6, orientação a objetos e padrões de projetos


### 01.01 - Prólogo: regras, código e manutenção
   - Simples criação de um arquivo js ( [index.js](https://github.com/angelozero/yoda-js/blob/master/javascript/sistema-cadastro/client/js/index.js) ) para manipulação dos dados na tela, manipulação do DOM.


---

### 01.02 - Especificando uma Negociação

**Diferença entre um método e uma função**
  - Quando criamos uma função dentro de uma classe, nós chamaremos a primeira de **método**. Quando a função estiver fora da classe, continuará sendo chamada de **função**.

**O que significa o " _ " (*underline*) em javascript**
  - É uma convenção aonde os atributos das propriedades de uma classe com o " _ " não podem ser modificados.

**Restringindo o acesso direto as propriedades da classe Negociação**
  - Observe que há uma alteração na classe Negociação, o método ```getVolume()``` já não existe mais. Em seu lugar declaramos o método ``` get volume()```. A diferença agora é que, para acessar a informação de volume não precisamos mais chamar o método getVolume e sim, teoricamente, acessar diretamente o atributo da classe "volume", ```n1.volume```. Na declaração parece que estamos acessando o valor direto do atributo, mas na verdade estamos acessando o método get do atributo.

**Congelando um objeto**
  - Na classe Negociação usamos no final do construtor dela a chamada ```Object.freeze(this);``` . Isso faz com que cada instância dessa classe fique congelada após sua criação, ou seja, não podendo ser modificada.
  - O que significa o ```this``` ? O *this* é uma variável implícita. Neste cenário o this do Object.freeze() será o n1 ( a instância criada na construção da classe) vinda do index.html. Mas a opção *.freeze* faz apenas para a camada mais rasa da sua classe. Como Data é um objeto, esta propriedade não acaba sendo afetada. Para se proteger melhor podemos fazer as seguintes alterações:

  ```java
  this._data = new Date(data.getTime());

  ...

   getData(){
        return new Date (this._data.getTime());
    }

  ```

**Diferença entre declaração *let* e *var***
 - Se executarmos a função a seguir, a exibição será do número 1 ao 100.

  ```java
  <script>
    for(var i = 1; i<= 100; i++) {
      console.log(i);
    }
  <script>
  ```

 - E se continuarmos dentro do bloco ``` <script> ``` declarando no alert o valor de "i", vamos ter como resposta na tela o valor 101.

```java
  <script>

      for(var i = 1; i<= 100; i++) {
          console.log(i);
      }

      alert(i);
  </script>
```
- Quando se trabalha com linguagens como Java, C# e outras, as declaração de variáveis possuem **escopo de bloco**. Na prática, ao utilizarmos estas outras linguagens, jamais poderíamos acessar a variável "i", como fizemos com o alert. Se adicionássemos uma variável chamada nome e depois, acrescentássemos um novo alert, o nome também seria exibido:

```java
<script>

    for(var i = 1; i<= 100; 1++) {
        var nome = 'Angelo';
        console.log(i);
    }

    alert(i);
    alert(nome);
</script>
```

 - Em JavaScript não existe escopo de bloco, então o fato de declararmos uma variável dentro de um bloco não garantirá que temos um escopo. No entanto, se declaramos as variáveis usando o **let**, estas ganharam um **escopo de bloco**. O próximo código não consegue exibir a variável "i" e nem a variável "nome".

```java
 <script>

    for(let i = 1; i<= 100; 1++) {
         let nome = 'Angelo';
         console.log(i);
    }

    alert(i);
    alert(nome);
</script>
```
- Finalizando:
  - VAR: Declarações com var possuem escopo de função ou global. 
  - LET: Variáveis declaradas com let tem escopo de bloco e o JavaScript lançará um erro se a mesma for declarada mais de uma vez.

---


### 01.03 - A ligação entre as ações do usuário e o modelo

**O que é o evento *event.preventDefault()***
  -  Quando submetemos o formulário, se não cancelamos o comportamento padrão do mesmo, ele será recarregado. Com o event.preventDefault(), a controller cancelará a submissão do formulário para poder capturar os dados da negociação.

**Usando *bind***
  - O querySelector é uma função que pertence ao objeto document - chamaremos tal função de método. Internamente, o querySelector tem uma chamada para o this, que é o contexto pelo qual o método é chamado. Logo, o this é o document. No entanto, quando colocamos o querySelector dentro do $, ele passa a ser executado fora do contexto de document e isto não funciona. O que devemos fazer, então? Queremos tratar o querySelector como uma função separada. Nós queremos que ao colocarmos o querySelector para o $, ele mantenha a associação com o document. Para isto, usaremos o bind().

**MVC ... o que é ?**
- M
  - O M é o **modelo**, uma abstração do mundo real, os dados da aplicação e suas regras de negócio. O padrão MVC permite que alterações de layout na view não acarretem alterações no **modelo**.

- V 
  - O V ou a **view** é a representação do modelo em alguma tecnologia, por exemplo, HTML. A **view** apresenta um modelo em uma tabela, em um formulário ou em parágrafos, e o padrão MVC permite que qualquer alteração na **view** não interfira com o modelo.

- C
  - O C é o **controller**, aquele que disponibiliza um modelo para a view. O **controller** é aquele que recebe as ações do usuário e que sabe interagir com o modelo. Como o modelo é independente da view, esta precisa ser renderizada para que reflita as alterações no modelo. Em suma, o controller é a ponte de ligação entre a view e o modelo.

---
    
### 01.04 - Trabalhando com Data

**Usando interpolação para concatenar uma string**
  - Segue o código
  ```java
  
  ...
  
    return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`

  ...

  ```

---

 ### 02.01 Padrão de projeto Proxy
  
  **Como funciona o Proxy**
    - O Proxy delegará a chamada do método para o objeto encapsulado por ele. A vantagem está que colocaremos o interceptador entre a chamada do Proxy e o objeto real. Toda vez que acessamos o Proxy, executaremos um código antes de chamarmos um método ou propriedade correspondente ao objeto real. Resumidamente, antes de qualquer acesso ou chamada a método/função ou atributo do objeto encapsulado, passamos primeiro pelo proxy. Com isso conseguimos executar um evento ou qualquer outra função antes do objeto em manipulação ser alterado / acessado.


    ```java
    this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {

            get(target, prop, receiver) {
        
                if(['addNegociacao', 'deletaNegociacoes'].includes(prop) && typeof(target[prop]) == typeof(Function)) {
        
                    return function(){
        
                      console.log(`método '${prop}' interceptado`);
        
                     Reflect.apply(target[prop], target, arguments);
        
                     self._negociacoesView.update(target);
        
                    }
             }
        
             return Reflect.get(target, prop, receiver);
          }
        });
    ```
  **Vantagens de se usar o padrão Factory**
    - 1) Ele é utilizado quando precisamos facilitar a criação de um objeto.

    - 2) É ideal quando queremos criar objetos similares, com apenas seus detalhes diferentes, que podemos passar nos argumentos da Factory.

    - 3) É bom para abstrair a criação de um objeto complexo, já que o programador que utilizar a Factory não precisa necessariamente saber como é feita esta operação.

---


https://github.com/felippenardi?tab=repositories
https://github.com/felippenardi/lottie-react-web
https://dribbble.com/shots/4249163-Animated-login-form-avatar