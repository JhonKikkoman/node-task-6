/** @format */

import { Container } from 'inversify';
import { BooksRepository, entityBook } from './enities';
import { TYPES } from './types';

const myContainer = new Container();

myContainer.bind<entityBook>(TYPES.Book).to(BooksRepository);
export default myContainer;
