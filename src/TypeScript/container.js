/** @format */

import { Container } from 'inversify';
import { BooksRepository } from './models.ts';

const myContainer = new Container();
myContainer.bind(BooksRepository).toSelf();

export default myContainer;
