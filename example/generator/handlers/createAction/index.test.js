const createAction = require("./index");

// WRONG: file is not locked.
// createAction.handler("src/Test", "fuckOff");
// createAction.handler("src/Test", "testAction", "data");
// createAction.handler("src/Test", "fuck", "query, id", true);

createAction("src/Test", "fuckOff").then(() => {
    return createAction("src/Test", "testAction", "data");
}).then(() => {
    return createAction("src/Test", "fuck", "query, id", true);
});