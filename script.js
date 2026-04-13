// ==========================
// 🧠 问题数据
// ==========================
const questions = [
    { q: "你喜欢社交吗？", options: ["是", "否"], types: ["E", "I"] },
    { q: "你更喜欢计划还是即兴？", options: ["计划", "即兴"], types: ["J", "P"] },
    { q: "你更注重事实还是想法？", options: ["事实", "想法"], types: ["S", "N"] },
    { q: "你做决定更靠理性还是感受？", options: ["理性", "感受"], types: ["T", "F"] }
];

// ==========================
// 📍 当前题目索引
// ==========================
let currentQuestion = 0;

// ==========================
// 📊 分数统计
// ==========================
let scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };

// ==========================
// 🚀 开始测试（带淡入动画）
// ==========================
function startQuiz() {
    document.getElementById("startScreen").style.display = "none";

    const quiz = document.getElementById("quiz");
    quiz.style.display = "block";

    // 👉 让题目淡入（配合CSS opacity）
    setTimeout(() => {
        quiz.classList.remove("opacity-0");
    }, 50);

    showQuestion();
}

// ==========================
// 📊 更新进度条（新功能）
// ==========================
function updateProgress() {
    let percent = (currentQuestion / questions.length) * 100;
    document.getElementById("progressBar").style.width = percent + "%";
}

// ==========================
// 🧩 显示问题
// ==========================
function showQuestion() {

    // 👉 如果题目做完，直接显示结果
    if(currentQuestion >= questions.length) {
        showResult();
        return;
    }

    const q = questions[currentQuestion];

    // 👉 显示题目
    document.getElementById("question").textContent = q.q;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    // 👉 更新进度条
    updateProgress();

    // 👉 生成选项按钮
    for(let i=0; i<q.options.length; i++) {

        const btn = document.createElement("button");

        // 🎨 UI升级重点（动画按钮）
        btn.className = `
            w-full bg-gray-100 
            hover:bg-purple-500 hover:text-white 
            p-3 rounded-xl 
            transition transform 
            hover:scale-105 active:scale-95 
            shadow
        `;

        btn.textContent = q.options[i];

        // 👉 点击选项
        btn.onclick = () => {

            const type = q.types[i];
            scores[type]++; // 分数+1

            const quiz = document.getElementById("quiz");

            // 🎬 动画：先淡出
            quiz.classList.add("opacity-0");

            setTimeout(() => {
                currentQuestion++; // 下一题
                showQuestion();

                // 🎬 再淡入
                quiz.classList.remove("opacity-0");

            }, 300);
        };

        optionsDiv.appendChild(btn);
    }
}

// ==========================
// 🎉 显示结果（带动画）
// ==========================
function showResult() {

    const quiz = document.getElementById("quiz");
    const resultBox = document.getElementById("result");

    // 👉 先让题目淡出
    quiz.classList.add("opacity-0");

    setTimeout(() => {

        quiz.style.display = "none";
        resultBox.style.display = "block";

        // 👉 结果淡入
        setTimeout(() => {
            resultBox.classList.remove("opacity-0");
        }, 50);

        // 🧠 计算MBTI结果
        let result = "";
        result += scores.E >= scores.I ? "E" : "I";
        result += scores.S >= scores.N ? "S" : "N";
        result += scores.T >= scores.F ? "T" : "F";
        result += scores.J >= scores.P ? "J" : "P";

        // 👉 显示结果
        document.getElementById("resultText").textContent = result;

    }, 300);
}

// ==========================
// 🔄 重新开始
// ==========================
function restartQuiz() {

    currentQuestion = 0;

    // 👉 重置分数
    scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };

    // 👉 切换页面
    document.getElementById("result").style.display = "none";

    const quiz = document.getElementById("quiz");
    quiz.style.display = "block";

    // 👉 重置透明度（防止卡住）
    quiz.classList.remove("opacity-0");

    showQuestion();
}