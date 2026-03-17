// Declarei as variáveis padrões
const form = document.querySelector("form")
const numbers = document.getElementById("numbers")
const FirstNumber = document.getElementById("first-number")
const SecondNumber = document.getElementById("second-number")
const repeat = document.getElementById("repeat")
const aside = document.querySelector("aside")

const again = document.querySelector("aside button")

const ul = document.querySelector("ul")

// Não deixa escrever letra
numbers.oninput = () => {
  let value = numbers.value.replace(/\D/g, "")

  numbers.value = value
}

// Não deixa escrever letra

FirstNumber.oninput = () => {
  let value = FirstNumber.value.replace(/\D/g, "")

  FirstNumber.value = value
}

// Não deixa escrever letra
SecondNumber.oninput = () => {
  let value = SecondNumber.value.replace(/\D/g, "")

  SecondNumber.value = value
}

// Quando eu der submite acontece isso
form.onsubmit = (event) => {
  // tira o padrão de form de atualizar a página
  event.preventDefault()

  // Passei os valores para number
  const quantity = Number(numbers.value)
  const min = Number(FirstNumber.value)
  const max = Number(SecondNumber.value)

  // Se o campo estiver vázio, não deixa passar
  if (!quantity || !min || !max) {
    alert("Preencha todos os campos!!! Por gentileza")
    return
  }

  // Verificação padrão
  if (max <= min) {
    alert("O valor máximo deve ser maior do que o mínimo, tente novamente")
    return
  }
  
  // Transformo o valor da Array nos números sorteados
  let Numbers_Sorted = SortEachNumbers(quantity, min, max)

  if (!Numbers_Sorted) return

  // Quando clica para sortear, deixa o botão invisível
  again.classList.add("setInvisible")

  // Para cara item na Array, ele vai ficar um elemento com o valor do Número, e se tiver 4 index por exemplo, 
  // ele vai demorar 4 segundos pra cada 
  Numbers_Sorted.forEach((number, index) => {
    setTimeout(() => {
      createElement(number)
    }, index * 4000)
  })

  // Depois de sortear tudo, ele traz o botão de volta
  setTimeout(() => {
    again.classList.remove("setInvisible")

  // Esse é um timer para a animação do botão aparecendo
    setTimeout(() => {
      again.classList.add("show")
    }, 400)
  }, Numbers_Sorted.length * 4000)

}

// Função que sorteia os números
function Sort(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Função que pega os números sorteados e põe na Array
function SortEachNumbers(numbers, FirstNumber, SecondNumber) {
  let Numbers_Sorted = []
  if (repeat.checked) {
      const range = SecondNumber - FirstNumber + 1

      if (numbers > range) {
    alert("Quantidade maior que o intervalo disponível")
    return
      }
  }
  // Enquanto a quantidade de números sorteado for menor do que a quantidade de números a sortear, execulta
  while(Numbers_Sorted.length < numbers) {
    let NumberSorted = Sort(FirstNumber, SecondNumber)
    // Se a opção de não repetir estiver ativada
    if (repeat.checked) {
      
      // Aí se o número sorteado já estiver na Array
      if (Numbers_Sorted.includes(NumberSorted)) {
        // Pula
        continue
      }
      // Se não, adiciona 
      else {
      Numbers_Sorted.push(NumberSorted)
    }
    } else {
      Numbers_Sorted.push(NumberSorted)
    }
  }

  // Retorna a Array
  return Numbers_Sorted
}


function createElement(value) {

  form.classList.add("setInvisible")
  aside.classList.remove("setInvisible")
  aside.classList.add("setVisible")


  const liCreated = document.createElement("li")

  liCreated.textContent = String(value).padStart(2, '0')

  liCreated.classList.add("number")
  
  ul.append(liCreated)

  void liCreated.offsetWidth

  liCreated.classList.add("animate")
}

again.addEventListener("click", () => {
  const quantity = Number(numbers.value)
  const min = Number(FirstNumber.value)
  const max = Number(SecondNumber.value)

  let Numbers_Sorted = SortEachNumbers(quantity, min, max)

  if (!Numbers_Sorted) return

  ul.innerHTML = ""

  Numbers_Sorted.forEach((number, index) => {
    setTimeout(() => {
      createElement(number)
    }, index * 4000)
  })
})