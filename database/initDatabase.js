import createAuthorTable from "./createAuthorTable.js"; 
import createBooksTable  from "./createBooksTable.js";

 async function initDatabase() {
    try {
        await createBooksTable();
        await createAuthorTable();
    } catch (e) {
        console.log('Error in initializing database,', e);
    }
}

export default initDatabase;