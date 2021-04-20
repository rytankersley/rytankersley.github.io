var categoryTotals = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50];

function setText(langIndex) {
    var data = getTextData(langIndex);
    
    document.getElementById('navheader').innerHTML = data.navheader;
    document.getElementById('mainheader').innerHTML = data.mainheader;
    document.getElementById('subtitle1').innerHTML = data.subtitleOne;
    document.getElementById('subtitle2').innerHTML = data.subtitleTwo;
    document.getElementById('accordion').innerHTML = getCategoriesHTML(data);
}

function updateRadarGraph() {

};

function calculateCategoryTotal(categoryIndex) {
    var data = getTextData(0);
    var cat = data.categories[categoryIndex];
    var total = 0;
    for(var i = 0; i < cat.questions.length; i++) {
        var rangeName = `range${categoryIndex},${i}`;
        var value = document.getElementById(rangeName).value;
        total += Number(value);
        console.log(`index: ${i}, value: ${value}, subtotal: ${total}`);
    };

    var average = (total / cat.questions.length) * 10; 
    var subtotal = average.toFixed(2);
    document.getElementById(`headingButton${categoryIndex}`).innerHTML = `${cat.name} - ${subtotal}`;
    categoryTotals[categoryIndex] = subtotal;
    updateRadarGraph();
}

function getCategoriesHTML(data) {
    var html = "";
    for(var i = 0; i < data.categories.length; i++) {
        var cat = data.categories[i];
        html += 
    `
    <div class='card'>
       <div class='card-header' id='heading${i}'>
          <h5 class='mb-0'>
             <button id='headingButton${i}' class='btn btn-link' data-toggle='collapse' data-target='#collapse${i}' aria-expanded='true' aria-controls='collapse${i}'>
             ${cat.name} - 50.00
             </button>
          </h5>
       </div>
       <div id='collapse${i}' class='collapse show' aria-labelledby='heading${i}' data-parent='#accordion'>
          <div class='card-body'>
             <h6>${cat.description}</h6>
             ${appendQuestions(cat)}    
         </div>
       </div>
    </div>
    `;
    }
    

    return html;
}

function rangeUpdated(categoryIndex) {
    calculateCategoryTotal(categoryIndex);
}

function appendQuestions(category) {
    var html = "";

    for(var i = 0; i < category.questions.length; i++) {
        var question = category.questions[i];
        var rangeName = `range${category.index},${i}`
        
        var verseRef = question.verse == '' ? '' : `${question.verse} (${question.verseRef})`;
        html += 
        `<label for=${rangeName} class='form-label bold'>Question ${i + 1}</label>` +
        `</br>` +
        `<label for=${rangeName} class='form-label'>${question.text}</label>` +
        `</br>` +
        `<label for=${rangeName} class='form-label question-verse-ref'>${verseRef}</label>` +
        `<input type='range' class='custom-range' value='5' min='1' max='10' id=${rangeName} oninput='this.nextElementSibling.value = this.value; rangeUpdated(${category.index});'>` +
        `<output>5</output>` +
        `</br>` +
        `</br>`;
    };

    return html;
}

function load() {
    setText(0);
}