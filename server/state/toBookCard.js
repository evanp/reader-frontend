// @flow
/*::
import type {Icon, Publication, BookCard} from './types.js.flow'
*/
const { getCover } = require('./getCover.js')
const { getImage } = require('./getImage.js')
const { getNotes } = require('./getNotes.js')
const { getStacks } = require('./getStacks.js')
const { getTags } = require('./getTags.js')
const { getToC } = require('./getToC.js')
const { arrify } = require('../utils/arrify.js')
const { getDocuments, getDocumentsById } = require('./getDocuments.js')
/**
 * Converts an ActivityStreams publication type into an easier to handle BookCard state object.
 */
function toBookCard (publication /*: Publication */) /*: BookCard */ {
  const icons = arrify(publication.icon)
  const placeholdercover = {
    type: 'Image',
    summary: '',
    width: 250,
    height: 350,
    url: '/static/placeholder-cover.png'
  }
  let cover
  if (publication['schema:image']) {
    // The publication has an explicitly set cover using schema.org, so let's use that
    // Also let's just assume that this will be an ActivityStreams Image type
    cover = getImage(publication['schema:image'], placeholdercover)
  } else {
    // No specific cover so we need to pick whichever icon works the best.
    cover = icons.reduce(getCover, placeholdercover)
  }
  // The only thing missing at the moment are sessions and an autogenerated ToC
  const state = {
    id: publication.id,
    name: publication.name || '',
    cover,
    notes: getNotes(publication),
    stacks: getStacks(publication),
    tags: getTags(publication),
    toc: getToC(publication),
    totalItems: publication.totalItems,
    documents: getDocuments(publication),
    documentsById: getDocumentsById(publication)
  }
  state.orderedItems = arrify(publication.orderedItems).map((item, index) => {
    return state.documentsById(item.id)
  })
  return state
}

module.exports.toBookCard = toBookCard
