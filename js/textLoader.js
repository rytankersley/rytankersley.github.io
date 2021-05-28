var categoryTotals = [];
var langIndex = 0;

function prepareCategories(data) {
    categoryTotals = [];

    for(var i = 0; i < data.categories.length; i++) {
        var cat = data.categories[i];
        var questions = [];
        for (var j = 0; j < cat.questions.length; j++) {
            questions.push(5);
        }

        categoryTotals.push(questions);
    }
}

function setText(languageIndex) {
    langIndex = languageIndex;
    var data = getTextData(langIndex);
    if (categoryTotals.length === 0) {
        prepareCategories(data);
    }

    console.log(categoryTotals);

    document.getElementById('navheader').innerHTML = data.navheader;
    document.getElementById('mainheader').innerHTML = data.mainheader;
    document.getElementById('subtitle1').innerHTML = data.subtitleOne;
    document.getElementById('subtitle2').innerHTML = data.subtitleTwo;
    document.getElementById('subtitle3').innerHTML = data.subtitleThree;
    
    document.getElementById('accordion').innerHTML = getCategoriesHTML(data);

    updateLabels(languageIndex);
}

function getCategoryAverages() {
    var categoryAverages = [];
    for(var i = 0; i < categoryTotals.length; i++) {
        categoryAverages.push(Number(calculateCategoryTotalByIndex(i)))
    }

    return categoryAverages;
};

function updateGraphs() {
    var val = getCategoryAverages();
    barChart.data.datasets[0].data = val;
    barChart.update();
    radarChart.data.datasets[0].data = val;
    radarChart.update();
};

function fillCategoryWithRangeValues(category) {
    for(var i = 0; i < category.questions.length; i++) {
        var rangeName = `range${category.index},${i}`;
        var contents = document.getElementById(rangeName).value;
        var value = Number(contents);
        categoryTotals[category.index][i] = value;
    };
}

function fillRangeWithCategoryValues(category) {
    for(var i = 0; i < category.questions.length; i++) {
        var rangeName = `range${category.index},${i}`;
        var contents = document.getElementById(rangeName).value;
        var value = Number(contents);
        categoryTotals[category.index][i] = value;
    };
}

function calculateCategoryTotalByIndex(categoryIndex) {
    var total = 0;

    for(var i = 0; i < categoryTotals[categoryIndex].length; i++) {
        total += categoryTotals[categoryIndex][i];
    }

    var average = (total / categoryTotals[categoryIndex].length) * 10; 
    var subtotal = average.toFixed(2);
    
    return subtotal;
}

function calculateCategoryTotal(category) {
    return calculateCategoryTotalByIndex(category.index);
}

function setCategoryNameValue(categoryIndex) {
    var data = getTextData(langIndex);
    var cat = data.categories[categoryIndex];
    
    fillCategoryWithRangeValues(cat);

    var subtotal = calculateCategoryTotal(cat);
    document.getElementById(`headingButton${categoryIndex}`).innerHTML = `${cat.name} - ${subtotal}`;
    updateGraphs();
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
             ${cat.name} - ${calculateCategoryTotal(cat)}
             </button>
          </h5>
       </div>
       <div id='collapse${i}' class='collapse show' aria-labelledby='heading${i}' data-parent='#accordion'>
          <div class='card-body'>
             <p class='category-description'>${cat.description}</p>
             ${appendQuestions(cat)}    
         </div>
       </div>
    </div>
    `;
    }
    

    return html;
}

function rangeUpdated(categoryIndex) {
    setCategoryNameValue(categoryIndex);
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
        `<input type='range' class='custom-range' value='${categoryTotals[category.index][i]}' min='1' max='10' id=${rangeName} oninput='this.nextElementSibling.value = this.value; rangeUpdated(${category.index});'>` +
        `<output>${categoryTotals[category.index][i]}</output>` +
        `</br>` +
        `</br>`;
    };

    return html;
}

function load() {
    setText(0);
}