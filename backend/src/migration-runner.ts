import { Logger } from '@nestjs/common'
import dataSource from '@app/configs/datasource.postgres.config'
import * as process from 'process'

export const runMigrations = async () => {
  const logger = new Logger('migrationRunner')

  try {
    logger.log('Running migrations')
    await dataSource.initialize()
    await dataSource.runMigrations()
  } catch (error) {
    logger.error('Cannot start the app. Migration have failed!', error)
    process.exit(0)
  }
}
