#!/usr/bin/env node
//upr vali line ko rt lo bs

// just like import statement stores all code of fs library in variable
const fs = require("fs");
const path = require("path");

// jo hm arguments pass krege vo hme array m mil jaege 
let arguments = process.argv.slice(2);
// to store uneccessary things apart from filename starting from -
let flags = [];

//to store file names
let filename = [];

let secondaryArguments = [];

for (let i of arguments) {
    if (i[0] == '-') {
        flags.push(i);
    }
    else if (i[0] == "%") {
        secondaryArguments.push(i.slice(1));
    }
    else {
        filename.push(i);
    }
}

// let ans = "";

// if (flags.length == 0) {
//     for (let i of filename) {
//         console.log(fs.readFileSync(i , "utf-8"));
//     }
// }
// else {
//     for (let flag of flags) {
//         if (flag == "-rs") {
//             for (let file of filename) {
//                 let fileData = fs.readFileSync(file , "utf-8");
//                 let fileDataArray = fileData.split(" ");
//                 console.log(fileDataArray.join(""));
//             }
//         }
//     }
// }

for (let file of filename) {
    let fileData = fs.readFileSync(path.resolve(__dirname,file) , "utf-8");
    for (let flag of flags) {
        if (flag == "-rs") {
            fileData = removeall(fileData , " ");
        }
        // to remove line in files
        else if (flag == "-rn") {
            fileData = removeall(fileData , "\r\n")
        }
        else if (flag == "-rsc") {
            for (let secondaryArgument of secondaryArguments) {
                fileData = removeall(fileData , secondaryArgument);
            }
        }
        // to write line number and then print data of line and if line is empty then remove that
        else if (flag == "-sn") {
            fileData = printSequential(fileData , "\r\n");
            let temp = "";
            let count = 1;
            for (let i = 0 ; i < fileData.length ; i++) {
                if (fileData[i] != "") {
                    temp += count + fileData[i] + "\r\n";
                    count++;
                }
            }
            fileData = temp;
        }
        // to write line number then print the data of line
        else if (flag == "-s") {
            fileData = printSequential(fileData , "\r\n");
            let temp = "";
            for (let i = 0 ; i < fileData.length ; i++) {
                temp += (i+1) + fileData[i] + "\r\n";
            }
            fileData = temp;
        }
        //remove extra line from the file bs max ek line ka gap ho skta h us se jyada h to remove krdo
        else if (flag == "-rel") {
            fileData = printSequential(fileData , "\r\n");
            let temp = "";
            for (let i = 0 ; i < fileData.length - 1 ; i++) {
                if (fileData[i] == "" && fileData[i+1] == "") {

                }
                else {
                    temp += fileData[i] + "\r\n";
                }
            }
            if (fileData[fileData.length - 1] != "") {
                temp += fileData[fileData.length - 1];
            }
            fileData = temp;
        }

        // append -> this helps us to append the 2nd file at back of the first file
        else if (flag == "-append") {
            let file1Data = fileData;
            let file2Data = fs.readFileSync(path.resolve(__dirname,filename[1]) , "utf-8");;
            fileData = file1Data + file2Data;
            flag.remove;
        }
    }
    console.log(fileData);
}

function removeall(string , remove) {
    return string.split(remove).join("");
}

function printSequential(string , remove) {
    return string.split(remove);
}


// to remove spaces from file