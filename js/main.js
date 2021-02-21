import { createManyNearOffers } from './data.js'
import { renderCard } from './render-card.js'

const QUANTITY_OF_OFFERS = 10;

const nearOffers = createManyNearOffers(QUANTITY_OF_OFFERS);

renderCard(nearOffers[0]);
