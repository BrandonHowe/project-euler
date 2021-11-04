import * as fs from "fs";
import { exec } from "child_process";

const PE_answers: Record<string, number> = {
    'PE-0021': 31626
};

const timeColor = (time: number) => {
    return time >= 1 ?
        `\x1b[31m${time}\x1b[0m` :
        `\x1b[32m${time}\x1b[0m`;
}

const PE = `PE-${process.argv[2]}`;

console.log(process.argv[2]);

console.log(`ts-node ./${PE}/index.ts`);

const subprocess = exec(`ts-node ./solutions/${PE}/index.ts`, function (_, stdout) {
    console.log(_, stdout);
    if (stdout) {
        const answer = PE_answers[PE];
        const result = Number(stdout.split('\nExecution took ')[0]);
        const time_taken = Number(stdout.split('\nExecution took ')[1].split('').filter(x => /[0-9.]/g.test(x)).join(''));

        if (result === answer) {
            console.log(`🟢 ${PE} took ${timeColor(time_taken)} sec`)
        } else {
            console.log(`🔴 ${PE} took ${timeColor(time_taken)} sec`)
        }
    }
});

new Promise((resolve) => {
    subprocess.on('close', resolve);
});

// // Get a list of all the PE problems
// fs.readdir("./", async function (err, files) {
//     if (err) {
//         console.log("Couldnt open test directory");
//     }

//     else {
//         files = files.filter(x => x.includes('PE'));

//         for (const PE of files) {
//             const subprocess = exec(`node ${PE}/index.js`, function (_, stdout) {
//                 if (stdout) {
//                     const answer = PE_answers[PE];
//                     const result = Number(stdout.split('\nexecution took ')[0]);
//                     const time_taken = Number(stdout.split('\nexecution took ')[1].split('').filter(x => /[0-9.]/g.test(x)).join(''));

//                     if (result === answer) {
//                         console.log(`🟢 ${PE} took ${timeColor(time_taken)} sec`)
//                     } else {
//                         console.log(`🔴 ${PE} took ${timeColor(time_taken)} sec`)
//                     }
//                 }
//             });

//             await new Promise((resolve) => {
//                 subprocess.on('close', resolve);
//             });
//         }
//     }
// });