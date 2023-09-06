import api from '../boot/axios'

export async function getAnimalImages() {
  return api.get('/animals/types/game/entries?per_page=20')
}
