const questions = [
    { q: "你喜欢社交吗？", options: ["是", "否"], types: ["E", "I"] },
    { q: "你更喜欢计划还是即兴？", options: ["计划", "即兴"], types: ["J", "P"] },
    { q: "你更注重事实还是想法？", options: ["事实", "想法"], types: ["S", "N"] },
    { q: "你做决定更靠理性还是感受？", options: ["理性", "感受"], types: ["T", "F"] }
];

let currentQuestion = 0;
let scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };

function showQuestion() {
    if(currentQuestion >= questions.length) {
        showResult();
        return;
    }
    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.q;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    for(let i=0; i<q.options.length; i++) {
        const btn = document.createElement("button");
        btn.textContent = q.options[i];
        btn.onclick = () => {
            const type = q.types[i];
            scores[type]++;
            currentQuestion++;
            showQuestion();
        };
        optionsDiv.appendChild(btn);
    }
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";

    // 简单算法: 选 E 或 I 多的决定外向/内向
    let result = "";
    result += scores.E >= scores.I ? "E" : "I";
    result += scores.S >= scores.N ? "S" : "N";
    result += scores.T >= scores.F ? "T" : "F";
    result += scores.J >= scores.P ? "J" : "P";

    document.getElementById("resultText").textContent = result;
}

function restartQuiz() {
    currentQuestion = 0;
    scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
    document.getElementById("quiz").style.display = "block";
    document.getElementById("result").style.display = "none";
    showQuestion();
}

// 启动测试
showQuestion();