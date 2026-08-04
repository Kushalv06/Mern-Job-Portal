import { clearDatabase } from './clearDatabase.js'
import { seedDatabase } from './seedDatabase.js'

export async function resetDatabase() {
    console.log('Clearing database...')
    await clearDatabase()

    console.log('Seeding database...')
    await seedDatabase()

    console.log('Database reset complete.')
}

await resetDatabase()