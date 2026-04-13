// ==========================
// 问题列表
// 每个问题有三个属性：
// q = 问题文本
// options = 选项文本
// types = 对应选项的类型（E/I, S/N, T/F, J/P）
// ==========================
const questions = [
    { q: "你喜欢社交吗？", options: ["是", "否"], types: ["E", "I"] },
    { q: "你更喜欢计划还是即兴？", options: ["计划", "即兴"], types: ["J", "P"] },
    { q: "你更注重事实还是想法？", options: ["事实", "想法"], types: ["S", "N"] },
    { q: "你做决定更靠理性还是感受？", options: ["理性", "感受"], types: ["T", "F"] }
];

// ==========================
// 当前问题索引
// 用来记录用户现在在第几题
// ==========================
let currentQuestion = 0;

// ==========================
// 分数记录
// 每个类型的选择次数
// ==========================
let scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };

// ==========================
// 显示当前问题函数
// ==========================
function showQuestion() {
    // 如果已经没有问题了，显示结果
    if(currentQuestion >= questions.length) {
        showResult();
        return;
    }

    // 取出当前问题对象
    const q = questions[currentQuestion];

    // 显示问题文本
    document.getElementById("question").textContent = q.q;

    // 获取选项容器
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = ""; // 清空上一个问题的按钮

    // 循环创建按钮
    for(let i=0; i<q.options.length; i++) {
        const btn = document.createElement("button"); // 创建按钮
        btn.className = "bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl m-2 transition";
        btn.textContent = q.options[i]; // 按钮显示选项文字
        btn.onclick = () => { // 点击按钮时执行
            const type = q.types[i]; // 获取对应类型
            scores[type]++; // 该类型分数加1
            currentQuestion++; // 移动到下一题
            showQuestion(); // 显示下一题
        };
        optionsDiv.appendChild(btn); // 把按钮加到页面
    }
}

// ==========================
// 显示结果函数
// ==========================
function showResult() {
    // 隐藏问题区域
    document.getElementById("quiz").style.display = "none";
    // 显示结果区域
    document.getElementById("result").style.display = "block";

    // 计算每个维度结果
    // 例如 E 和 I 哪个分数高，就选哪个
    let result = "";
    result += scores.E >= scores.I ? "E" : "I";
    result += scores.S >= scores.N ? "S" : "N";
    result += scores.T >= scores.F ? "T" : "F";
    result += scores.J >= scores.P ? "J" : "P";

    // 显示结果文本
    document.getElementById("resultText").textContent = result;
}

// ==========================
// 重新开始函数
// ==========================
function restartQuiz() {
    currentQuestion = 0; // 回到第一题
    // 重置分数
    scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
    // 显示问题区域
    document.getElementById("quiz").style.display = "block";
    // 隐藏结果区域
    document.getElementById("result").style.display = "none";
    // 显示第一题
    showQuestion();
}

// 点击开始按钮时执行
function startQuiz() {
    document.getElementById("startScreen").style.display = "none"; // 隐藏开始页
    document.getElementById("quiz").style.display = "block"; // 显示问题
    showQuestion(); // 开始出题
}