const inquirer = require("inquirer");
const fs = require("fs");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DEBUG = true;

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
        console.log('\n' + msg);
        return false;
    }
};

const checkUserRepo = (repoName,msg) => {
    if(repoName){
        return true;
    }else{
        console.log("\n" + msg);
        return false;
    }
    };

const checkParagraphLines = (txt,min_lines,msg) => {
    let lines = txt.split("\n").length - 1;
    if(lines >= min_lines){
        return true;
    }else {
        console.log("\n" + msg);
        return false;
    }
};

const checkEMail = (email, msg) => {
    if(emailRegex.test(email)){
        return true;
    } else {
        console.log("\n" + msg);
        return false;
    }
}



const generateREADME = ({github_username,
                        email,
                        title,
                        description,
                        installation_instructions,
                        license_type,
                        usage,
                        credits}) =>
     
    `
# ${title}

## Description
_______________________________________
${description}

## Table of Contents
_______________________________________

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contact](#contact)

## Installation
_______________________________________

${installation_instructions}

## Usage
_______________________________________

${usage}


## Credits
_______________________________________

${credits}

## License
_______________________________________

![](https://img.shields.io/badge/license-${license_type}-green)
---


## How to Contribute

If you would like to contribute to this project, you can do so by following the [Contributor Covenant](https://www.contributor-covenant.org/)

## Contact

Please feel free to reach out to me via email at <br>
email: ${email}, ${github_username}.

## Video
![Fancy README Generator video]()


`;


inquirer.prompt([
    {
        type: 'input',
        name: 'github_username',
        message: "Enter enter my GitHub username: ",
        default: () => {},
        validate: (github_username) => checkUserRepo(github_username,
            "Please enter a valid GitHub username")
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter your email address: ",
        default: () => {},
        validate: (email) => checkEMail(email, 'Email address is not valid'),
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is your the project Title:',
        default: () => {},
        validate: (title) => checkTextLength(title,1,"The Title must be at least one word")
    }
    ,
    {
        type: 'editor',
        name: 'description',
        message:'*** Enter Project description: ',
        default: () => {},
        validate: (description) => checkTextLength(description,10,"The Description must be at least ten word")
    },
    {
        type: 'editor',
        name: 'installation_instructions',
        message: 'Enter installation instructions: ',
        default: () => {},
        validate: (installation_instructions) => 
                    checkParagraphLines(installation_instructions,1,"Must be at least one line")
    },
    {
        type: 'list',
        message: 'Enter license type',
        name: 'license_type',
        default: 'MIT',
        choices: ['MIT',
                  'Apache_v2.0', 
                    'GNU_v3.0', 
                    'ISC',
                    'BSL_1.0',],
      },
      {
          type: 'editor',
          name: 'usage',
          message: 'Enter usage information: ',
          default: () => {},
          validate: (installation_instructions) => 
                      checkParagraphLines(installation_instructions,1,"Must be at least one line")
      },
      {
          type: 'editor',
          name: 'credits',
          message: 'Enter credits information: ',
          default: () => {},
          validate: (credits) => 
                      checkParagraphLines(credits,1,"Must be at least one line")
      },
      
]).then((answer) => {
    if(DEBUG) {console.log(answer)};
    const readme = generateREADME(answer);
    fs.writeFile('README.md', readme, (err) =>
    err ? console.log(err) : console.log('Successfully created README.md!')
  );

});


