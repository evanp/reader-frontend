import {html} from 'lighterhtml'
import {arrify} from '../utils/arrify.js'
import {bookCard} from './book-card.js'

export function library (context) {
  const title = 'Library'
  const bookCount = arrify(context.items).length
  return html`
  <main class="Library" id="Library">
  <div class="Library-header">
    <h1 class="Library-title">${title}</h1>
    <nav class="Library-buttons">
    <ol class="Library-buttons-list">
    <li class="Library-buttons-item"><a href="/Import" class="MenuItem">Import</a></li>
    </ol></nav>
    <p class="Library-info">${bookCount} items in collection</p>
  </div>
  <div class="Library-books">${arrify(context.items).map(book =>
    bookCard(book)
  )}</div>
</main>`
}
