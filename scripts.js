// Adicionar a class active, objeto(Modal)
const Modal = {
          // funcionalidade(abrir)
    open(){
            // Abrir modal
        document.querySelector('.modal-overlay') //querySelector => procura dentro do documento
        .classList.add('active') // classList => adicione active na classe  .modal-overlay 
              
    
        },
          // remover a class active do modal
    close(){
              // fechar o Modal
              document.querySelector('.modal-overlay')
              .classList.remove('active')
         
    
            }
}


// armazenar no localStorage
const Storage = {
  get(){
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) ||
    []

  },

  set(transactions){
      localStorage.setItem("dev.finances:transactions", JSON.stringify
      (transactions))

  }
}
          
// funcionalidade da conta
// const transactions =

const Transaction ={
    // refatoraçao do condigo transactions
    all: Storage.get(),


    // adicionar uma transactions/ aparti de uma array de lista de transaction
    add(transaction){
      Transaction.all.push(transaction)
      App.reload()

    },
    // remover as transações
    remove(index){
      Transaction.all.splice(index, 1)


      App.reload()

    },


    // somar as entradas
    incomes(){
    // variavel inicia seu valor com 0
      let income  = 0;
      // para cada transação
      Transaction.all.forEach(transaction => {
        // se ela for maior que zero
        if (transaction.amount > 0){
          // somar a uma variavel e retornar a variavel
          income += transaction.amount;
        }
      })
      return income;

  

    },
      // somar as saidas
    expenses(){
        // variavel inicia seu valor com 0
        let expense  = 0;
        //pegar todas as transações
        // para cada transação
        Transaction.all.forEach(transaction => {
        // se ela for menor que zero
        if (transaction.amount < 0){
        // somar a uma variavel e retornar a variavel
          expense += transaction.amount;
        }
        })
        return expense;
    
    },
    // entradas - saidas
    total(){
      // subtracao da entrada - saida 
      return Transaction.incomes() + Transaction.expenses();
      
    }

    

}
//Substituir os dados do Html com os dados do js

// class chamada DOM
const DOM ={
    // atributo
    transactionsContainer: document.querySelector('#data-table tbody'),
    // Funcionalidade de trasação
    addTransaction(transaction, index){
        console.log(transaction)
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        // incluido uma dados na variavel  transactionsContainer
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)

    },

    // funcionalidade pra pegar o html
    innerHTMLTransaction(transaction, index){
      // condicao pra verificar atributo amount
      const CSSclass = transaction.amount > 0 ? "incone" :
      "expense"

      const amount = Utils.formatCurrency(transaction.amount)
      
      const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img onclick = "Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
        </td>
        
        `
        return html
    },

    // mostrar o resultado total
    updateBalance(){
      // soma das entradas
        document
            .getElementById('incomeDisplay')
            // formadando o valor em real
            .innerHTML = Utils.formatCurrency( Transaction.incomes())
      // soma das saidas
        document
            .getElementById('expenseDisplay')
            // formadando o valor em real
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
      // soma total
        document
            .getElementById('totalDisplay')
            // formadando o valor em real
            .innerHTML = Utils.formatCurrency(Transaction.total())

    },

    clearTransactions(){
      DOM.transactionsContainer.innerHTML = ""
    }

}

// fluxo de execução
// formataçao da moeda
const Utils ={
  formatAmount(value){
    value = Number(value) * 100
  
    return value
  
  },

  formatDate(date){
    const splittedDate = date.split("-")

    return  `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`


  },
  
  formatCurrency(value){
        // 
        const signal = Number(value) < 0 ? "-" : ""
        
        value = String(value).replace(/\D/g, "")
        // 
        value = Number(value)/ 100
        //transformando o numero em moeda
        value = value.toLocaleString("pt-BR", {
          // transformando em real brasileiro
          style: "currency",
          currency: "BRL"
        })
        return signal + value
  }
}

// Formulario
const Form ={
  // pegar os campos do html
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  // pegar os valores dos campos
  getValues(){
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }

  },

  formatData(){
    console.log("Formatar os dados")

  },
//validar os campos
  validateFields(){
    const {description, amount, date} = Form.getValues()
// VERIFICANDO SE ESTA VAZIO
    if(description.trim() == "" ||
      amount.trim() === "" || 
      date.trim() === "" ){
          throw new Error("Por favor, preencha todos os campos")  

      }
    console.log(Form.getValues())
  },

  formatValues(){
    let {description, amount, date} = Form.getValues()
      amount = Utils.formatAmount(amount)
      date = Utils.formatDate(date)
      console.log(date)
      return {
        description,
        amount,
        date
      }
    

  },

  clearFields(){
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""

  },

  submit(event){
    event.preventDefault()

    try {
          // verificar se todas as informações foram preenchidas
          Form.validateFields()
          // formatar os dados pata Salvar
          const transaction = Form.formatValues()
          // salvar
          Transaction.add(transaction)
          // apagar os dados do Formulario
          Form.clearFields()
          //fechar modal
          Modal.close()
      
    } catch (error) {
      // mostrar a mensagem de erro
      alert(error.message)

      
    }

  }

}



const App ={
  init(){
  // fazendo um for no objeto transactions
  Transaction.all.forEach(DOM.addTransaction)
    
  // resultados dos gasto
  DOM.updateBalance()
    // atualizando o local storange
  Storage.set(Transaction.all)

},
  // renniciar aplicação
  reload(){
    // limpar
    DOM.clearTransactions()
    //Reniciar
    App.init()
  },
}

// iniciar aplicação
App.init()


// chamada pra remover tranção
// Transaction.remove(0)

