interface entityBook {
    id: string,
    title: string,
    description: string,
    authors: string,
    favorite: string,
    fileCover: string,
    fileName: string
}

abstract class BooksRepository {
    constructor() {
        
    }
    createBook(book:string){};
    getBook(id: string){};
    getBooks(){};
    updateBook(id: string){};
    deleteBook(id: string){};
}