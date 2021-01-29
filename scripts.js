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

          
// funcionalidade da conta
const transactions =[
    {
      id: 1,
      description: 'Luz',
      amount: 50000,
      date: '23/0132021',


    },
    
    {
      id: 2,
      description: 'Website',
      amount: -500000,
      date: '22/0132021',


    },
    
    {
      id: 3,
      description: 'Internet',
      amount: 20000,
      date: '23/0132021',


    },
    
]


const Transaction ={
    // refatoraçao do condigo transactions
    all: transactions,

    // adicionar uma transactions/ aparti de uma array de lista de transaction
    add(transaction){
      Transaction.all.push(transaction)
      App.reload()

    },
    // somar as entradas
    incomes(){
    // variavel inicia seu valor com 0
      let income  = 0;

      //pegar todas as transações
      // para cada transação
      Transaction.all.forEach(transaction => {
        // se ela for maior que zero
        if (transaction.amount > 0){
          // somar a uma variavel e retornar a variavel
          income += transaction.amount
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
          expense += transaction.amount
        }
        })
        return expense;
    
    },
    // entradas - saidas
    total(){
      // subtracao da entrada - saida 
      return Transaction.incomes() + Transaction.expenses()
      
    }

    

}
//Substituir os dados do Html com os dados do js

// class chamada DOM
const DOM ={
    // atributo
    transactionsContainer: document.querySelector('#data-table'),
    // Funcionalidade de trasação
    addTransaction(transaction, index){
        console.log(transaction)
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        // incluido uma dados na variavel  transactionsContainer

        DOM.transactionsContainer.appendChild(tr)

    },

    // funcionalidade pra pegar o html
    innerHTMLTransaction(transaction){
      // condicao pra verificar atributo amount
      const CSSclass = transaction.amount > 0 ? "incone" :
      "expense"

      const amount = Utils.formatCurrency(transaction.amount)
      
      const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img src="./assets/minus.svg" alt="Remover transação">
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
// fomrataçao da moeda
const Utils ={
    formatCurrency(value){
        // 
        const signal = Number(value) < 0 ? "-" : ""
        
        value = String(value).replace(/\D/g, "")
        // 
        value = Number(value)/ 100
        //transformando o numero em moeda
        value = value.toLocaleString("PT-BR", {
          // transformando em real brasileiro
          style: "currency",
          currency: "BRL"
        })
        return signal + value
    }
 
}


const App ={
  init(){
  // fazendo um for no objeto transactions
  Transaction.all.forEach(transaction => {
      DOM.addTransaction(transaction)

})

// resultados dos gasto
DOM.updateBalance()




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


//adicionou
Transaction.add({
  id: 39,
  description: 'Alo',
  amount: 200,
  date: '23/0132021'
})


