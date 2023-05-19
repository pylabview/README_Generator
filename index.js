const inquirer = require("inquirer");
const fs = require("fs");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// Helper Functions
// Input validation 
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

const checkUserRepo = (repoName,msg) => {
    if(repoName){
        return true;
    }else{
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
};

const checkEMail = (email) => {
    if(emailRegex.test(email)){
        return true;
    } else {
        console.log(" Email address is not valid");
        return false;
    }
}

// 

// 


inquirer.prompt([
    {
        type: 'input',
        name: 'github_username',
        message: "Enter enter my GitHub username",
        default: () => {},
        validate: (github_username) => checkUserRepo(github_username,
            "Please enter a valid GitHub username")
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter your email address",
        default: () => {},
        validate: (email) => checkEMail(email),
    },
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


