import { createManyNearOffers } from './data.js'
import { insertDataInCard } from './generate-card.js'

const QUANTITY_OF_OFFERS = 10;

const nearOffers = createManyNearOffers(QUANTITY_OF_OFFERS);

insertDataInCard(nearOffers[0]);
