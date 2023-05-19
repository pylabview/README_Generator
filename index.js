const inquirer = require("inquirer");
const fs = require("fs");

// Helper Functions

const checkTextLength = (str,min_len,msg) => {
    let words = str.trim().split(" ");
    let arrayWords = [];
    words.map( (word) => {
        let trimEl = word.trim();
        if(trimEl.length>0){
            arrayWords.push(trimEl);
        }
    });

    if(arrayWords.length >= min_len){
        return true;
    }else {
        console.log(msg);
        return false;
    }
};

const checkParagraphLines = (txt,min_lines,msg) => {
    let lines = txt.split("\n").length - 1;
    if(lines >= min_lines){
        return true;
    }else {
        console.log(msg);
        return false;
    }
}

inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What is your the project Title',
        default: () => {},
        validate: (title) => checkTextLength(title,1,"The Title must be at least one word")
    }
    ,
    {
        type: 'input',
        name: 'description',
        message:'Enter Project description',
        default: () => {},
        validate: (description) => checkTextLength(description,3,"The Description must be at least three word")
    },
    {
        type: 'editor',
        name: 'installation_instructions',
        message: 'Enter usage information',
        default: () => {},
        validate: (installation_instructions) => 
                    checkParagraphLines(installation_instructions,1,"Must be at least one line")
    },

]).then((answer) => {
    console.log(answer);



} 
);


