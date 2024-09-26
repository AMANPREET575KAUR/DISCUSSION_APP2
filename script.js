const questionList = [];
let selectedQuestion = null;

// Event listener for submitting a question
document.getElementById('askQuestionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const questionText = document.getElementById('question').value;

    const question = {
        id: questionList.length + 1,
        title,
        questionText,
        responses: [],
        votes: 0
    };

    questionList.push(question);
    displayQuestions();
    document.getElementById('askQuestionForm').reset();
});

// Display questions in the left pane
function displayQuestions() {
    const questionUl = document.getElementById('questionList');
    questionUl.innerHTML = '';

    // Sort by votes (highest first)
    const sortedQuestions = questionList.sort((a, b) => b.votes - a.votes);
    sortedQuestions.forEach((question) => {
        const li = document.createElement('li');
        li.innerHTML = `${question.title} <span>(Votes: ${question.votes})</span>`;
        li.onclick = () => showQuestionDetail(question.id);
        questionUl.appendChild(li);
    });
}

// Display question detail and response form
function showQuestionDetail(id) {
    selectedQuestion = questionList.find(q => q.id === id);
    document.getElementById('questionForm').style.display = 'none';
    document.getElementById('responseSection').style.display = 'block';
    document.getElementById('selectedQuestionTitle').innerText = selectedQuestion.title;
    document.getElementById('selectedQuestionBody').innerText = selectedQuestion.questionText;

    const responseUl = document.getElementById('responseList');
    responseUl.innerHTML = '';

    selectedQuestion.responses.forEach(response => {
        const li = document.createElement('li');
        li.innerText = `${response.name}: ${response.comment} (Votes: ${response.votes})`;
        responseUl.appendChild(li);
    });
}

// Submit a response
document.getElementById('responseForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('responderName').value;
    const comment = document.getElementById('comment').value;

    const response = { name, comment, votes: 0 };
    selectedQuestion.responses.push(response);
    showQuestionDetail(selectedQuestion.id);
    document.getElementById('responseForm').reset();
});

// Resolve button functionality
document.getElementById('resolveBtn').addEventListener('click', () => {
    const index = questionList.findIndex(q => q.id === selectedQuestion.id);
    questionList.splice(index, 1);
    document.getElementById('responseSection').style.display = 'none';
    document.getElementById('questionForm').style.display = 'block';
    displayQuestions();
});

// Search functionality
document.getElementById('searchBox').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredQuestions = questionList.filter(q => q.title.toLowerCase().includes(searchTerm));

    const questionUl = document.getElementById('questionList');
    questionUl.innerHTML = '';

    if (filteredQuestions.length > 0) {
        filteredQuestions.forEach((question) => {
            const li = document.createElement('li');
            li.innerHTML = `${question.title} <span>(Votes: ${question.votes})</span>`;
            li.onclick = () => showQuestionDetail(question.id);
            questionUl.appendChild(li);
        });
    } else {
        questionUl.innerHTML = '<li>No matching questions found.</li>';
    }
});
