// let formattedProblems = [];
// learnjs.problems.map(problem =>
//     formattedProblems.push({
//         code: learnjs.formatCode(problem.code),
//         name: problem.name
//     })
// )
return learnjs.problems.map(learnjs.formatCode);