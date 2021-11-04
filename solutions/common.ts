export const time = (predicate: () => unknown, test_perf = 1) => {
    const start = Date.now();

    for (let i = 0; i < test_perf; i++) {
        predicate();
    }

    const timeDuration = Date.now() - start;

    if (test_perf > 1) {
        console.log(`Did ${test_perf} tests\nExecution took ${timeDuration / 1000 / test_perf}sec on avarage`)
    } else {
        console.log(`Execution took ${timeDuration / 1000}sec`)
    }
}
