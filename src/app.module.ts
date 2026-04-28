import {Module} from '@nestjs/common';
import {UsefulLinksModule} from './features/useful-links/useful-links.module';

@Module({
  imports: [UsefulLinksModule],
})
export class AppModule {}
