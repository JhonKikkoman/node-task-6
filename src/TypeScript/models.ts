/* eslint-disable @typescript-eslint/no-unused-vars */
interface entityBook {
    id: string,
    title: string,
    description: string,
    authors: string,
    favorite: string,
    fileCover: string,
    fileName: string
}

export abstract class BooksRepository {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createBook(book: any){};
    getBook(id: string){};
    getBooks(){};
    updateBook(id: string){};
    deleteBook(id: string){};
}