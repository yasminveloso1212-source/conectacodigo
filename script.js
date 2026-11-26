// Menu responsivo
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Calculadora: demonstra como operadores matemáticos viram instruções.
const calculateBtn = document.querySelector("#calculateBtn");
calculateBtn.addEventListener("click", () => {
  const a = Number(document.querySelector("#numA").value);
  const b = Number(document.querySelector("#numB").value);
  const operation = document.querySelector("#operation").value;
  const resultElement = document.querySelector("#calcResult");

  if (document.querySelector("#numA").value === "" || document.querySelector("#numB").value === "") {
    resultElement.textContent = "Preencha os números";
    return;
  }
  if (operation === "/" && b === 0) {
    resultElement.textContent = "Não é possível dividir por zero";
    return;
  }

  const operations = {
    "+": () => a + b,
    "-": () => a - b,
    "*": () => a * b,
    "/": () => a / b
  };
  const result = operations[operation]();
  resultElement.textContent = Number.isInteger(result) ? result : result.toFixed(2);
});

// Condicional: nota maior ou igual a 7.
const gradeRange = document.querySelector("#gradeRange");
const gradeValue = document.querySelector("#gradeValue");
const gradeResult = document.querySelector("#gradeResult");

function updateGrade() {
  const grade = Number(gradeRange.value);
  gradeValue.textContent = grade.toLocaleString("pt-BR");
  const approved = grade >= 7;
  gradeResult.classList.toggle("warning", !approved);
  gradeResult.querySelector("span").textContent = approved ? "✓" : "!";
  gradeResult.querySelector("strong").textContent = approved ? "Aprovado" : "Em recuperação";
  gradeResult.querySelector("small").textContent = approved
    ? "A nota é igual ou maior que 7."
    : "A nota é menor que 7.";
}
gradeRange.addEventListener("input", updateGrade);
updateGrade();

// Quiz com correção e pontuação.
document.querySelector("#checkQuiz").addEventListener("click", () => {
  const questions = [...document.querySelectorAll(".question")];
  let score = 0;
  let answered = 0;

  questions.forEach((question, index) => {
    question.classList.remove("correct", "incorrect");
    const selected = question.querySelector("input:checked");
    if (selected) {
      answered++;
      const isCorrect = selected.value === question.dataset.answer;
      if (isCorrect) score++;
      question.classList.add(isCorrect ? "correct" : "incorrect");
    }
  });

  document.querySelector("#scoreNumber").textContent = `${score}/4`;
  const feedback = document.querySelector("#quizFeedback");
  if (answered < questions.length) {
    feedback.textContent = `Você respondeu ${answered} de 4 perguntas. Complete as que faltam e corrija novamente.`;
  } else if (score === 4) {
    feedback.textContent = "Excelente! Você acertou todas as perguntas. 🎉";
  } else {
    feedback.textContent = `Você acertou ${score} de 4. Revise as respostas destacadas e tente novamente!`;
  }
});
